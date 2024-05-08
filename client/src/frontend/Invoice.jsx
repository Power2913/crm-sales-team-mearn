import React from 'react'
// import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/invoice.css';
function Invoice() {
  return (
     <div className="invoice-main ">
        <div className="invoice-form">
            <form action="">
                <div className="invoice-group">
                    <input type="text" name="client-name" id="" placeholder='Client name...' />
                </div>
                <div className="invoice-group">
                    <input type="text" name="company-name" id="" placeholder='Company name...' />
                </div>
                <div className="invoice-group">
                    <input type="text" name="address-one" id="" placeholder='Address one...'/>
                </div>
                <div className="invoice-group">
                    <input type="text" name="address-two" id="" placeholder='Address two...'/>
                </div>
                <div className="invoice-group">
                    <input type="text" name="gst" id="" placeholder='GST...'/>
                </div>
                <div className="invoice-group">
                    <input type="text" name="vat" id="" placeholder='VAT...'/>
                </div>
                <div className="invoice-group">
                    <input type="text" name="email" id="" placeholder='Email...'/>
                </div>
                <div className="invoice-group">
                    <input type="text" name="database" id="" placeholder='Database'/>
                    <button>+</button>
                </div>
                <div className="invoice-group">
                    <input type="text" name="hscode" id="" placeholder='HS CODE...'/>
                </div>
                <div className="invoice-group">
                    <input type="date" name="period" id="" placeholder='Chose Period'/>
                </div>
                <div className="invoice-group">
                    <select name="currency" id="">
                        <option value="Doller">$</option>
                        <option value="Rs">₹</option>
                        <option value="Euro"> €</option>
                    </select>
                </div>
                <div className="invoice-group">
                    <input type="text" name="Amount" id="" />
                </div>
            </form>
        </div>
        <div className="invoice-format">
            <div className="format-header-logo">
                <div className="logo-left">
                   <div className="tradeimex-logo">

                   </div>
                   <div className="tradeimex-info">
                      <span>
                         Tradeimex Info Solution Private Limited
                      </span><br />
                      <span>
                         CIN Number : U72900DL2019PTC352374
                      </span><br />
                      <span>
                         GST Number : 07AAHCT4138N1ZWIN
                      </span><br />
                   </div>
                </div>
            </div>
            <div className="fromat-header-name">
                <div className="fromat-header-line-left"></div>
                <div className="name"><h3>INVOICE</h3></div>
                <div className="format-header-line-right"></div>
            </div>
            <div className="format-details">
                <div className="format-details-left">
                    <p>Invoice To :</p>
                    <span>Name:</span>
                    <span>Address:</span>
                    <span>City:</span>
                </div>
                <div className="format-details-right">
                    <p>Invoice No # <span>TI/24-25/0389</span></p>
                    <span>Date : 1-May-2024</span>
                    <span>TradeImeX Info Solution Private Limited</span><br />
                    <span>367-368, 3rd Floor, Pocket 11 B,</span><br />
                    <span>Rohini Sector 23, New Delhi -110085</span><br />
                    <span>Vietnam www.tradeimex.in</span><br />
                    <span>Email Id : info@tradeimex.in</span><br />
                </div>
            </div>
            <div className="format-database-table">
                <table className="table">
                    <thead className="table-header">
                        <tr>
                            <th>SI. No</th>
                            <th>Database</th>
                            <th>SAC CODE</th>
                            <th>HS CODE/ Product</th>
                            <th>Time Period</th>
                            <th>Amount</th>
                        </tr>
                    </thead>
                    <tbody className="table-body">
                        <tr>
                            <td>1</td>
                            <td>Vietnam Import Report</td>
                            <td>998598</td>
                            <td>Ch 28, 29, 38 & 9027</td>
                            <td>Apr-24</td>
                            <td>60</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className="invoice-billing">
                <div className="invoice-billing-left">
                    <div className="invoice-billing-left-sub">
                        <p>Account Details</p>
                        <p><span>ACCOUNT NUMBER</span><span></span><span>036705004479</span></p>
                        <p><span>ACCOUNT NAME</span><span></span><span>TRADEIMEX INFO SOLUTION PRIVATE LIMITED</span></p>
                        <p><span>BANK NAME</span><span></span><span>ICICI BANK</span></p>
                        <p><span>BANK ADDRESS</span><span></span><span>PLOT NO. 6, GARG TRADE CENTER,CC, SECTOR 11, ROHINI, NEW DELHI</span></p>
                        <p><span>IFSC CODE</span><span></span><span>ICIC0000367</span></p>
                        <p><span>MICR CODE</span><span></span><span>110229054</span></p>
                        <p><span>SWIFT CODE</span><span></span><span>ICICINBBCTS</span></p>
                    </div>
                </div>
                <div className="invoice-billing-right">

                </div>
            </div>
            <div className="tradeimex-details">
                <div className="term-conditions">
                    
                </div>
                <div className="sign">

                </div>
            </div>
            <div className="stamp">

            </div>
        </div>
     </div>
  )
}

export default Invoice