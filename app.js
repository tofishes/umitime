var express = require('express')
,   init = require('./init');

var app = express();
// var package = require('./package.json');

// middleware
app.use(express.bodyParser());
app.use(express.methodOverride());

app.use(express.cookieParser());
app.use(express.session({secret: "umitime secret"}));
// used for uncaughExcption，不会因未捕捉的异常导致服务器内存占用
// app.use(connectDomain);

// static files
app.use('/assets', express.static(__dirname + '/assets'));
// app.engine('html', require('ejs').renderFile);
// // make ".html" the default
// app.set('view engine', 'html');

app.use('/', function(req, res, next){
    console.log('%s %s.....%s', req.method, req.url, req.params);
    next();
});

// init routes
init(app);

app.get('/aa', function( req, res){
    res.send('hello world');
});

app.use(function(err, req, res, next){
    console.error(err.stack);
    res.send(500, 'Something broke!');
});

app.get('*', function(req, res){
    // res.render('404.html', {
    //     title: 'No Found'
    // })
});

app.listen(8000);