import React from 'react'
import '../css/generatedInvoice.css'
const GeneratedInvoice = () => {
    const Generateddata =[
        {
            Unique_id: '001',
            invoice_number: 'INV-1001',
            Invoice_date: '2024-01-01'
        },
        {
            Unique_id: '002',
            invoice_number: 'INV-1002',
            Invoice_date: '2024-01-01'
        },
        {
            Unique_id: '003',
            invoice_number: 'INV-1003',
            Invoice_date: '2024-01-01'
        }
    ];
  return (
    <div className='GeneratedInvoice'>
        <h3>Generated Invoice</h3>
        <table class="invoice-table">
        <thead>
            <tr>
                <th>Client Id</th>
                <th>Invoice Number</th>
                <th>Invoice Date</th>
            </tr>
        </thead>
        <tbody>
            {
                Array.isArray(Generateddata) && Generateddata.length > 0 ? (
                    Generateddata.map((data, index) => (
                        <tr key={index}>
                            <td>{data.Unique_id}</td>
                            <td>{data.invoice_number}</td>
                            <td>{data.Invoice_date}</td>
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