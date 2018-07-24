import React from 'react';
import common from '../common/common';
import CommentUser from './commentUser';
export default class commentItem extends React.Component{
	constructor(){
		super();
		this.state = {
			datas:[]
		}
	}
	componentDidMount(){
		let url=`/comment_list`;
		let body = `infoid=${this.props.infoid}`
		fetch(url,{
			method: 'POST',
	      	headers:{'Content-Type': 'application/x-www-form-urlencoded'},
	      	body:body
	    }).then(res=>{return res.json()}).then(json=>{
	    	this.setState({
	    		datas:json
	    	})
	    })
	}
	render(){
		let list = this.state.datas.length?this.state.datas.map((item,index)=>{
			return (
				<CommentUser key={index} datas={item} index={index}/>
			)
		}):<div>暂无评论……</div>
		return (
			<ul className="list">
					{list}
			</ul>
		)
	}	
}
