import {CheckoutProvider} from '@stripe/qcop'; 
import {loadStripe} from '@stripe/qcop'; 
// create stripeProm variable
 const stripeProm = loadStripe('pk_test_TYooMQauvdEDq54NiTphI7jx'); 
 export default function Apply() 
 { 
const fetchCliSecret = () => 
{ 
    return fetch('/create-checkout-session', {method: 'POST'}).then((resp)=> resp.json).then((json)=>json.checkoutSessionClientSecret)
}; 
return (
    <CheckoutProvider stripe={stripeProm} options={{fetchCliSecret}}>
      <CheckoutForm />
    </CheckoutProvider>
  );
 }
