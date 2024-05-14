import React, { useEffect,useState } from 'react'
import '../css/closedleadlist.css'
const ClosedLeadsList = ({closedLeadslist}) => {

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
            {/* <div>Action</div> */}
        </div>
        {
            Array.isArray(closedLeadslist) && closedLeadslist.length> 0 ?(
                closedLeadslist.map((leads,index) => (
                    <div key={index} className={`list-item ${index % 2 === 0 ? 'even' : 'odd'}`} >
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