import React, {useState} from "react"; 
// Create a object of Fondy 
const Fondy = () => 
{ 
    const [payUrl, setPayUrl] = useState(""); 
    // create the handle function for this 
    const handlePay = async () =>{ 
        const resp = await fetch("https://api.fondy.eu/api/checkout/url/", { 
            method:"POST",
            headers:{"Content-Type": "application/json"}, 
            body: JSON.stringify({ 
                merchant_id: "1397120", 
                order_id: `order_${Date.now()}`,
                currency: "UAH", 
                amount: 10000, 
                resp_url: "http://localhost:3000/catalog",
            }),
        }); 
        // create data variable 
        const data =await resp.json();
        setPayUrl(data.resp.checkout_url);
    }; 
    return( 
        <div> 
            <button onClick={handlePay}>Pay</button>
            {payUrl && <a href={payUrl} target = "_blank">Go for pay</a>}
        </div>
    )
}; export default Fondy;
