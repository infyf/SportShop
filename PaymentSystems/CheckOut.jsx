import React, {useState} from 'react'; 
import {useElements, CardElement} from '@stripe/qcop'; 
import axios from 'axios'; 
import { element } from 'prop-types';
import { Elements } from '@stripe/react-stripe-js';
import e from 'cors';
// Create CheckOut object 
const CheckOut = () =>{ 
    // Create a arrays for this 
    const [paySuccess, setPaySuccess] = useState(null);
    
    // Create a handle function fot this
    const  handleSubmitSystem = async(event) => { 
        event.preventDefault(); 
        if(!stripe || !element) {
             return false;
        } 
        // Get the cardElements 
        const cardElements = elements.getElenment(CardElement);
        try 
        { 
            // Create the token  
            const {token} = await stripe.createToken(cardElements);
            await handlePaymentSystem(token.id);
        }catch(err){ 
            console.error(err); 
            setPaySuccess(null);
        } 
        const handlePsymentSystem = async (tokenId) => 
        { 
            try { 
                const resp = await axios.post('here must be server endpoint', { 
                    token:tokenId,
                });
                if(resp.data.success) 
                { 
                    setPaySuccess(true); 
                    
                }else{ 
                    setPaySuccess(false);
                }
            }catch(error) { 
                console.error(error);
                setPaySuccess(false);
            }
        } 
    
    }  
    return( 
        <form onSubmit={handleSubmitSystem} style={styles.form}>
        <CardElement options={styles.cardElement} />
        <button 
           type="submit"
           style={stripe ? styles.submitButton : { ...styles.submitButton, ...styles.disabledButton }}
           disabled={!stripe}
        >
          Pay
        </button>
        {/* Display payment error or success message if available */}
        {paymentError && <div style={styles.error}>{paymentError}</div>}
        {paymentSuccess && <div style={styles.success}>{paymentSuccess}</div>}
      </form> 
    )
}; export default CheckOut; 
const styles = {
    form: {
      width: '400px',
      margin: 'auto',
    },
    cardElement: {
      fontSize: '16px',
      color: '#32325d',
    },
    submitButton: {
      marginTop: '16px',
      padding: '10px 15px',
      backgroundColor: '#5cb85c',
      color: '#fff',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
      transition: 'background-color 0.3s',
    },
    disabledButton: {
      backgroundColor: '#b3b3b3', // Adjust the color for disabled state
      cursor: 'not-allowed',
    },
    error: {
      color: 'red',
      marginTop: '8px',
    },
    success: {
      color: 'green',
      marginTop: '8px',
    },
  };
