import React, { useState,useEffect } from 'react';
import '../css/leads.css';

function Leads({ leadData,handleClosedLead }) {
  // console.log('Lead Data:', leadData)
  const [formData, setFormData] = useState({
    requirements: '',
  });

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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
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
        <form onSubmit={handleSubmit}>
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
          <button type="submit">Send Updates</button>
        </form>
      </div>
      <div className="action">
        <button type="button" className="action-button close" onClick={()=> handleClosedLead(leadData)}>Close</button>
        <button type="button" className="action-button successful" >Successful</button>
      </div>

    </div>
  );
}

export default Leads;
