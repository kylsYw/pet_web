import React from 'react';
import Header from '../header';
import Footer from '../footer';
import UserContent from './userContent';
import UserHeader from './userHeader';

import { Row,Col } from 'antd';
export default class Usercenter extends React.Component{
	constructor(){
		super();
		this.state = {
			userDatas:[]
		}
	}
	componentWillMount(){
		this._fetch();
		localStorage.indicator = null;
	}
	render(){
		return (
			<div>
				{/*头部模块*/}
				<Header reload={this._reload.bind(this)}/>
				{/*内容模块*/}
				<Row className="user-center">
					<Col span={3}></Col>
					<Col span={18}>
						<UserHeader datas={this.state.userDatas}/>
						<UserContent datas={this.state.userDatas}/>
					</Col>
					<Col span={3}></Col>
				</Row>
				{/*底部模块*/}
				<Footer />
			</div>
		)
	}
	_reload(flag){
		if(flag){
			this._fetch();
		}else{
			this.setState({
				userDatas:[]
			})
		}
	}
	_fetch(){
		let url="/user_list";
		let body=`uid=${localStorage.UID}`;
		fetch(url,{
			method: 'POST',
	      	headers:{'Content-Type': 'application/x-www-form-urlencoded'},
	      	body:body
		}).then(response=>{return response.json()}).then(json=>{
			if(json.length>0){
				this.setState({
					userDatas:json[0]
				})
			}
		})
	}
}
