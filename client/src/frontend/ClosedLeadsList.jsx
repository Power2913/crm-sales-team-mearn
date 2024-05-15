import React, { useEffect,useState } from 'react'
import '../css/closedleadlist.css'
const ClosedLeadsList = ({handleLeads,closedLeadslist}) => {
const handleClick = async (lead,e) =>{
    handleLeads(lead);
}

// Restore 
const handleRestore = async (leads,e)  => {
    let clientid = leads.unique_id;
    console.log('Client Id',clientid);
    try {
        const response =  await fetch(`http://192.168.1.4:3002/restore-closed-leads/${clientid}`);
        if(!response.ok){
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
    } catch (error) {
        console.log(error);
    }
}

  return (
    <div className="closed-list-container">
        <h3>Closed Lead</h3>
        <div className="closed-list-header">
            <div>Full Name</div>
            <div>Email</div>
            <div>Phone Number</div>
            <div>Requirements</div>
            <div>reason</div>
            {/* <div>Created_at</div>
            <div>Closed_at</div> */}
            <div>Action</div>
        </div>
        {
            Array.isArray(closedLeadslist) && closedLeadslist.length> 0 ?(
                closedLeadslist.map((leads,index) => (
                    <div key={index} className={`list-item ${index % 2 === 0 ? 'even' : 'odd'}`} onClick={() => handleClick(leads)}>
                        <div>{leads.fullname}</div>
                        <div>{leads.email}</div>
                        <div>{leads.number}</div>
                        <div>{leads.requirements}</div>
                        <div>{leads.reason}</div>
                        {/* <div>{leads.created_at}</div>
                        <div>{leads.closed_at}</div> */}
                        <div>
                            <button onClick={(e) => {
                                e.stopPropagation(); // Stop the click event from bubbling up to the parent div
                                handleRestore(leads);
                            }}>Restore</button>
                        </div>
                    </div>

                    ))
            ):(
                <div className="closed-list-item">
                    <div>Fetching Error Or No Closed Lead Yet</div>
                </div>
            )
        }
    </div>
  )
}

export default ClosedLeadsList