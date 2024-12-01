var express = require('express');
var router = express.Router();
var path = require('path');
const db = require('./../database');


router.get('/', (req, res) => {
  res.sendFile(path.resolve('react-client/build/index.html'))
});

// router.get('/editor', (req, res) => {
//   res.sendFile(path.resolve('react-client/build/index.html'))
// });

router.get('/test', (req, res) => {
  res.sendFile(path.resolve('public/test.html'))
});

router.get('/api/gallery', (req, res) => {
  usr = req.query.username
  if (usr !== undefined){
    //send user's images
    console.log("user accessed images: " + usr)
  }
  var imgs = db.getImages(usr)
  console.log(imgs)
  imgs.forEach(img=> {
    img.name = '/images/' + img.name + ".jpg"
  });
  res.send(imgs)
  //res.sendFile(path.resolve('public/images/' + imgs[0].name + '.jpg'))
});

router.get('/api/gallery/upload', (req, res) => {
  usr = req.query.username
  public = req.query.public



});

router.get('/signin', (req, res) => {
  usr = req.query.username
  pw = req.query.password
  if (usr === "" || pw === ""){
    res.send("username or password cannot be empty")
    return
  }
  data = db.getUser(usr, pw);
  console.log(data);
  
  if (data.username !== "MISSING" && data.password !== "MISSING"){
    res.send({token: "login_OK", status: "OK"})
    return
  }
  else {
    res.send({token: "LOGIN_ERROR", status: "ERROR"})
    return
  }
});


router.get('/signup', (req, res) => {
  usr = req.query.username
  pw = req.query.password
  if (db.getUser(usr, pw).username !== "MISSING"){
    res.send({token:"LOGIN_ERROR", error: "user already registered"})
    return
  }
  else if (usr === "" || pw === ""){
    res.send({token:"LOGIN_ERROR", error: "username or password cannot be empty"})
    return
  }
  result = db.insertUser(usr, pw);
  console.log(result);
  if (result.changes == 1){
    res.send({token: "login_OK", status: "OK"})
    return
  }
  else {
    res.send({token: "LOGIN_ERROR", status: "ERROR"})
    return
  }
});


module.exports = router;