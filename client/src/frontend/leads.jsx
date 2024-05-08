import React, { useState,useEffect } from 'react';
import '../css/leads.css';
import { FaFile } from 'react-icons/fa';
function Leads({ leadData,handleClosedLead }) {

  const [successleadmessage,setsuccessleadMessage]=useState([]);
  // console.log('Lead Data:', leadData)
  const [formData, setFormData] = useState({
    requirements: '',
  });
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://192.168.1.11:3002/newmessages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          uniqueid: leadData.unique_id,
          message: formData.requirements,
        }),
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      // Clear the textarea after successful submission
      setFormData({ requirements: '' });
    } catch (error) {
      console.error('Error:', error);
      // Optionally, you can display an error message to the user
    }
  };


  const [messages, setMessages] = useState([]);

  const fetchMessages = async () => {
    try {
      const uniqueid = leadData.unique_id;
      const response = await fetch(`http://192.168.1.11:3002/clientmessage/${uniqueid}`);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setMessages(data);
    } catch (error) {
      console.error('Error fetching messages:', error);
      // Handle error
    }
  };

  // Call the fetchMessages function repeatedly at regular intervals
  useEffect(() => {
    const intervalId = setInterval(fetchMessages, 1000/2); // Fetch messages every 5 seconds

    // Clean up function to clear the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, [leadData]); // Re-run effect whenever leadData changes

  // const handleclosedleadClick = (closedleaddata) => {
  //   handleClosedLead(closedleaddata);
  // };
  // Lead Success API call
  const handleleadsuccess = async (e)=>{
    e.preventDefault();
    try {
      const response = await fetch('http://192.168.1.11:3002/successlead',{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          uniqueid  : leadData.unique_id,
          name: leadData.fullname,
          email: leadData.email,
          phone: leadData.number,
        }),
      });
      
      if (!response.ok) {
        throw new Error(`Error! status: ${response.status}`);
      }
      const result = await response.json();
      console.log('Result:',result);
      setsuccessleadMessage(result);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }

  }

  const handlelastmessage = async (e)=>{
  
    try {
      const response = await fetch('http://192.168.1.11:3002/notification');
      if (!response.ok) {
        throw new Error(`Error! status: ${response.status}`);
      }
    } catch (error) { 
      console.error('Error fetching messages:', error);
    }
  }

  const [invoiceFile, setInvoiceFile] = useState(null);
  const [emailsentmessage, Setemailsentmessage] = useState('');
  const handleFileChange = (e) => {
      const file = e.target.files[0];
      setInvoiceFile(file);
  };

  const invoiceUpload = async (e) => {
      e.preventDefault();

      try {
          const formData = new FormData();
          formData.append('invoice', invoiceFile);
          formData.append('to', leadData.email);
          formData.append('subject', 'Invoice');
          formData.append('message', 'Please find the attached invoice');
          const response = await fetch('http://192.168.1.11:3002/mail', {
              method: 'POST',
              body: formData
          });

          if (!response.ok) {
              throw new Error(`Error! status: ${response.status}`);
          }
          const result = await response.json();
          Setemailsentmessage(result);
          console.log('Email sent successfully');
          // Handle success, reset form, show success message, etc.
      } catch (error) {
          console.error('Error in sending mail:', error);
          // Handle error, show error message, etc.
      }
  };

  return (
    <div className="conversation-page">

      <div className="old-message">
        {/* Display the previous message or conversation */}
        <p>Client Name: {leadData.fullname}</p>
        <div className="chat">
          <div className="admin-chat">
            <span>Hi, who sent this?</span>
          </div>
            <div className="sales-chat">
              {leadData.requirements}
            </div>
            {messages.map((message, index) => (
              <div className="sales-chat"  key={index}> {message.message} <span>{new Date(message.sent_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
              </div>
            ))}
        </div>
      </div>
      <div className="new-conversation">
        {/* Form for new conversation */}
        <form onSubmit={(e) => {
              e.preventDefault(); // Prevent default form submission behavior
              handleSubmit(e); // Call the handleSubmit function
              handlelastmessage(); // Call the handlelastmessage function
          }}>
          <div className="form-groups">
            <textarea
              id="requirements"
              name="requirements"
              value={formData.requirements}
              onChange={handleChange}
              placeholder="Enter requirements..."
              required
            ></textarea>
          </div>
          <button type="submit" onClick={()=>handlelastmessage()}>Send</button>
        </form>
      </div>
      {successleadmessage&& <p className='message'>{successleadmessage.Message}</p>}
      {emailsentmessage&& <p className='message'>{emailsentmessage.emailsentmessage}</p>}
      <div className="action">
        <button type="button" className="action-button close" onClick={()=> handleClosedLead(leadData)}>Close</button>
        <form   onSubmit={handleleadsuccess}>
          <button type="submit" className="action-button successful"  >Successful</button>
        </form>
        <div className="generate-invoice">
            <button type="button">Generate Invoice</button>
          </div>
        <div className="invoice">

          <form className="styled-form" onSubmit={invoiceUpload}>
            <label htmlFor="file-input">
              <FaFile />
              Choose File
            </label>
            <input type="file" id="file-input" name="invoice" onChange={handleFileChange} />
            <button type="submit">Send Invoice</button>
          </form>
        </div>      
      </div>
    
    </div>
  );
}

export default Leads;
