 fetch("/api/users-log", {
    method: "POST", 
    headers: {"Content-Type": "application/json"}, 
    body: JSON.stringify({action:" Users is login", timestamp: Date.now()})
})
