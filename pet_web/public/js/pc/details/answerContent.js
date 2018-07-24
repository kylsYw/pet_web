import React from 'react';
import common from '../common/common';
import { Pagination,Button,Modal,
	Input,Form,Icon,message,Popconfirm} from 'antd';
const FormItem = Form.Item;
const { TextArea } = Input;
import { hashHistory } from 'react-router';
//引入评论模块
import CommentItem from './commentItem';

class answerContent extends React.Component{
	constructor(){
		super();
		this.state = {
			visible:false,
			visible2:false,
			isLoading:false,
			isLoading2:false,
			datas:[],//文章信息
			userDatas:[],//文章的用户数据
			flag:false
		}
	}
	componentDidMount(){
		this._fetch();
	}
	render(){
		let content = [];
		let list = [];
		let userList = [];
		const { getFieldDecorator } = this.props.form;
		let datas = this.state.datas;
		let userDatas = this.state.userDatas;
		let userImg = userDatas.picUrl?userDatas.picUrl:"./images/user_icon.png";
		content = datas.length!=0?(
			<div className="d_answer">
				<div className='details_header'>
					<h1>标题：{datas.title}<p style={{position:"absolute",right:0,bottom:0}}>
						<span style={{
							color:"#999",
							fontSize:10,
							marginRight:20
						}} onClick={this._edit.bind(this)}>{this.state.flag?"编辑":""}</span>
						<Popconfirm title="确定要删除?" onConfirm={this.pconfirm.bind(this)} okText="Yes" cancelText="No">
							<span style={{
								color:"#999",
								fontSize:10,
							}}>{this.state.flag?"删除":""}</span>
						</Popconfirm>
					</p></h1>
					<p className="answer_source">
						<img src={userImg} />
                        <span className="author">{userDatas.name}</span>
                        <span className="icon-time">{datas.time}</span>
                    </p>
				</div>
				<div className="details_content">
					<p>{datas.content}</p>
					<span onClick={this._public.bind(this)} className="comment">发表评论</span>
				</div>
				<h3 className="doctor_title">全部回答<em></em></h3>
				{/*评论模块*/}
				<CommentItem infoid={datas.infoid}/>
			</div>
		):<div>数据加载中……</div>
		return(
			<div>
				{content}
				<Modal title="请输入内容"
		       	  visible={this.state.visible}
		       	  onOk={this._handleOk.bind(this)}
		       	  confirmLoading={this.state.isLoading}
		       	  onCancel={this._handleCancel.bind(this)}
		       	>
		       	    <Form onSubmit={this.handleSubmit.bind(this)}>
						<FormItem>
						{getFieldDecorator('content', {})(
						   		<TextArea  placeholder="请输入内容" autosize={{minRows: 2, maxRows: 6}}/>
						   	)}
						</FormItem>
    				</Form>
		       	</Modal>
		       	<Modal title="请输入内容"
		       	  visible={this.state.visible2}
		       	  onOk={this._handleOk2.bind(this)}
		       	  confirmLoading={this.state.isLoading2}
		       	  onCancel={this._handleCancel2.bind(this)}
		       	>
		       	    <Form onSubmit={this.handleSubmit2.bind(this)}>
		       	    	<FormItem>
						{getFieldDecorator('title', {})(
							<Input placeholder="请输入标题" />
						   	)}
						</FormItem>
						<FormItem>
						{getFieldDecorator('content', {})(
						   		<TextArea  placeholder="请输入内容" autosize={{minRows: 2, maxRows: 6}}/>
						   	)}
						</FormItem>
    				</Form>
		       	</Modal>
			</div>
		)
	}
	_handleOk(e){
		this.setState({
			isLoading:true
		})
		this.handleSubmit(e);
	}
	_handleOk2(e){
		this.setState({
			isLoading2:true
		})
		this.handleSubmit2(e);
	}
	_handleCancel(){
		this.setState({
			visible:false
		})
	}
	_handleCancel2(){
		this.setState({
			visible2:false
		})
	}
	//发表评论
	handleSubmit(e){
		e.preventDefault();
		this.props.form.validateFields((err,values)=>{
			let content=values.content;
			if(content){
				let datas=this.state.datas;
				let time=common.getDate();
				let picUrl=this.state.userDatas.picUrl;
				let username=this.state.userDatas.name;
				let uid=localStorage.UID;
				let infoid = datas.infoid;
				let url="/comment_list";
				let body=`infoid=${infoid}&content=${content}&time=${time}&uid=${uid}`;
				fetch(url,{
					method: 'POST',
			      	headers:{'Content-Type': 'application/x-www-form-urlencoded'},
			      	body:body
			     })
				.then(response=>{return response.json()}).then(json=>{
					if(json){
						this.setState({
							isLoading:false,
							visible:false
						})
						setTimeout(()=>{window.location.reload()}, 500)
					}
			     })
			}else{
				message.info("请输入内容");
				this.setState({
					isLoading:false
				})
			}
		})
	}
	//编辑内容
	handleSubmit2(e){
		e.preventDefault();
		this.props.form.validateFields((err,values)=>{
			let title = values.title&&values.title!=" "?values.title:this.state.datas.title;
			let content = values.content&&values.content!=" "?values.content:this.state.datas.content;
			let url = "/article_list";
			let str = `?flag=1&title=${title}&content=${content}&infoid=${this.state.datas.infoid}`;
			fetch(url+str).then(response=>{return response.json()}).then(json=>{
				this.setState({
					isLoading2:false,
					visible2:false
				})
				setTimeout(()=>{window.location.reload()}, 500)
			})
		})
	}
	_public(){
		if(localStorage.UID){
			this.setState({
				visible:true
			})
		}else{
			alert("请先登录")
		}
	}
	_fetch(){
		let url=`/article_list?infoid=${this.props.infoid}`;
		fetch(url).then(response=>{return response.json()}).then(json=>{
			if(json.length>0){
				this.setState({
					datas:json[0]
				})
			    let url_2=`/user_list`;
				let body_2 = `uid=${json[0].uid}`;
				fetch(url_2,{
					method: 'POST',
			      	headers:{'Content-Type': 'application/x-www-form-urlencoded'},
			      	body:body_2
			    }).then(res=>{return res.json()}).then(json=>{
		      		if(json.length){
		      			this.setState({
		      				userDatas:json[0]
		      			})
		      			if(json[0].uid==localStorage.UID){
		      				this.setState({
		      					flag:true
		      				})
		      			}
		      		}
			    })
			}
		})
	}
	// 编辑
	_edit(){
		this.setState({
			visible2:true
		})
	}
	// 删除
	pconfirm(){
		let url="/article_list";
		let str = `?flag=2&infoid=${this.state.datas.infoid}`;
		fetch(url+str).then(response=>{return response.json()})
		.then(json=>{
			hashHistory.push(`/petAnswer`)
		})
	}
}
export default answerContent = Form.create({})(answerContent);