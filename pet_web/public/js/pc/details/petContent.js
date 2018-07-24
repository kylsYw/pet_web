import React from 'react';

export default class PetContent extends React.Component{

	render(){
		var content = this.props.datas.length?this.props.datas[0].content:"没有数据";
		return(
			<div>
				<h1 style={{
					paddingLeft:"10px",
					color:'black',
					fontWeight:'bold'
				}}>养护知识</h1>
				<div className='details_content'  dangerouslySetInnerHTML={{__html: content}} />
			</div>
		)
	}
}