import React from 'react';
import {Row,Col,Divider,Pagination} from 'antd';
// 自定义模块
import ContentItem from './contentItem';

export default class PetServer extends React.Component{
	constructor(){
		super();
		this.state = {
			current:1,
			datas:[],
			total:20
		}
	}
	componentDidMount(){
		this._fetch(this.props.type2)
	}
	componentWillReceiveProps(nextProps){
		if(nextProps.type == "all"&&nextProps.type2 == "全部"){
			this._fetch(nextProps.type2)
			this.setState({total:20})
		}else{
			if(nextProps.type == "all"){
				let url = "/serve/shop";
				let body = "type="+nextProps.type2;
				fetch(url,{
					method: 'POST',
			      	headers:{'Content-Type': 'application/x-www-form-urlencoded'},
			      	body:body
			    }).then(res=>{return res.json()}).then(json=>{
			    	console.log(json)
			    	this.setState({datas:json,total:json.length})
			    })
			}else{
				let url = "/serve/shop_serve";
				let body = "type="+nextProps.type;
				fetch(url,{
					method: 'POST',
			      	headers:{'Content-Type': 'application/x-www-form-urlencoded'},
			      	body:body
			    }).then(res=>{return res.json()}).then(json=>{
			      	if(json.length){
			      		let arr=[];
			      		json.map((item,index)=>{
			      			let url = "/serve/shop";
							let body = "sid="+item.sid;
							fetch(url,{
								method: 'POST',
						      	headers:{'Content-Type': 'application/x-www-form-urlencoded'},
						      	body:body
						      }).then(res=>{return res.json()}).then(json=>{
						      	if(json.length){
						      		if(nextProps.type2=="全部"){
							      		arr.push(json[0]);
						      		}else{
						      			if(json[0].area==nextProps.type2){
						      				arr.push(json[0]);
						      				console.log(arr)
							      		}
						      		}
							      	this.setState({datas:arr,total:arr.length?arr.length:10})
						      	}else{
						      		this.setState({datas:[],total:10})
						      	}
						    })
			      		})
			      	}
			    })
			}
		}
	}
	render(){
		return (
			<div className="server_content">
				<div className='content_box' style={{marginTop:20}}>
					{/*排序*/}
					<div className="sort">
						<span style={{lineHeight:"26px",color:"#666"}}>排序：</span>
						<span ref="span0" onClick={this.itemclick.bind(this,"span0")} className="sort_item sort_item_active">综合排序</span>
						<span ref="span1" onClick={this.itemclick.bind(this,"span1")} className="sort_item">销量↓</span>
						<span ref="span2" onClick={this.itemclick.bind(this,"span2")} className="sort_item">评价↑</span>
					</div>
					<ul className="server_list">
						{this.state.datas.length?this.state.datas.map((item,index)=>{
							return <ContentItem key={index} datas={item} />
						}):"暂无商家数据"}
					</ul>
					<div style={{
						display:"flex",justifyContent:"center",paddingTop:20,
						borderTop:"1px solid #eee"
					}}>
						<Pagination current={this.state.current} onChange={this._pagination.bind(this)} total={this.state.total} />
					</div>
				</div>
			</div>
		)
	}
	_pagination(page){
		// console.log(page)
		this.setState({current:page})
	}
	_fetch(type){
		let str = type=="全部"?"":"&type="+type;
		let url = "/serve/shop";
		let body = "num=0"+str;
		fetch(url,{
			method: 'POST',
	      	headers:{'Content-Type': 'application/x-www-form-urlencoded'},
	      	body:body
	      }).then(res=>{return res.json()}).then(json=>{
	      	this.setState({datas:json})
	    })
	}
	itemclick(span){
		for(var i = 0;i<3;i++){
			let temp = "span"+i;
			this.refs[temp].className='sort_item';
		}
		this.refs[span].className='sort_item sort_item_active';
	}
}