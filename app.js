const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mysql = require('mysql');
const cors = require('cors');

app.use(cors());
app.use(bodyParser.json());

const conn = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'jomma'
});

conn.connect((err) =>{
  if(err) 
    throw err;
  else{
    app.listen(5000,() =>{
        console.log('Server started on port 5000...');
      });
  }
});

app.get('/v1/api/products',(req, res) => {
  let sqlQuery = "SELECT * FROM products";
  
  let query = conn.query(sqlQuery, (err, results) => {
    if(err) throw err;
    res.json({
        status: 200,
        success: true,
        message:"All products retrives successfully",
        data: results
    });
  });
});
   

   

app.post('/v1/api/items',(req, res) => {
  let data = {title: req.body.title, body: req.body.body};
  
  let sqlQuery = "INSERT INTO items SET ?";
  
  let query = conn.query(sqlQuery, data,(err, results) => {
    if(err) throw err;
    res.send(apiResponse(results));
  });
});
   


   
