# pet-web
> ##### 算是背景吧：
> &emsp;&emsp;本项目完成于2017.10，勉勉强强赶上了毕业答辩，由于是第一个做的功能比较全的前后端项目，很多东西都是现查现学，所以有些写法会有点low，但是由于懒，所以也懒得重构了。
&emsp;&emsp;本项目前端采用react+antd，后端采用express+node连接本地数据库来实现数据交互。由于当初才疏学浅，并不懂得redux，所以造成了很多额外的工作量，还把一些数据存到了localstorage里，这算是一个黑历史，小本本记下来。

> ##### 项目启动方式:
> &emsp;&emsp;进到项目根目录pet_web里
&emsp;&emsp;cnpm install 或者 npm install
&emsp;&emsp;npm run start
&emsp;&emsp;浏览器输入localhost:3000
&emsp;&emsp;数据库账号与密码的修改在 pet_web/routes里，到时候看着改吧

> ##### 提示:
>&emsp;&emsp;那个数据库文件是用来导入到本地数据库的，所以导入完就可以干掉它了（数据库名为pet_web）。<br/>
&emsp;&emsp;node版本为6.11.3，如果不是该版本请使用nvm切换一下node版本（不过我好像在8.0也跑的好好的）<br/>
&emsp;&emsp;如果遇到了数据库连接失败的问题，恭喜你，你可以去百度一波了，因为我也是百度的23333。