
var express = require('express');
var router = express.Router();
var mysql = require("mysql");
var connection = mysql.createConnection({
	host : "localhost" ,
	user : "root" ,
  password: "Kyls.yw9541",
	database : "pet_web"
});
connection.connect();
/* GET users listing. */
// SELECT * FROM server_type WHERE xihu IS NOT NULL

// 商家信息
	router.post('/shop',function(req, res, next){
		let sid = req.body.sid;
		let num = req.body.num?req.body.num:0;
		let type = req.body.type;
		let sql_query;
		if(type){
			sql_query=`SELECT * FROM server_list WHERE AREA='${type}' LIMIT ${num},10;`
		}else if(sid){
			sql_query = `SELECT * FROM server_list WHERE sid = ${sid};`
		}else{
			sql_query = `SELECT * FROM server_list limit ${num},10;`
		}
		connection.query(sql_query,(err,data)=>{
			res.send(data)
		})
	})
// 商家服务
	router.post('/shop_serve',function(req, res, next){
		let sid = req.body.sid;
		let type = req.body.type;
		let sql_query;
		if(sid){
			sql_query = `SELECT * FROM server_type WHERE sid=${sid};`
		}else if(type){
			sql_query = `SELECT * FROM server_type WHERE ${type} IS NOT NULL`;
		}
		connection.query(sql_query,(err,data)=>{
			res.send(data)
		})
	})
module.exports = router;
