import React, {useState} from 'react'; 
import {PayPalScriptProvider, PayPalButtons} from "@paypal/react-paypal-js"; 
// Create a object for PayPal 
const PayPal = () => 
{ 
    return( 
        <PayPalScriptProvider options = {{"client-id": ""}} > 
        <PayPalButtons createOrder={(data, actions)=> { 
            return actions.order.create({ 
                purchase_units: [{amount: {value: "15.00"}}],
            });
        }}
        onApprove={(data, actions) => { 
            return actions.order.capture().then((details)=>{ 
                alert('Transaction is complete')
            })
        }}  
        />
        </PayPalScriptProvider>
    );
}; export default PayPal;
