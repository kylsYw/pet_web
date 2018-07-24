import React from 'react';
import  {Link} from 'react-router';
export default class DogItem extends React.Component{
	render(){
		let pageNum = this.props.pageNum;
		let datas = this.props.dogdatas;
		let content = [];
		let num =pageNum*10;
		// 判断数据是否请求成功
		if(datas.length){
			for(let i=num;i<num+10;i++){
				if(datas[i]){
					let path = {
					  pathname:'/details',
					  query:{
					  	flag:'pet',
					  	id:datas[i].pid,
					  	type:'dog'
					  }
					}
					let wow = "down wow bounceInLeft";
					if(i%2!=0){
						wow = "down wow bounceInRight";
					}
					content.push(
						<li key={i} className={wow}>
							<Link to={path}><img src={datas[i].url} /></Link>
							<div className='infobox'>
								<p className="info-t">{datas[i].pname}</p>
								<p className="itm-cell">
					                <span className="itm">英文名:</span>
					                <span className="itm-txt">{datas[i].en_name?datas[i].en_name:'暂无数据'}</span>
					            </p>
					            <p className="itm-cell">
					                <span className="itm">原产地:</span>
					                <span className="itm-txt">{datas[i].origin?datas[i].origin:"暂无数据"}</span>
					            </p>
					            <p className="itm-cell">
					                <span className="itm">体重:</span>
					                <span className="itm-txt">{datas[i].weight?datas[i].weight+'公斤':'暂无数据'}</span>
					            </p>
					            <p className="itm-cell">
					                <span className="itm">寿命:</span>
					                <span className="itm-txt">{datas[i].life?datas[i].life+"年":'暂无数据'}</span>
					            </p>
					            <p className="itm-cell">
					                <span className="itm">肩高:</span>
					                <span className="itm-txt">{datas[i].height?datas[i].height+'厘米':'暂无数据'}</span>
					            </p>
					            <p className="itm-cell">
					                <span className="itm">体型:</span>
					                <span className="itm-txt">{datas[i].figure?datas[i].figure:'暂无数据'}</span>
					            </p>
					            <Link to={path}><p className="itm-cell itm-cell_link">查看详情>></p></Link>
							</div>
							<div className="info-price">
		                        <p>参考价格</p>
		                        <p className="num">{datas[i].figure?datas[i].price+"元":'暂无数据'}</p>
		                    </div>
						</li>
					)	
				}
			}
		}else{
			content = <div>数据加载中…</div>
		}
		return(
			<ul className="pet-list pet">
				{content}
			</ul>
		)
	}
}