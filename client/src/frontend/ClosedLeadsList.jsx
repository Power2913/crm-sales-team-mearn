import React, { useEffect,useState } from 'react'
import '../css/closedleadlist.css'
const ClosedLeadsList = () => {
  const[closedLeadslist, setClosedLeadlist] = useState(['']);
  useEffect(() => {
    const newclosedlead = async(e) => {
        try {
            const response = await fetch('http://192.168.1.12:3002/closedLeadlist');
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

  return (
    <div className="closed-list-container">
        <h3>Closed Lead</h3>
        <div className="closed-list-header">
            <div>Full Name</div>
            <div>Email</div>
            <div>Phone Number</div>
            <div>Requirements</div>
            <div>reason</div>
            <div>Created_at</div>
            <div>Closed_at</div>
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
                        <div>{leads.created_at}</div>
                        <div>{leads.closed_at}</div>
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