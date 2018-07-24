import React from 'react';
import Header from '../header';
import Footer from '../footer';
import PetInfo_right from '../petInfo/petInfo_right';
import PetAnswer_content from './petAnswer_content';
import {Row,Col} from 'antd';

export default class PetAnswer extends React.Component{
	componentWillMount(){
		localStorage.indicator = 5;
	}
	componentWillUnmount(){
		localStorage.indicator = null;
	}
	render(){
		return (
			<div>
				{/*头部模块*/}
				<Header />
				{/*内容模块*/}
				<Row>
					<Col span={1}></Col>
					<Col span={15}>
						<PetAnswer_content />
					</Col>
					<Col span={7}>
						<PetInfo_right />
					</Col>
					<Col span={1}></Col>
				</Row>
				{/*底部模块*/}
				<Footer />
			</div>
		)
	}
}
