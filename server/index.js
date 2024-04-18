const express = require('express');
const mysql   = require('mysql');
const cors    = require('cors');
const bodyParser = require('body-parser');
const app = express();

app.use(cors());
app.use(bodyParser.json());

//database connection
const con = mysql.createConnection(
    {
        host:'localhost',
        user:'root',
        password:'',
        database:'crm'
    }
);
// Use Login
app.post('/login',(req,res)=>{
    
});
// Create Leads
app.post('/createlead',(req,res)=>{
    const{fullname,email,phone,requirements} = req.body;
    const leadcheck = "SELECT * FROM new_lead WHERE email = ?";

    // Insert Data into Database table new_lead
    const uniqueid = phone.toString().slice(0, -5);
    const sqlInsert = "INSERT INTO new_lead (unique_id,fullname,email,number,requirements) VALUES (?,?,?,?,?)";
    con.query(leadcheck,[email],(err,result)=>{
       if (err) {
            console.error(err);
            res.status(500).send({ message: "Internal server error" });
       } else if (result.length > 0) {
            res.send({ message: 'Client already exists' });
       } else{
            con.query(sqlInsert,[uniqueid,fullname,email,phone,requirements],(dberr,dbresult)=>{
                if (dberr) {
                    console.error(err);
                    res.send({ message: "Error in creating Leads in Database" });
                } else {
                    res.send({ message: 'Lead created successfully.' });
                }
            });
       }
    })
})

// Get Data from Database table new_leads
app.get('/newclient',(req,res)=>{
  const sqlGet = "SELECT * FROM new_lead";
  con.query(sqlGet,(err,result)=>{
      if (err) {
          console.error(err);
          res.status(500).send({ message: "Internal server error" });
      } else {
          res.send(result);
      }
  })
});
app.listen(3002,'192.168.1.4',()=>{
     console.log('Server is successfully runnig on 3002 port')
});
