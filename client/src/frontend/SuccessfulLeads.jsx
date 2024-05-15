import React, { useEffect, useState } from 'react'
import '../css/closedleadlist.css'
const SuccessfulLeads = ({successLead,errormessage}) => {


  return (
    <div className="closed-list-container">
        <h3>Successful Leads</h3>
        <div className="closed-list-header">
            <div>Unique data</div>
            <div>Full Name</div>
            <div>Email</div>
            <div>Phone Number</div>
        </div>
         {
         successLead && successLead.length > 0 ? (
            successLead.map((lead, index) => (
               <div key={index} className={`list-item ${index % 2 === 0 ? 'even' : 'odd'}`}>
                  <div>{lead.unique_id}</div>
                  <div>{lead.fullname}</div>
                  <div>{lead.email}</div>
                  <div>{lead.phone}</div>
               </div>
            ))
         ) : (
            <div className="closed-list-item">
               <div>{errormessage || 'Fetching Error Or No Successful Leads Yet'}</div>
            </div>
         )}
    </div>
  )
}

export default SuccessfulLeads