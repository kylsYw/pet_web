import React from 'react';
import  {Link} from 'react-router';
import common from '../common/common';
let indexType = common.indexType;
export default class C_left extends React.Component{
	constructor(){
		super();
		this.state={
			datas:[]
		}
	}
	componentDidMount(){
		var url="/info_list?limit=14&recommend=1";
		fetch(url).then(response=>{return response.json()}).then(json=>{
			this.setState({
				datas:json
			})
		})
	}
	render(){
		let list = [];
		let content1 = [];
		let content2 = [];
		let item=this.state.datas;
		let more_path = {
			pathname:'/dataList',
			query:{
				flag:'info',
			  	recommend:1
			}
		}
		if(item.length>0){
			for(let i in item){
				let temp = item[i].type;
				let path1 = {
					pathname:'/dataList',
					query:{
						flag:'info',
					  	type:item[i].type
					}
				}
				let path2 = {
					pathname:'/details',
					query:{
						flag:'info',
					  	id:item[i].infoid,
					  	type:item[i].type
					}
				}
				if(i<2){
					list.push(
						<li key={i}>
                            <h3 className="title"><Link to={path2} className="main-p" target="_blank" >{item[i].title}</Link></h3>
                            <p className="summary">{item[i].idesc}</p>
                        </li>
					)
				}else if(i<8){
					content1.push(
						<li key={i-2}>
							<p className='c_type' ><Link to={path1}>{indexType[temp]}</Link></p>
							<p className='c_article' ><Link to={path2}>{item[i].title}</Link></p>
							<p style={{float:'right'}}>{item[i].time}</p>
						</li>
					)	
				}else{
					content2.push(
						<li key={i-8}>
							<p className='c_type' ><Link to={path1}>{indexType[temp]}</Link></p>
							<p className='c_article' ><Link to={path2}>{item[i].title}</Link></p>
							<p style={{float:'right'}}>{item[i].time}</p>
						</li>
					)	
				}
			}
		}
		return(
			<div className='c_middle wow slideInDown'
				data-wow-duration="1.5s"
				data-wow-delay="0.5s"
			>
				<div className='content_box'>
					<div className='c_tit'>
						<h2>编辑推荐</h2>
						<Link to={more_path} target="_blank">更多>></Link>
					</div>
					<ul className='focal'>
						{list}
					</ul>
					<ul className='ul_art' style={{marginTop:'17px'}}>
						{content1}
					</ul>
					<ul className='ul_art' style={{marginTop:'30px'}}>
						{content2}
					</ul>
				</div>
			</div>
		)
	}
}