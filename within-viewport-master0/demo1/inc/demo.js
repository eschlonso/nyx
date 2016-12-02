window.listaVisibles=  '';//new Array();
window.listaNoVisible= ''; //new Array();
window.listaV='';
window.listaNV='';

 window.listaBORRAR='';


Array.prototype.unique=function(a){
  return function(){return this.filter(a)}}(function(a,b,c){return c.indexOf(a,b+1)<0
});



function unique1()
{
    var n = []; 
    for(var i = 0; i < this.length; i++) 
    {
        if (n.indexOf(this[i]) == -1) n.push(this[i]);
    }
    return n;
}



function myFun(k){
//alert("visible puto"+k);


}

function listaReal(){


    

object=window.listaV;
//object=$.unique(object);


objectNO=window.listaNV;
//objectNO=$.unique(objectNO);

console.log('**********');

console.log(objectNO);

for (var i=0; i < objectNO.length; i++){

var1=jQuery.inArray(object[i],objectNO);
//object[i]

console.log('var1:');
console.log(var1);
console.log('object i:');
console.log(object[i]);



if(var1=='-1'){}else{
    //console.log(object[i]); 
    window.listaBORRAR=window.listaBORRAR+object[i]+',';
}

}


/*
    $.each(object, function(key, value){

        listaReal=listaReal+','+object[value];


});
*/
    //console.log('**********');
    //console.log(listaReal);

    window.listaBORRAR= window.listaBORRAR.split(","); 

}


function ordenarLista(lista){



//console.log('&&&&&');
//console.log(lista);
//console.log(lista[0].id);

/*4
for (var i=0; i < lista.length; i++){
    //i === 0: arr[0] === undefined;
    //i === 1: arr[1] === 'hola';
    //i === 2: arr[2] === 'chau';
    console.log(lista.getAttribute(i).id); 
}
*/
object=lista;

var listaOrdenada = [];



$.each(object, function(key, value){
    if (object[key].id=='myElem'){}else{
        //console.log(key + ": " + object[key].id);
        listaOrdenada[key]=object[key].id;
    }

});


arr=listaOrdenada;

arr = $.grep(arr,function(n){
  return(n);
});
//console.log('$$$$$$$$$$$');
//console.log(arr)
//console.log('$$$$$$$$$$$');
listaOrdenada=arr;
//console.log('##########');
//console.log(listaOrdenada);
//console.log('##########');

return listaOrdenada;

/*4
    for(var key in lista) {
       console.log(lista[key]);
    }
*/




}




// ScrollStart/ScrollStop events: http://james.padolsey.com/javascript/special-scroll-events-for-jquery/
(function(){var e=jQuery.event.special,t="D"+ +(new Date),n="D"+(+(new Date)+1);e.scrollstart={setup:function(){var n,r=function(t){var r=this,i=arguments;if(n){clearTimeout(n)}else{t.type="scrollstart";jQuery.event.handle.apply(r,i)}n=setTimeout(function(){n=null},e.scrollstop.latency)};jQuery(this).bind("scroll",r).data(t,r)},teardown:function(){jQuery(this).unbind("scroll",jQuery(this).data(t))}};e.scrollstop={latency:300,setup:function(){var t,r=function(n){var r=this,i=arguments;if(t){clearTimeout(t)}t=setTimeout(function(){t=null;n.type="scrollstop";jQuery.event.dispatch.apply(r,i)},e.scrollstop.latency)};jQuery(this).bind("scroll",r).data(n,r)},teardown:function(){jQuery(this).unbind("scroll",jQuery(this).data(n))}}})();

