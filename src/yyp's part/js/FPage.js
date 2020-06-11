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
			showPics.nowPic = showPics.pics[showPics.i%4];
			//console.log(showPics.nowPic);
			for(var j=1; j<=4; j++){
				if((this.i%4+1) == j){
					document.getElementById(this.id+j).setAttribute("class","cycle1");
				}else{
					document.getElementById(this.id+j).setAttribute("class","cycle");
				}
			}
			this.i += 1;
		},
		play() {
			setInterval(this.show, 2000);
		},
		getPics() {
			axios.get("http://127.0.0.1:8000/goods/ListItem/", {params: ""}).then(function(response){
				var data = response['data']['items'];
				console.log(data[0]);
				for(var i=0; i<data.length; i++){
					showPics.pics.push(data[i]['picPath1']);
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
		picPath1: "",
		picPath2: "",
		picPath3: "",
		picPath4: "",
	},
	methods: {
		getTheme(){
			/*
			axios.get("xxx").then(function(response){
				
					theme-href需要返回type字段
					picPath需要获取图片路径
				
			})
			*/
		}
	},
	/*created: function(){
		Vue.$http.get("url").then(function(successData){  
			var themes = JSON.parse(successData);   // [{url:"xxx",path:"xxx"},...]
			this.theme1 = themes[0]['url'];
			this.theme2 = themes[1]['url'];
			this.theme3 = themes[2]['url'];
			this.theme4 = themes[3]['url'];
			this.picPath1 = themes[0]['path'];
			this.picPath2 = themes[1]['path'];
			this.picPath3 = themes[2]['path'];
			this.picPath4 = themes[3]['path'];
		})	
	}*/
});

var showItems = new Vue({
	el: "#showItems",
	data: {
		url: "./lookUpItem?itemId=",
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
							picPath: "path"+data[i]['picPath1'],
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