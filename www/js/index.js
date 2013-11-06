/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
 
window.requestAnimFrame = (function(){
	return  window.requestAnimationFrame || 
			window.webkitRequestAnimationFrame || 
			window.mozRequestAnimationFrame ||
			function( callback ){
				window.setTimeout(callback, 1000/60 );
			};
})();

var test = {
	run: function() {
		alert('Hello Arbe');
	}
}

var pub = {
	x:0,
	swipe: {
		pos:0,
		dest:0,
	},
	mov:0
};

var loadPage = function() {
	$('.container').append('<div class="button red" onclick="alert(this.innerHTML)">red</div>');
	$('.container').append('<div class="button blue" onclick="alert(this.innerHTML)">blue</div>');
	$('.container').append('<div class="button green" onclick="alert(this.innerHTML)">green</div>');
	$('.container').append('<div class="button yellow" onclick="alert(this.innerHTML)">yellow</div>');
}

var resizeWindow = function() {
	head = {
		h: $('header').height() ,
		pt: $('header').css('padding-top').split('px')[0] ,
		pb: $('header').css('padding-bottom').split('px')[0] ,
	};
	
	foot = {
		h: $('footer').height() ,
		pt: $('footer').css('padding-top').split('px')[0] ,
		pb: $('footer').css('padding-bottom').split('px')[0] ,
	};
	
	cont = {
		h: $('.container').height() ,
	};
	
	$('#body').css('min-height',cont.h - head.h - head.pt - head.pb - foot.h - foot.pt - foot.pb);
}


var swipe = {
	left : function() {
		var obj = document.getElementById('carousel');
		var left = $(obj).css('left').split('px')[0];
		var comp = -0.75 * $(obj).width();
		
		if ( pub.swipe.dest > 0 ) {
			pub.swipe.dest = 0;
		}
		if ( pub.swipe.dest < comp ) {
			pub.swipe.dest = comp;
		}
		
		if( left > pub.swipe.dest ) {
			$(obj).css('left','-='+pub.mov);
			window.requestAnimFrame( swipe.left );
		}
	} ,
	
	right : function() {
		var obj = document.getElementById('carousel');
		var left = $(obj).css('left').split('px')[0];
		var comp = -0.75 * $(obj).width();
		
		if ( pub.swipe.dest > 0 ) {
			pub.swipe.dest = 0;
		}
		if ( pub.swipe.dest < comp ) {
			pub.swipe.dest = comp;
		}
		
		if( left < pub.swipe.dest ) {
			$(obj).css('left','+='+pub.mov);
			window.requestAnimFrame(  swipe.right );
		}
	} ,
}

$(document).ready(function(){
	resizeWindow();
	var el = document.getElementById('carousel');
	
	var i = 100;
	pub.mov = $('#carousel').width() / i ;
	
	while ( pub.mov % 1 > 0 ) {
		i++;
		pub.mov = $('#carousel').width() / i ;
	}
	
	console.log(pub.mov);
	
	var hammertime = Hammer(el).on("swipeleft", function(event) {
		var obj = document.getElementById('carousel');
		var left = $(obj).css('left').split('px')[0];
		
		
		pub.swipe.dest = pub.swipe.dest - 0.25 * $(obj).width();
		
		
		window.requestAnimFrame(  swipe.left );
	});
	
	var hammertime = Hammer(el).on("swiperight", function(event) {	
		var obj = document.getElementById('carousel');
		var left = $(obj).css('left').split('px')[0];
		
		pub.swipe.dest = pub.swipe.dest + 0.25 * $(obj).width();
		
		
		window.requestAnimFrame(  swipe.right );
	});
	
});

$(window).resize(function() {
	resizeWindow();
});
