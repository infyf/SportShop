import React, {useEffect, useState} from 'react'; 
const UserStatus = () =>{ 
    const[totUsers, setTotUsers] = useState(0);
    const[onlineUsers, setOnlineUsers] = useState(0); 
    const[load, setLoad] = useState(true); 
    useEffect(()=>{ 
        const fetchStatus = async () => { 
            try{ 
                const result = await fetch("/api/users-status"); 
                const datas = await result.json() 
                setTotUsers(datas.total || 0); 
                setOnlineUsers(datas.active || 0);
            }catch(err){ 
                console.error("Помилка завантаження статистики", err);
            } finally {
              setLoad(false);
            }
        }; 
        fetchStatus();
    }, []); 
    if(load){ 
        return <p>Loading of statistic...</p>
    } 
    return(
        <div className="bg-white p-6 rounded-lg shadow-md mt-6">
        <h3 className="text-xl font-semibold mb-4">Статистика користувачів</h3>
        <p className="text-gray-700 mb-2">Загальна кількість користувачів: <strong>{totUsers}</strong></p>
        <p className="text-gray-700">Активні користувачі зараз: <strong>{onlineUsers}</strong></p>
      </div> 
    );


}; export default UserStatus;
