var express = require('express'),
app = express(),
http = require('http'),
server = http.createServer(app),
port = process.env.PORT || 80,
routes = require('./routes'),
multer  = require('multer'),
storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, __dirname + '/public/musics/');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
}),
upload = multer({ storage: storage }),
bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/public'));
app.set('views', __dirname+'/views');
app.set('view engine', 'ejs');

app.get('/', routes.player);
app.post('/delete', routes.delete);

app.post('/upload', upload.array('songs'), function (req, res, next) {
    //console.log(req.files);
    res.redirect('/');
});

server.listen(port, function(){console.log("Server at the port %d", port);});
