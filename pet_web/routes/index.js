var express = require('express');
var router = express.Router();
var mysql = require("mysql");
var fs = require('fs');
var path = require('path');
var formidable = require('formidable')
var util = require('util');
var connection = mysql.createConnection({
  host : "120.79.90.200",
  user : "root",
  password : "Kyls.yw9541" ,
  database : "pet_web",
  port: 3306,
  insecureAuth : true
});
connection.connect();
/* GET home page. */
// 用户表
	router.post('/user_list', function(req, res, next) {
		let username=req.body.username;//用户名
		let password=req.body.password;//密码
		let type=req.body.type;//判断登录or注册
		let uid=req.body.uid;//用户id
		let updata=req.body.updata;//判断是否更新
		let name=req.body.name;//昵称
		let pname=req.body.pname;//宠物名
		let udesc=req.body.udesc;//个性签名	
		let phone=req.body.phone;//电话
		let QQ=req.body.QQ;//QQ
		let address=req.body.address;//地址
		let sex=req.body.sex;//性别
		let age=req.body.age;//年龄
		let search=req.body.search;//查询是否存在
		let sql_query;
		// 判断是否是登录注册操作
		if(type){
			if(type==`regist`){
				sql_query =`INSERT INTO pet_web.user_list (username,PASSWORD,name) VALUES ('${username}','${password}','${name}')`;
			}else{
				sql_query = `SELECT * FROM user_list WHERE username='${username}' AND PASSWORD='${password}'`;
			}
		}else if(updata){
			sql_query =	`UPDATE user_list SET
			NAME = '${name}' ,
			pname =  '${pname}' ,
			phone = '${phone}',
			qq = '${QQ}',
			address = '${address}',
			sex = '${sex}',
			age = '${age}',
			udesc = '${udesc}'
			WHERE uid = '${uid}' `
		}else if(search){
			sql_query = `SELECT * FROM user_list WHERE username='${username}'`;
		}else{
			sql_query = `SELECT * FROM user_list WHERE uid='${uid}'`;
		}
		connection.query(sql_query,(err,data)=>{
			res.send(data)
		})
	});
// 狗表
	router.get('/dog_list', function(req, res, next) {
		var id = req.query.id;
		var num = req.query.num;
		let sql_query;
		if(id){
			sql_query = "select * from dog_list where pid=" + id;
		}else if(num){
			sql_query = "select * from dog_list LIMIT 0," + num;
		}else{
			sql_query = "select * from dog_list";
		}
		connection.query(sql_query,(err,data)=>{
			res.send(data)
		})
	});
// 猫表
	router.get('/cat_list', function(req, res, next) {
		let id = req.query.id;
		let sql_query;
		if(id){
			sql_query = "select * from cat_list where pid=" + id;
		}else{
			sql_query = "select * from cat_list";
		}
		connection.query(sql_query,(err,data)=>{
			res.send(data)
		})
	});
// 图片表
	router.get('/pic_list', function(req, res, next) {
		let num = req.query.num?req.query.num:0;
		let picnum = req.query.picnum?req.query.picnum:0;
		let sql_query='';
		if(picnum){
			// 请求所有数据
			sql_query = "select * from pic_list";
		}else{
			// 请求部分数据
			sql_query = "select * from pic_list ORDER BY picnum DESC limit "+num+",8";
		}
		connection.query(sql_query,(err,data)=>{
			res.send(data)
		})
	});
// 资讯表
	router.get('/info_list', function(req, res, next) {
		let type = req.query.type;
		let id = req.query.id;
		let limit = req.query.limit;
		let recommend = req.query.recommend;
		let sql_query='';
		if(id){
			sql_query="select * from info_list where infoid="+id;
		}else{
			if(type){
				sql_query = `SELECT * FROM info_list WHERE TYPE='${type}' ORDER BY infoid DESC LIMIT 0,10`;
			}else if(recommend){
				if(limit){
					sql_query = `SELECT * FROM info_list WHERE recommend=1 ORDER BY infoid DESC LIMIT 0,${limit}`
				}else{
					sql_query = `SELECT * FROM info_list WHERE recommend = 1 ORDER BY infoid DESC`
				}
			}else if(limit){
					sql_query = "select * from info_list ORDER BY infoid DESC limit 0,"+limit;
			}else{
				sql_query = "select * from info_list ORDER BY infoid DESC";
			}
		}
		connection.query(sql_query,(err,data)=>{
			res.send(data)
		})
	});
