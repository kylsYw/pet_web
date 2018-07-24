import React from 'react';
import common from '../common/common';
export default class CommentUser extends React.Component{
	constructor(){
		super();
		this.state = {
			datas:[]//用户数据
		}
	}
	componentDidMount(){
		let url = `/user_list`;
		fetch(url,{
			method: 'POST',
	      	headers:{'Content-Type': 'application/x-www-form-urlencoded'},
	      	body:`uid=${this.props.datas.uid}`
	    }).then(res=>{return res.json()}).then(json=>{
	    	this.setState({
	    		datas:json
	    	})
	    })
	}
	render(){
		let content = <div>努力加载中……</div>;
		if(this.state.datas.length){
			let datas = this.state.datas[0];
			content = (
				<div>
					<img style={{float:"left"}} src={datas.picUrl?datas.picUrl:"./images/user_icon.png"} />
					<p className="username">{datas.name}
						<span style={{float:"right",color:"#999"}}>{this.props.index+1}楼</span>
					</p>
					<p className="content">{this.props.datas.content}</p>
					<span className="icon-time" style={{margin:0,float:"right"}}>{this.props.datas.time}</span>
				</div>
			)
		}
		return (
			<li>{content}</li>
		)
	}	
}
