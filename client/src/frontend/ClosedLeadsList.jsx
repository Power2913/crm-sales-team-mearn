import React, { useEffect,useState } from 'react'
import '../css/closedleadlist.css'
import { FaStepBackward, FaArrowLeft } from 'react-icons/fa'
const ClosedLeadsList = ({handleClosedLeadsChat,closedLeadslist}) => {
const handleClick =  (leads,e) =>{
    console.log('Leads',leads);
    
    handleClosedLeadsChat(leads);
}



  return (
    <div className="closed-list-container">
 
        <a href="/sales-dashboard"><button type='button'><FaArrowLeft/></button></a>
        <h3>Closed Lead</h3>
        <div className="closed-list-header">
            <div>Full Name</div>
            <div>Email</div>
            <div>Phone Number</div>
            <div>Requirements</div>
            <div>reason</div>
            {/* <div>Created_at</div>
            <div>Closed_at</div> */}
   
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