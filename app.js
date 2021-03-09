//OBJECTID FOR MONGO ID
const {ObjectId} = require('bson');
//EXPRESS SERVER
var express= require('express');
var app = express();
//MONGO CLIENT DECLARATION
const { MongoClient } = require('mongodb');
//MONGO DB URL
var url= 'mongodb://localhost:27017';
//file System OBJECT
const fs = require('fs');
//PATH OBJECT 
const path = require('path')
//formadable Object
const formidable = require('formidable');
//Enable API FOR USING BY another application
app.use((req,res,next)=>{
    res.header('Access-Control-Allow-Origin','*');
    res.header('Access-Control-Allow-Headers','Origin, XX-Requested-With, Content-Type, Accept, Authorization');
    res.header('Access-Control-Allow-Methods','GET,PUT,POST,DELETE,PATCH,HEAD');
    next();
})
//require LOGIN FUNCTION
app.get('/token/:id',(req,res,next)=> {
    const token = req.params.id;
    MongoClient.connect(url,(err,db)=>{
        if(err){
            throw(err);
        }
        try{
        dbo =db.db('test');
        dbo.collection('infos').findOne({_id: ObjectId(token)},(err,resl)=>{
            console.log(resl);
            if(resl != null){
                res.send({success:true, token: token, data:resl});
            }else{
                res.send({success: false,msg:'INVALID TOKEN'});
            }
        })
    } catch{
        res.send({success: false,msg:'INVALID TOKEN'})
    }
    })
})
//API LOGIN
app.post("/loginUser",(req,res)=>{
    console.log('login working');
    var body=[];
    var reqBody={};
    req.on('data',(chunk)=>{
        body.push(chunk);
    }).on('end',()=>{
        body= Buffer.concat(body).toString();
        reqBody= Json.parse(body);
        mail= reqBody.mail;
        password= reqBody.password;
        MongoClient.connect(url,(err,db)=>{
            if (err) {
                throw(err);
            }
            dbo=db.db('test');
            dbo.collection('infos').findOne({mail: mail, password: password},(err,resl)=>{
                console.log('login working');
                resl.send({success:true, token: resl._id});
            })
        })
    })

})
/*app.all("/app",reqLog,(req,res,next)=>{
   
    next();
})*/
//GET API
app.get('/app/',(req,res)=>{
    const token = req.headers.authorization;
    MongoClient.connect(url,(err,db)=>{
        if(err){
            throw(err);
        }
        dbo =db.db('test');
        dbo.collection('infos').findOne({_id: ObjectId(token)},(err,resl)=>{
            if(resl){
                dbo.collection('infos').find({}).toArray((err,resf)=>{
                    res.send(resf);
                })
            }
        })
    })
})
//ADD FILE API
app.post("/app/upload/:mail", (req, res, next) => { 
    const token = req.headers.authorization;
    var imgName = req.params.mail.toString().replace('.', '');
    console.log(imgName);
    MongoClient.connect(url,(err,db)=>{
        if(err){
            throw(err);
        }
        dbo =db.db('test');
        dbo.collection('infos').findOne({_id: ObjectId(token)},(err,resl)=>{
            if(resl){
                    const form = new formidable.IncomingForm(); 
                    form.parse(req, function(err, fields, files){ 
                        var oldPath = files.profilePic.path; 
                        files.profilePic.name = imgName;
                        var newPath = path.join(__dirname, 'front/public') 
                                + '/'+files.profilePic.name 
                        var rawData = fs.readFileSync(oldPath) 
                    
                        fs.writeFile(newPath, rawData, function(err){ 
                            if(err) console.log(err)  
                            return res.send("Successfully uploaded");
                            
                        }) 
                }) }else{
                    res.send({success: false, msg: 'require Login'});
                }
            })
        })
}); 
//ADD OBJECT API
app.post("/app",(req,res)=>{
    const token = req.headers.authorization;
    MongoClient.connect(url,(err,db)=>{
        if(err){
            throw(err);
        }
        dbo =db.db('test');
        dbo.collection('infos').findOne({_id: ObjectId(token)},(err,resl)=>{
            if(resl){
                var body= [];
                var reqBody={};
                req.on('data',(chunk)=>{
                    body.push(chunk);
                }).on('end',()=>{
                    body = Buffer.concat(body).toString();
                    reqBody= JSON.parse(body);
                    var data = reqBody;
                    resp= {success:true, data: reqBody}
                    var mail= reqBody.mail;
                    if (mail) {
                        dbo.collection('infos').findOne({mail:mail}, (err,resfo)=>{
                            if (resfo) {
                                res.send({success: false, msg:'mail existent!!!'})
                            }else{
                                dbo.collection('infos').insertOne(reqBody,(err,resI)=>{
                                    console.log('upload working');
                                    res.send(resp);
                                })
                            }

                        })
                        
                    
                    }else{
                        res.send({success:'forbidden', msg: 'mail required!!!'})
                    }
                    
                })    
            }else{
                res.send({success: false, msg: 'require Login'});
            }
        })
    })
    console.log('upload working');
    
})
//PUT(update) API
app.put('/app',(req,res)=>{
    const token = req.headers.authorization;
    MongoClient.connect(url,(err,db)=>{
        if(err){
            throw(err);
        }
        dbo =db.db('test');
        dbo.collection('infos').findOne({_id: ObjectId(token)},(err,resl)=>{
            if(resl){
                body=[];
                reqBody={};
                req.on('data',(chunk)=>{
                    body.push(chunk);
                }).on('end',()=>{
                    body=Buffer.concat(body).toString();
                    reqBody=JSON.parse(body);
                    id= reqBody.id;
                    dbo.collection('infos').updateOne({_id:ObjectId(id)},{$set: reqBody},(err,resU)=>{
                        res.send({success:true, msg:'OBJECT UPDATED!!!'});
                    })
                })
            }
        })
    })   
})
//DELETE API
app.delete('/app/:id',(req,res)=>{
    const token = req.headers.authorization;
    const id = req.params.id;
    MongoClient.connect(url,(err,db)=>{
        if(err){
            throw(err);
        }
        dbo =db.db('test');
        dbo.collection('infos').findOne({_id: ObjectId(token)},(err,resl)=>{
            if(resl){
                    dbo.collection('infos').deleteOne({_id:ObjectId(id)},(err,resU)=>{
                        res.send({success:true, msg:'OBJECT deleted!!!'});
                    })
              
            }
        })
        })
})
//FILE EXISTENT API
app.post('/app/exists/:filename',(req,res)=>{
    const path = 'C:/Users/All Tech/Desktop/form/front/public' +'/' + req.params.filename;
    console.log(path);

        try {
        if (fs.existsSync(path)) {
            res.send({success:true});
        }else{
            res.send({success:false});
        }
        } catch(err) {
        console.error(err)
        }
})
//SERVER RUNNING
app.listen(8050,()=>{
    console.log("Server Running...");
})