import React from 'react';
import {Row,Col,Rate,Breadcrumb,Collapse,InputNumber,Button} from 'antd';
const Panel = Collapse.Panel;
// 自定义模块
import Header from '../header';
import Footer from '../footer';
import ServerContent from './ServerContent';
import common from '../common/common';
let serverDatas1 = common.serverDatas1;//分类
export default class PetDetails extends React.Component{
	constructor(){
		super();
		this.state = {
			shopDatas:[],
			serveDatas:[]
		}
	}
	componentWillMount(){
		localStorage.indicator = 6;
	}
	componentDidMount(){
		let url = "/serve/shop";
		let body = `sid=${this.props.location.query.sid}`;
		fetch(url,{
			method: 'POST',
	      	headers:{'Content-Type': 'application/x-www-form-urlencoded'},
	      	body:body
	    }).then(res=>{return res.json()}).then(json=>{
	      	this.setState({shopDatas:json})
	    })
	    let url2 = "/serve/shop_serve";
	    fetch(url2,{
			method: 'POST',
	      	headers:{'Content-Type': 'application/x-www-form-urlencoded'},
	      	body:body
	    }).then(res=>{return res.json()}).then(json=>{
	      	this.setState({serveDatas:json})
	    })
	}
	render(){
		return (
			<div className="petDetails">
				{/*头部模块*/}
				<Header />
				{/*内容模块*/}
				<Row>
					<Col span = {1}></Col>
					<Col span = {22}>
						{this.state.shopDatas.length?(
							<div className='content_box' style={{marginTop:20}}>
							<img className="petDetails_topImg" src={this.state.shopDatas[0].picUrl} />
							<div className="petDetails_topBox">
								<h1>{this.state.shopDatas[0].title}</h1>
								<Rate allowHalf={true} disabled value={this.state.shopDatas[0].score}/>
								<span className="ant-rate-text">7855条评论</span>
								<p>地&emsp;&emsp;址：{this.state.shopDatas[0].address}</p>
								<Breadcrumb>
									<Breadcrumb.Item><a>查看地图</a></Breadcrumb.Item>
    								<Breadcrumb.Item><a>周边街景</a></Breadcrumb.Item>
								</Breadcrumb>
								<p>电&emsp;&emsp;话：{this.state.shopDatas[0].phone}</p>
								<p>营业时间：{this.state.shopDatas[0].time}</p>
								<p>停&emsp;&emsp;车：有免费停车位</p>
								<p>网&emsp;&emsp;络：免费wifi</p>
							</div>
						</div>
						):"数据请求中……"}
						<Row style={{marginTop:20}}>
							<Col span = {17}>
								<div className='content_box serve_details_bottom'>
									<div className="c_tit" style={{marginBottom:20}}>
										<h2>商家服务</h2>
									</div>
									<Collapse bordered={false}>
										{this._create(this.state.serveDatas)}
									</Collapse>
								</div>
							</Col>
							<Col span = {7}>
								<div style={{marginLeft:20}} className='content_box'>
									<img src="./images/ditu.png" />
								</div>
							</Col>
						</Row>
					</Col>
					<Col span={1}></Col>
				</Row>
				{/*底部模块*/}
				<Footer />
			</div>
		)
	}
	_create(obj){
		let content = [];
		console.log(obj)
		if(obj.length){
			let index = 0 ;
			for(let i in obj[0]){
				if(obj[0][i]&&i!="sid"){
					console.log(index,obj[0][i])
					let data = JSON.parse(obj[0][i])
					content.push(
						<Panel header={serverDatas1[i]} key={index} className="customPanelStyle">
					      	<div className="bottom">
					      		<div>
					      			<span className="bottom_title">评&emsp;&emsp;分：</span>
					      			<Rate className="server_details_rate" allowHalf={true} disabled value={parseFloat(data.score)}/>
					      		</div>
					      		<div>
					      			<span className="bottom_title">已&emsp;&emsp;售：</span><span>{data.sale}</span>
					      		</div>
								<div><span className="bottom_title">套&emsp;&emsp;餐：</span><span className="box active">套餐1</span></div>
								<div>
					      			<span className="bottom_title">单&emsp;&emsp;价：</span><em>￥{data.price}</em>
					      		</div>
								<div>
					      			<span className="bottom_title">数&emsp;&emsp;量：</span><InputNumber min={1} max={10} defaultValue={0} />
					      		</div>
					      		<div><sapn onClick={()=>alert("现已加入肯德基豪华午餐")} className="addTo">添加到卡包</sapn></div>
							</div>
					    </Panel>
					)
					index++;
				}
			}
		}
		return content;
	}
}