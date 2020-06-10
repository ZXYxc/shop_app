new Vue({
	el: "#addressList",
	data:{
		address: [
			{
				url: "edit.html?id=",
				addressId: "test",
				recvName: "test",
				recvPhone: "test",
				recvAddr: "test",
			},
			{
				url: "edit.html?id=",
				addressId: "test",
				recvName: "test",
				recvPhone: "test",
				recvAddr: "test",
			},
		],
	},
	mounted: function() {
		Vue.$http.get("url").then(function(successData){
			this.address = JSON.parse(successData);
			for(var i=0; i<this.address.length; i++){
				this.address[i]['url'] = "editAddr.html?id="+this.address[i]['addressId'];
			}
		})
		/*
			address: [
				{
					url: "edit.html?id=",
					addressId: "",
					recvName: "",
					recvPhone: "",
					recvAddr: "",
				},
			]
		*/
	}
});