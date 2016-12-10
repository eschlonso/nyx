(function () {

	var url = 'https://photorankapi-a.akamaihd.net/streams/2156572822/media/recent?auth_token=60c46087c1065c0abb21c53f30d373046f4dacf4d5f67ccb1b3161267db1bdc1&version=v2.2';

	$.ajax({
		type: 'GET',
		dataType: 'json',
		cache: false,
		url: url,
		success: function (data) {
			
			//THIS INITIALIZES THE FIRST SET OF IMAGES
			//loop through images and add HTML to the page
			for (var i = 0; i < data.data._embedded.media.length; i++) {
				var image_url = data.data._embedded.media[i].images.original;
				var username = data.data._embedded.media[i]._embedded.uploader.username;
				media = '<div class="tile">' +
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

				//initialize the gallery
				$('#gallery').finalTilesGallery({
					autoLoadURL: "results.php",
		            autoLoadOffset: 1000,
		            allowEnlargement: true,
		            gridSize: 27,
		            minTileWidth: 240
				});

				var scroll = function () {
					var scrollTop = $(window).scrollTop();
        			scrollTop = scrollTop + 200;
					$('html, body').animate({
	        			scrollTop: scrollTop
	    			}, 10000, "linear");
				};

				//prevents 3sec interval delay
/* 				scroll(); */

				//infinite auto scroll
				setInterval(function () {
        			scroll();
    			}, 10000);

    			//hide loader
    			$('.loader').hide();
			});

			//clean up deferred image loading
			$(document).dequeue('tasks');
		}
	});

})();