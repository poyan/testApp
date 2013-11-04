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
 
var test = {
	run: function() {
		alert('Hello Arbe');
	}
}

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

$(document).ready(function(){
	resizeWindow();
});

$(window).resize(function() {
	resizeWindow();
});