import React from 'react';
import ReactDOM from 'react-dom';
import {
	Input,Form,Button,Tabs,Modal,message,Icon,
	Menu, Dropdown
} from 'antd';
const FormItem = Form.Item;
import 'antd/dist/antd.css';
class Admin extends React.Component{
	constructor(){
		super();
	}
	render(){
		const formItemLayout = {
		  labelCol: {
		    xs: { span: 24 },
		    sm: { span: 8 },
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
		// 获得表单元素
		let {getFieldDecorator} = this.props.form;
		return (
		<div className='bgbox'>
			<div className='loginBox'>
				<h1>请登录管理员帐号</h1>
				<Form onSubmit={this.handleSubmit.bind(this)}
					style={{position:"relative"}}
				>
			        <FormItem
						{...formItemLayout}
				        label={"用户名"}
				        hasFeedback
					>
			        	{getFieldDecorator("username", {})(
			        		<Input placeholder={"请输入帐号"} />
			        	)}
			        </FormItem>
			        <FormItem
						{...formItemLayout}
				        label={"密码"}
				        hasFeedback
					>
			        	{getFieldDecorator("password", {})(
			        		<Input placeholder={"请输入密码"} />
			        	)}
			        </FormItem>
			        <Button style={{display:"block",margin:"0 auto"}}
			        	 type="primary" htmlType="submit" >登录</Button>
				</Form>
			</div>
		</div>
		)
	}
	handleSubmit(){

	}
}
Admin = Form.create({})(Admin);
ReactDOM.render(<Admin />,document.querySelector("#adminwrap"));