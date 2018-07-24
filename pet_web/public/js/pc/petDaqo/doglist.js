import React from 'react';
import { Pagination } from 'antd';
import DogItem from './dogitem';
export default class Doglist extends React.Component{
	constructor(){
		super();
		this.state = {
			datas:[],
			pageNum:0,
		}
	}
	componentDidMount(){
		fetch("/dog_list").then((response)=>{
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
				<DogItem dogdatas={this.state.datas} pageNum={this.state.pageNum} />
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