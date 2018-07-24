import React from 'react';
import  {Link} from 'react-router';
import common from '../common/common';
let petServe =common.petServe;
export default class PetInfo_right extends React.Component{
	constructor(){
		super();
		this.state = {
			datas:[]
		}
	}
	componentDidMount(){
		let url = `/info_list?recommend=1&limit=10`;
		fetch(url).then(response=>{return response.json()}).then(json=>{
			if(json.length){
				this.setState({
					datas:json
				})
			}
		})
	}
	render(){
		let list = [];
		let more_path = {
			pathname:'/dataList',
			query:{
				flag:'info',
			  	recommend:1
			}
		}
		list = this.state.datas.length?this.state.datas.map((item,index)=>{
			let path= {
				pathname:'/details',
				query:{
					flag:'info',
				  	id:item.infoid,
				  	type:item.type
				}
			}
			return (
				<li key={index}>
					<Link to={path} className="ell" target="_blank">
						{item.title}
					</Link>
				</li>
			)
		}):<div>暂无数据……</div>
		var content=[];
		for(let i in petServe){
			content.push(
				<li key={i} className={(i+2)%3==0?'mg5':' '}>
					<a href='#'>{petServe[i]}</a>
				</li>
			)	
		}
		return (
			<div className="petInfo_right wow zoomInDown" 
				data-wow-delay="0.5s" data-wow-duration="1.5s">
				{/*编辑推荐*/}
				<div style={{marginTop:'20px'}} className="recommend">
					<div className='content_box'>
						<div className='c_tit'>
							<h2>编辑推荐</h2>
							<Link to={more_path} target="_blank">更多>></Link>
						</div>
						<ul className="petInfo_right_ul">
							{list}
						</ul>
					</div>
				</div>
				{/*宠物服务*/}
				<div style={{marginTop:'20px'}} className="pet_server">
					<div className='content_box'>
						<div className='c_tit'>
							<h2>宠物服务</h2>
							<a href='#'>更多>></a>
						</div>
						<ul className='hot_btnList'>
							{content}
						</ul>
					</div>
				</div>
			</div>
		)
	}
}
