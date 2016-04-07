var fs = require('fs');

exports.player = function(req, res){
	fs.readdir(__dirname+'/public/musics', function(err, files){
		if(err) throw err;
		res.render('player', {
			musics: files
		});
	});
};

exports.delete = function(req, res){
	fs.unlink(__dirname+'/public/musics/'+req.body.song, function(err, resp){
		if(err) {console.log(err)};
	});
	
	fs.readdir(__dirname+'/public/musics', function(err, files){
		if(err) throw err;
		res.render('player', {
			musics: files
		});
	});
};
