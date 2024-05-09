import React from 'react'
// import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/invoice.css';
import Tradeimexlogo from '../img/logo.png';
import Sign from '../img/Sign_of_director.png';
import Stamp from '../img/stamp_tradeimex.png';
function Invoice() {
const handlePrint =()=>{
    const invoicecontainer = document.getElementsByClassName('invoice-format');
    if (invoicecontainer) {
        window.print();
    } else {
        console.error('Invoice container not found.');
    }
}
  return (
     <><div className="invoice-main ">
          <div className="invoice-form">
              <h3>Invoice Form</h3>
              <form action="">
                  <div className="invoice-group">
                      <input type="text" name="client-name" id="" placeholder='Client name...' />
                  </div>
                  <div className="invoice-group">
                      <input type="text" name="company-name" id="" placeholder='Company name...' />
                  </div>
                  <div className="invoice-group">
                      <input type="text" name="address-one" id="" placeholder='Address one...' />
                  </div>
                  <div className="invoice-group">
                      <input type="text" name="address-two" id="" placeholder='Address two...' />
                  </div>
                  <div className="invoice-group">
                      <input type="text" name="gst" id="" placeholder='GST...' />
                  </div>
                  <div className="invoice-group">
                      <input type="text" name="vat" id="" placeholder='VAT...' />
                  </div>
                  <div className="invoice-group">
                      <input type="text" name="email" id="" placeholder='Email...' />
                  </div>
                  <div className="invoice-group-table">
                      <div className="invoice-group">
                          <input type="text" name="database" id="" placeholder='Database' />
                      </div>
                      <div className="invoice-group">
                          <input type="text" name="hscode" id="" placeholder='HS CODE...' />
                      </div>
                      <div className="invoice-group">
                          <input type="month" name="period" id="" placeholder='Chose Period' />
                      </div>
                      <div className="invoice-group">
                          <select name="currency" id="">
                              <option value="">Currency</option>
                              <option value="Doller">$</option>
                              <option value="Rs">₹</option>
                              <option value="Euro">€</option>
                          </select>
                      </div>
                      <div className="invoice-group">
                          <input type="text" name="Amount" id="" placeholder='Amount' />
                      </div>
                      <button>+</button>
                  </div>
                  <button type="submit">Generate</button>
              </form>
          </div>
          <div className="invoice-format" id='invoice-container'>
              <div className="invoice-format-inner">
                  <div className="format-header-logo">
                      <div className="logo-left">
                          <div className="tradeimex-logo">
                              <img src={Tradeimexlogo} alt="" srcset="" />
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
                      <div className="name"><h2>INVOICE</h2></div>
                      <div className="format-header-line-right"></div>
                  </div>
                  <div className="format-details">
                      <div className="format-details-left">
                          <p>Invoice To :</p><br />
                          <span>Name:Nitesh Chauhan</span><br />
                          <span>Address:Bhagalpur,Bihar</span><br />
                          <span>City:Bhagalpur</span><br />
                      </div>
                      <div className="format-details-right">
                          <p>Invoice No # <span>TI/24-25/0389</span></p>
                          <span>Date : 1-May-2024</span>
                          <span>TradeImeX Info Solution Private Limited</span><br />
                          <span>367-368, 3rd Floor, Pocket 11 B,</span><br />
                          <span>Rohini Sector 23, New Delhi -110085</span><br />
                          <span>www.tradeimex.in</span><br />
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
                          <p className='invoice-account-details-header'>Account Details</p>
                          <div className="invoice-billing-left-sub">

                              <p><span>ACCOUNT NUMBER: </span><span></span><span>036705004479</span></p>
                              <p><span>ACCOUNT NAME:   </span><span></span><span>TRADEIMEX INFO SOLUTION PRIVATE LIMITED</span></p>
                              <p><span>BANK NAME:      </span><span></span><span>ICICI BANK</span></p>
                              <p><span>BANK ADDRESS:   </span><span></span><span>PLOT NO. 6, GARG TRADE CENTER,CC, SECTOR 11, ROHINI, NEW DELHI</span></p>
                              <p><span>IFSC CODE:      </span><span></span><span>ICIC0000367</span></p>
                              <p><span>MICR CODE:      </span><span></span><span>110229054</span></p>
                              <p><span>SWIFT CODE:     </span><span></span><span>ICICINBBCTS</span></p>
                          </div>
                      </div>
                      <div className="invoice-billing-right">
                          <div className="invoice-billing-right-sub">
                              <div className="invoice-billing-right-sub-left">
                                  <p><span>Net total</span>  </p>
                                  <p><span>SGST 18%</span>  </p>
                                  <p><span>CGST 18%</span>  </p>
                                  <p><span>IGST 18%</span>  </p>

                              </div>
                              <div className="invoice-billing-right-sub-right">
                                  <p>  <span>inr 100</span></p>
                                  <p>  <span>: 18</span></p>
                                  <p>  <span>: 18</span></p>
                                  <p>  <span>: 18</span></p>

                              </div>
                          </div>
                          <div className="invoice-billing-total">
                              <div className="invoice-billing-total-left">
                                  <span>TOTAL</span>
                              </div>
                              <div className="invoice-billing-total-right">
                                  <span>: 136</span>
                              </div>
                          </div>
                      </div>
                  </div>
                  <div className="tradeimex-details">
                      <div className="term-conditions">
                          <p>
                              (1). TradeImeX® makes all efforts to provide an error free & timely report,
                              however the data is based on government sources and TradeImeX® does not
                              take any responsibility for its correctness, completeness, changes into the
                              formats, timely availability etc.
                          </p>
                          <p>
                              (2).No Liability including, but not limited to refunds is assumed towards
                              readers in the event of any such change.
                          </p>
                          <p>
                              (3).This transaction is subjected to the jurisdiction of Delhi court, India.
                          </p>
                          <p>
                              (4).This is the an undertaking that Purchaser/Subscriber will not reproduce,
                              sell, share, distribute, lease, rent, copy revise and modify the reports.
                          </p>
                          <p>
                              (5).TradeImeX® remains the owner of the information. Your rights are limited
                              to usage of the same for your internal business.
                          </p>
                          <p>
                              (6) Payment should be 100% advance by TTR
                              **I have read the above terms & conditions, and agree to the sam
                          </p>
                      </div>
                      <div className="sign">
                          <div className="client-sign">
                              <div className='client-sign-line'></div>
                              <span>Client Signature</span>
                          </div>
                          <div className="deirector-sign">
                              <div className="img">
                                  <img src={Sign} alt="" />
                              </div>
                              <span>Authorised Signature</span>
                          </div>
                      </div>
                  </div>
                  <div className="stamp">
                      <div className="stamp-img">
                          <img src={Stamp} alt="" srcset="" />
                      </div>
                  </div>
              </div>
          </div>
      </div><button onClick={handlePrint}>Print Invoice</button></>
  )
}

export default Invoice