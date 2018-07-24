import React from 'react';
import common from '../common/common';
import ContentItem from './contentItem';
import { Pagination,Button,Modal,notification,
		Input,Form,Icon,message,Select} from 'antd';
import  {Link} from 'react-router';
const InputGroup = Input.Group;
const FormItem = Form.Item;
const { TextArea } = Input;
const Option = Select.Option;
var types=common.answerDatas.types;
var title=common.answerDatas.title;
class PetAnswer_content extends React.Component{
	constructor(){
		super();
		this.state={
			currentIndex:0,
			datas:[],
			visible:false,
			isLoading:false,
			type:types[0],
			pageNum:1,
			total:0,
			prevDatas:[]
		}
	}
	componentDidMount(){
		this._isMounted = true;
		let url="/article_list";
		let body=`num=${(this.state.pageNum-1)*10}&type=${types[this.state.currentIndex]}`;
		this._answerFetch(url,body);
	}
	componentWillUnmount(){
		this._isMounted = false;
	}
	render(){
		//表单组件所需要的
		const { getFieldDecorator } = this.props.form;
		//下拉菜单
		let options=types.map((item,index)=>{
			return (
				<Option key={index} value={item}>{title[index]}</Option>
			)
		});
		let content=[];//选择类型的导航条
		content=types.map((item,index)=>{
			let bgc=index==this.state.currentIndex?"#f2473d":"#fff";
			let color=index==this.state.currentIndex?"#fff":"#000";
			return (
				<li key={index}
					style={{backgroundColor:bgc,color:color}}
					onClick={this._change.bind(this,index)}
				>
					{title[index]}
				</li>
			)
		})
		let list;//调用子组件
		if(this.state.datas!=this.state.prevDatas){
			list=this.state.datas.map((item,index)=>{
				return(
					<ContentItem key={index}  datas={item}/>
				)
			})
		}else{
			list = <div>暂无数据……</div>
		}
		return (
			<div className="answer wow fadeIn">
				<div style={{position:"relative"}}>
				{/*类型导航条*/}
					<ul className="answer_ul">
						{content}
					</ul>
					<Button type="primary" style={{
						position:"absolute",
						top:"7px",
						right:"10px",
					}} onClick={this._publish.bind(this)}>
			          发表帖子
			        </Button>
				</div>
				<div className="content_box" style={{padding:"0 20px 20px 20px"}}>
				{/*帖子列表*/}
					<ul className="answer_list">
						{list}
					</ul>
					<div className="pagination-box">
						<Pagination current={this.state.pageNum} 
							pageSize={10}
							total={this.state.total}  
							onChange={this._onChange.bind(this)} />
					</div>
				</div>

				{/*表单等第三方组件*/}
				<Modal title="请输入帖子内容"
		          visible={this.state.visible}
		          confirmLoading={this.state.isLoading}
		          onOk={this._handleOk.bind(this)}
		          onCancel={this._handleCancel.bind(this)}
		        >
		            <Form onSubmit={this.handleSubmit.bind(this)}>
						<FormItem>
							{getFieldDecorator('title', {})(
							  <Input placeholder="请输入文章标题" />
							)}
						</FormItem>
						<FormItem>
						{getFieldDecorator('content', {})(
						   		<TextArea  placeholder="请输入内容" autosize={{minRows: 2, maxRows: 6}}/>
						   	)}
						</FormItem>
						<FormItem>
								类型：
						        <Select defaultValue={this.state.type} 
						        onChange={this._selectChange.bind(this)}
						        style={{width:"15%"}}
						        >
						        	{options}
						        </Select>
						</FormItem>
    				</Form>
		        </Modal>
			</div>
		)
	}
	_change(index){
		this.setState({
			currentIndex:index,
			pageNum:1
		})
		let body=`num=0&type=${types[index]}`;
		let url="/article_list";
		this._answerFetch(url,body)
		this._getTotal(index);
	}
	_onChange(pageNumber){
		this.setState({
			pageNum:pageNumber
		})
		let body=`num=${(pageNumber-1)*10}&type=${types[this.state.currentIndex]}`;
		this._answerFetch("/article_list",body)
	}
	// 发表帖子按钮
	_publish(){
		if(localStorage.UID){
			this.setState({
				visible:true
			})
		}else{
			notification.open({
			    message: '请先登录',
			    description: '点击网站左上角的狗掌图标',
			    duration:2
			});
		}
	}
	_handleOk(){
		this.handleSubmit();
	}
	_handleCancel(){
		this.setState({
			visible:false
		})
	}
	_selectChange(value){
		this.setState({
			type:value
		})
	}
	// 表单提交
	handleSubmit(e){
		// e.preventDefault();
		this.props.form.validateFields((err,values)=>{
			if(err){
				console.log(err);
			}else{
				let url="/user_list";
				let title=values.title;
				let content=values.content;
				let type=this.state.type;
				let time=common.getDate();
				if(title&&content){
					this.setState({
						isLoading:true
					})
					fetch(url,{
			  			method: 'POST',
			  			headers:{'Content-Type': 'application/x-www-form-urlencoded'},
			  			body:`uid=${localStorage.UID}`,
			  		}).then(response=>{return response.json()}).then(json=>{
			  			if(json.length>0){
			  				let name=json[0].name;
			  				let url="/article_list";
			  				fetch(url,{
					  			method: 'POST',
					  			headers:{'Content-Type': 'application/x-www-form-urlencoded'},
					  			body:`uid=${localStorage.UID}&title=${title}&content=${content}&time=${time}&type=${this.state.type}`,
					  		}).then(response=>{return response.json()}).then(datas=>{
					  			if(this._isMounted){
						  			this.setState({
										isLoading:false,
										visible:false
									})
					  			}
					  			let url="/article_list";
								let body=`num=0&type=${types[this.state.currentIndex]}`;
								this._answerFetch(url,body);
					  		})
			  			}
			  		})
				}else{
					message.error("格式有误，请检查！");
				}
			}
		})
	}
	_getTotal(index){
		let url="/article_list";
		let body1=`total=total&type=${types[index]}`;
		fetch(url,{
			method: 'POST',
			headers:{'Content-Type': 'application/x-www-form-urlencoded'},
			body:body1
		}).then(response=>{return response.json()}).then(json=>{
			let length=json.length;
			if(this._isMounted){
				this.setState({
					total:length
				})
			}
		})
	}
	_answerFetch(url,value){
		this.setState({
			prevDatas:this.state.datas
		})
		let userDatas=[];
		fetch(url,{
			method: 'POST',
			headers:{'Content-Type': 'application/x-www-form-urlencoded'},
			body:value,
		}).then(response=>{return response.json()}).then(json=>{
			if(this._isMounted){
				if(json.length>0){
					this.setState({
						datas:json
					})
				}
			}
		})
		this._getTotal(this.state.currentIndex);
	}
}
export default PetAnswer_content = Form.create({})(PetAnswer_content);