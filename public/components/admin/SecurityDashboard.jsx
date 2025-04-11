

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../../components/context/AuthContext"

const SecurityDashboard = () => {
  const { currentUser, isAuthenticated } = useAuth()
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(true)
  const [securityStats, setSecurityStats] = useState(null)
  const [recentActivity, setRecentActivity] = useState([])
  const [suspiciousActivities, setSuspiciousActivities] = useState([])

  const isAdmin = currentUser?.role === "admin"

  useEffect(() => {
    if (!isAuthenticated || !isAdmin) {
      navigate("/")
      return
    }

    const loadData = async () => {
      setIsLoading(true)
      try {
        await new Promise((resolve) => setTimeout(resolve, 1000))

        setSecurityStats({
          totalUsers: 1245,
          activeUsers: 876,
          loginAttempts: 342,
          failedLogins: 28,
          suspiciousActivities: 5,
          blockedIPs: 12,
        })

        setRecentActivity([
          {
            id: 1,
            userId: "user123",
            action: "login",
            status: "success",
            ip: "192.168.1.1",
            location: "Київ, Україна",
            timestamp: "2025-04-10T14:32:15",
            device: "Chrome / Windows",
          },
          {
            id: 2,
            userId: "admin456",
            action: "settings_change",
            status: "success",
            ip: "192.168.1.2",
            location: "Львів, Україна",
            timestamp: "2025-04-10T13:45:22",
            device: "Firefox / macOS",
          },
          {
            id: 3,
            userId: "user789",
            action: "password_reset",
            status: "success",
            ip: "192.168.1.3",
            location: "Одеса, Україна",
            timestamp: "2025-04-10T12:18:05",
            device: "Safari / iOS",
          },
          {
            id: 4,
            userId: "user456",
            action: "login",
            status: "failed",
            ip: "192.168.1.4",
            location: "Харків, Україна",
            timestamp: "2025-04-10T11:05:33",
            device: "Chrome / Android",
          },
        ])

        setSuspiciousActivities([
          {
            id: 1,
            ip: "203.0.113.7",
            location: "Миколаїв, Україна",
            activity: "Багато невдалих спроб входу",
            timestamp: "2025-04-10T10:05:12",
            status: "Заблоковано",
          },
          {
            id: 2,
            ip: "198.51.100.23",
            location: "Дніпро, Україна",
            activity: "Спроба доступу до адмін-панелі",
            timestamp: "2025-04-10T09:12:45",
            status: "Під наглядом",
          },
          {
            id: 3,
            ip: "198.51.100.45",
            location: "Запоріжжя, Україна",
            activity: "Підозріла активність API",
            timestamp: "2025-04-10T08:34:19",
            status: "Під наглядом",
          },
        ])
      } catch (error) {
        console.error("Error loading security data:", error)
      } finally {
        setIsLoading(false)
      }
    }

    loadData()
  }, [isAuthenticated, isAdmin, navigate])

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("uk-UA", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date)
  }

  const getStatusBadge = (status) => {
    const style = {
      padding: "2px 8px",
      borderRadius: "4px",
      fontSize: "12px",
      fontWeight: "bold",
      display: "inline-block",
    }

    if (status === "success" || status === "Успішно") {
      return <span style={{ ...style, backgroundColor: "#e6f4ea", color: "#137333" }}>Успішно</span>
    } else if (status === "failed" || status === "Невдало") {
      return <span style={{ ...style, backgroundColor: "#fce8e6", color: "#c5221f" }}>Невдало</span>
    } else if (status === "Заблоковано") {
      return <span style={{ ...style, backgroundColor: "#fce8e6", color: "#c5221f" }}>Заблоковано</span>
    } else if (status === "Під наглядом") {
      return <span style={{ ...style, backgroundColor: "#fff8e1", color: "#b06000" }}>Під наглядом</span>
    }
    return <span>{status}</span>
  }

  const getActionLabel = (action) => {
    switch (action) {
      case "login":
        return "Вхід"
      case "settings_change":
        return "Зміна налаштувань"
      case "password_reset":
        return "Скидання паролю"
      default:
        return action
    }
  }

  const containerStyle = {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "20px",
  }

  const headingStyle = {
    fontSize: "24px",
    fontWeight: "bold",
    marginBottom: "20px",
    color: "#333",
  }

  const sectionStyle = {
    marginBottom: "30px",
    backgroundColor: "white",
    border: "1px solid #ddd",
    borderRadius: "4px",
    padding: "15px",
  }

  const sectionHeadingStyle = {
    fontSize: "18px",
    fontWeight: "bold",
    marginBottom: "15px",
    borderBottom: "1px solid #eee",
    paddingBottom: "10px",
  }

  const tableStyle = {
    width: "100%",
    borderCollapse: "collapse",
  }

  const thStyle = {
    textAlign: "left",
    padding: "8px",
    borderBottom: "1px solid #ddd",
    fontSize: "14px",
    fontWeight: "bold",
  }

  const tdStyle = {
    padding: "8px",
    borderBottom: "1px solid #eee",
  }

  const buttonStyle = {
    backgroundColor: "#1a73e8",
    color: "white",
    border: "none",
    padding: "8px 16px",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "14px",
  }

  const statsGridStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
    gap: "15px",
  }

  const statItemStyle = {
    padding: "15px",
    backgroundColor: "#f5f5f5",
    borderRadius: "4px",
  }

  const statLabelStyle = {
    fontSize: "14px",
    color: "#666",
    marginBottom: "5px",
  }

  const statValueStyle = {
    fontSize: "24px",
    fontWeight: "bold",
  }

  if (isLoading) {
    return (
      <div style={{ textAlign: "center", padding: "40px" }}>
        <p style={{ fontSize: "18px" }}>Завантаження даних...</p>
      </div>
    )
  }

  return (
    <div style={containerStyle}>
      <h1 style={headingStyle}>Панель безпеки</h1>

      {/* 1. Статистика користувачів */}
      <div style={sectionStyle}>
        <h2 style={sectionHeadingStyle}>Статистика користувачів</h2>
        <div style={statsGridStyle}>
          <div style={statItemStyle}>
            <div style={statLabelStyle}>Всього користувачів</div>
            <div style={statValueStyle}>{securityStats.totalUsers}</div>
          </div>
          <div style={statItemStyle}>
            <div style={statLabelStyle}>Активних користувачів</div>
            <div style={statValueStyle}>{securityStats.activeUsers}</div>
          </div>
        </div>
      </div>

      {/* 2. Статистика спроб входу */}
      <div style={sectionStyle}>
        <h2 style={sectionHeadingStyle}>Статистика спроб входу</h2>
        <div style={statsGridStyle}>
          <div style={statItemStyle}>
            <div style={statLabelStyle}>Спроб входу</div>
            <div style={statValueStyle}>{securityStats.loginAttempts}</div>
          </div>
          <div style={statItemStyle}>
            <div style={statLabelStyle}>Невдалих входів</div>
            <div style={statValueStyle}>{securityStats.failedLogins}</div>
          </div>
        </div>
      </div>

      {/* 3. Підозрілі активності та заблоковані IP */}
      <div style={sectionStyle}>
        <h2 style={sectionHeadingStyle}>Підозрілі активності та заблоковані IP</h2>
        <div style={{ overflowX: "auto" }}>
          <table style={tableStyle}>
            <thead>
              <tr>
                <th style={thStyle}>IP-адреса</th>
                <th style={thStyle}>Місцезнаходження</th>
                <th style={thStyle}>Активність</th>
                <th style={thStyle}>Час</th>
                <th style={thStyle}>Статус</th>
              </tr>
            </thead>
            <tbody>
              {suspiciousActivities.map((activity) => (
                <tr key={activity.id}>
                  <td style={tdStyle}>{activity.ip}</td>
                  <td style={tdStyle}>{activity.location}</td>
                  <td style={tdStyle}>{activity.activity}</td>
                  <td style={tdStyle}>{formatDate(activity.timestamp)}</td>
                  <td style={tdStyle}>{getStatusBadge(activity.status)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 4. Остання активність користувачів */}
      <div style={sectionStyle}>
        <h2 style={sectionHeadingStyle}>Остання активність користувачів</h2>
        <div style={{ overflowX: "auto" }}>
          <table style={tableStyle}>
            <thead>
              <tr>
                <th style={thStyle}>Користувач</th>
                <th style={thStyle}>Дія</th>
                <th style={thStyle}>Статус</th>
                <th style={thStyle}>IP / Місце</th>
                <th style={thStyle}>Пристрій</th>
                <th style={thStyle}>Час</th>
              </tr>
            </thead>
            <tbody>
              {recentActivity.map((activity) => (
                <tr key={activity.id}>
                  <td style={tdStyle}>{activity.userId}</td>
                  <td style={tdStyle}>{getActionLabel(activity.action)}</td>
                  <td style={tdStyle}>{getStatusBadge(activity.status)}</td>
                  <td style={tdStyle}>
                    <div style={{ fontFamily: "monospace" }}>{activity.ip}</div>
                    <div style={{ fontSize: "12px", color: "#666" }}>{activity.location}</div>
                  </td>
                  <td style={tdStyle}>{activity.device}</td>
                  <td style={tdStyle}>{formatDate(activity.timestamp)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <button onClick={() => navigate("/")} style={buttonStyle}>
          Повернутися на головну
        </button>
      </div>
    </div>
  )
}

export default SecurityDashboard
