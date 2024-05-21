import React, { useState,useEffect } from 'react'
import '../css/generatedInvoice.css'
const GeneratedInvoice = () => {
    // const Generateddata =[
    //     {
    //         Unique_id: '001',
    //         invoice_number: 'INV-1001',
    //         Invoice_date: '2024-01-01'
    //     },
    //     {
    //         Unique_id: '002',
    //         invoice_number: 'INV-1002',
    //         Invoice_date: '2024-01-01'
    //     },
    //     {
    //         Unique_id: '003',
    //         invoice_number: 'INV-1003',
    //         Invoice_date: '2024-01-01'
    //     }
    // ];

    const  [invoicedata, setinvoiceData] = useState([]);
    useEffect(() => {
        const getinvoicedata = async()=>{
            try {
                const response = await fetch('http://192.168.1.11:3002/invoice-details');
                const data = await response.json();
                setinvoiceData(data);
            } catch (error) {
                console.error('Error fetching messages:', error);
            }
        }
        getinvoicedata();
    }, []);
    console.log('invoicedata',invoicedata);
  return (
    <div className='GeneratedInvoice'>
        <h3>Generated Invoice</h3>
        <table class="invoice-table">
        <thead>
            <tr>
                <th>Client Company</th>
                <th>Invoice Number</th>
                <th>Invoice Date</th>
            </tr>
        </thead>
        <tbody>
            {
                Array.isArray(invoicedata) && invoicedata.length > 0 ? (
                    invoicedata.map((data, index) => (
                        <tr key={index}>
                            <td>{data.company}</td>
                            <td>{data.invoice_number}</td>
                            <td>{data.invoice_date}</td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colspan="3">No Data</td>
                    </tr>
                )
            }
        </tbody>
    </table>
    </div>
  )
}

export default GeneratedInvoice