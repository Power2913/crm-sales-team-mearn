const express = require('express');
const mysql   = require('mysql');
const cors    = require('cors');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const multer  = require('multer');
const upload = multer({ dest: 'uploads/' });
const fs = require('fs');
const session = require('express-session');


const app = express();

app.use(session({
    secret: 'super secret',
    resave: false,
    saveUninitialized:true,
}))
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
    const{username,password} = req.body;
    const  sql = `SELECT * FROM sales_team WHERE unique_id = '${username}' AND password = '${password}'`;
    con.query( sql,(err,result)=>{
        if (err) {
            res.status(500).send({message:"Internal server error."});
        }
        else if(result.length > 0){
            const user =  result[0];
            req.session.user = user;
            res.status(200).send({message:"Login Successful.",user:user});
        }else{
            res.send({message: "Invalid username or password."});
        }
    });
});
// Logout
app.post('/logout',(req,res)=>{
    req.session.destroy((err)=>{
       if (err) {
          res.status(500).send( {message:"Internal server error in looging out."});
       } else {
          res.status(200).send( {message:"Logout Successful."});
       }
    })
});
// Create Leads
app.post('/createlead', (req, res) => {
    const {sales_person_table, fullname, email, phone, company, requirements, reminder } = req.body;
    const uniqueid = phone.toString().slice(0, -5);
    const client_table = uniqueid;
    console.log('sperson_unique_id',sales_person_table)
    // Parameterized queries
    const leadcheck = `SELECT * FROM \`${sales_person_table}\` WHERE email = ? OR number = ?`;
    const sqlInsert = `INSERT INTO \`${sales_person_table}\` (unique_id, fullname, email, number, company, requirements, reminder) VALUES (?, ?, ?, ?, ?, ?, ?)`;
    const createTableQuery = `
        CREATE TABLE IF NOT EXISTS \`${client_table}\` (
            uid SERIAL PRIMARY KEY,
            clientid VARCHAR(30) NOT NULL,
            message LONGTEXT NOT NULL,
            reminder VARCHAR(100) NOT NULL,
            sent_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )`;
    const lastMessageInsert = "INSERT INTO last_message (uid, clientName) VALUES (?, ?)";
    const updateReminderQuery = "UPDATE last_message SET clientMessage = ?,reminder = ? WHERE uid = ?";
    
    // Use transactions for atomicity
    con.beginTransaction(err => {
        if (err) {
            console.error("Error starting transaction:", err);
            res.status(500).send({ message: "Internal server error" });
            return;
        }
        
        // Check if lead already exists
        con.query(leadcheck, [email, phone], (leadCheckErr, leadCheckResult) => {
            if (leadCheckErr) {
                console.error("Error checking for existing lead:", leadCheckErr);
                con.rollback(() => {
                    res.status(500).send({ message: "Internal server error" });
                });
                return;
            }

            if (leadCheckResult.length > 0) {
                con.rollback(() => {
                    res.send({ message: 'Client already exists' });
                });
                return;
            }

            // Insert new lead
            con.query(sqlInsert, [uniqueid, fullname, email, phone, company, requirements, reminder], (leadInsertErr, leadInsertResult) => {
                if (leadInsertErr) {
                    console.error("Error inserting new lead:", leadInsertErr);
                    con.rollback(() => {
                        res.status(500).send({ message: "Error creating lead" });
                    });
                    return;
                }

                // Create client table
                con.query(createTableQuery, (createTableErr, createTableResult) => {
                    if (createTableErr) {
                        console.error("Error creating client table:", createTableErr);
                        con.rollback(() => {
                            res.status(500).send({ message: "Error creating client table" });
                        });
                        return;
                    }

                    // Insert into last_message table
                    con.query(lastMessageInsert, [uniqueid, fullname], (lastMessageInsertErr, lastMessageInsertResult) => {
                        if (lastMessageInsertErr) {
                            console.error("Error inserting into last_message table:", lastMessageInsertErr);
                            con.rollback(() => {
                                res.status(500).send({ message: "Error inserting into last_message table" });
                            });
                            return;
                        }

                        // Update reminder
                        con.query(updateReminderQuery, [requirements, reminder, uniqueid], (updateReminderErr, updateReminderResult) => {
                            if (updateReminderErr) {
                                console.error("Error updating reminder:", updateReminderErr);
                                con.rollback(() => {
                                    res.status(500).send({ message: "Error updating reminder" });
                                });
                                return;
                            }

                            // Commit the transaction
                            con.commit(commitErr => {
                                if (commitErr) {
                                    console.error("Error committing transaction:", commitErr);
                                    con.rollback(() => {
                                        res.status(500).send({ message: "Internal server error" });
                                    });
                                    return;
                                }

                                res.send({ message: 'Lead created successfully.' });
                            });
                        });
                    });
                });
            });
        });
    });
});


