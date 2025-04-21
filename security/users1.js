// /api/user-stats
router.get("/api/user-stats", async (req, res) => {
    const users = await User.find(); // з MongoDB
    const active = users.filter(user => user.isActive).length; // або статус онлайн
    res.json({ total: users.length, active });
  });
  // headers: {
  //   "Authorization": `Bearer ${user.token}`,
  //   "Content-Type": "application/json"
  // }
   
  
