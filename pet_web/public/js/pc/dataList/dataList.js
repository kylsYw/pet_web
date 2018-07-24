import React from 'react';
import Header from '../header';
import Footer from '../footer';
import PetInfo_right from '../petInfo/petInfo_right';
import {Row,Col} from 'antd';
import  {Link} from 'react-router';
export default class DataList extends React.Component{
	constructor(){
		super();
		this.state = {
			datas:[],
			searchDatas:[],
			commentDatas:[],
			collectionDatas:[]
		}
	}
	componentDidMount(){
		this._fetch();
	}
	componentWillMount(){
		localStorage.indicator = null;
	}
	render(){
		let list = [];//接收数据
		let result = [];
		if(this.state.searchDatas.length){
			// 如果searchDatas有值，那么传过来的是搜索框的数据
			result = <h3 className='result'>共<span>{this.state.searchDatas.length}</span>条数据</h3>
			list = this.state.searchDatas.map((item,index)=>{
				let path = {
					pathname:'/details',
					query:{
					  	id:item.infoid,
					  	flag:item.realtype=="info"?"info":"answer"
					}
				}
				let wow = "wow slideInLeft";
				if(index%2!=0){
					wow = "wow slideInRight";
				}
				return (
					<li key={index} style={{marginBottom:0}}
						className={wow}
						data-wow-duration="1.5s"
					>
						<h3 className="h3Title"><Link to={path}>{(index+1)+":"+item.title}</Link></h3>
						<span className='time'>{item.time}</span>
					</li>
				)
			})
		}else if(this.state.datas.length){
			// 如果datas有值，那么传过来的是资讯数据
			list =this.state.datas.map((item,index)=>{
				let path = {
						pathname:'/details',
						query:{
							flag:this.props.location.query.flag,
						  	id:item.infoid,
						  	type:item.type
						}
					}
				let wow = "wow slideInLeft";
				if(index%2!=0){
					wow = "wow slideInRight";
				}
				return (
					<li key={index} className={wow}
						data-wow-duration="1.5s"
					>
						<div className="details_header">
							<h1><Link to={path}>{item.title}</Link></h1>
							<p className="source">
								<span className="icon-author">编辑：{item.author}</span>
								<span className="icon-time">{item.time}</span>
							</p>
							<p className="desc">{item.idesc}</p>
							<p className="tag_list">
	                  		  <span className="flag">关键词：{item.keyword?item.keyword:"暂无数据"}</span>
	                    	</p>
						</div>
						<div className="photo">
	                        <Link to={path}><img className="opacity8" src={item.picurl} /></Link>
	                    </div>
					</li>
				)
			})
		}else if(this.state.commentDatas.length){
			result = <h3 className='result'>共<span>{this.state.commentDatas.length}</span>条数据</h3>
			// 如果commentDatas有值，那么传过来的是评论的数据
			list = this.state.commentDatas.map((item,index)=>{
				let path = {
					pathname:'/details',
					query:{
						flag:"answer",
					  	id:item.infoid
					}
				}
				let wow = "wow slideInLeft";
				if(index%2!=0){
					wow = "wow slideInRight";
				}
				return (
					<li key={index} className={wow} style={{marginBottom:0}}>
						<h3 className="h3Title"><Link to={path}>{(index+1)+" : "+item.content}</Link></h3>
						<span className='time'>{item.time}</span>
					</li>
				)
			})
		}else if(this.state.collectionDatas.length){
			result = <h3 className='result'>共<span>{this.state.collectionDatas.length}</span>条数据</h3>
			list = this.state.collectionDatas.map((item,index)=>{
				let path = {
					pathname:'/details',
					query:{
						flag:"info",
					  	id:item.infoid
					}
				}
				let wow = "wow slideInLeft";
				if(index%2!=0){
					wow = "wow slideInRight";
				}
				return (
					<li key={index} className={wow} style={{marginBottom:0}}>
						<h3 className="h3Title"><Link to={path}>{(index+1)+" : "+item.title}</Link></h3>
						<span className='time'>{item.time}</span>
					</li>
				)
			})
		}else{
			list = <div>暂无数据……</div>
		}
		return (
			<div>
				{/*头部模块*/}
				<Header />
				{/*内容模块*/}
				<div className='data-list'>
					<Row>
						<Col span={1}></Col>
						<Col span={15}>
							<div className="content_box" style={{marginTop:"20px"}}>
								{result}
								<ul className="dataList_ul">
									{list}
								</ul>
							</div>
						</Col>
						<Col span={7}>
							<PetInfo_right />
						</Col>
						<Col span={1}></Col>
					</Row>
				</div>
				{/*底部模块*/}
				<Footer />
			</div>
		)
	}
	_fetch(){
		let url;
		// 如果flag=info为资讯
		if(this.props.location.query.flag == "info"){
			url = `/info_list?type=${this.props.location.query.type}`
			if(this.props.location.query.recommend){
				url = `/info_list?recommend=1`;
			}else if(this.props.location.query.type){
				url = `/info_list?type=${this.props.location.query.type}`;
			}
			fetch(url).then(response=>{return response.json()}).then(json=>{
				this.setState({
					datas:json
				})
			})
		}else if(this.props.location.query.flag == "search"){
			// 如果flag=search为搜索
			let url=`/search`;
			let body=`str=${this.props.location.query.value}`
			fetch(url,{
				method: 'POST',
				headers:{'Content-Type': 'application/x-www-form-urlencoded'},
				body:body
			}).then(response=>{return response.json()}).then(json=>{
				this.setState({
					searchDatas:json
				})
			})
		}else if(this.props.location.query.flag == "comment"){
			// 如果flag=comment为评论
			let url=`/comment_list`;
			let body = `uid=${localStorage.UID}`;
			fetch(url,{
				method: 'POST',
				headers:{'Content-Type': 'application/x-www-form-urlencoded'},
				body:body
			}).then(response=>{return response.json()}).then(json=>{
				this.setState({
					commentDatas:json
				})
			})
		}else if(this.props.location.query.flag == "collection"){
			// 如果flag=collection为收藏
			let url=`/collection_list`;
			let body = `uid=${localStorage.UID}`;
			fetch(url,{
				method: 'POST',
				headers:{'Content-Type': 'application/x-www-form-urlencoded'},
				body:body
			}).then(response=>{return response.json()}).then(json=>{
				this.setState({
					collectionDatas:json
				})
			})
		}else if(this.props.location.query.flag == "answer"){
			let url=`/article_list`;
			let body = `uid=${localStorage.UID}`;
			fetch(url,{
				method: 'POST',
				headers:{'Content-Type': 'application/x-www-form-urlencoded'},
				body:body
			}).then(response=>{return response.json()}).then(json=>{
				this.setState({
					commentDatas:json
				})
			})
		}
	}
}