// Get Data from Database table new_leads with pagination
app.get('/newclient/:sperson_unique_id', (req, res) => {
    const{sperson_unique_id}=req.params;
    const pageNumber = req.query.pageNumber || 1; // Default to first page
    const pageSize = 10; // Number of records per page
    const offset = (pageNumber - 1) * pageSize;

    const sqlGet = `  SELECT * FROM \`${sperson_unique_id}\` ORDER BY id DESC LIMIT ${pageSize} OFFSET ${offset}`;
  
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
    const { uniqueid, message, reminder } = req.body;
    
    // Validate input data
    if (!uniqueid || !message || !reminder) {
        return res.status(400).send({ message: "Missing required fields." });
    }
    
    // console.log("Reminder", reminder);
    
    // Use parameterized query to avoid SQL injection
    const sqlInsert = `INSERT INTO \`${uniqueid}\` (clientid, message, reminder) VALUES (?, ?, ?)`;
    
    // Execute the query
    con.query(sqlInsert, [uniqueid, message, reminder], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).send({ message: "Internal server error" });
        } else {
            return res.status(200).send({ message: 'Message sent successfully.' }); 
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
    const { created_at,clientid, name, email, phone, finalrequirement, closingreason } = req.body;
    const sqlInsert = "INSERT INTO closed_leads (unique_id,fullname,email,number,requirements,reason,created_at) VALUES (?,?,?,?,?,?,?)";
    const sqlDelete = `DELETE FROM \`${sperson_unique_id}\` WHERE email = ?`;
    // const sqlDeletelastseen = `DELETE FROM last_message WHERE uid = ?`;

    con.query(sqlInsert, [clientid,name, email, phone, finalrequirement, closingreason, created_at], (insertErr, insertResult) => {
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
// Closed Lead Message
app.get('/closedLeadMessage/:uniqueid',(req,res)=>{
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
});
// Set Lead Status to set
app.post('/successlead',(req,res)=>{
    const {uniqueid,name,email,phone} = req.body;

    const sqlsuccesslead = "INSERT INTO successful_lead (unique_id,fullname,email,phone) VALUES(?,?,?,?)";
    const sqlDelete = `DELETE FROM \`${sperson_unique_id}\` WHERE unique_id = ?`;
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
                let completedUpdates = 0;
                rows.forEach(row => {
                    const uniqueid = row.uid;
                    console.log('Uniqueid:', uniqueid);
                    // Get Last Message Time and Reminder Time
                    const last_message = `SELECT message, reminder, sent_at FROM \`${uniqueid}\` ORDER BY sent_at DESC LIMIT 1`;
                    // Update Last Message Time and Reminder Time
                    const updateLastSeen = `UPDATE last_message SET clientMessage = ?, last_seen = ?, reminder =? WHERE uid = ?`;
                    con.query(last_message, [uniqueid], (error, result) => {
                        if (error) {
                            console.error('Error in retrieving Message time:', error);
                            res.status(500).send({ message: 'Internal server error' });
                        } else {
                            if (result.length > 0) {
                                const last_message = result[0].message;
                                const last_message_time = result[0].sent_at;
                                const reminder = result[0].reminder;
                                console.log('Reminder Time:', reminder);
                                con.query(updateLastSeen, [last_message, last_message_time,reminder, uniqueid], (err, result) => {
                                    if (err) {
                                        console.error('Error in updating data in Last_message:', err);
                                    }
                                    else{
                                        completedUpdates++;
                                        if (completedUpdates === rows.length) {
                                            res.send({ message: 'Message Timing Updated for all UIDs' });
                                        }
                                    }
                                });
                            } else {
                                console.log('No message found for UID:', uniqueid);
                            }
                        }
                    });
                });
               
            } else {
                res.status(404).send({ message: 'No last message found' });
            }
        }
    });
});

