import React from 'react';

// 自定义模块
import Header from './header';
import Content from './petIndex/content';
import Footer from './footer';

export default class PCWeb extends React.Component{
	componentWillMount(){
		localStorage.indicator = 0;
	}
	componentWillUnmount(){
		localStorage.indicator = null;
	}
	render(){
		return (
			<div>
				{/*头部模块*/}
				<Header />
				{/*内容模块1*/}
				<Content />
				{/*底部模块*/}
				<Footer />
			</div>
		)
	}
}