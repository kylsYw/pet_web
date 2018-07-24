import React from 'react';
import {Rate,Breadcrumb,Carousel,Button} from "antd";
import { hashHistory,Link } from 'react-router';
// 自定义模块
import common from '../common/common';
let serverDatas1 = common.serverDatas1;//分类
export default class ContentItem extends React.Component{
	constructor(){
		super();
		this.state = {
			datas:[],
			showControl:false
		}
	}
	componentDidMount(){
		let url = "/serve/shop_serve";
		let body = `sid=${this.props.datas.sid}`;
		fetch(url,{
			method: 'POST',
	      	headers:{'Content-Type': 'application/x-www-form-urlencoded'},
	      	body:body
	      }).then(res=>{return res.json()}).then(json=>{
	      	this.setState({datas:json})
	      })
	}
	componentWillReceiveProps(nextProps){
		if(nextProps.datas.sid!=this.props.datas.sid){
			let url = "/serve/shop_serve";
			let body = `sid=${nextProps.datas.sid}`;
			fetch(url,{
				method: 'POST',
		      	headers:{'Content-Type': 'application/x-www-form-urlencoded'},
		      	body:body
		      }).then(res=>{return res.json()}).then(json=>{
		      	this.setState({datas:json})
		      })
		}
	}
	render(){
		let datas = this.props.datas;
		let path = {
			pathname:"/petDetails",
			query:{
				sid:datas.sid
			}
		}
		return (
			<li
				onMouseOver={()=>this.setState({showControl:true})}
				onMouseOut={()=>this.setState({showControl:false})}
			>
				<img onClick={this._imgClick.bind(this,datas)} src={datas.picUrl} />
				<div>
					{/*标题*/}
					<div><Link to={path} className="title">{datas.title}</Link></div>
					{/*底部*/}
					<div className="server_list_bottom">
						<div className="bottom_left">
							<div>
								<Rate allowHalf={true} disabled value={datas.score}/>
								<span className="ant-rate-text">1875人评价</span>
							</div>
							<p className="main-p">{datas.address}</p>
							<Breadcrumb>
							    <Breadcrumb.Item><a style={{fontSize:12}} href="">查看地图</a></Breadcrumb.Item>
							    <Breadcrumb.Item><a style={{fontSize:12}} href="">周边街景</a></Breadcrumb.Item>
							</Breadcrumb>
						</div>
						<div className="bottom_right">
							<Carousel ref="carousel" dots={false}>
								{this._createItem()}
							</Carousel>
							<img style={{display:this.state.showControl?"block":"none"}} onClick={this._prev.bind(this)}
								className="bottom_img" src="./images/prev.png" />
							<img style={{display:this.state.showControl?"block":"none",right:0}} onClick={this._next.bind(this)}
								className="bottom_img" src="./images/next.png" />
						</div>
					</div>
				</div>
			</li>
		)
	}
	_createItem(){
		if(this.state.datas.length){
			let path = {
				pathname:"/petDetails",
				query:{
					sid:this.props.datas.sid
				}
			}
			let datas = this.state.datas[0];
			let arr = [];
			let comment =0;
			for(let i in datas){
				{/*把非空数据push给arr*/}
				if(i!="sid"&&datas[i]){
					let temp = JSON.parse(datas[i]);
					arr.push(
				    	<Link to={path}>
				    		<h6 className="carousel_item_title">宠物{common.serverDatas1[i]}</h6>
				    		<Rate className="carousel_item_rate" allowHalf={true} disabled value={parseFloat(temp.score)}/>
				    		<div className="carousel_item_bottom">
				    			<em>¥{temp.price}</em><span>起/已售{temp.sale}</span>
				    		</div>
				    	</Link>
					)
				}
			}
			let content = [];
			let index=0;
			{/*根据arr长度来创建div*/}
			for(let num in arr){
				if(num%3==0){
					let i = parseInt(num);
					content.push(<div key={index} className="carousel_item">
						{arr[i]?arr[i]:[]}
						{arr[i+1]?arr[i+1]:[]}
						{arr[i+2]?arr[i+2]:[]}
						</div>)
					index++;
				}
			}
			return content;
		}else{
			return <div>商家暂无服务</div>
		}
	}
	_prev(){
		this.refs.carousel.refs.slick.innerSlider.slickPrev();
	}
	_next(){
		this.refs.carousel.refs.slick.innerSlider.slickNext();
	}
	_imgClick(datas){
		hashHistory.push({
			pathname:"/petDetails",
			query:{
				sid:datas.sid
			},
		})
	}
}