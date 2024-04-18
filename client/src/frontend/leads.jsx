import React from 'react'
import '../css/leads.css'
function leads() {
  return (
    <div className="conversation-page">
      <div className="old-message">
        {/* Display the previous message or conversation */}
        {/* Replace this with your actual content */}
        <p>Previous conversation content goes here...</p>
      </div>
      <div className="new-conversation">
        <h2>New Update</h2>
        {/* Form for new conversation */}
        <form>

          <div className="form-group">
            <label htmlFor="requirements">Requirements</label>
            <textarea id="requirements" name="requirements" placeholder="Enter any special requirements"></textarea>
          </div>
          <button type="submit">Start Conversation</button>
        </form>
      </div>
      <div className="action">
        {/* Action button to close or indicate completion of conversation */}
        <button type="button">Close Conversation</button>
        <button type="button">Successful Lead</button>
      </div>
    </div>
  )
}

export default leads