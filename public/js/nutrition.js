let settings = {
	"async": true,
	"crossDomain": true,
	"url": "https://trackapi.nutritionix.com/v2/search/instant?query=hamburger",
	"headers": {
		"x-app-id": "541f686f",
        "x-app-key": "eb45fa7575862172a91329ede8d516f7",
         "x-remote-user-id": "0",
		 	
}
}

$.ajax(settings).done(function (response) {
	console.log(response);
});


let settingsTwo = {
	"async": true,
	"crossDomain": true,
	"method": "POST",
	"url": "https://trackapi.nutritionix.com/v2/natural/nutrients",
	"headers": {
		"x-app-id": "541f686f",
        "x-app-key": "eb45fa7575862172a91329ede8d516f7",
         "x-remote-user-id": "0", 

}, 
	data: {
		"query": "hamburger"
	}
}
	
$.ajax(settingsTwo).done(function (response) {
	console.log(response);
});
