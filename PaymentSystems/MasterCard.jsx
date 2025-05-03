import React, { useState } from 'react';

const MasterCard = () => {
  const [isPay, setPay] = useState(false);

  const handlePay = () => {
    setPay(prev => !prev);
  };

  const handleIntegrate = async () => {
    try {
      const response = await fetch("https://api.mastercard.com/your-api-endpoint", {
        method: "GET",
        headers: {
          "Authorization": "Bearer levchenko7899gmailcom", // Замініть на правильний токен або механізм OAuth
          "Content-Type": "application/json"
        }
      });
      const data = await response.json();
      console.log("MasterCard Integration Data:", data);
    } catch (error) {
      console.error("Integration Error:", error);
    }
  };

  return (
    <div>
      <button onClick={handlePay}>Pay MasterCard</button>
      {isPay && <p>Success</p>}

      
    </div>
  );
};

export default MasterCard;
