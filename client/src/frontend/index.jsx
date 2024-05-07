import React,{useEffect, useState} from 'react'
import '../css/index.css'
import Newlead from './Newlead'
import Leads from './leads';
import ClosedLeads from './ClosedLeads';
import ClosedLeadsList from './ClosedLeadsList';
import { FaBell } from 'react-icons/fa';
import Notificationpage from './Notification';
import SuccessfulLeads from './SuccessfulLeads';

function Index() {
const[list, setList] = useState(false);
const[newlead,setNewlead] = useState(true);
const [message, setMessage] = useState("");
const [leads,setLeads] = useState(false);
const [selectedLead, setSelectedLead] = useState(null);
const [closedleadform, setclosedleadform] = useState(false);
const [closedleaddata, setClosedleaddata] = useState(null);
const [closedLeadlist, setClosedLeadList] = useState(false);
const [successLeads,setSucccessLeads] = useState(false);
const [notificationshow, setNotificationshow] = useState(false);

const handleList = () => {
    setList(true);
    setNewlead(false);
    setLeads(false);
    setclosedleadform(false);
    setClosedLeadList(false);
    setSucccessLeads(false);
    setNotificationshow(false);
}
const handleLeads = (lead) => {
    setSelectedLead(lead);
    setLeads(true);
    setList(false);
    setNewlead(false);
    setclosedleadform(false);
    setClosedLeadList(false);
    setSucccessLeads(false);
    setNotificationshow(false);
}
const handleClosedLeads = (closedleaddata) => {
    // setclosedlead(true);
  
    setclosedleadform(true);
    setLeads(true);
    setClosedleaddata(closedleaddata);
    setList(false);
    setNewlead(false);
    setClosedLeadList(false)
    setSucccessLeads(false);
    setNotificationshow(false);
}

const handleClosedleadlist = ()=>{
    setClosedLeadList(true)
    setclosedleadform(false);
    setLeads(false);
    setList(false);
    setNewlead(false);
    setSucccessLeads(false);
    setNotificationshow(false);
}
const handleSuccessfulleadlist = ()=>{
    setSucccessLeads(true);
    setClosedLeadList(false)
    setclosedleadform(false);
    setLeads(false);
    setList(false);
    setNewlead(false);
    setNotificationshow(false);
}

const handleNotification = () => {
    setNotificationshow(true);
    setSucccessLeads(false);
    setClosedLeadList(false)
    setclosedleadform(false);
    setLeads(false);
    setList(false);
    setNewlead(false);
}
//##################### New Lead Api Call Start ###########################
const[formlead,setFormlead] = useState({
    fullname:'',
    email:'',
    phone:'',
    requirements:''
}
);
const handleChange =(e)=>{
    setFormlead({...formlead,[e.target.name]:e.target.value});
}

const createLead = async(e) => {
    e.preventDefault();
    try {
        const response = await fetch('http://192.168.1.11:3002/createlead',{
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
const [notification,setNotification] = useState(['']);

useEffect(() => {
    const getNotification = async() => {
        try {
            const response = await fetch('http://192.168.1.11:3002/notification-list');
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
const notificationCount = notification.length;
  return (
    <div className="container">
        <div className="main">
            <div className="header">
                <div className="nav">
                    <div className="tradeimex">
                        <h2>tradeimex</h2>
                    </div>
                    <div className="welcome">
                        <h2>Welcome Nitesh</h2>
                    </div>
                    <div onClick={handleNotification} style={{ position: 'relative' }}>
                        <FaBell />
                        {notificationCount > 0 && (
                            <span
                            style={{
                                position: 'absolute',
                                top: '-8px',
                                right: '-8px',
                                backgroundColor: 'red',
                                color: 'white',
                                borderRadius: '50%',
                                width: '20px',
                                height: '20px',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                fontSize: '14px',
                            }}
                            >
                            {notificationCount}
                            </span>
                        )}
                        </div>
                    <div className="logout">
                        <button>Logout</button>
                    </div>
                </div>
            </div>
            <div className="hero">
                <div className="sidebar">
                    <div className="option">
                        <li>
                           <a href="/admin">
                             <span id='leadlist'><a href="/admin">Home</a></span>
                           </a>
                        </li>
                        <li>
                            <span id='leadlist' onClick={handleList}>Created Leads</span>
                        </li>
                        <li>
                            <span onClick={handleClosedleadlist}>Closed Leads</span>
                        </li>
                        <li>
                            <span onClick={handleSuccessfulleadlist}>Succesfull Leads</span>
                        </li>
                    </div>
                </div>
                {/* Create New Lead */}
                <div className="hero-content">
                    { notificationshow&&
                      <Notificationpage notification={notification}/>
                    }              
                    {newlead&&
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
                                <textarea placeholder="Enter requirements" name='requirements' value={formlead.requirements} onChange={handleChange} className="textarea-field" rows={10} required/>
                                </div>
                                <div className="form-group">
                                <button type="submit" className="submit-button">Submit</button>
                                </div>
                            </form>
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
                            <Leads leadData={selectedLead} handleClosedLead={handleClosedLeads}/>
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
                            <ClosedLeadsList/>
                        </div>
                    }
                    {successLeads&&
                        <div className="SuccessfulLeads">
                            <SuccessfulLeads/>
                        </div>
                    }
                </div>
            </div>
        </div>
    </div>
  )
}

export default Index