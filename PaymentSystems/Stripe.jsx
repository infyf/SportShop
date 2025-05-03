// Інтеграція зі Stripe, PayPal, Fondy або LiqPay 
import React, {useState} from 'react'; 
const StripeIntegrations = () =>{  
    const [paymentStatus, setPayStatus] = useState(''); 
    const handlePay = async () => 
    {
    const stripe = window.Stripe('pk_test_TYooMQauvdEDq54NiTphI7jx') ;
    const {error } = await stripe.redirectToCheckOut({ 
        sessionId: 'cs_test_a11YYufWQzNY63zpQ6QSNRQhkUpVph4WRmzW0zWJO2znZKdVujZ0N0S22u',
    }); 
    if(error) 
    { 
    setPayStatus('Error: ' + error.message);
    } 
    else{ 
        setPayStatus('Success');
    } 
  
    }; 
    return(
        <div> 
            <button onClick={handlePay}>Pay</button>
            <p>{paymentStatus}</p>
        </div>
    ); 
};export default StripeIntegrations;
