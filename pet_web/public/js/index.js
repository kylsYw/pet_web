import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
// 首页
import PCWeb from './pc/pcindex';
// 宠物资讯
import PetInfo from './pc/petInfo/petInfo';
// 宠物课堂
import PetClass from './pc/petClass/petClass';
// 详情页
import Details from './pc/details/details';
// 宠物大全
import PetDaqo from './pc/petDaqo/petDaqo';
// 宠物美图
import PetPic from './pc/petPic/petPic';
// 在线问答
import PetAnswer from './pc/petAnswer/petAnswer';
// 数据列表
import DataList from './pc/dataList/dataList';
//个人中心
import UserCenter from './pc/userCenter/userCenter';
//宠物服务
import PetServer from './pc/petServer/petServer';
import PetDetails from './pc/petServer/petDetails';

import {Router,Route,hashHistory } from 'react-router';
class Root extends React.Component{
	render(){
		return (
			<div className='pc'>
				<Router history={hashHistory}>
					<Route path="/" component={PCWeb}></Route>
					<Route path="/petInfo" component={PetInfo}></Route>
					<Route path="/petClass" component={PetClass}></Route>
					<Route path="/details" component={Details}></Route>
					<Route path="/petDaqo" component={PetDaqo}></Route>
					<Route path="/petPic" component={PetPic}></Route>
					<Route path="/petAnswer" component={PetAnswer}></Route>
					<Route path="/dataList" component={DataList}></Route>
					<Route path="/userCenter" component={UserCenter}></Route>
					<Route path="/petServer" component={PetServer}></Route>
					<Route path="/petDetails" component={PetDetails}></Route>
				</Router>
			</div>
		)
	}
}
ReactDOM.render(<Root />,document.querySelector("#wrap"));