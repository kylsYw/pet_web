import React from 'react';
import Header from '../header';
import Footer from '../footer';
import PetClass_left from './petClass_left';
import PetInfo_right from '../petInfo/petInfo_right';
import {Row,Col} from 'antd';
export default class PetClass extends React.Component{
	componentWillMount(){
		localStorage.indicator = 3;
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
				<div className='petInfo'>
					<Row>
						<Col span={1}></Col>
						<Col span={15}>
							<PetClass_left />
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