// Notification List
app.get('/notification-list',(req,res)=>{
    const sqlGetdata = `SELECT * FROM last_message`;
    // const getfromnewlead = `SELECT * FROM new_leads where unique_id=?`;
    con.query(sqlGetdata,(error,rows)=>{
        if (error) {
            res.status(500).send({ message: 'Internal server error' });
        } else {
            res.send(rows);
        }
    })
});
// Restore closed  leads
app.get('/restore-closed-leads/:clientid',(req,res)=>{
    const {clientid} = req.params;
    console.log('Client ID:',clientid);

    const sqlGetdata = `SELECT * FROM closed_leads WHERE unique_id = '${clientid}'`;
    
    con.query(sqlGetdata,(error,rows)=>{
        if (error) {
            res.status(500).send({ message: 'Internal server error in getting data from closed lead' });
        } else {
            let clientid =  rows[0].unique_id;
            let fullname =  rows[0].fullname;
            let email    =  rows[0].email;
            let phone    =  rows[0].number;
            let company  =  rows[0].company;
            let requirements =   rows[0].requirements;
      

            // Restore data into  new_leads table
            sqlInsert  = `INSERT INTO new_lead (unique_id,fullname,email,number,company,requirements) VALUES ('${clientid}','${fullname}','${email}','${phone}','${company}','${requirements}')`;
            con.query(sqlInsert,(restoreerror,rows)=>{
                if (restoreerror) {
                    res.status(500).send({ message: 'Internal server error in restoring  data' });
                }else{
                    //  Delete data from closed_leads table
                    sqlDelete = `DELETE  FROM closed_leads WHERE clientid = '${clientid}'`;
                    con.query(sqlDelete,(error,rows)=>{
                        if (error) {
                            res.status(500).send({message:'Error in deleting closed lead'});
                        }else{
                            res.send({message:'Lead restored successfully and  deleted from closed leads table'});

                        }
                    });
                }       
            });
        }
    });

});

// Get Generated invoice Information
app.post('/invoice-info', (req, res) => {
    const {unique_id,company,invoice_date,invoice_no}  = req.body;

    sqlInvoice = `INSERT  INTO invoice (unique_id,invoice_number,company,invoice_date) VALUES ('${unique_id}','${invoice_no}','${company}','${invoice_date}')`;

    
    con.query( sqlInvoice,(error,rows)=>{
        if (error) {
              res.status(500).send({ message: 'Internal server error in getting data from closed lead' });
            } else {                
              res.send({message:'Invoice information saved successfully'});
            }
    });
});
app.get('/invoice-details',(req,res) =>{
   sqlGetInvoice = 'SELECT * FROM invoice';
   con.query( sqlGetInvoice,(error,rows)=>{
    if (error) {
        res.status(500).send({ message: 'Internal server error in getting data from Invoice' });
        } else {
            res.send(rows);
        }
   });
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
  
app.listen(3002,'192.168.1.3',()=>{
     console.log('Server is successfully runnig on 3002 port')
});

