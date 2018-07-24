import React from 'react';
import {Row,Col,Upload, Icon, Modal,message} from 'antd';

export default class UserHeader extends React.Component{
	constructor(){
		super();
		this.state={
			visible:false,
			imageUrl:""
		}
	}
	render(){
		let imageUrl = this.state.imageUrl;
		let imgSrc=this.props.datas.picUrl;
		let userName=this.props.datas.name;
		let userDesc=this.props.datas.udesc;
		return (
			<div className="user-header wow fadeIn">
				<div className="img_box">
					<img onClick={this.changeImg.bind(this)} src={imgSrc?imgSrc:(localStorage.UID?"./images/user_icon.png":"./images/login.png")} />
				</div>
				<p className="user_name">{userName?userName:"请先登录"}<i className="sexIcon"></i></p>
				<p className="user_desc">{userDesc?userDesc:(localStorage.UID?"用户很懒，暂无签名":"请点击右上角登录帐号")}</p>
				<Modal
					width={300}
		        	title="请上传图片"
		        	footer={null}
		        	visible={this.state.visible}
		        	onCancel={this.handleCancel.bind(this)}
		        >
		        	<Upload
				        className="avatar-uploader"
				        name="avatar"
				        showUploadList={false}
				        action="/upload"
				        beforeUpload={this.beforeUpload.bind(this)}
				        onChange={this.handleChange.bind(this)}
				        data={{uid:localStorage.UID}}
				    >
				        {
				          imageUrl ?
				            <img src={imageUrl} alt="" className="avatar" /> :
				            <Icon type="plus" className="avatar-uploader-trigger" />
				        }
				    </Upload>
		        </Modal>
			</div>
		)
	}

	changeImg(){
		if(localStorage.UID){
			this.setState({
				visible:true
			})
		}
	}
	handleCancel(){
		this.setState({
			visible:false,
			imageUrl:""
		})
	}
	beforeUpload(file){
		const isJPG = file.type === 'image/jpeg';
		if (!isJPG) {
			message.error('You can only upload JPG file!');
		}
		const isLt2M = file.size / 1024 / 1024 < 2;
		if (!isLt2M) {
			message.error('Image must smaller than 2MB!');
		}
		if(isJPG && isLt2M){
	    	this.getBase64(file, imageUrl => this.setState({ imageUrl }));
		}
		return isJPG && isLt2M;
	}
	handleChange(info){
	    if (info.file.status === 'done') {
	    	this.setState({
				visible:false,
				imageUrl:""
			})
			setTimeout(function(){
				window.location.reload()
			}, 100)
	    }
  	}
  	getBase64(img, callback) {
	  const reader = new FileReader();
	  reader.addEventListener('load', () => callback(reader.result));
	  reader.readAsDataURL(img)
	}
}