// 文章表
	router.post('/article_list',function(req, res, next){
		let total = req.body.total;// 查询总数
		let num = req.body.num;//limit长度
		// 添加到数据库数据的一大堆数据
		let type = req.body.type;//类型
		let title = req.body.title;
		let content = req.body.content;
		let uid = req.body.uid;
		let time = req.body.time;
		let infoid = req.body.infoid;
		let sql_query;
		if(num&&type){
			sql_query=`SELECT * FROM article_list WHERE TYPE='${type}' ORDER BY infoid DESC LIMIT ${num},10`;
		}else if(total){
			sql_query=`SELECT * FROM article_list WHERE TYPE='${type}' ORDER BY infoid DESC`;
		}else if(content){
			sql_query=`INSERT INTO article_list 
				(title, 
				content, 
				TIME, 
				uid,
				type,
				realtype
				)
				VALUES
				('${title}', 
				'${content}',
				'${time}', 
				'${uid}',
				'${type}',
				'article'
				);`
		}else if(infoid){
			sql_query = `SELECT * FROM article_list WHERE infoid='${infoid}'`
		}else if(uid){
			sql_query = `SELECT * FROM article_list WHERE uid='${uid}'`
		}
		connection.query(sql_query,(err,data)=>{
			res.send(data);
		})
	})
	router.get('/article_list', function(req, res, next) {
		let infoid = req.query.infoid;
		let title = req.query.title;
		let content = req.query.content;
		let flag = req.query.flag;
		let sql_query;
		if(flag==1){
			sql_query=`UPDATE article_list SET
				title = '${title}' , 
				content = '${content}' 
				WHERE
				infoid = '${infoid}' `;
		}else if(flag == 2){
			sql_query = `DELETE FROM article_list WHERE infoid = '${infoid}' `;
		}else{
			sql_query = `SELECT * FROM article_list WHERE infoid='${infoid}'`;
		}
		connection.query(sql_query,(err,data)=>{
			res.send(data)
		})
	})
	router.get('/article_list',function(req, res, next){
		let title = req.query.title;
		let content = req.query.content;
		let infoid = req.query.infoid;
		let flag = req.query.flag;
		let sql_query;
		if(flag){
			sql_query=`UPDATE article_list SET
			title = '${title}' , 
			content = '${content}' 
			WHERE
			infoid = '${infoid}' `;
		}
		connection.query(sql_query,(err,data)=>{
			res.send(data)
		})
	})
// 搜索表
	router.post('/search',function(req, res, next){
		let str = req.body.str;
		let sql_query=`
			SELECT infoid,title,realtype,time FROM article_list  WHERE title LIKE '%${str}%' OR content LIKE '%${str}%'
			UNION ALL 
			SELECT infoid,title,realtype,time FROM info_list  WHERE title LIKE '%${str}%'  OR keyword LIKE '%${str}%'
			order by infoid desc 
		`;
		connection.query(sql_query,(err,data)=>{
			res.send(data)
		})
	})
// 评论表
	router.post('/comment_list',function(req, res, next){
		let content = req.body.content;
		let time = req.body.time;
		let uid = req.body.uid;
		let infoid = req.body.infoid;
		let picUrl = req.body.picUrl;
		let sql_query;
		if(content!=''&&content!=undefined){
			sql_query=`
				INSERT INTO comment_list 
					(content, 
					TIME, 
					infoid, 
					uid)
					VALUES
					('${content}', 
					'${time}', 
					'${infoid}', 
					'${uid}'
					);
			`;
		}else if(uid){
			sql_query = `SELECT * FROM comment_list where uid='${uid}'  ORDER BY infoid `
		}else{
			sql_query = `SELECT * FROM comment_list where infoid='${infoid}' `
		}
		connection.query(sql_query,(err,data)=>{
			res.send(data)
		});
	})
// 收藏表
	router.post('/collection_list',function(req, res, next){
		let uid = req.body.uid;
		let flag = req.body.flag;//判断收藏或者删除
		let time = req.body.time;
		let title = req.body.title;
		let infoid = req.body.infoid;
		let sql_query;
		if(flag){
			if(flag == "del"){
				sql_query = `DELETE FROM collection_list WHERE uid='${uid}' AND infoid='${infoid}'`;
			}else{
				sql_query = `INSERT INTO collection_list 
					(infoid, 
					TIME, 
					title, 
					uid
					)
					VALUES
					('${infoid}', 
					'${time}', 
					'${title}', 
					'${uid}'
					);`
			}
		}else if(infoid){
			sql_query = `SELECT * FROM collection_list WHERE uid='${uid}' AND infoid='${infoid}' ORDER BY infoid;`
		}else{
			sql_query = `SELECT * FROM collection_list WHERE uid='${uid}' ORDER BY infoid`;
		}
		connection.query(sql_query,(err,data)=>{
			res.send(data)
		});
	})
// 图片上传
	router.post('/upload',function (req, res) {
	// 插入数据库
    var form = new formidable.IncomingForm();
    form.keepExtensions = true // 保留扩展名
    form.uploadDir = 'upload/' // 设置文件上传路径
    form.parse(req, function (err, fields, files) {
		res.writeHead(200, {'content-type': 'text/plain'});
	    res.write('received upload:\n\n');
	    res.end(util.inspect({fields: fields, files: files}));
	    var img_path = files.avatar.path;
	    // console.log('获得的路径', img_path)
	    img_path = img_path.replace(/\\/g, '\\\\')
	    var positoin = img_path.indexOf('\\')
	    var imgPath = img_path.substring(positoin)
	    img_path = 'http://localhost:3000/' + imgPath;
	    //用户ID
	    let uid = fields.uid
	    let sql_query =	`UPDATE user_list SET
			picUrl = '${img_path}'
			WHERE uid = '${uid}'
		`
		connection.query(sql_query,(err,data)=>{});
    });
});

module.exports = router;
