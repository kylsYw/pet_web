import React from 'react';
import Header from '../header';
import Footer from '../footer';
import PetInfo_right from '../petInfo/petInfo_right';
import DetailsHeader from '../details/detailsHeader';
import PetContent from './petContent';
import InfoContent from './infoContent';
import AnswerContent from './answerContent';

import {Row,Col} from 'antd';
export default class Details extends React.Component{
	constructor(){
		super();
		this.state={
			datas:[]
		}
	}
	componentDidMount(){
		var url='';
		// 判断详情页所请求的数据类型
		if(this.props.location.query.flag=='pet'){
			// 判断请求猫或者狗的数据
			if(this.props.location.query.type=='dog'){
				url="/dog_list?id=";
			}else{
				url="/cat_list?id=";
			}
		}else if(this.props.location.query.flag=='info'){
			url="/info_list?id=";
		}else if(this.props.location.query.flag=='answer'){
			url="/article_list?infoid=";
		}
		// 网络请求
		fetch(url+this.props.location.query.id).then((response)=>{
			return response.json();
		}).then(json=>{
			this.setState({
				datas:json
			})
		})
	}

	render(){
		let datas = this.props.location.query;
		//flag1为宠物
		let header=[];
		// 宠物详情内容
		let petContent=[];
		// 资讯详情内容
		let infoContent=[];
		// 问答详情内容
		let answerContent=[];
		if(datas.flag=='pet'){
			header=<DetailsHeader datas={this.state.datas} type={this.props.location.query.type} />;
			petContent=<PetContent datas={this.state.datas} />;
		}else if(datas.flag=='info'){
			if(this.state.datas.length){
				let infoid = this.state.datas[0].infoid;
				infoContent=<InfoContent datas={this.state.datas} infoid={infoid}/>;
			}
		}else if(datas.flag=='answer'){
			if(this.state.datas.length){
				answerContent=<AnswerContent infoid={this.state.datas[0].infoid}/>;
			}
		}
		return (
			<div>
				{/*头部模块*/}
				<Header />
				<div>
					{/*宠物头部模块*/}
					{header}
					<div>
						<Row>
							<Col span={1}></Col>
							<Col span={15}>
								<div className="details wow slideInUp"
									data-wow-duration="1.5s"
								>
									{/*中间内容*/}
									<div className='content_box'>
										{petContent}
										{infoContent}
										{answerContent}
									</div>
								</div>
							</Col>
							<Col span={7}>
								<PetInfo_right />
							</Col>
							<Col span={1}></Col>
						</Row>
					</div>
				</div>
				{/*底部模块*/}
				<Footer />
			</div>
		)
	}
}
