import React from 'react';
import Header from '../header';
import Footer from '../footer';
import PetInfo_right from '../petInfo/petInfo_right';
import {Row,Col,Tabs} from 'antd';
const TabPane = Tabs.TabPane;


import Doglist from './doglist';
import Catlist from './catlist';
export default class PetDaqo extends React.Component{
	componentWillMount(){
		localStorage.indicator = 2;
	}
	render(){
		return (
			<div>
				{/*头部模块*/}
				<Header />
				{/*内容模块*/}
				<div>
					<Row>
						<Col span = {1}></Col>
						<Col span = {15}>
							<div className="petDaqo">
								<div className='content_box'>
									{/*标题*/}
									<div className='c_tit wow fadeIn'>
										<h2>宠物筛选</h2>
									</div>
									<Tabs
									className="wow fadeIn" data-wow-delay="0.5s"
									style={{marginTop:20}} defaultActiveKey="1" animated={true}
									>
									    <TabPane tab="狗狗" key="1" >
									    	<Doglist />
									    </TabPane>
									    <TabPane tab="猫猫" key="2" >
									    	<Catlist />
									    </TabPane>
									</Tabs>
								</div>
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
}
