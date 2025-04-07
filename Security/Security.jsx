import React, { useState } from "react"; 

const Security = () => {  
  const [message, setMessage] = useState("");
  const [encrypted, setEncrypted] = useState("");
  const [decrypted, setDecrypted] = useState("");
  const [sslInfo, setSslInfo] = useState("");
  const [uid, setUid] = useState("");
  const [sshOutput, setSshOutput] = useState("");
  const [scapyStatus, setScapyStatus] = useState("");

  const handleLogin = async () => {
    try {
      const response = await fetch("/login", { method: "GET" });
      const data = await response.text();
      setMessage(data);
    } catch {
      setMessage("Login error");
    }
  };

  const handleEncrypt = async () => {
    const res = await fetch("/api/encrypt", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: "Sensitivity of data: " })
    });
    const data = await res.json();
    setEncrypted(data.encrypted);
    setDecrypted(data.decrypted);
  };

  const getSSLInfo = async () => {
    const res = await fetch("/api/ssl-info");
    const data = await res.json();
    setSslInfo(JSON.stringify(data));
  };

  const getUID = async () => {
    const res = await fetch("/api/uid");
    const data = await res.json();
    setUid(data.uid);
  };

  const callSSH = async () => {
    const res = await fetch("/api/ssh-command");
    const data = await res.json();
    setSshOutput(data.output);
  };

  const checkScapy = async () => {
    const res = await fetch("/api/scapy-ping");
    const data = await res.json();
    setScapyStatus(data.status);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-center mb-6 text-blue-600">Security Dashboard</h2>
        
        <div className="space-y-4">
          {/* Login Section */}
          <div className="flex items-center justify-between bg-blue-50 p-4 rounded-lg">
            <button 
              onClick={handleLogin} 
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300"
            >
              Login Check (Rate limited)
            </button>
            <p className="text-gray-700">{message}</p>
          </div>

          {/* Encrypt Section */}
          <div className="flex flex-col items-center bg-green-50 p-4 rounded-lg">
            <button 
              onClick={handleEncrypt} 
              className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition duration-300"
            >
              Encrypt Message
            </button>
            <p className="mt-2 text-green-700">Encrypted: {encrypted}</p>
            <p className="mt-2 text-green-700">Decrypted: {decrypted}</p>
          </div>

          {/* SSL Info Section */}
          <div className="flex flex-col items-center bg-yellow-50 p-4 rounded-lg">
            <button 
              onClick={getSSLInfo} 
              className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition duration-300"
            >
              Get SSL Info
            </button>
            <pre className="mt-2 text-yellow-700 whitespace-pre-wrap">{sslInfo}</pre>
          </div>

          {/* UID Section */}
          <div className="flex items-center justify-between bg-red-50 p-4 rounded-lg">
            <button 
              onClick={getUID} 
              className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition duration-300"
            >
              Get UID
            </button>
            <p className="text-red-700">{uid}</p>
          </div>

          {/* SSH Section */}
          <div className="flex flex-col items-center bg-purple-50 p-4 rounded-lg">
            <button 
              onClick={callSSH} 
              className="bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600 transition duration-300"
            >
              Run SSH Command
            </button>
            <pre className="mt-2 text-purple-700 whitespace-pre-wrap">{sshOutput}</pre>
          </div>

          {/* Scapy Section */}
          <div className="flex items-center justify-between bg-indigo-50 p-4 rounded-lg">
            <button 
              onClick={checkScapy} 
              className="bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-600 transition duration-300"
            >
              Check Scapy
            </button>
            <p className="text-indigo-700">{scapyStatus}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Security;
