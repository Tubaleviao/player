var musics;

function setMusics(musicsJs){
	musics = musicsJs;
}

function addMusics(){
	var $musics = $('.musics');
	musics.forEach(function(music){
		if(music.slice(-4) == '.mp3'){
			var $trash = $('<div>').addClass('trash').text('D');
			var $el = $('<div>').addClass('music').text(music);
			var $li = $('<li>').append($el,$trash);
			$musics.append($li);
		}
	});
}

$(document).ready(function(){

	var next = musics[Math.floor(Math.random()*musics.length)];

	$('.checkbox').click(function(){
		$(this).toggleClass('checked');
	});
	
	$('.trash').click(function(){
		var song = $(this).closest('li').children('.music').text();
		if(confirm('Do you really want to delete '+song.slice(0,-4)+'?')){
			var form = document.createElement('form');
			form.setAttribute("method", 'post');
			form.setAttribute("action", 'delete');
			var input = document.createElement('input');
			input.setAttribute('type', 'hidden');
			input.setAttribute('name', 'song');
			input.setAttribute('value', song);
			form.appendChild(input);
			document.body.appendChild(form);
			form.submit();
		}
	});
	
	$('.trash').mouseover(function(){
		$(this).closest('li').children('.music').css('text-decoration', 'underline');
	});
	$('.trash').mouseout(function(){
		$(this).closest('li').children('.music').css('text-decoration', 'none');
	});

	$('.search').on('input', function(){
		$("li:not(:contains('"+$(this).val().toLowerCase()+"'))").hide();
		$("li:contains('"+$(this).val().toLowerCase()+"')").show();
	});

	$('.music').click(function(event){
		$('#audio').attr('src', 'musics/'+$(this).text());
		$('#np').text($(this).text());
	});

	$('audio').on('ended',function(){
	    if($('.repeat').hasClass('checked')){
	    	$('#audio').currentTime = 0;
	    } else if($('.random').hasClass('checked')){
	    	next = musics[Math.floor(Math.random()*musics.length)];
	    	$('#audio').attr('src', 'musics/'+next);
	    	$('#np').text(next);
		}
	});

	$('.next').click(function(){
		next = musics[Math.floor(Math.random()*musics.length)];
    	$('#audio').attr('src', 'musics/'+next);
    	$('#np').text(next);
	});

	$('#audio').attr('src', 'musics/'+next);
	$('#np').text(next);
	
});
