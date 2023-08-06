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
  let sqlQuery = `SELECT * FROM products WHERE active_status = 1`;
  
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
   

app.post('/v1/api/add-products', (req, res) => {
    const data = req.body;
  
    let sqlQuery = 'INSERT INTO transactions (user_id, product_id, order_amount) VALUES ?';
  
    const values = data.map((product) => [
      product.user_id,
      product.product_id,
      product.order_amount,
    ]);
  
    conn.query(sqlQuery, [values], (err, results) => {
      if (err) {
        res.json({
            status: 500,
            success: false,
            message:"Save Failed",
        });
      } else {
        res.json({
            status: 200,
            success: true,
            message:"Save successfully",
        });
      }
    });
  });
   


   
