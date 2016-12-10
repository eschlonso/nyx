//Node Package Requirements
var http = require('http');
const PORT=8080;
var request = require('request');

var dispatcher = require('httpdispatcher');

//Application Parameters
var protocol = 'http',
    olapicDomain = 'photorankapi-a.akamaihd.net',
    requiredHeaders = {
        'Accept': 'application/vnd.olapic.v2.1+json'
    };

//Demo Specific Parameters
var olapicApiKey = '60c46087c1065c0abb21c53f30d373046f4dacf4d5f67ccb1b3161267db1bdc1',
    streamID = '1708220103';

//Request Function

//Request Customer ID
var getCustomerID = function(callback) {
    var path = '/',
        finalURL = protocol + '://' + olapicDomain + path + '?auth_token=' + olapicApiKey;

    console.log('CustomerID API URL: ' + finalURL); //Print Assembled URL used in API Call

    var options = {
        url: finalURL,
        headers: requiredHeaders
    };

    //Calls out to Olapic API at http://photorankapi-a.akamaihd.net/?auth_token=5faf8a51f1be023ab580d9222128964c5ccb9512f2a450d24e5162963a89ecb1 to get customer ID.
    request.get(options, function(error, response, body) {
        if (!error && response.statusCode == 200) {
            body = JSON.parse(body); //Turn String into JSON object
            var customerID = body.data._embedded.customer.id;

            if (!callback) {
                console.log('Customer ID: ' + customerID); // Print the Customer ID
            } else {
                console.log('Customer ID: ' + customerID); // Print the Customer ID
                console.log('--------------------------------------------------------');
                callback(null, customerID);
            }
        } else {
            console.error('Request Failed', {
                'Status Code': response.statusCode,
                'Error': error
            });
        }
    });
};

//Request Product by SKU
var getStreamData = function(error, cb) {
    var path = '/streams/1708220103/media/recent',
        finalURL = protocol + '://' + olapicDomain + path + '?auth_token=' + olapicApiKey + '&count=20';

    console.log('STREAM URL: ' + finalURL); //Print Assembled URL used in API Call

    var options = {
        url: finalURL,
        headers: requiredHeaders
    };

    //Calls out to Olapic API at http://photorankapi-a.akamaihd.net/customers/216683/streams/bytag/TF8124?auth_token=5faf8a51f1be023ab580d9222128964c5ccb9512f2a450d24e5162963a89ecb1 to get specific product based on the SKU used.
    request.get(options, function(error, response, body) {
        if (!error && response.statusCode == 200) {
            body = JSON.parse(body); //Turn String into JSON object
            var data = body.data;
            var str = "";
			var arr = data._embedded.media;
		    for (var x = 0; x < arr.length; x++) {
		    	str += "<div class=\"tile\">\n"
				str += "<a class=\"tile-inner\" href=\"" + arr[x].images.original + "\">\n"
				str += "<img class=\"item\" src=\"data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7\" data-src=\"" + arr[x].images.original + "\" />\n"
				str += "</a>\n"
				str += "</div>\n"
		    }
			cb(str)
            //console.log('Response search Data: ' + JSON.stringify(data)); //Print Response Data to Console
        } else {
            console.error('Request Failed', {
                'Status Code': response.statusCode,
                'Error': error
            });
        }
    });

};

//We need a function which handles requests and send response
function handleRequest(request, response){
	dispatcher.dispatch(request, response);
    
    
}

dispatcher.onGet("/images", function(req, res) {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end(getStreamData(function(stdout){
    	res.write(stdout);
    }));
}); 

//A sample GET request    
   

//Create a server
var server = http.createServer(handleRequest);

//Lets start our server
server.listen(PORT, function(){
    //Callback triggered when server is successfully listening. Hurray!
    console.log("Server listening on: http://localhost:%s", PORT);
});

//Initialize
//getStreamData();         