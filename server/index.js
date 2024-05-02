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
    const leadcheck = "SELECT * FROM new_lead WHERE email = ? AND unique_id =?";

    // Insert Data into Database table new_lead
    const uniqueid = phone.toString().slice(0, -5);
    const sqlInsert = "INSERT INTO new_lead (unique_id,fullname,email,number,requirements) VALUES (?,?,?,?,?)";
    // Create Table for Client
    const client_table = uniqueid;
    const query = (`CREATE TABLE IF NOT EXISTS \`${client_table}\` (
        uid SERIAL PRIMARY KEY,
        clientid VARCHAR(30) NOT NULL,
        message LONGTEXT NOT NULL,
        sent_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )`);
    con.query(leadcheck,[email,unique_id],(err,result)=>{
       if (err) {
            console.error(err);
            res.status(500).send({ message: "Internal server error" });
       } else if (result.length > 0) {
            res.send({ message: 'Client already exists' });
       } else{
            con.query(sqlInsert,[uniqueid,fullname,email,phone,requirements],(dberr,dbresult)=>{
                if (dberr) {
                    console.error(dberr);
                    res.send({ message: "Error in creating Leads in Database" });
                } else {
                    con.query(query, (clienterr, result) => {
                        if (clienterr) {
                            console.error(clienterr);
                            res.send({ message: "Error in creating Clients Table in Database" });
                        } else {
                            res.send({ message: 'Lead created successfully.' });
                        }
                    });                 
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

// New Messages
app.post('/newmessages', (req, res) => {
    const { uniqueid, message } = req.body;
    const sqlInsert = `INSERT INTO \`${uniqueid}\` (clientid,message) VALUES (?,?)`;
    console.log('Lead Data',uniqueid)
    con.query(sqlInsert, [uniqueid, message], (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send({ message: "Internal server error" });
      } else {
        res.status(200).send({ message: 'Message sent successfully.' }); // Use res.status(status).send(body)
      }
    });
  });

// Get New Messges from Database table 
app.get('/clientmessage/:uniqueid',(req,res)=>{
    const {uniqueid} = req.params;
    const sqlGet = `SELECT * FROM \`${uniqueid}\``;
    con.query(sqlGet,(err,result)=>{
        if (err) {
            console.error(err);
            res.status(500).send({ message: "Internal server error" });
        } else {
            res.send(result);
        }
    })
})

app.post('/closedlead', (req, res) => {
    const { created_at, name, email, phone, finalrequirement, closingreason } = req.body;
    const sqlInsert = "INSERT INTO closed_leads (fullname,email,number,requirements,reason,created_at) VALUES (?,?,?,?,?,?)";
    const sqlDelete = `DELETE FROM new_lead WHERE email = ?`;

    con.query(sqlInsert, [name, email, phone, finalrequirement, closingreason, created_at], (insertErr, insertResult) => {
        if (insertErr) {
            console.error(insertErr);
            res.status(500).send({ message: "Internal server error in inserting data" });
        } else {
            con.query(sqlDelete, [email], (deleteErr, deleteResult) => {
                if (deleteErr) {
                    console.error(deleteErr);
                    res.status(500).send({ message: "Internal Server error in deleting" });
                } else {
                    res.send({ message: "Client Closed" });
                }
            });
        }
    });
});


app.get('/closedLeadlist', (req, res) => {
    const sqlClosedLead = "SELECT * FROM closed_leads";
    con.query(sqlClosedLead, (err, result) => {
        if (err) {
            res.send({ Message: "Error in SQL Query in /closedLeadlist API" });
        } else {
            res.send(result);
        }
    });
});

app.listen(3002,'192.168.1.11',()=>{
     console.log('Server is successfully runnig on 3002 port')
});

