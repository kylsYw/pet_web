import React from 'react';
import 'antd/dist/antd.css';
import {Carousel} from 'antd';
import  {Link} from 'react-router';
import common from '../common/common';
let indexType = common.indexType;
export default class C_left extends React.Component{
	constructor(){
		super();
		this.state = {
			datas:[]
		}
	}
	componentDidMount(){
		var url="/info_list?limit=8";
		fetch(url).then(response=>{return response.json()}).then(json=>{
			this.setState({
				datas:json
			})
		})
	}
	render(){
		let content=[];
		content=this.state.datas.length?this.state.datas.map((item,index)=>{
			let path1 = {
					pathname:'/dataList',
					query:{
						flag:'info',
					  	type:item.type
					}
				}
			let path2 = {
					pathname:'/details',
					query:{
						flag:'info',
					  	id:item.infoid,
					  	type:item.type
					}
				}
			return (
				<li key={index}>
					<p className='c_type'><Link to={path1}>{indexType[item.type]}</Link></p>
					<p className='c_article main-p'><Link to={path2}>{item.title}</Link></p>
				</li>
			)
		}):<div>数据加载中……</div>
		return (
			<div className='c_left wow slideInDown' data-wow-duration="1.5s">
				<div className='content_box_lbt'>
					<Carousel autoplay>
						<div className='lbt'><img src='http://p2.ycw.com/201706/16/41bc88e186585b693cf8cb48fbbeb9ba' /></div>
						<div className='lbt'><img src='http://p2.ycw.com/201706/12/e4a8fe6c2d83edcb75977db9dfed1af9' /></div>
						<div className='lbt'><img src='http://p1.ycw.com/share/201711/01/c70dd877b37b7275cc1f7a8e0358bee3_s600' /></div>
						<div className='lbt'><img src='http://p1.ycw.com/share/201711/01/191f370b0f3337ac8f940aa7a6a60b13_s200' /></div>
					</Carousel>
				</div>
				<div className='content_box'>
					<div className='c_tit'>
						<h2>最新资讯</h2>
						<Link to={`/petInfo`} target="_blank">更多>></Link>
					</div>
					<ul className='ul_art' style={{marginTop:'25px'}}>
						{content}
					</ul>
				</div>
			</div>
		)
	}
}