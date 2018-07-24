import React from 'react';
import Header from '../header';
import Footer from '../footer';
import {Row,Col,notification} from 'antd';
var show=["flipInY","flipInX","flash","fadeIn","rotateIn","rotateInDownLeft",
			"rotateInDownRight","rotateInUpLeft","rotateInUpRight"];
export default class PetPic extends React.Component{
	constructor(){
		super();
		this.state = {
			datas:[],
			length:0,
			show:"flipInY"
		}
	}
	componentDidMount(){
		var url='/pic_list';
		fetch(url).then(response=>{return response.json()}).
		then(json=>{
			this.setState({
				datas:json
			})
		})
		var url='/pic_list?picnum=aaa';
		fetch(url).then(response=>{return response.json()}).
		then(json=>{
			this.setState({
				length:json.length
			})
		})
	}
	componentWillMount(){
		localStorage.indicator = 4;
	}
	componentWillUnmount(){
		localStorage.indicator = null;
	}
	render(){
		var content = [];
		content = this.state.datas.length?this.state.datas.map((item,index)=>{
			var style="animated "+this.state.show;
			if(index==0){
				style="animated bigimg nopadding "+this.state.show;
			}else if(index==4){
				style="nopadding animated "+this.state.show;
			}else if(index==6){
				style="bigimg animated "+this.state.show;
			}
			return (
				<li key={index} className={style}>
					<img src={item.picurl} />
					<div className='bottom-info'>
						<p className='bottom-info-tit'>
							标题:{item.title}
						</p>
					</div>
				</li>
			)
		}):<div>数据加载中……</div>
		return (
			<div>
				{/*头部模块*/}
				<Header />
				{/*内容模块*/}
				<div className='petPic'>
					<Row>
						<Col span={1}></Col>
						<Col span={22}>
							<div className='content_box'>
								{/*标题*/}
								<div className='c_tit'>
									<h2>精选图片</h2>
									<h3>来自Kyls丶yw，留住最精彩的瞬间</h3>
									<a style={{
										backgroundColor:"#f2473d",
										padding:"5px 10px",
										borderRadius:5,
										marginTop:0,
										color:"white"
									}}
									onClick={this._change.bind(this)}
									>换一组</a>
									{/*<a style={{
										backgroundColor:"#f2473d",
										padding:"5px 10px",
										borderRadius:5,
										marginTop:0,
										marginRight:10,
										color:"white"
									}}
									onClick={this._upload.bind(this)}
									>上传图片</a>*/}
								</div>
								<ul className='picGroup'>
									{content}
								</ul>
							</div>
						</Col>
						<Col span={1}></Col>
					</Row>
				</div>
				{/*底部模块*/}
				<Footer />
			</div>
		)
	}
	_change(){
		var num=parseInt(Math.random()*(this.state.length-8));
		var index=parseInt(Math.random()*(show.length));
		var url='/pic_list?num='+num;
		if(show[index]==this.state.show){
			this._change();
		}else{
			fetch(url).then(response=>{return response.json()}).
			then(json=>{
				this.setState({
					datas:json,
					show:show[index]
				})
			})
		}
	}
	_upload(){
		if(localStorage.UID){

		}else{
			notification.open({
			    message: '请先登录',
			    description: '点击网站左上角的狗掌图标',
			    duration:2
			});
		}
	}
}
