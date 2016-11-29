(function () {

var getUrlVars = function()
{
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for(var i = 0; i < hashes.length; i++)
    {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
       	console.log(hash[1]);
    }
    return vars;
}

	var streamId = getUrlVars()["streamId"];
	//var url = 'https://photorankapi-a.akamaihd.net/streams/2156572822/media/recent?auth_token=60c46087c1065c0abb21c53f30d373046f4dacf4d5f67ccb1b3161267db1bdc1&version=v2.2';
	var url = 'https://photorankapi-a.akamaihd.net/streams/'+streamId+'/media/recent?auth_token=60c46087c1065c0abb21c53f30d373046f4dacf4d5f67ccb1b3161267db1bdc1&version=v2.2&count=50';
	//var url = 'https://photorankapi-a.akamaihd.net/streams/1708220103/media/recent?auth_token=60c46087c1065c0abb21c53f30d373046f4dacf4d5f67ccb1b3161267db1bdc1&version=v2.2&count=100';

	$('#loader').attr("src", '/nyx/img/loader_'+streamId+'.jpg');
	$('#header-image').attr("src", '/nyx/img/'+streamId+'.png');
	
	$.ajax({
		type: 'GET',
		dataType: 'json',
		cache: false,
		url: url,
		success: function (data) {
		
			//
			//THIS INITIALIZES THE FIRST SET OF IMAGES
			//loop through images and add HTML to the page
			for (var i = 0; i < data.data._embedded.media.length; i++) {
				var image_url = data.data._embedded.media[i].images.original;
				var username = data.data._embedded.media[i]._embedded.uploader.username;
				media = '<div id="pic'+i+'" class="tile">' +
						 				'<a class="tile-inner" href="' + image_url + '">' +
										'<img class="item" src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" data-src="' + image_url + '" />' +
										'<span class=\'subtitle\'>@' + username + '</span>' +
										'</a>' +
										'</div>';

				var appendItem = function (media) {
					$('.ftg-items').append(media);
				};

				//queue up each item to be appended
				$(document).queue('tasks', appendItem(media));
				$('<img src="'+ image_url +'">').load(function() {
					console.log(image_url+ "loaded");
				});
			}

			//now that the 'for' loop is complete
			$(document).queue('tasks', function(){
//alert("initialize");
				//initialize the gallery
				$('#gallery').finalTilesGallery({
					autoLoadURL: "",//results.php
		            autoLoadOffset: 1000,
		            allowEnlargement: true,
		            gridSize: 27,
		            minTileWidth: 240
				});

/*
				var scroll = function () {
					var scrollTop = $(window).scrollTop();
        			scrollTop = scrollTop + 200;
					$('html, body').animate({
	        			scrollTop: scrollTop
	    			}, 10000, "linear");
				};
				*/
/**/
				//prevents 3sec interval delay
/* 				scroll(); */
/*
				//infinite auto scroll
				setInterval(function () {
        			scroll();
    			}, 10000);
*/
    			//hide loader


  
    			$('.loader').hide();
			});

			//clean up deferred image loading
			$(document).dequeue('tasks');
		}
	});

})();