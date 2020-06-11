var showPics = new Vue({
	el: "#showPics",
	data: {
		nowPic: "",
		testPic: "./img/email.png",
		pics: [],
		i: 0,
		id: "cycle"
	},
	methods: {
		show() {
			console.log("show");
			showPics.nowPic = showPics.pics[showPics.i%4];
			console.log(showPics.nowPic);
			for(var j=1; j<=4; j++){
				if((this.i%4+1) == j){
					document.getElementById(this.id+j).setAttribute("class","cycle1");
				}else{
					document.getElementById(this.id+j).setAttribute("class","cycle");
				}
			}
			console.log(this.i);
			this.i += 1;
		},
		play() {
			console.log("play");
			setInterval(this.show, 2000);
		},
		getPics() {
			axios.get("http://127.0.0.1:8000/goods/ListItem/", {params: ""}).then(function(response){
				console.log("getPics");
				var data = response['data']['items'];
				//console.log(data[0]);
				for(var i=0; i<data.length; i++){
					showPics.pics.push("http://"+data[i]['picPath1']);
					if(showPics.pics.length == 4) break;
				}
				console.log(showPics.pics);
			})
		}
	},
	created(){
		this.getPics();
		this.play();
	}
});

var className = new Vue({
	el: "#className",
	data: {
		url:"./getType?type=",
		theme1: "",
		theme2: "",
		theme3: "",
		theme4: "",
		picPath:[
			"./img/picError.jpg",
			"./img/picError.jpg",
			"./img/picError.jpg",
			"./img/picError.jpg"
		],
	},
	methods: {
		getTheme(){
			axios.get("http://127.0.0.1:8000/goods/ListItem/").then(function(response){
				if(response['data']['result']=="success"){
					var data = response['data']['items'];
					console.log(data);
					for(var i=0;i<4;i++){
						var img = document.getElementById("classPic"+i); // 主题图
						//console.log("classPic"+i);
						//console.log(img);
						//console.log(i);
						img.setAttribute("src","http://"+data[i]['picPath1']);
						/*
						 type = data[i]['type'];
						 id = data[i]['itemId'];
						 
						*/
					}
					//console.log(className.picPath);
				}
			})
			
		}
	},
	created: function(){
		this.getTheme();
	}
});

var showItems = new Vue({
	el: "#showItems",
	data: {
		url: "./lookUpItem?itemId=",  // xy,这里改成你那边的路由
		items: [],
	},
	methods: {
		getItems(){
			axios.get("http://127.0.0.1:8000/goods/ListItem/").then(function(response) {
				//this.items = JSON.parse(successData); // [{picPath:"",url:"",title:"",price:""},{},{}]
				if(response['data']['result'] == "success"){
					var data=response['data']['items'];
					for(var i=0; i<data.length; i++){
						showItems.items.push({
							picPath: "http://"+data[i]['picPath1'],
							/*
								参数在这里：
								var itemId = data[i]['itemId'];  
								var type = data[i]['type'];
							*/
							url: showItems.url+data[i]['itemId'],  
							title: data[i]['name'],
							price: data[i]['presentPrice']
						});
						if(showItems.items.length == 10) break;
					}
					
				}else{
					alert("Load error!");
				}
				console.log(showItems.items);
			})
		}
	},
	created(){
		this.getItems();
	}
});