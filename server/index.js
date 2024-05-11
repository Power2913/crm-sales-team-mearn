const express = require('express');
const mysql   = require('mysql');
const cors    = require('cors');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const multer  = require('multer');
const upload = multer({ dest: 'uploads/' });
const fs = require('fs');

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

// Mail transporter

const transporter = nodemailer.createTransport({
    host: 'email-smtp.ap-south-1.amazonaws.com',
    port: 587,
    secure: false,
    auth: {
        user: 'AKIARG6CI77DA4R656X3',
        pass: 'BKM6KD1eSstN4ElabXK0mLsQ5xfqomVPyuHvirlX6a8m'
    },
});




// Use Login
app.post('/login',(req,res)=>{
    
});
// Create Leads
app.post('/createlead',(req,res)=>{
    const{fullname,email,phone,company,requirements} = req.body;
    const leadcheck = "SELECT * FROM new_lead WHERE email = ? AND unique_id =?";

    // Insert Data into Database table new_lead
    const uniqueid = phone.toString().slice(0, -5);
    const sqlInsert = "INSERT INTO new_lead (unique_id,fullname,email,number,company,requirements) VALUES (?,?,?,?,?,?)";
    // Create Table for Client
    const client_table = uniqueid;

    const last_message = "INSERT INTO last_message (uid,clientName) VALUES (?,?)";

    const query = (`CREATE TABLE IF NOT EXISTS \`${client_table}\` (
        uid SERIAL PRIMARY KEY,
        clientid VARCHAR(30) NOT NULL,
        message LONGTEXT NOT NULL,
        sent_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )`);
    con.query(leadcheck,[email,uniqueid],(err,result)=>{
       if (err) {
            console.error(err);
            res.status(500).send({ message: "Internal server error" });
       } else if (result.length > 0) {
            res.send({ message: 'Client already exists' });
       } else{
            con.query(sqlInsert,[uniqueid,fullname,email,phone,company,requirements],(dberr,dbresult)=>{
                if (dberr) {
                    console.error(dberr);
                    res.send({ message: "Error in creating Leads in Database" });
                } else {
                    con.query(query, (clienterr, result) => {
                        if (clienterr) {
                            console.error(clienterr);
                            res.send({ message: "Error in creating Clients Table in Database" });
                        } else {
                            con.query(last_message,[uniqueid,fullname],(last_message_error,result)=>{
                                if (last_message_error) {
                                    res.send({ message: "Error in storing data in last_message table" });
                                } else {
                                    res.send({ message: 'Lead created successfully.' });
                                }
                            })
                          
                        }
                    });                 
                }
            });
       }
    })
})

// Get Data from Database table new_leads with pagination
app.get('/newclient', (req, res) => {
    const pageNumber = req.query.pageNumber || 1; // Default to first page
    const pageSize = 10; // Number of records per page
    const offset = (pageNumber - 1) * pageSize;

    const sqlGet = `  SELECT * FROM new_lead ORDER BY id DESC LIMIT ${pageSize} OFFSET ${offset}`;
  
    con.query(sqlGet, (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send({ message: "Internal server error" });
        } else {
            res.send(result);
        }
    });
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
// Lead Closing Form
app.post('/closedlead', (req, res) => {
    const { created_at, name, email, phone, finalrequirement, closingreason } = req.body;
    const sqlInsert = "INSERT INTO closed_leads (fullname,email,number,requirements,reason,created_at) VALUES (?,?,?,?,?,?)";
    const sqlDelete = `DELETE FROM new_lead WHERE email = ?`;
    // const sqlDeletelastseen = `DELETE FROM last_message WHERE uid = ?`;

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

// Closed Client List
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

// Set Lead Status to set
app.post('/successlead',(req,res)=>{
    const {uniqueid,name,email,phone} = req.body;

    const sqlsuccesslead = "INSERT INTO successful_lead (unique_id,fullname,email,phone) VALUES(?,?,?,?)";
    const sqlDelete = "DELETE FROM new_lead WHERE unique_id = ?";
    con.query(sqlsuccesslead,[uniqueid,name,email,phone],(err)=>{
       if (err) {
           res.status(500).send({Message:'Error in SQL query in successlead API'});
       } else {
           con.query(sqlDelete,[uniqueid],(err)=>{
             if (err) {
                console.error(deleteErr);
                res.status(500).send({ Message: "Internal Server error in deleting" });
             } else {
                res.send({Message:"Lead Status Success"});
             }
           });
       }
    })
});
// Get Successful lead data
app.get('/successfullead', (req, res) => {
    const sqlsuccessleads = "SELECT * FROM successful_lead";
    con.query(sqlsuccessleads, (err, result) => {
       if (err) {
          res.send({ Message: "Error in SQL Query in successfullead API" });
       } else {
          res.send(result);
          console.log(result);
       }
    });
 });
//  notification
app.get('/notification', (req, res) => {
    const getLastMessageQuery = 'SELECT * FROM last_message';
    con.query(getLastMessageQuery, (err, rows) => {
        if (err) {
            console.error('Error in retrieving last message:', err);
            res.status(500).send({ message: 'Internal server error' });
        } else {
            if (rows.length > 0) {
                rows.forEach(row => {
                    const uniqueid = row.uid;
                    console.log('Uniqueid:', uniqueid);
                    const last_message = `SELECT sent_at FROM \`${uniqueid}\` ORDER BY sent_at DESC LIMIT 1`;

                    const updateLastSeen = `UPDATE last_message SET last_seen = ? WHERE uid = ?`;
                    con.query(last_message, [uniqueid], (error, result) => {
                        if (error) {
                            console.error('Error in retrieving Message time:', error);
                            res.status(500).send({ message: 'Internal server error' });
                        } else {
                            if (result.length > 0) {
                                const last_message_time = result[0].sent_at;
                                console.log('Message Time:', last_message_time);
                                con.query(updateLastSeen, [last_message_time, uniqueid], (err, result) => {
                                    if (err) {
                                        console.error('Error in updating data in Last_message:', err);
                                    }
                                });
                            } else {
                                console.log('No message found for UID:', uniqueid);
                            }
                        }
                    });
                });
                res.send({ message: 'Message Timing Updated for all UIDs' });
            } else {
                res.status(404).send({ message: 'No last message found' });
            }
        }
    });
});

// Notification List
app.get('/notification-list',(req,res)=>{
    const sqlGetdata = `SELECT * FROM last_message`;
    con.query(sqlGetdata,(error,rows)=>{
        if (error) {
            res.status(500).send({ message: 'Internal server error' });
        } else {
            res.send(rows);
        }
    })
});

// MAil
app.post('/mail', upload.single('invoice'), async (req, res) => {
    try {
        // Read uploaded file
        const { to, subject, message } = req.body;
        const invoiceFilePath = req.file.path;
        const invoiceFileName = req.file.originalname;

        // Construct mail options
        const mailOptions = {
            from: 'info@tradeimex.in',
            to,
            subject,
            text: message,
            attachments: [
                {
                    filename: invoiceFileName,
                    path: invoiceFilePath
                }
            ]
        };

        // Send email with attachment
        const info = await transporter.sendMail(mailOptions);

        // Delete uploaded file after sending email
        fs.unlinkSync(invoiceFilePath);

        res.status(200).json({ emailsentmessage: 'Email sent successfully' });
    }  catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ error: 'Failed to send email' });
    }
});
  
app.listen(3002,'192.168.1.11',()=>{
     console.log('Server is successfully runnig on 3002 port')
});

