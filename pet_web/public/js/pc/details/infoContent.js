import React from 'react';
import common from "../common/common";
import {Button,notification} from 'antd';
export default class InfoContent extends React.Component{
	constructor(){
		super();
		this.state = {
			btnText:false
		}
	}
	componentDidMount(){
		if(localStorage.UID){
			let url = `/collection_list`;
			let body = `uid=${localStorage.UID}&infoid=${this.props.infoid}`;
			fetch(url,{
				method: 'POST',
	  			headers:{'Content-Type': 'application/x-www-form-urlencoded'},
	  			body:body
			}).then(response=>{return response.json()}).then(json=>{
				if(json.length){
					this.setState({
						btnText:true
					})
				}
			})
		}	
	}
	render(){
		var content = this.props.datas.length?this.props.datas[0].content:"暂无数据";
		var title = this.props.datas.length?this.props.datas[0].title:"暂无数据";
		var author = this.props.datas.length?this.props.datas[0].author:"暂无数据";
		var time = this.props.datas.length?this.props.datas[0].time:"暂无数据";
		return(
			<div>
				<div className='details_header'>
					<h1>{title}</h1>
					<p className="source">
                        <span className="icon-author">编辑：{author}</span>
                        <span className="icon-time">{time}</span>
                        <Button onClick={this._collection.bind(this)} style={{float:"right" }}>{this.state.btnText?"已收藏":"收藏"}</Button>
                    </p>
				</div>
				<div className='details_content'  dangerouslySetInnerHTML={{__html: content}} />
			</div>
		)
	}
	_collection(){
		if(localStorage.UID){
			let url = `/collection_list`;
			if(this.state.btnText){
				let body = `uid=${localStorage.UID}&infoid=${this.props.datas[0].infoid}&flag=del`;
				fetch(url,{
					method: 'POST',
		  			headers:{'Content-Type': 'application/x-www-form-urlencoded'},
		  			body:body
				}).then(response=>{return response.json()}).then(json=>{
					this.setState({
						btnText:false
					})
				})
			}else{
				let body = `uid=${localStorage.UID}&infoid=${this.props.datas[0].infoid}&flag=add&title=${this.props.datas[0].title}&time=${common.getDate()}`;
				fetch(url,{
					method: 'POST',
		  			headers:{'Content-Type': 'application/x-www-form-urlencoded'},
		  			body:body
				}).then(response=>{return response.json()}).then(json=>{
					this.setState({
						btnText:true
					})
				})
			}
		}else{
			notification.open({
			    message: '请先登录',
			    description: '点击网站左上角的狗掌图标',
			    duration:2
			});
		}
	}
}