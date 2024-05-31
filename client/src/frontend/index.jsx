import React,{useEffect, useState} from 'react'
import '../css/index.css'
import Newlead from './Newlead'
import Leads from './leads';
import ClosedLeads from './ClosedLeads';
import ClosedLeadsList from './ClosedLeadsList';
import { FaBell,FaUser,FaExclamationTriangle } from 'react-icons/fa';
import Notificationpage from './Notification';
import SuccessfulLeads from './SuccessfulLeads';
import Invoice from './Invoice';
import ClosedLeadChat from './ClosedLeadChat';
import GeneratedInvoice from './GeneratedInvoice';
import  { useNavigate } from 'react-router-dom';
// import axios from 'axios';

function Index() {
const [list, setList] = useState(true);
const [newlead,setNewlead] = useState(true);
const [message, setMessage] = useState("");
const [leads,setLeads] = useState(false);
const [selectedLead, setSelectedLead] = useState(null);
const [closedleadform, setclosedleadform] = useState(false);
const [closedleaddata, setClosedleaddata] = useState(null);
const [closedLeadlist, setClosedLeadList] = useState(false);
const [successLeads,setSucccessLeads] = useState(false);
const [notificationshow, setNotificationshow] = useState(false);
const [invoice, setInvoice] = useState(false);
const [invoiceData,setinvoiceData] = useState(null);
const [closedChat, setClosedChat ] = useState( false );
const [closedleadschat,setClosedleadschat] = useState( null );
const [generatedInvoice, setGeneratedInvoice] = useState( false );
const [isLogedin,setisLogedin] = useState( false );

const navigate =  useNavigate();

// const handleList = () => {
//     setList(true);
//     setNewlead(false);
//     setLeads(false);
//     setclosedleadform(false);
//     setClosedLeadList(false);
//     setSucccessLeads(false);
//     setNotificationshow(false);
//     setInvoice(false);
// }
const handleLeads = (lead) => {
    setSelectedLead(lead);
    setLeads(true);
    setList(false);
    setNewlead(false);
    setclosedleadform(false);
    setClosedLeadList(false);
    setSucccessLeads(false);
    setNotificationshow(false);
    setInvoice(false);
    setClosedChat(false);
    setGeneratedInvoice(false);
}
const handleClosedLeads = (closedleaddata) => {
    // setclosedlead(true);
    setclosedleadform(prevState => !prevState)
    // setclosedleadform(true);
    setLeads(true);
    setClosedleaddata(closedleaddata);
    setList(false);
    setNewlead(false);
    setClosedLeadList(false)
    setSucccessLeads(false);
    setNotificationshow(false);
    setInvoice(false);
    setClosedChat(false);
    setGeneratedInvoice(false);
}

const handleClosedleadlist = ()=>{
    setClosedLeadList(true)
    setclosedleadform(false);
    setLeads(false);
    setList(false);
    setNewlead(false);
    setSucccessLeads(false);
    setNotificationshow(false);
    setInvoice(false);
    setClosedChat(false);
    setGeneratedInvoice(false);
}
const handleSuccessfulleadlist = ()=>{
    setSucccessLeads(true);
    setClosedLeadList(false)
    setclosedleadform(false);
    setLeads(false);
    setList(false);
    setNewlead(false);
    setNotificationshow(false);
    setInvoice(false);
    setClosedChat(false);
    setGeneratedInvoice(false);
}

const handleNotification = () => {
    setNotificationshow(prevState => !prevState);
    setNewlead(false);
    setSucccessLeads(false);
    setClosedLeadList(false)
    setclosedleadform(false);
    setLeads(false);
    setList(false);
    setClosedChat(false);
    setInvoice(false);
    setGeneratedInvoice(false);
}
const handleInvoice = (invoiceData) => {
    setClosedChat(false);
    setinvoiceData(invoiceData);
    setInvoice(true);
    setSucccessLeads(false);
    setClosedLeadList(false)
    setclosedleadform(false);
    setLeads(false);
    setList(false);
    setNewlead(false);
    setGeneratedInvoice(false);
}
const handleClosedLeadsChat = (leads) => {
    setClosedleadschat(leads);
    setGeneratedInvoice(false);
    setClosedChat(true);
    setInvoice(false);
    setSucccessLeads(false);
    setClosedLeadList(false)
    setclosedleadform(false);
    setLeads(false);
    setList(false);
    setNewlead(false);
}
const handleGeneratedInvoice = () =>{
    setGeneratedInvoice(true);
    setClosedChat(false);
    setInvoice(false);
    setSucccessLeads(false);
    setClosedLeadList(false)
    setclosedleadform(false);
    setLeads(false);
    setList(false);
    setNewlead(false);
}
// Login
const sperson_unique_id = sessionStorage.getItem( 'unique_id');
const password = sessionStorage.getItem( 'password');
const first_name = sessionStorage.getItem('first_name');
const last_name = sessionStorage.getItem('last_name');
const sales_person_name = first_name+" "+last_name;
useEffect(() => {
    // console.log('User Details',sperson_unique_id,password);
    if (sperson_unique_id&&password) {
        setisLogedin(!!sperson_unique_id);
        } else {
            console.log('No user found');
        }
}, []);
// Logout
const handleLogout = async () => {
    try {
        const response = await fetch('http://192.168.1.10:3002/logout', {
            method: 'POST', // Change to POST
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const data = await response.json();
        if (data.message === 'Logout Successful.') {
            sessionStorage.removeItem('unique_id');
            sessionStorage.removeItem('password');
            navigate('/erp-login');
        }
    } catch (error) {
        console.error('Logout failed:', error);
    }
}

console.log('User Details',sperson_unique_id,password);
//##################### New Lead Api Call Start ###########################
const[formlead,setFormlead] = useState({
    sales_person_table:sperson_unique_id,
    fullname:'',
    email:'',
    phone:'',
    company:'',
    requirements:'',
    reminder:''
}
);

const handleChange =(e)=>{
    setFormlead({...formlead,[e.target.name]:e.target.value});
}

const createLead = async(e) => {
    e.preventDefault();
    try {
        const response = await fetch('http://192.168.1.10:3002/createlead',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(formlead)
        });
        const data = await response.json();
        setMessage(data.message);
        setTimeout(() => {
            window.location.reload();
        }, 5000);
    } catch (error) {
        setMessage('Error in adding lead');
    }
}
// ########################### End ################################
// ########################### Closed List Start ##################
const[closedLeadslist, setClosedLeadlist] = useState(['']);
useEffect(() => {
  const newclosedlead = async(e) => {
      try {
          const response = await fetch('http://192.168.1.10:3002/closedLeadlist');
          if (!response.ok) {
              throw new Error(`HTTP error! Status: ${response.status}`)
          }
          const data = await response.json();
          setClosedLeadlist(data);
      } catch (error) {
          console.log('Error',error);
      }
  }
  newclosedlead();
}, []);

// ########################### Closed List End #######################
//  ########################## Successful lead List Start ######################
const[successLead,setSucccessLead] = useState([]);
const[errormessage,seterrormessage] = useState("");
useEffect(() => {
 const fetchSuccessfulLeads = async () => {
    try {
       const response = await fetch('http://192.168.1.10:3002/successfullead');
       if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
       }
       const data = await response.json();
       setSucccessLead(data);
    } catch (error) {
       seterrormessage('Error in fetching successful leads');
    }
 };

 fetchSuccessfulLeads();
}, []);
//  ########################## Successful lead List End ######################
// ########################### Get Notification Start ################################
const [notification,setNotification] = useState(['']);

useEffect(() => {
    const getNotification = async() => {
        try {
            const response = await fetch('http://192.168.1.10:3002/notification-list');
            if (!response.ok) {
                throw new Error(`Error! status: ${response.status}`);  
            }
            const data = await response.json();
            setNotification(data);
            console.log('Data:',data);

        } catch (error) {
            console.error('Error fetching messages from last message:', error);
        }
    };
    getNotification();
}, []); 

const notificationCount24HoursOld = notification.reduce((count, notification) => {
    const reminderTime = new Date(notification.reminder);
    const currentTime = new Date();  
    // const twentyFourHoursAgo = new Date(currentTime.getTime() - (24 * 60 * 60 * 1000)); // Subtract 24 hours from the current time

    // Check if last_seen time is 24 hours or more in the past
    // const is24HoursOrMore = lastSeenTime <= twentyFourHoursAgo;
    const isReminderTime = reminderTime <= currentTime;
    // If the notification is 24 hours or more old, increment the count
    if (isReminderTime) {
        return count + 1;
    } else {
        return count;
    }
}, 0);
// Closed List count
let  closeLeadcount = closedLeadslist.length||0;
let successLeadcount =  successLead.length||0;



  return (
    <>
    {isLogedin&&
        <div className="containers">
            <div className="main">
                <div className="header">
                    <div className="nav">
                        <div className="tradeimex">
                            <h2>tradeimex</h2>
                        </div>
                        <div className="welcome">
                            <h2>Welcome {sales_person_name}</h2>
                        </div>
                        <div onClick={handleNotification} style={{ position: 'relative',cursor:'pointer' }}>
                            <FaBell />
                            {notificationCount24HoursOld > 0 && (
                                <span
                                style={{
                                    position: 'absolute',
                                    top: '-13px',
                                    right: '-15px',
                                    backgroundColor: 'red',
                                    color: 'white',
                                    borderRadius: '50%',
                                    width: '20px',
                                    height: '20px',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    fontSize: '14px',
                                    cursor:'pointer',
                                }}
                                >
                                {notificationCount24HoursOld}
                                </span>
                            )}
                            </div>
                        <div className="logout">
                           <button onClick={handleLogout}>Logout</button>
                        </div>
                    </div>
                </div>
                <div className="hero">
                    <div className="sidebar">
                        <div className="profile">
                            <div className="profile-logo">

                            </div>
                            <div className="account-info">
                                <div className="account-info-option-one">
                                    <div className="user">
                                        <FaUser/>
                                    </div>
                                </div>
                                <div className="account-info-option-two">
                                    <div className="account-name">
                                        <span>info.nitesh@user.com</span>
                                    </div>
                                    <div className="account-email">
                                        <span>Nitesh Chauhan</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="option">
                            <li>
                            <a href="/sales-dashboard">
                                <span id='leadlist'><a href="/sales-dashboard">Home</a></span>
                            </a>
                            </li>
                            {/* <li>
                                <span id='leadlist' onClick={handleList}>Created Leads</span>
                            </li> */}
                            {/* <li>
                                <span >Succesfull Leads</span>
                            </li> */}
                            <li>
                                <span>Sales Stats</span>
                            </li>
                            <li>
                                <a href="#generated-invoices" >
                                <span onClick={handleGeneratedInvoice}>Generated Invoice</span>
                                </a>
                            </li>
                        </div>
                    </div>
                    {/* Create New Lead */}
                    <div className="hero-content">
                        { notificationshow&&
                        <Notificationpage notification={notification}/>
                        }              
                        {newlead&&
                            <div className="hero-options">
                                <div className="form-container">                          
                                    <h3>Create New Lead</h3>
                                    {message && <p className='message'>{message}</p>}
                                    <form className="form" method='POST' onSubmit={createLead}>
                                        <div className="form-group">
                                        <input type="text" placeholder="Enter your full name" name='fullname'value={formlead.fullname} onChange={handleChange} className="input-field" required />
                                        </div>
                                        <div className="form-group">
                                        <input type="email" placeholder="Enter your email address" name='email' value={formlead.email} onChange={handleChange} className="input-field" required/>
                                        </div>
                                        <div className="form-group">
                                        <input type="tel" placeholder="Enter your phone number" name='phone' value={formlead.phone} onChange={handleChange} className="input-field" required/>
                                        </div>
                                        <div className="form-group">
                                        <input type="text" name="company" id="" placeholder='Enter Company Name....' className='input-field' value={formlead.company} onChange={handleChange}/>
                                        {/* <textarea placeholder="Enter requirements" name='requirements' value={formlead.requirements} onChange={handleChange} className="textarea-field" rows={10} required/> */}
                                        </div>
                                        <div className="form-group">                                  
                                        <textarea placeholder="Enter requirements" name='requirements' value={formlead.requirements} onChange={handleChange} className="textarea-field"  required/>
                                        </div>
                                        <div className="form-group">     
                                        <label htmlFor="">Set Reminder</label>                             
                                        <input type="datetime-local" name="reminder" id="" className="input-field" value={formlead.reminder} onChange={handleChange}/>
                                        </div>
                                        <div className="form-group">
                                        <button type="submit" className="submit-button">Submit</button>
                                        </div>
                                    </form>
                                </div>
                                <div className="options">
                                    <div className="lead-category closed-leads"  onClick={handleClosedleadlist}>
                                        <span>Closed Leads</span>
                                        <span>{closeLeadcount}</span>
                                    </div>
                                    <div className="lead-category inprogrss-lead">
                                        <span>In Progress</span>
                                        <span>10</span>
                                    </div>
                                    <div className="lead-category successfull-leads" onClick={handleSuccessfulleadlist}>
                                        <span>Successful Leads</span>
                                        <span>{successLeadcount}</span>
                                    </div>
                                </div>
                            </div>
                        }
                        {/* New Client List */}
                        {list&&
                            <div className="new-lead">
                                <Newlead handleLeads={handleLeads}/>
                            </div>
                        }
                        {/* Selected Leads */}
                        {leads&&
                            <div className="lead">
                                <Leads leadData={selectedLead} handleClosedLead={handleClosedLeads} handleInvoice={handleInvoice}/>
                            </div>
                        }
                        {/* Close Leads */}
                        {closedleadform&&
                            <div className="closedlead">
                                <ClosedLeads ClosedLeads={closedleaddata}/>
                            </div>
                        }
                        {/* Closed Lead List */}
                        {closedLeadlist&&
                            <div className="closed-lead-list">
                                <ClosedLeadsList closedLeadslist={closedLeadslist} handleLeads={handleLeads} handleClosedLeadsChat={handleClosedLeadsChat} />
                            </div>
                        }
                        {successLeads&&
                            <div className="SuccessfulLeads">
                                <SuccessfulLeads successLead={successLead} errormessage={errormessage}/>
                            </div>
                        }
                        {invoice&&
                            <div className="invoice">
                                <Invoice leadData={selectedLead} inVoiceClientdata={invoiceData} handleLeads={handleLeads}/>
                            </div>
                        }
                        {closedChat&&
                            <div className="closedchat">
                                <ClosedLeadChat closedLeadchat={closedleadschat}  handleClosedleadlist={handleClosedleadlist}/>
                            </div>
                        }
                        {generatedInvoice&&
                            <div className="generatedinvoice">
                            < GeneratedInvoice/>
                            </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    }
    </>

  )
}

export default Index