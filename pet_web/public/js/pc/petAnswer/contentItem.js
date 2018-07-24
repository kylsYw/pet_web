import React from 'react';
import common from '../common/common';
import { } from 'antd';
import  {Link} from 'react-router';

export default class ContentItem extends React.Component{
	constructor(){
		super();
		this.state = {
			datas:[],
			totle:0
		}
	}
	componentDidMount(){
		let url = "/user_list";
		let body = `uid=${this.props.datas.uid}`
		fetch(url,{
			method: 'POST',
			headers:{'Content-Type': 'application/x-www-form-urlencoded'},
			body:body,
		}).then(res=>{return res.json()}).then(json=>{
			if(json.length){
				this.setState({
					datas:json[0]
				})
			}
		})
		let url2 = "/comment_list";
		let body2= "infoid="+this.props.datas.infoid;
		fetch(url2,{
			method: 'POST',
  			headers:{'Content-Type': 'application/x-www-form-urlencoded'},
  			body:body2,
		}).then(res=>{return res.json()}).then(json=>{
			this.setState({
				totle:json.length
			})
		})
	}
	render(){
		let content = <div>暂无数据</div>;
		if(this.state.datas){
			let datas= this.state.datas;
			let path = {
			  pathname:'/details',
			  query:{
			  	flag:'answer',
			  	id:this.props.datas.infoid
			  }
			}
			content=(
				<div>
					<p className="photos">
						<img src={datas.picUrl} />
					</p>
					<h3 className="title"><Link to={path}>{this.props.datas.title}</Link></h3>
					<p className="summary">{datas.name}</p>
					<em className="icon-time">{this.props.datas.time}</em>
					<em className="icon-bubble">{this.state.totle}</em>
				</div>
			)
		}
		return (
			<li className="wow zoomInLeft" data-wow-duration="1.5s">
				{content}
			</li>
		)
	}
}