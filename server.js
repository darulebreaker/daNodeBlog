/**
 * Created by darulebreaker on 10/13/13.
 */

var mongoose=require('mongoose'),
    flash=require('connect-flash'),
    express=require('express'),
    path=require('path'),
    application_root= __dirname,
    passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy;

var users = [
    { id: 1, username: 'bob', password: 'secret', email: 'bob@example.com' }
    , { id: 2, username: 'joe', password: 'birthday', email: 'joe@example.com' }
];

function findById(id, fn) {
    var idx = id - 1;
    if (users[idx]) {
        fn(null, users[idx]);
    } else {
        fn(new Error('User ' + id + ' does not exist'));
    }
}

function findByUsername(username, fn) {
    for (var i = 0, len = users.length; i < len; i++) {
        var user = users[i];
        if (user.username === username) {
            return fn(null, user);
        }
    }
    return fn(null, null);
}


// Passport session setup.
//   To support persistent login sessions, Passport needs to be able to
//   serialize users into and deserialize users out of the session.  Typically,
//   this will be as simple as storing the user ID when serializing, and finding
//   the user by ID when deserializing.
passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    findById(id, function (err, user) {
        done(err, user);
    });
});


// Use the LocalStrategy within Passport.
//   Strategies in passport require a `verify` function, which accept
//   credentials (in this case, a username and password), and invoke a callback
//   with a user object.  In the real world, this would query a database;
//   however, in this example we are using a baked-in set of users.
passport.use(new LocalStrategy(
    function(username, password, done) {
        // asynchronous verification, for effect...
        process.nextTick(function () {

            // Find the user by username.  If there is no user with the given
            // username, or the password is not correct, set the user to `false` to
            // indicate failure and set a flash message.  Otherwise, return the
            // authenticated `user`.
            findByUsername(username, function(err, user) {
                if (err) { return done(err); }
                if (!user) { return done(null, false, { message: 'Unknown user ' + username }); }
                if (user.password != password) { return done(null, false, { message: 'Invalid password' }); }
                return done(null, user);
            })
        });
    }
));

app=express();



app.configure(function(){
//    app.use(express.cookieParser('keyboard cat'));
//    app.use(express.session({ cookie: { maxAge: 60000 }}));
//    app.use(flash());
    app.set('views', __dirname + '/views');
    app.set('view engine', 'ejs');

   app.use(express.bodyParser());

   app.use(express.methodOverride());
    app.use(express.cookieParser());
    app.use(express.session({ secret: 'keyboard cat' }));
    app.use(flash());
    app.use(passport.initialize());
    app.use(passport.session());


   app.use(app.router);

   app.use(express.static(path.join(application_root,'site')));

   app.use(express.errorHandler({dumpExceptions:true,showStack: true}));

//    app.use(passport.initialize());
//    app.use(passport.session());

});


mongoose.connect('mongodb://localhost/myBlog');
var entrySchema = new mongoose.Schema({
    title: String,
    content: String
});

var EntryModel = mongoose.model('Entry',entrySchema);

//var userSchema = new mongoose.Schema({
//   username: String,
//   password: String
//});
//
//var User= mongoose.model('User',userSchema);
//
//var user=new User({username:'admin',password:'awesome'});
//user.save(function(err){
//    if(!err){
//        console.log("created, usernme:"+ user.username);
//    }else{
//        console.log(err);
//    }
//});
//
//
//passport.use(new LocalStrategy(
//    function(username, password, done) {
//        User.findOne({ username: username }, function(err, user) {
//            if (err) { return done(err); }
//            if (!user) {
//                console.log(username + "doesnty exist")
//                return done(null, false, { message: 'Incorrect username.' });
//            }
//            if (!user.validPassword(password)) {
//                return done(null, false, { message: 'Incorrect password.' });
//            }
//            return done(null, user);
//        });
//    }
//));

app.get('/api/entries',function(req,res){
    EntryModel.find(function(err,blog){
        if(!err){
            return res.send(blog);
        }else{
            console.log(err);
        }
    });
});

app.get('/api/entries/:id',function(req,res){
    EntryModel.findById(req.params.id,function(error,entry){
        if(!err){
            return res.send(entry);
        }else {
            console.log(err);
        }

    });

});


app.post('/api/entries',function(req, res){
    console.log(req.body.title + req.body.content );
    var entry = new EntryModel({title:req.body.title,
                        content:req.body.content});
    entry.save(function(err){
        if(!err){
            console.log("created, title:"+ entry.title);
        }else{
            console.log(err);
        }
    });
    return res.send(entry);
});

app.put('/api/entries/:id',function(req,res){
    return EntryModel.findById(req.params.id, function(err,entry){
        entry.title=req.body.title;
        entry.content= req.body.content;

        return entry.save(function(err){
            if( !err ) {
                console.log( 'book updated' );
            } else {
                console.log( err );
            }
            return res.send( entry );
        });
    });


});


app.delete('/api/entries/:id', function(req,res){
    return EntryModel.findById(req.params.id, function(error,entry){
        return entry.remove(function(err){
            if(!err){
                console.log("removed");
                return res.send('');
            }else{
                console.log(err);
            }
        });

    });


});


//app.post('/login', function(req,res){
//    console.log(req.body.username + req.body.password);
//    passport.authenticate('local', { successRedirect: '/',
//        failureRedirect: '/login',
//        failureFlash: true })
//    }
//);
//
//app.get('/login',function(req,res){
//     return res.send("Please login");
//    });
app.get('/login', function(req, res){
    console.log("not in" + req.user);
    res.render('login', { user: req.user, message: req.flash('error') });
});

app.post('/login',
    passport.authenticate('local', { failureRedirect: '/login', failureFlash: true }),
    function(req, res) {
        res.redirect('/');
    });

//app.get('/', function(req, res){
//
//});

app.listen(4000);
console.log("started");
function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) { return next(); }
    res.redirect('/login')
}