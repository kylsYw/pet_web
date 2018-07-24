module.exports = {
	// 宠物课堂分类
	classDatas:{
		types:["illness","protect","choose","products"],
		title:["疾病","养护","选购","产品"]
	},
	// 宠物资讯分类
	infoDatas:{
		types:["news","zhuanti","quwei"],
		title:["新闻","专题","趣味"]
	},
	// 全部资讯分类（首页资讯的分类）
	indexType:{
		"illness":"疾病","protect":"养护","choose":"选购","products":"产品",
		"news":"新闻","zhuanti":"专题","quwei":"趣味"
	},
	// 问答分类
	answerDatas:{
		types:["medical","protect","practice","other"],
		title:["医疗","养护","训练","其他"]
	},
	// 个人中心数据
	userInfoList:{"username":"用户名","name":"昵称","pname":"宠物名","udesc":"个性签名"
		,"phone":"手机号","QQ":"QQ号","address":"地址","sex":"性别","age":"年龄"
	},
	// 宠物服务数据
	petServe:[
		"宠物训练","宠物美容","宠物选购","宠物繁育","宠物养护",
		"宠物疾病","宠物漫画","产品周边","宠物娱乐"
	],
	//导航条
	navDatas:[
		{"title":"首页","path":"/"},{"title":"宠物资讯","path":"/petInfo"},
		{"title":"宠物大全","path":"/petDaqo"},{"title":"宠物课堂","path":"/petClass"},
		{"title":"宠物美图","path":"/petPic"},{"title":"在线问答","path":"/petAnswer"},
		{"title":"宠物服务","path":"/petServer"},
	],
	// 宠物服务分类
	serverDatas1:{"all":"全部","xihu":"洗护","zaoxing":"造型","jiyang":"寄养","yiliao":"医疗",
				"xunlian":"训练","sheying":"摄影","tijian":"体检","jueyu":"绝育"},
	// 宠物服务地区
	serverDatas2:["全部","丰泽","鲤城","晋江"],
	// 获取当前时间
	getDate:function(){
		let date=new Date();
		let seperator1 = "-";
	    let seperator2 = ":";
	    let month = date.getMonth() + 1;
	    let strDate = date.getDate();
	    let minutes = date.getMinutes();
	    let seconds= date.getSeconds();
	    if (month >= 1 && month <= 9) {
	        month = "0" + month;
	    }
	    if (strDate >= 0 && strDate <= 9) {
	        strDate = "0" + strDate;
	    }
	    if(minutes<10){
	    	minutes = "0" + minutes;
	    }
	     if(seconds<10){
	    	seconds = "0" + seconds;
	    }
	    let currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
	            + " " + date.getHours() + seperator2 + minutes
	            + seperator2 + seconds;
	    return currentdate;
	}
}