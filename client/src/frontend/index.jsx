import React,{useState} from 'react'
import '../css/index.css'
import Newlead from './Newlead'
import Leads from './leads';
function Index() {
const[list, setList] = useState(false);
const[newlead,setNewlead] = useState(true);
const [message, setMessage] = useState("");
const [leads,setLeads] = useState(false);
const [selectedLead, setSelectedLead] = useState(null);
const handleList = () => {
    setLeads(false)
    setList(true);
    setNewlead(false);
}
const handleLeads = (lead) => {
    setSelectedLead(lead);
    setLeads(true);
    setList(false);
    setNewlead(false);
}
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
                            <span >Closed Leads</span>
                        </li>
                        <li>
                            <span>Succesfull Leads</span>
                        </li>
                    </div>
                </div>
                <div className="hero-content">
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
                    {list&&
                        <div className="new-lead">
                            <Newlead handleLeads={handleLeads}/>
                        </div>
                    }
                    {leads&&
                        <div className="lead">
                            <Leads leadData={selectedLead} />
                        </div>
                    }
                </div>
            </div>
        </div>
    </div>
  )
}

export default Index