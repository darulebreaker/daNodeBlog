/**
 * Created by darulebreaker on 10/13/13.
 */

var mongoose=require('mongoose'),
    express=require('express'),
    path=require('path'),
    application_root= __dirname;


app=express();

app.configure(function(){
   app.use(express.bodyParser());

   app.use(express.methodOverride());

   app.use(app.router);

   app.use(express.static(path.join(application_root,'site')));

   app.use(express.errorHandler({dumpExceptions:true,showStack: true}));


});


mongoose.connect('mongodb://localhost/myBlog');
var entrySchema = new mongoose.Schema({
    title: String,
    content: String
});

var EntryModel = mongoose.model('Entry',entrySchema);

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

})


app.post('/api/entries',function(req, res){
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
})

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


app.listen(3000);
console.log("started");