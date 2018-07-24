import React from 'react';
import Header from '../header';
import Footer from '../footer';
import PetInfo_left from './petInfo_left';
import PetInfo_right from './petInfo_right';
import {Row,Col} from 'antd';
export default class PetInfo extends React.Component{
	componentWillMount(){
		localStorage.indicator = 1;
	}
	render(){
		return (
			<div>
				{/*头部模块*/}
				<Header />
				{/*内容模块*/}
				<div className='petInfo'>
					<Row>
						<Col span={1}></Col>
						<Col span={15}>
							<PetInfo_left />
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
