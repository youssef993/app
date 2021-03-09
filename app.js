const { ObjectId } = require('bson');
const express = require('express');
var formidable = require('formidable');

var fs = require('fs');
const app = express();
const port = 8070;
var url = 'mongodb://localhost:27017'
/****************************************** */
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.header('Access-Control-Allow-Methods', "GET,HEAD,PUT,PATCH,POST,DELETE");
  next();
});
/******************************************** */
app.post ('/ajout', (req, res)=>{
  var body=[]
  var reqBody={}
  req.on('data',(chunk)=>{
    body.push(chunk);}).on('end',()=>{
      body = Buffer.concat(body).toString();
      reqBody=JSON.parse(body);
      var obj= {
        article: reqBody.article,
        ID1 : reqBody.ID1,
        disp : true,
      }
      var data =obj;
      resp={success : true, data: obj} ;
      var ID1=reqBody.ID1;
      const {MongoClient} =require('mongodb');
        MongoClient.connect(url,(err,db)=>{
        if(err){ throw(err)}
        dbo =db.db('SIAMEDB');
        dbo.collection('composants').findOne({ID1:ID1},(err,resfo)=>{
          if(resfo){
            res.send({success:false,message:'ID1 existant!!!'});
          }else{dbo.collection('composants'). insertOne(obj, (err, resI)=>{ res.send(resp);})}
        })        
      })})})
      /****************************************** */
app.put('/update',(req,res)=>{
  body =[]; 
  reqbody={};
  req.on('data',(chunk)=>{
    body.push(chunk);
  } ).on('end',()=>{
    body=Buffer.concat(body).toString();
    reqbody=JSON.parse(body);
    id= reqbody.id;
    disp = reqbody.disp;
   if(disp) {
     const{MongoClient}=require('mongodb');
    MongoClient.connect(url,(err,db)=>{
      if(err){
        throw(err)
      }
      reqbody.disp = false;
      dbo=db.db('SIAMEDB');
      dbo.collection('composants').updateOne({_id:ObjectId(id)},{$set:reqbody},(err,resu)=>{
        res.send({success:true,message:'object updated'})
      })      
    })}else{
      res.send({success:false,message:'OBJECT COULD NOT UPDATED!!!'})
    }
  })
})
/******************************************** */
app.delete('/delete/:id',(req,res)=>{
  id=req.params.id
  const{MongoClient}=require('mongodb');
  MongoClient.connect(url,(err,db)=>{
    if(err){throw(err)}
    dbo=db.db('SIAMEDB');
    dbo.collection('composants').findOne({_id:ObjectId(id)},(err,resf)=>{console.log(resf);
      if(resf){
        dbo.collection('composants').deleteOne({_id:ObjectId(id)},(err,resd)=>{
          res.send({success:true,message:'object deleted'});
        })
      }else{
        res.send({success:false,message:'object dosen t exist!!!'});
      }
  
  }) 
})})
/*********************************** */
app.post('/addprod',(req,res)=>{
  body= [];
  reqBody={};
  req.on('data',(chunk)=>{
    body.push(chunk);
  }).on('end',()=>{
    body= Buffer.concat(body).toString();
    reqBody= JSON.parse(body);
    obj={
      produit: reqBody.produit,
      id3: null,
      composants: [],
      ordreDeFabrication:reqBody.ordreDeFabrication,
      statut: 'encours'
    }
    data = obj;
   if(obj.ordreDeFabrication!= null) {const {MongoClient} = require('mongodb');
    MongoClient.connect(url,(err,db)=>{
      if (err) {
        throw(err);
      }
      dbo = db.db('SIAMEDB');
      dbo.collection('produit').insertOne(obj, (err, resi)=>{
        res.send({success: true, data: obj});
      })

    })
  }else{
    res.send({success: false, message: 'of could not be null!!!'});
  }
  })
})
/********************************** */
app.put('/updcompprod/:ID1',(req,res)=>{
  ID1= req.params.ID1;
  const {MongoClient} = require('mongodb');
  MongoClient.connect(url,(err,db)=>{
    if(err){
      throw(err);
    }
    dbo = db.db('SIAMEDB');
    dbo.collection('composants').findOne({ID1: ID1, disp: true},(err,resf)=>{
      if(resf){
        resf.disp = false
        dbo.collection('composants').updateOne({ID1: ID1},{$set:resf},(err,resu)=>{
          console.log('object updated');
        })
        var body=[]
        var reqBody={}
        req.on('data',(chunk)=>{
           body.push(chunk);}).on('end',()=>{
            body= Buffer.concat(body).toString();
            reqBody= JSON.parse(body);
            id= reqBody.id;
            ID3= reqBody.id3;
                        
            if(ID3){
              resf.disp = true
              dbo.collection('composants').updateOne({ID1: ID1},{$set:resf},(err,resu)=>{
                res.send({success: false, message:'ID3 EXIST COULD NOT ADD DATA'})
              })
            }else{
              console.log(resf);
              reqBody.composants.push(resf);            
            dbo.collection('produit').updateOne({_id:ObjectId(id)}, {$set: reqBody},(err,resu)=>{
              res.send({success: true, message:'composant inserted'})
            })}
           })
      }else{
        res.send({success:false, message:'composant inexitent ou affecter!!!!'})
      }
    })
  })

})
/*********************************** */
app.get('/verifsn/:of/:sn',(req,res)=>{
  var of = req.params.of
  var sn= req.params.sn
  if(of != null && sn != null){
    const {MongoClient} = require('mongodb');
    MongoClient.connect(url,(err,db)=>{
      if(err){
        throw (err);
      }
      dbo = db.db('SIAMEDB');
      dbo.collection('produit').findOne({ordreDeFabrication: of},(err,resf)=>{
        if(resf){
          const comp = resf.composants.find(comp => comp.ID1 == sn );
          if(comp){
            res.send({success: true, message:"component exist!!!"})
          }else{
            res.send({success: false, message:"component dosent exist, please verify your sn!!!"})
          }
        }else{
          res.send({success: false, message:"of dosent exist, please verify your of!!!"})
        }
      })
    })
  
  }else{
    res.send({success: false, message:"OF OR SN NOT VALIDE!!!, PLEASE ENTER AGAIN"})
  }
})
/**************************************************** */
app.get('/encours',(req,res)=>{
  const {MongoClient} = require('mongodb');
    MongoClient.connect(url,(err,db)=>{
      if(err){
        throw(err);
      }
      dbo= db.db('SIAMEDB');
      dbo.collection('produit').find({statut: 'encours'}).toArray((err,resf)=>{
        res.send(resf);
      })
    })
})
/*************************************************** */
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
}) 