// Demo code
(function($) {
    var $boxes = null;
    var $showBoundsCheck = null;

    var _init = function _init() {
        var $body = $('body');
        var boxCount = 100;
        var boxWidth = 20;
        var boxHTML = '';
        var i;

        // Make sure the demo will be wider than the device's screen so that vertical scroll bars appear
        //    but not so wide that you can't see at least four on screen at a time with a maximized browser window
        if (screen.width >= screen.height) {
            // Screen is wide/landscape
            boxWidth = parseInt((screen.width + 400) / 10, 10);
        }
        else {
            boxWidth = parseInt((screen.height + 400) / 10, 10);
        }

        // Generate boxes which will each be tested for their viewport within-ness
        i = 0;
        while (i < boxCount) {
            boxHTML += '<div id="'+i+'" aria-hidden="false">&nbsp;</div>';
            i++;
        }

        // Add a container and put the boxes inside
        $body.append('<div id="boxContainer" style="width:' + (boxWidth * 10 + 20) + 'px;">' + boxHTML + '</div>');

        // Set the styles so everything is nice and proportional to this device's screen
        $body.append('<style>#boxContainer div { width:' + boxWidth + 'px;height:' + boxWidth + 'px;line-height:' + boxWidth + 'px; }</style>');
        $boxes = $('#boxContainer div');
        // Mark a couple of boxes for testing and debugging
        $boxes.get(4).id = 'test';
        $boxes.get(52).id = 'test2';

        $showBoundsCheck = $('#show-boundary');
        events.init();

        // Update the <div>s for the first time
        _updateBoxes();




    };

    ////////////
    // Events //
    ////////////

    var events = {

        // Setup event listeners
        init: function () {
            // Scroll or window resize
            $(window).on('resize scrollstop', _updateBoxes);

            // User entry
            $('input[type="number"]').on('keyup change click', events.onBoundaryChange); // 'click' is for spinners on input[number] control
            // Boundary toggle
            $showBoundsCheck.on('change', events.onBoundaryToggle);

            // Nudge controls
            // Only certain combinations of browsers/OSes allow capturing arrow key strokes, unfortunately
            // Windows: Firefox, Trident, Safari, Opera; Mac: Chrome, Safari, Opera; Not Firefox
            if ((navigator.oscpu && /Windows/.test(navigator.oscpu) && /Firefox|Trident|Safari|Presto/.test(navigator.userAgent)) || (/Macintosh/.test(navigator.userAgent) && /Chrome|Safari|Presto/.test(navigator.userAgent))) {
                $('#thresholds p').show();
                $('body').on('keydown', events.onNudge);
            }

            // Controls toggler
            $('#toggler').on('click', events.onControlsToggle);
        },

        // When a boundary value changes
        onBoundaryChange: function (evt) {
            var target = evt.target,
                val = parseInt(target.value, 10),
                id = target.id;

            // Positive value was entered (negative values are allowed, but the boundaries would be off screen)
            if (val > 0) {
                if ($showBoundsCheck.is(':checked')) {
                    $('.boundary-' + id).show();
                    _drawBound(id, val);
                }
                else {
                    $('.boundary-' + id).hide();
                }
            }
            // Hide boundaries
            else {
                $('.boundary-' + id).hide();
            }

            // Update the page
            withinviewport.defaults[id] = val;
            _updateBoxes();
            _toggleBoundaryToggle();
        },

        // When the boundary toggle box is checked/unchecked
        onBoundaryToggle: function () {
            if ($showBoundsCheck.is(':checked')) {
                // Fire the change event so events.onBoundaryChange() will apply any values
                $('input[type="number"]').change();
                _toggleBoundaryToggle();
            }
            else {
                $('.boundary').hide();
                $('.boundary-' + this.id).hide();
            }
        },

        // When shift + arrow key is pressed, nudge the page by 1px
        onNudge: function (evt) {
            // Ignore input fields
            if ($(evt.target).is('input')) {
                return true;
            }

            if (evt.shiftKey && 37 <= evt.keyCode && evt.keyCode <= 40) {
                var key = 'key' + evt.keyCode;
                var scrollVals = {
                        key38: [0, -1],
                        key37: [-1, 0],
                        key39: [1, 0],
                        key40: [0, 1]
                    };

                window.scrollBy(scrollVals[key][0], scrollVals[key][1]);
                evt.preventDefault();
            }
        },

        onControlsToggle: function (/* evt */) {
            var $toggler = $('#toggler');

            $('#explanation').toggleClass('collapsed');
            $toggler.toggleClass('plus minus');

            if ($toggler.html() === 'Collapse') {
                $toggler.html('Expand');
            }
            else {
                $toggler.html('Collapse');
            }
        }
    };

    /////////
    // GUI //
    /////////

    // Display or hide the "show boundaries" check box if any values are set (non-zero)
    var _toggleBoundaryToggle = function _toggleBoundaryToggle() {
        var somethingEntered = false;

        $('input[type="number"]').each(function () {
            if (parseInt(this.value, 10) !== 0) {
                somethingEntered = true;
            }
        });

        if (somethingEntered) {
            $showBoundsCheck.parent().slideDown();
        }
        else {
            $showBoundsCheck.parent().slideUp();
        }
    };

    // Overlay a boundary line on the viewport when one is set by the user
    var _drawBound = function _drawBound(side, dist) {
        dist += 'px';
        switch (side) {
            case 'top':
                $('.boundary-top').css({
                    top: dist,
                    height: dist,
                    marginTop: '-' + dist
                });
                break;

            case 'right':
                $('.boundary-right').css({
                    right: dist,
                    width: dist,
                    marginRight: '-' + dist
                });
                break;

            case 'bottom':
                $('.boundary-bottom').css({
                    bottom: dist,
                    height: dist,
                    marginBottom: '-' + dist
                });
                break;

            case 'left':
                $('.boundary-left').css({
                    left: dist,
                    width: dist,
                    marginLeft: '-' + dist
                });
                break;

            default:
                break;
        }
    };

    // Update each box's class to reflect whether it was determined to be within the viewport or not
    // Uses the jQuery plugin
    var _updateBoxes = function _updateBoxes() {
        // Reset all boxes to being considered out of view
        $boxes
            .html('outss')
            .attr('aria-hidden', 'true')
            .removeClass('inview')
            .addClass('out-man');
            //console.log('//');
            //console.log( $boxes );
            //console.log('//');
        // Then run withinviewport() on them to reveal which ones are inside
        $boxes
            .withinviewport()
            .html('in')
            .attr('aria-hidden', 'false')
            .addClass('inview')
            .removeClass('out-man');

//console.log($boxes);

           


            var elem = document.getElementById("myElem");
 
// Returns true if it's completely visible
withinviewport(elem);


var name = $(this).attr('id');




    if ($(elem).is(":within-viewport")) {


        
        myFun(name);
    }


     //console.log(name);


console.log('+++++++ VISIBLES');
//console.log($('div').withinviewport());
/*
var hege = ["Cecilie", "Lone"];
var stale = ["Emil", "Tobias", "Linus"];
var children = hege.concat(stale); 
*/
window.listaVisibles=$('div').withinviewport();

window.listaVisibles=ordenarLista(window.listaVisibles);
console.log(window.listaVisibles);

window.listaV=window.listaV.concat(window.listaVisibles);
//console.log('####listaV');



console.log('??')
console.log(window.listaV);
//window.listaV=window.listaV.unique();
window.listaV = unique1(window.listaV);
console.log('==')
console.log(window.listaV);
var array = listaV.split(',');

console.log(array);




//console.log('####listaV');


console.log('----- NO VISIBLES');
window.listaNoVisible=$('div.out-man');

window.listaNoVisible=ordenarLista(window.listaNoVisible);
console.log(window.listaNoVisible);

window.listaNV=window.listaNV.concat(window.listaNoVisible);
console.log(window.listaNV);

//console.log('///////1');


//listaReal();
//$(elem).withinviewport().myFun();

//console.log(window.listaBORRAR);

    }

    $(document).ready(_init);

})(jQuery);
