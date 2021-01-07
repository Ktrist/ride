var express = require('express');
var router = express.Router();

/* SECURE PASSWORD*/ 
var uid2 = require("uid2");
var SHA256 = require("crypto-js/sha256");
var encBase64 = require("crypto-js/enc-base64");

/* IMPORT MODEL*/ 
var articleModel = require('../models/articles');
var orderModel = require('../models/orders');
var userModel = require('../models/users');


const bodyParser = require('body-parser');

/* CLOUDINARY*/ 
var uniqid = require('uniqid');
const fs = require('fs');
const { exec } = require('child_process');
var cloudinary = require('cloudinary').v2;

cloudinary.config({ 
  cloud_name: 'tristanka', 
  api_key: '418447595518584', 
  api_secret: 'fvXUnlecitiM2DEVck39KCdWf1Q' 
});


// ROAD //

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* POST CREATE ARTICLE */ 


router.post('/create-article', async function(req, res, next) {

  var error = []

  if (req.body.titleFromFront == ''
  || req.body.descriptionFromFront == ''
  || req.body.brandFromFront == ''
  || req.body.priceFromFront == ''
) {
  error.push('Empty Field')
  res.json({ error })

} else {

    let newArticle = new articleModel({
        title:req.body.titleFromFront,
        description:req.body.descriptionFromFront,
        brand:req.body.brandFromFront,
        price:req.body.priceFromFront,
        shippingFees:req.body.shippingFeesFromFront,
        category:req.body.categoryFromFront,
        subcategory:req.body.subcategoryFromFront,
        state:req.body.stateFromFront,
        sellerToken:req.body.sellerToken,
        images:JSON.parse(req.body.imagesFromFront),
        creationDate:new Date(),
        isVisible:true
      })
    
    saveArticle = await newArticle.save()
    console.log("ARTICLE SAVED : ",saveArticle)

}

});


/* GET ALL ARTICLES */ 

router.get('/get-all-articles', async function(req, res, next) {


    let products = await articleModel.find({isVisible:true}).sort({creationDate:-1})
    console.log(products)
    res.json({products});
  
});

/* POST UPLOAD */ 


router.post('/upload', async function(req, res, next) {

  console.log(req.files.avatar.name);
  console.log(req.files.avatar.mimetype);
  console.log(req.files.avatar.data);

  var imagePath = './tmp/'+uniqid()+'.jpg'
  console.log("hello2-------------- imagePath",imagePath)

  var resultCopy = await req.files.avatar.mv(imagePath);
    console.log("fichiers",req.files.avatar)
    console.log("hello3-----------resultCopy", resultCopy)

  if(!resultCopy) {    
    var resultCloudinary = await cloudinary.uploader.upload(imagePath);
    res.json(resultCloudinary);
    console.log("hello4 ----------- resultCloudinary",resultCloudinary)
  } else {
    res.json( {error:resultCopy} );
  } 

  fs.unlinkSync(imagePath);
});

/* GET ARTICLE BY SELLER */ 


router.get('/get-article-by-seller', async function(req, res, next) {

  console.log(req.query)
  let products = await articleModel.find({sellerToken:req.query.SellerToken}).sort({creationDate:-1}) 
  console.log('product by seller-----------------',products)
  res.json({products});

});

/* GET ARTICLE BY BUYER */ 


router.get('/get-article-by-buyer', async function(req, res, next) {

console.log('route get article by buyer',req.query)
 
var order = await orderModel.find({clientId:req.query.buyerToken});

console.log(order);

var articlesTab=[];
var articlesTabValidate=[];
for (var i=0;i<order.length;i++){ 
if(order[i].orderState=='En cours'){ 
var articles= await articleModel.findOne({_id:order[i].articleId})
articlesTab.push(articles);
 } else {
var articles= await articleModel.findOne({_id:order[i].articleId})
articlesTabValidate.push(articles);
 } 
}

console.log(articlesTab);
console.log(articlesTabValidate);
  
res.json({articlesTab,articlesTabValidate});
});
// ---------------- travail sur route delete dans mes annonces



