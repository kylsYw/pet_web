import React from 'react';
import { Pagination } from 'antd';
import CatItem from './catitem';
export default class Catlist extends React.Component{
	constructor(){
		super();
		this.state = {
			datas:[],
			pageNum:0,
		}
	}
	componentDidMount(){
		fetch("/cat_list").then((response)=>{
			return response.json();
		}).then(json=>{
			this.setState({
				datas:json
			})
		})
	}
	render(){
		var length = this.state.datas.length;
		var content = [];
		return(
			<div className="content_box">
				<h3>搜索到<span>{length}</span>条相关记录</h3>
				<CatItem catdatas={this.state.datas} pageNum={this.state.pageNum} />
				<div className="pagination-box">
					<Pagination defaultCurrent={1} total={length}  onChange={this.onChange.bind(this)} />
				</div>
			</div>
		)
	}
	onChange(pageNumber){
		this.setState({
			pageNum:pageNumber-1,
		})
	}
}