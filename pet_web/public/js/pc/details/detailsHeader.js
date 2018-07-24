import React from 'react';
import {Row,Col} from 'antd';
export default class DetailsHeader extends React.Component{
	render(){
		var datas = this.props.datas[0];
		var img = datas?<img src={datas.url} />:<div>数据加载中</div>;
		var content = datas?(
			<div className='infobox'>
				<h3>{datas.pname}</h3>
				<div className='infobox '>
					<p className="info-t">基本资料</p>
					<p className="itm-cell">
					    <span className="itm">中文名:</span>
					    <span className="itm-txt">{datas.pname?datas.pname:'暂无数据'}</span>
					</p>
					<p className="itm-cell">
					    <span className="itm">别名:</span>
					    <span className="itm-txt">{datas.aliases?datas.aliases:'暂无数据'}</span>
					</p>
					<p className="itm-cell">
					    <span className="itm">体型:</span>
					    <span className="itm-txt">{datas.figure?datas.figure:'暂无数据'}</span>
					</p>
					<p className="itm-cell">
					    <span className="itm">毛长:</span>
					    <span className="itm-txt">{datas.haidLength?datas.haidLength:'暂无数据'}</span>
					</p>
					<p className="itm-cell">
					    <span className="itm">英文名:</span>
					    <span className="itm-txt">{datas.en_name?datas.en_name:'暂无数据'}</span>
					</p>
					<p className="itm-cell">
					    <span className="itm">原产地:</span>
					    <span className="itm-txt">{datas.origin?datas.origin:"暂无数据"}</span>
					</p>
					<p className="itm-cell">
					    <span className="itm">智商:</span>
					    <span className="itm-txt">{datas.IQ?datas.IQ+'公斤':'暂无数据'}</span>
					</p>
					<p className="itm-cell">
					    <span className="itm">体重:</span>
					    <span className="itm-txt">{datas.weight?datas.weight+'公斤':'暂无数据'}</span>
					</p>
					<p className="itm-cell">
					    <span className="itm">寿命:</span>
					    <span className="itm-txt">{datas.life?datas.life+"年":'暂无数据'}</span>
					</p>
					<p className="itm-cell">
					    <span className="itm">肩高:</span>
					    <span className="itm-txt">{datas.height?datas.height+'厘米':'暂无数据'}</span>
					</p>
					<p className="itm-cell">
					    <span className="itm">价格:</span>
					    <span className="itm-txt">{datas.price?datas.price+'元':'暂无数据'}</span>
					</p>
					<p className="itm-cell">
					    <span className="itm">毛色:</span>
					    <span className="itm-txt">{datas.color?datas.color:'暂无数据'}</span>
					</p>
					<p className="itm-cell">
					    <span className="itm">功能:</span>
					    <span className="itm-txt">{datas.ability?datas.ability:'暂无数据'}</span>
					</p>
				</div>
			</div>
		):<div>数据努力加载中……</div>
		return(
			<div>
				<Row>
					<Col span={1}></Col>
					<Col span={22}>
						<div className='content_box pet detailsbox
							wow fadeIn
						' style={{marginTop:"20px"}}>
							<div className='details_imgbox'>
								{img}
							</div>
							{content}
						</div>
					</Col>
					<Col span={1}></Col>
				</Row>
			</div>
		)
	}
}