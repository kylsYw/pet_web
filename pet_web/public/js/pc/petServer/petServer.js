import React from 'react';
import {Row,Col,Divider} from 'antd';
// 自定义模块
import Header from '../header';
import Footer from '../footer';
import ServerContent from './ServerContent';
import common from '../common/common';
let serverDatas1 = common.serverDatas1;//分类
let serverDatas2 = common.serverDatas2;//地区
export default class petServer extends React.Component{
	constructor(){
		super();
		this.state = {
			current:0,
			current2:0,
			type:"all",
			type2:"全部"
		}
	}
	componentWillMount(){
		localStorage.indicator = 6;
	}
	componentWillUnmount(){
		localStorage.indicator = null;
	}
	render(){
		let list = [];
		let index = 0;
		for(let i in serverDatas1){
			let className = index==this.state.current?"current":"";
			list.push(<li key={index}>
				<span onClick={this.click1.bind(this,index,i)} className={className}>{serverDatas1[i]}</span>
			</li>)
			index++;
		}
		return (
			<div className="petServer">
				{/*头部模块*/}
				<Header />
				{/*内容模块*/}
				<Row>
					<Col span = {1}></Col>
					<Col span = {22}>
						{/*服务头部*/}
						<div>
							<div className='content_box' style={{marginTop:20}}>
								{/*分类*/}
								<Row className="select_list">
									<Col span={3}>
										<div>
											<div className="select_left">
											<img className="fl" src="./images/分类icon.png" />
											<span className="fl">分类：</span>
											</div>
										</div>
									</Col>
									<Col span={21}>
										<ul className="select_right">
											{list}
										</ul>
									</Col>
								</Row>
								<div style={{margin:"4px 20px 10px",border:"1px solid #eee"}}></div>
								{/*区域*/}
								<Row className="select_list">
									<Col span={3}>
										<div>
											<div className="select_left">
											<img className="fl" src="./images/定位icon.png" />
											<span className="fl">地区：</span>
											</div>
										</div>
									</Col>
									<Col span={21}>
										<ul className="select_right">
											{serverDatas2.map((item,index)=>{
												return (
													<li key={index}>
														<span onClick={this.click2.bind(this,index,item)}
															className={index==this.state.current2?"current":""}>{item}</span>
													</li>
												)
											})}
										</ul>
									</Col>
								</Row>
							</div>
						</div>
						{/*服务内容*/}
						<ServerContent type={this.state.type} type2={this.state.type2} />
					</Col>
					<Col span={1}></Col>
				</Row>
				{/*底部模块*/}
				<Footer />
			</div>
		)
	}
	click1(index,type){
		this.setState({current:index,type:type})
	}
	click2(index,type){
		this.setState({current2:index,type2:type})
	}
}