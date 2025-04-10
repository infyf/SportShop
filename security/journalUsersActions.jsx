import React, { useState, useEffect } from 'react';

const ActiveUsersLog = () => {
  const [logs, setLogs] = useState([]);
  const [actions, setActions] = useState([]);

  const handleLogin = (event) => {
    const value = event.target.value;
    setLogs((prevLogs) => [...prevLogs, { timestamp: Date.now(), action: value || "User isn’t logged in" }]);
  };

  const handleActions = (event) => {
    const value = event.target.value;
    setActions((prevActions) => [...prevActions, { timestamp: Date.now(), action: value || "No user action" }]);
  };

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const result = await fetch("/api/fetch");
        const data = await result.json();
        setLogs(data.logs || []);
      } catch {
        setLogs([{ timestamp: Date.now(), action: "Помилка підключення до журналу" }]);
      }
    };

    fetchLogs();
  }, []);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mt-6">
      <h3 className="text-xl font-semibold mb-4">Журнал дій користувача</h3>
      <div className="max-h-64 overflow-y-auto">
        {logs.length === 0 ? (
          <p className="text-gray-500">Журнал порожній.</p>
        ) : (
          <ul className="space-y-2">
            {logs.map((log, index) => (
              <li key={index} className="border-b pb-2">
                <span className="font-medium text-blue-700">
                  {new Date(log.timestamp).toLocaleString()}:
                </span>
                <span className="ml-2 text-gray-800">{log.action}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default ActiveUsersLog;
