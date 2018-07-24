import React from 'react';
import {
	Row,Col,Input,Form,Button,Tabs,Modal,message,Icon,
	Menu, Dropdown
} from 'antd';
import  {Link} from 'react-router';
import common from "./common/common";
let navDatas = common.navDatas;
let comment_path = {
   	pathname:'/dataList',
	query:{
		flag:'comment'
	}
}
let collection_path = {
   	pathname:'/dataList',
	query:{
		flag:'collection'
	}
}
let answer_path = {
   	pathname:'/dataList',
	query:{
		flag:'answer'
	}
}
const Search = Input.Search;
const FormItem = Form.Item;
const TabPane = Tabs.TabPane;
class Header extends React.Component{
	constructor(){
		super();
		this.state = {
			isLogin:localStorage.UID?true:false,
			visible:false,
			lor:'login',
			imgSrc:'',
			name:""
		}
	}
	componentDidMount(){
		this._fetch();
	}
	render(){
		// 导航栏
		let navList = navDatas.map((item,index)=>{
			let bgc = localStorage.indicator == index?"#d71a0f":"none"
			return (
				<Link key={index} to={item.path}>
					<span style={{backgroundColor:bgc}}>{item.title}</span>
				</Link>
			)
		})
		//用户下拉菜单
		const menu = (
			<Menu>
			    <Menu.Item key="0">
			    	<Link target="_blank" to="/userCenter"><span>{this.state.name}</span></Link>
			    </Menu.Item>
			    <Menu.Item key="1">
			    	<Link target="_blank" to={answer_path}><span>我的帖子</span></Link>
			    </Menu.Item>
			    <Menu.Item key="2">
			    	<Link target="_blank" to={comment_path}><span>我的评论</span></Link>
			    </Menu.Item>
			    <Menu.Item key="3">
			    	<Link target="_blank" to={collection_path}><span>我的收藏</span></Link>
			    </Menu.Item>
			    <Menu.Item key="4">
			    	<a><span onClick={this.loginOut.bind(this)}>退出登录</span></a>
			    </Menu.Item>
  			</Menu>
		)
  		// 获得表单元素
		let {getFieldDecorator} = this.props.form;
		let img = <img src={this.state.imgSrc?this.state.imgSrc:"./images/user_icon.png"}/>;
		let login_box_content = this.state.isLogin?
		(	
			<Dropdown overlay={menu}  placement='bottomCenter'>
				<div className="user_img">{img}</div>
			</Dropdown>
		):(<div className="user_img">
			<img onClick={this.loginOrRegist.bind(this)} src='./images/login.png' />
		</div>)
		return (
			<div className='header'>
				{/*上半部分*/}
				<div className='h_top'>
					<Row>
						<Col span={1}>
						</Col>
						<Col span={3}>
							<div className='logo1 wow zoomIn'>
								<a href='index.html'></a>
							</div>
						</Col>
						<Col span={10}>
							<div className='logo2 wow slideInRight' >
								<img src='./images/logo2.jpg' />
							</div>
						</Col>
						<Col span={9}>
							{/*登录注册搜索*/}
							<div className='search_login'>
								<Search
								    placeholder="输入要搜索的内容"
								    style={{ width: 400 }}
								    onSearch={this._search.bind(this)}
								/>
								<div className="login_box">
									{login_box_content}
								</div>
							</div>
						</Col>
						<Col span={1}></Col>
					</Row>
					<Modal width={450}
			          title="欢迎来到Kyls的网站"
			          visible={this.state.visible}
			          onCancel={this.cancel.bind(this)}
			          footer="欢迎来到Kyls的网站"
			        >
			        	<Tabs type="card" onChange={this.tabsChange.bind(this)}>
			        		{/*登录*/}
						    <TabPane tab="登录" key="1">
						    	<Form onSubmit={this.handleSubmit.bind(this)}>
							        <FormItem>
							        	{getFieldDecorator('userName', {})(
							        	  <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="请输入用户名" />
							        	)}
							        </FormItem>
							        <FormItem>
							      		{getFieldDecorator('password', {})(
							           		<Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="请输入密码" />
							           	)}
						 	        </FormItem>
							        <Button type="primary" htmlType="submit" >登录</Button>
    							</Form>
						    </TabPane>
							{/*注册*/}
						    <TabPane tab="注册" key="2">
						    	<Form onSubmit={this.handleSubmit.bind(this)}>
							        <FormItem>
							        	{getFieldDecorator('userName', {})(
							        	  <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="请输入用户名" />
							        	)}
							        </FormItem>
							        <FormItem>
							      		{getFieldDecorator('password', {})(
							           		<Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="请输入密码" />
							           	)}
						 	        </FormItem>
						 	        <FormItem>
							      		{getFieldDecorator('c_password', {})(
							           		<Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="请再次输入密码" />
							           	)}
						 	        </FormItem>
						 	        <FormItem>
							        	{getFieldDecorator('name', {})(
							        	  <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="请输入昵称" />
							        	)}
							        </FormItem>
							        <Button type="primary" htmlType="submit">
							            注册
							        </Button>
    							</Form>
						    </TabPane>
						</Tabs>
			        </Modal>
				</div>
				{/*导航条*/}
				<div className='h_bottom'>
					<Row>
						<Col span={1}></Col>
						<Col span={22}>
							<nav>
								{navList}
							</nav>
						</Col>
						<Col span={1}>
						</Col>
					</Row>
				</div>
			</div>
		)
	}
	// 弹出登录注册框
	loginOrRegist(){
		this.setVisible(true);
	}
	//取消登录注册框
	cancel(){
		this.setVisible(false)
		message.config({
			top: 100,
			duration: 2,
		});
		message.info("取消操作");
	}
	// 用户登出
	loginOut(){
		localStorage.UID='';
		this.setState({
			isLogin:false
		})
		message.warn("退出登录");
		setTimeout(function(){
			window.location.reload()
		}, 100)
	}
	// 表单提交
	handleSubmit(e){
		let url=`/user_list`;
		e.preventDefault();
		this.props.form.validateFields((err,values)=>{
			if(err){
				console.log(err)
			}else{
				let userName = values.userName;
		      	let password = values.password;
		      	let c_password = values.c_password;
		      	let name = values.name;
		      	// 判断登录或者注册
		      	if(this.state.lor=='login'){
		      		fetch(url,{
		      			method: 'POST',
		      			headers:{'Content-Type': 'application/x-www-form-urlencoded'},
		      			body:`type=login&username=${userName}&password=${password}`,
		      		}).then(response=>{return response.json()}).then(json=>{
		      			if(json.length){
		      				localStorage.UID=json[0].uid
			      			message.success("登录成功");
		      				setTimeout(function(){
								window.location.reload()
							}, 100)
			      			this.setVisible(false);
				      		this.setState({
				      			isLogin:true
				      		})
				      		this._fetch();
		      			}else{
		      				message.warn("帐号或者密码错误");
		      			}
		      		})
		      	}else{
		      		if(userName&&password&&c_password&&name){
		      			if(password==c_password){
		      				fetch(url,{
				      			method: 'POST',
				      			headers:{'Content-Type': 'application/x-www-form-urlencoded'},
				      			body:`search=1&username=${userName}`,
				      		}).then(res=>{return res.json()}).then(json=>{
				      			if(json.length){
				      				message.warn("用户名已存在，请重试");
				      			}else{
				      				this.setVisible(false);
				      				fetch(url,{
				      					method: 'POST',
				      					headers:{'Content-Type': 'application/x-www-form-urlencoded'},
				      					body:`type=regist&username=${userName}&password=${password}&name=${name}`,
				      				}).then(response=>{return response.json()}).then(json=>{
				      					message.success("注册成功");
				      				})
				      			}
				      		})

		      			}else{
		      				message.warn("密码不一致");
		      			}
		      		}else{
		      			message.warn("内容不能为空");
		      		}
		      	}
		    
			}
		})
	}
	//标签切换
	tabsChange(key){
		this.setState({
			lor:(key==1)?'login':'regist'
		})
	}
	setVisible(visible){
		this.setState({
			visible:visible		
		})
	}
	// 搜索
	_search(value){
		if(value!=''){
			window.open(`/#/dataList?value=${value}&flag=search`);
		}
	}
	_fetch(){
		if(this.state.isLogin){
			let url="/user_list";
			let body=`uid=${localStorage.UID}`;
			fetch(url,{
				method: 'POST',
		      	headers:{'Content-Type': 'application/x-www-form-urlencoded'},
		      	body:body
			}).then(response=>{return response.json()}).then(json=>{
				if(json.length>0){
					this.setState({
						imgSrc:json[0].picUrl,
						name:json[0].name
					})
				}
			})
		}
	}
}
export default Header = Form.create({})(Header);
