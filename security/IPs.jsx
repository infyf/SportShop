import React,{useState, useEffect} from "react"; 
// Createing "SuspiciousIPs" component 
const SuspiciousIPs = () =>
{ 
    const[blockIPs, setBlockIPs] = useState([]); 
    const[alerts, setAlerts] = useState([]); 
    // Using "useEffect" hook 
    useEffect(()=>{ 
        const fetchD = async ()=>{  
            try{ 
            // handle a suspicious IPs
            const res = await fetch("/api/susIPs"); 
            const datas = await res.json(); 
            setBlockIPs(datas.blockIPs || []); 
            setAlerts(datas.alerts || []);  
            }catch(err){ 
                setAlerts([{timestamp: Date.now(), message: "ERROR!!!! No connect to security journal"}]);
            }
        } 
        fetchD()
    }, []
    ) 
    return (
        <div className="bg-red-50 p-6 rounded-lg shadow-md mt-6">
          <h3 className="text-xl font-bold text-red-700 mb-4">Підозрілі активності та заблоковані IP</h3>
          <div className="mb-4">
            <h4 className="font-semibold text-red-600">Заблоковані IP:</h4>
            <ul className="list-disc ml-6">
              {blockIPs.map((ip, index) => (
                <li key={index}>{ip}</li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-red-600">Журнал попереджень:</h4>
            <ul className="list-disc ml-6">
              {alerts.map((alert, index) => (
                <li key={index}>
                  {new Date(alert.timestamp).toLocaleString()} – {alert.message}
                </li>
              ))}
            </ul>
          </div>
        </div>
      );
    

}; export default SuspiciousIPs;
