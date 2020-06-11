new Vue({
	el: "#info",
	data: {
		nickName: "",
		sex: "",
		birthday: "",
		age: ""
	},
	mounted: function(){
		/*在vuex中存储用户的id用以api请求*/
		axios.get('url').then(function(successData){
				var info = JSON.parse(successData);
				/*
					{
						nickName: "",
						sex: "",
						birthday: "",
						age: ""
					}
				*/
				this.nickName = info['nickName'];
				this.sex = info['sex'];
				this.birthday = info['birthday'];
				this.age = info['age'];
		})
	}
});