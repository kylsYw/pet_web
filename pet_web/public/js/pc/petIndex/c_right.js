import React from 'react';
import common from '../common/common';
let petServe =common.petServe;
export default class C_right extends React.Component{
	render(){
		var content = [];
		var content2 = [];
		for(var i=0;i<3;i++){
			content.push(
				<li key={i}>
					<div className='photo'>
						<a href='#'><img src='http://p2.ycw.com/201703/30/c740867035e302427d56ba027aa02b15_s200' /></a>
					</div>
					<div className='hot_c'>
						<h3>十二星座宠宝秀</h3>
						<p>据说​星座是天神与人之间的图腾，能诠释生命的意义和传递幸运哦~</p>
						<a target="_blank"  className="btn" href="http://www.yc.cn/share/activity-93.html">查看详情</a>
					</div>
				</li>
			)	
		}
		for(let i in petServe){
			content2.push(
				<li key={i} className={(i+2)%3==0?'mg5':' '}>
					<a href='#'>{petServe[i]}</a>
				</li>
			)	
		}
		return (
			<div className='c_right wow slideInDown'
				data-wow-duration="1.5s"
				data-wow-delay="1s"
			>
				<div className='content_box'>
					<div className='c_tit'>
						<h2>热门活动</h2>
						<a href='#'>更多>></a>
					</div>
					<ul className='hot_activity'>
						<li>
							<div className='photo'>
								<a target="_blank" href="http://www.yc.cn/share/activity-93.html"><img src='http://p2.ycw.com/201703/30/c740867035e302427d56ba027aa02b15_s200' /></a>
							</div>
							<div className='hot_c'>
								<h3><a target="_blank" href="http://www.yc.cn/share/activity-93.html">十二星座宠宝秀</a></h3>
								<p>据说​星座是天神与人之间的图腾，能诠释生命的意义和传递幸运哦~</p>
								<a target="_blank"  className="btn" href="http://www.yc.cn/share/activity-93.html">查看详情</a>
							</div>
						</li>
						<li>
							<div className='photo'>
								<a target="_blank" href="http://www.yc.cn/share/activity-92.html"><img src='http://p2.ycw.com/201703/30/311084fb9c04975fe887190431b32618_s200' /></a>
							</div>
							<div className='hot_c'>
								<h3><a target="_blank" href="http://www.yc.cn/share/activity-92.html">春分时节的萌宠</a></h3>
								<p>春分驾到！一年之计在于春，萌宠们在这~</p>
								<a target="_blank"  className="btn" href="http://www.yc.cn/share/activity-92.html">查看详情</a>
							</div>
						</li>
						<li>
							<div className='photo'>
								<a target="_blank" href="http://www.yc.cn/share/activity-91.html"><img src='http://p2.ycw.com/201703/30/8943173b74a6c449bb50258ebf478fe0_s200' /></a>
							</div>
							<div className='hot_c'>
								<h3><a target="_blank" href="http://www.yc.cn/share/activity-91.html">美颜皂片の萌宠版</a></h3>
								<p>主子：麻麻你又在臭美了！拍照也不带上</p>
								<a target="_blank"  className="btn" href="http://www.yc.cn/share/activity-91.html">查看详情</a>
							</div>
						</li>
					</ul>
				</div>
				<ul className='hot_btnList'>
					{content2}
				</ul>
				<div className='adBox'>
					<img src='./images/ad1.gif' />
				</div>
			</div>
		)
	}
}