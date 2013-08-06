var express = require('express')
,   init = require('./init')
,   asyncDo = require('./libs/asyncDo')
,   db = require('mongoskin').db('localhost:27017/umitime');

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
    var bands = [], todos = asyncDo.todos([1, 2, 3]);
    db.collection('bands').find({year: 1984}).toArray(function(err, result) {
        var bands = [];
        for (var i = 0; i < result.length; i++) {
            bands.push('<p>band name: ', result[i].name ,' @', result[i].year ,'</p>');
        }
        todos.done(1, {
            'bands': bands.join('')
        });
    });
    db.collection('bands').find({year: 1985}).toArray(function(err, result) {
        var bands = [];
        for (var i = 0; i < result.length; i++) {
            bands.push('<p>band name: ', result[i].name ,' @', result[i].year ,'</p>');
        }
        todos.done(2, {
            'bands2': bands.join('')
        });
    });
    db.collection('bands').find({year: 2002}).toArray(function(err, result) {
        var bands = [];
        for (var i = 0; i < result.length; i++) {
            bands.push('<p>band name: ', result[i].name ,' @', result[i].year ,'</p>');
        }
        todos.done(3, {
            'bands3': bands.join('')
        });
    });

    todos.allDone(function (dones) {
        res.send('hello world!...<a href="javascript:self.close()" >关闭窗口</a>' + dones.bands + dones.bands2 + dones.bands3);
    });
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