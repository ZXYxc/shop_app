new Vue({
	el: "#user_info",
	data: {
		imgPath: "",
		name: "test",
		flag: "0",
	},
	mounted: function() {
		axios.get("url").then(function(successDate){ // {flag:"", imgPath:'', 'name':''}
			if(successDate['flag'] == 1){
				this.imgPath = successDate["imgPath"];  
				this.name = successDate['name'];
			}else{
				imgPath = './img/unLog.png';
				name = "<a href=./login.html>点击登录</a>";
			}
		});
	},
});
