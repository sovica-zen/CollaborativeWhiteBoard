//const sqlite3 = require('sqlite3').verbose();

const db = require('better-sqlite3')('DB.db');
const fs = require('fs')

var insertUser = function(usr, pw){
  var stmt = db.prepare(
    'INSERT INTO User (username, password) VALUES (?, ?)'
    );
    
  var result = stmt.run(usr, pw)
  console.log("result:", result)
  return result
}

var getUser = function(username, password){
  var stmt = db.prepare(
    'SELECT username, password FROM User WHERE username = ? AND password = ?'
    );
  var userdata = stmt.get(username,password);
  console.log(userdata)
  if (typeof userdata !== "undefined"){
    return userdata;
  }
  else return {username: "MISSING", password:"MISSING"}
}


var insertImage = function(imgData){
  var dataUrl = imgData.dataURL.replace(/^data:image\/jpeg;base64,/,"")
  var name = imgData.name
  var author = imgData.author 
  var pub = imgData.public
  let buf = Buffer.from(dataUrl, 'base64');
  fs.writeFileSync(`./public/images/${name}.jpg`, buf);

  var stmt = db.prepare(
    'INSERT INTO Image (name, author_id, public) VALUES (?, ?, ?) '
  )
  
  stmt.run([name, author, pub])
  //console.log("inserted image into database")
  
}

var getImages = function(username){
  if (username !== undefined){
    const stmt = db.prepare('SELECT * FROM Image WHERE author_id = ?');
    data = stmt.all(username)
    return data
  }
  else {
    const stmt = db.prepare('SELECT * FROM Image');
    data = stmt.all()
    return data
  }
}

module.exports = {db, getImages, getUser, insertImage, insertUser}