/* POST DELETE ARTICLE*/ 

router.post('/delete-article', async function(req, res, next) {

  var returnDb = await articleModel.deleteOne({ _id: req.body.idArticle})
 

  var result = false
  if(returnDb.deletedCount == 1){
    result = true
  }

  res.json({result})
});

// ---------------- fin travail sur route delete dans mes annonces



router.post('/validate-order', async function(req, res, next) {
    
  console.log('route validate order req.body:',req.body)

  let newOrder = new orderModel

     ({
       
       articleId:req.body.articleId,
       clientId:req.body.clientToken,
       orderState:'En cours',
       orderDate:new Date()
       
     })
  
  let result = false;
  var saveOrder = await newOrder.save()

  let findArticle= await articleModel.updateOne(
  { _id: req.body.articleId},
  { isVisible:false }
  );

  console.log(findArticle);

  if(saveOrder&&findArticle){
   result = true
  }

 res.json({result,saveOrder,findArticle})

});

router.get('/receive-order', async function(req, res, next) {

var today= new Date()
function formatDate(date){
  var newDate = new Date(date);
  var finalFormat = newDate.getDate()+"/"+(newDate.getMonth()+1)+"/"+newDate.getFullYear();
  return finalFormat;
}

//updating the status of the order
let order = await orderModel.updateOne(
  
  {articleId:req.query.idArticle},
  {orderState:`validé le ${(formatDate(today))}`} )
  
res.json(order)

})


// USER ROAD //


router.post('/sign-up', async function(req,res,next){

  var error = []
  var result = false
  var saveUser = null

  const data = await userModel.findOne({
    email: req.body.emailFromFront
  })

  if(data != null){
    error.push('User already sign in')
  }

  if(req.body.firstNameFromFront == ''
  || req.body.lastNameFromFront ==''
  || req.body.emailFromFront == ''
  || req.body.passwordFromFront == ''
  ){
    error.push('Empty fields')
  }


  if(error.length == 0){
    var salt = uid2(32);
    var newUser = new userModel({
      firstName: req.body.firstNameFromFront,
      lastName: req.body.lastNameFromFront,
      email:req.body.emailFromFront,
      address:req.body.addressFromFront,
      city:req.body.cityFromFront,
      postalCode:req.body.postalCodeFromFront,
      salt:salt,
      moneyWallet:0,
      password: SHA256(req.body.passwordFromFront+salt).toString(encBase64),
      token:uid2(32)
    })
    console.log(newUser)

    saveUser = await newUser.save()

    console.log(saveUser)
    
    
    if(saveUser){
      result = true
      token = saveUser.token
    }
  }

  res.json({result, saveUser, error, token})
  
  console.log(saveUser, token);

})

router.post('/sign-in', async function(req,res,next){

  var result = false
  var user = null
  var error = []
  var token = null

  
  if(req.body.emailFromFront == ''
  || req.body.passwordFromFront == ''
  ){
    error.push('Empty fields')
  }

  if(error.length == 0){
    
  user = await userModel.findOne({
  email: req.body.emailFromFront
})

if(user){
  const passwordHash = SHA256(req.body.passwordFromFront + user.salt).toString(encBase64);
  var token = user.token
  console.log(passwordHash)
  console.log(user.password)
  if(passwordHash == user.password){
    
    result = true
    token=user.token
    console.log('user is',user)

  } else {
    result = false
    error.push('incorrect password')
  }
} else {
  error.push('incorrect email')
}
  }
  res.json({result, user, token, error})
})

router.get('/get-seller', async function(req, res, next) {
  let data = await userModel.findOne({token:req.query.SellerToken})
  console.log('GET SELLER', data)

  res.json(data)

});

router.get('/get-user', async function(req, res, next) {
  let data = await userModel.findOne({token:req.query.UserToken})
  console.log('GET USER', data)
  res.json({data});
});





module.exports = router;

