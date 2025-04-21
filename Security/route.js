export default function handler(req, res) {
    res.status(200).json({
      logs: [
        { timestamp: Date.now(), action: "Користувач увійшов" },
        { timestamp: Date.now(), action: "Натиснута кнопка 'Зберегти'" },
      ],
    });
  }
  
