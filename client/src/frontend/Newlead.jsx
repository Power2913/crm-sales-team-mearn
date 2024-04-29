import React, { useEffect,useState } from 'react'
import '../css/newlead.css';
const Newlead = ({handleLeads}) => {
    const[newcreatedLeads,setNewcreatedLeads]=useState("");
    // const items = [
    //     {
    //       fullName: 'John Doe',
    //       email: 'john@example.com',
    //       phoneNumber: '123-456-7890',
    //       requirements: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
    //     },
    //     {
    //       fullName: 'Jane Smith',
    //       email: 'jane@example.com',
    //       phoneNumber: '987-654-3210',
    //       requirements: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
    //     },
    //     // Add more items as needed
    //   ];

      useEffect(()=>{
        const newleads =async()=>{
           try {
             const response = await fetch('http://192.168.1.11:3002/newclient');
             if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
             }

             const nealeads = await response.json();
             console.log(nealeads);
             setNewcreatedLeads(nealeads);
           } catch (error) {
             console.log(error);
           }
        };
        newleads();
      },[])

      const handleClick = (lead) => {
        // Call handleLeads function with selected lead's data
        handleLeads(lead);
    };
  return (
    <div className="list-container">
        <div className="list-header">
            <div>Full Name</div>
            <div>Email</div>
            <div>Phone Number</div>
            <div>Requirements</div>
            {/* <div>Action</div> */}
        </div>
        {
            Array.isArray(newcreatedLeads) && newcreatedLeads.length> 0 ?(
                newcreatedLeads.map((leads,index) => (
                    <div key={index} className={`list-item ${index % 2 === 0 ? 'even' : 'odd'}`} onClick={() => handleClick(leads)}>
                        <div>{leads.fullname}</div>
                        <div>{leads.email}</div>
                        <div>{leads.number}</div>
                        <div>{leads.requirements}</div>

                    </div>
                    ))
            ):(
                <div className="list-item">
                    <div>No new leads</div>
                </div>
            )
        }
    </div>
  )
}

export default Newlead