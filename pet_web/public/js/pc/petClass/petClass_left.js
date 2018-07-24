import React from 'react';
import  {Link} from 'react-router';
import common from '../common/common';
var types=common.classDatas.types;
var title=common.classDatas.title;
export default class PetClass_left extends React.Component{
	constructor(){
		super();
		this.state={
			datas:[]
		}
	}
	componentDidMount(){
		let infoDatas=[];
		// 根据common.classDatas的长度发送请求获得对应type的数据
		for(let i in types){
			var url="/info_list?type="+types[i]; 
			fetch(url).then(response=>{return response.json();})
			.then(json=>{
				infoDatas.push({
					datas:json,
					title:title[i],
					type:types[i]
				});
				this.setState({
					datas:infoDatas
				})
			})
		}
	}
	render(){
		var content=[];
		// 解析每个datas
		content=this.state.datas.length?this.state.datas.map((item,index)=>{
			let more_path = {
				pathname:'/dataList',
				query:{
					flag:'info',
				  	type:item.type
				}
			}
			// 解析每个datas里面的内容
			var li=item.datas.map((con,i)=>{
				var path = {
				  pathname:'/details',
				  query:{
				  	flag:'info',
				  	id:con.infoid,
				  	type:con.type
				  }
				}
				var temp=<li key={i} className="down">
						<div>
							<Link to={path}><p className="main-p downp fl">{con.title}</p></Link>
							<p className="fr" style={{width:"20%"}}>{con.time}</p>
						</div>
					</li>
				if(i==0){
					temp=<li key={i} style={{
						borderBottom: "1px dashed #ddd",
						paddingBottom:10
					}}>
							<Link to={path}><img src={con.picurl} /></Link>
							<Link to={path}><h4 className="info_tit main-p">{con.title}</h4></Link>
							<p className="summary">{con.idesc}</p>
						</li>
				}
				return (temp);
			})
			let wow = "down wow bounceInLeft";
			if(index%2!=0){
				wow = "down wow bounceInRight";
			}
			return (
				<li key={index} className={wow} data-wow-duration="1.5s">
					<div className='content_box'>
						<div className='c_tit'>
							<h2>{item.title}</h2>
							<Link to={more_path} target="_blank">更多>></Link>
						</div>
						<ul className="info_item">
							{li}
						</ul>
					</div>
				</li>
			)
		}):<div>数据加载中……</div>
		return (
			<ul className='petInfo_left'>
				{content}
			</ul>
		)
	}
}
