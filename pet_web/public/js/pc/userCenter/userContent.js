import React from 'react';
import {Row,Col,Form,Input,Icon,Button} from 'antd';
import common from '../common/common';
const FormItem = Form.Item;
let userInfoList = common.userInfoList;
class UserContent extends React.Component{
	constructor(){
		super();
		this.state = {
			isUpdata:false
		}
	}
	render(){
		let {getFieldDecorator} = this.props.form;
		const formItemLayout = {
		  labelCol: {
		    xs: { span: 24 },
		    sm: { span: 6 },
		  },
		  wrapperCol: {
		    xs: { span: 24 },
		    sm: { span: 14 },
		  },
		};
		const tailFormItemLayout = {
	      wrapperCol: {
	        xs: {
	          span: 24,
	          offset: 0,
	        },
	        sm: {
	          span: 14,
	          offset: 6,
	        },
	      },
	    };
		let datas = this.props.datas;
		let userName = datas.name;
		let content;
		let list=[];
		let listIndex=0;
		let form_item = [];
		if(datas.length==undefined){
			if(this.state.isUpdata){
				for(let i in userInfoList){
					let wow = "wow bounceInLeft";
					if(listIndex%2!=0){
						wow = "wow bounceInRight";
					}
					if(i!="username"){
						form_item.push(
							<FormItem key={listIndex}
								className={wow}
								{...formItemLayout}
						        label={userInfoList[i]}
						        hasFeedback
							>
					        	{getFieldDecorator(i, {})(
					        		<Input placeholder={"默认为："+this.props.datas[i]} />
					        	)}
					        </FormItem>
						)
						listIndex++;
					}
				}
				list = (
				<Form onSubmit={this.handleSubmit.bind(this)}>
			        {form_item}
			        <FormItem {...tailFormItemLayout}>
			        <Button type="primary" htmlType="submit" >确认修改</Button>
			        </FormItem>
				</Form>
				)
			}else{
				for(let i in userInfoList){
					let wow = "wow bounceInLeft";
					if(listIndex%2!=0){
						wow = "wow bounceInRight";
					}
					list.push(
						<li key={listIndex} className={wow}
							data-wow-duration="1.5s"
						>
							<span className="span1 fl">{userInfoList[i]}</span>
							<span className="span2 fl">{datas[i]}</span>
						</li>
					)
					listIndex++;
				}
			}
			content=<div style={{marginTop:20}} className='content_box'>
				<div className='c_tit'>
					<h2>个人信息</h2>
					<a onClick={this._updata.bind(this)}>修改数据</a>
				</div>
				<ul className="userInfo">
					{list}
				</ul>
			</div>
		}else{
			content=[];
		}
		return (
			<div className="user-content">
				{content}
			</div>
		)
	}
	_updata(){
		let newIsUpdata = !this.state.isUpdata;
		this.setState({
			isUpdata:newIsUpdata
		})
	}
	handleSubmit(e){
		e.preventDefault();
		this.props.form.validateFields((err,values)=>{
			if(err){
				console.log(err)
			}else{
				let obj = {"name":"","pname":"","udesc":"","phone":"","QQ":"",
							"address":"","sex":"","age":"",
				}
				for(let i in values){
					obj[i]=values[i]
				}
				let url = "/user_list";
				let body="uid="+localStorage.UID+
						"&updata=1"+
						"&name="+(obj.name?obj.name:this.props.datas.name)+
						"&pname="+(obj.pname?obj.pname:this.props.datas.pname)+
						"&udesc="+(obj.udesc?obj.udesc:this.props.datas.udesc)+
						"&phone="+(obj.phone?obj.phone:this.props.datas.phone)+
						"&QQ="+(obj.QQ?obj.QQ:this.props.datas.QQ)+
						"&address="+(obj.address?obj.address:this.props.datas.address)+
						"&sex="+(obj.sex?obj.sex:this.props.datas.sex)+
						"&age="+(obj.age?obj.age:this.props.datas.age);
				fetch(url,{
					method: 'POST',
	      			headers:{'Content-Type': 'application/x-www-form-urlencoded'},
	      			body:body
				}).then(response=>{
					window.location.reload()
				})
			}
		})
	}
}
export default UserContent = Form.create({})(UserContent);
