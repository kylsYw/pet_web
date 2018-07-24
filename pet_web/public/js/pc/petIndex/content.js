import React from 'react';

import {Row,Col,Carousel} from 'antd';
import  {Link} from 'react-router';


import C_left from './c_left';
import C_middle from './c_middle';
import C_right from './c_right';
export default class Content extends React.Component{
	constructor(){
		super();
		this.state = {
			datas:[]
		}
	}
	componentDidMount(){
		fetch('/dog_list?num=12').then((response)=>{
			return response.json();
		}).then(json=>{
			this.setState({
				datas:json
			})
		})
	}
	render(){
		var content=[];
		content = this.state.datas.length?this.state.datas.map((item,index)=>{
			var flag=(index%4==1||index%4==2)?'0 1%':'0 0';
			var path = {
			  pathname:'/details',
			  query:{
			  	flag:"pet",
			  	id:item.pid,
			  	type:'dog'
			  }
			}
			return (
				<li style={{margin:flag}} key={index}>
					<Link to={path}><img src={item.url} /></Link>
					<p className='img_group_tit'>{item.pname}</p>
					<p style={{height:58,overflow:"hidden"}}>{item.pdesc}</p>
				</li>
			)
		}):<div>数据加载中……</div>
		return (
			<div className='content'>
				<div className='content_top'>
					<Row>
						<Col span={1}></Col>
						<Col span={6}>
							<C_left />
						</Col>
						<Col span={9}>
							<C_middle />
						</Col>
						<Col span={7}>
							<C_right />
						</Col>
						<Col span={1}></Col>
					</Row>
				</div>
				<div className="content_bottom wow fadeIn"  data-wow-duration="3s">
					<Row>
						<Col span={1}></Col>
						<Col span={22}>
							<div className="content_box">
								<div className='c_tit'>
									<h2>宠物大全</h2>
									<Link to={`/petDaqo`}>更多>></Link>
								</div>
								<ul className='pet_img_group'>
									{content}
								</ul>
							</div>
						</Col>
						<Col span={1}></Col>
					</Row>
				</div>
			</div>
		)
	}
}
