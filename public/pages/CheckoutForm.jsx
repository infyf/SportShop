"use client"

import { useState } from "react"
import { ArrowLeft } from "lucide-react"

const CheckoutForm = ({ onSubmit, onCancel, cartTotal }) => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
    paymentMethod: "card",
    paymentSystem: "mastercard", // Add this new field
    saveInfo: false,
  })

  const [errors, setErrors] = useState({})

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    })

    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null,
      })
    }
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.fullName.trim()) newErrors.fullName = "Введіть ваше ім'я"
    if (!formData.email.trim()) {
      newErrors.email = "Введіть вашу електронну пошту"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Введіть коректну електронну пошту"
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Введіть ваш номер телефону"
    } else if (!/^\+?[0-9]{10,13}$/.test(formData.phone.replace(/\s/g, ""))) {
      newErrors.phone = "Введіть коректний номер телефону"
    }

    if (!formData.address.trim()) newErrors.address = "Введіть вашу адресу"
    if (!formData.city.trim()) newErrors.city = "Введіть ваше місто"
    if (!formData.postalCode.trim()) newErrors.postalCode = "Введіть ваш поштовий індекс"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const processCardPayment = (paymentSystem) => {
    switch (paymentSystem) {
      case "mastercard":
        console.log("Processing MasterCard payment")
        // MasterCard specific logic
        break
      case "stripe":
        console.log("Processing Stripe payment")
        // Stripe specific logic
        break
      case "paypal":
        console.log("Processing PayPal payment")
        // PayPal specific logic
        break
      case "fondy":
        console.log("Processing Fondy payment")
        // Fondy specific logic
        break
      default:
        console.log("Unknown payment system")
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (validateForm()) {
      // Process payment based on selected method
      if (formData.paymentMethod === "card") {
        processCardPayment(formData.paymentSystem)
      }

      onSubmit(formData)
    }
  }

  return (
    <div style={{ display: "flex", justifyContent: "center", padding: "40px" }}>
      <div style={{ maxWidth: "600px", width: "100%" }}>
        <div style={{ marginBottom: "20px" }}>
          <button onClick={onCancel}>
            <ArrowLeft size={16} /> Повернутися до кошика
          </button>
        </div>

        <h1 style={{ textAlign: "center", marginBottom: "20px" }}>Оформлення замовлення</h1>

        <form onSubmit={handleSubmit}>
          <h2>Контактна інформація</h2>

          <div style={{ marginBottom: "10px" }}>
            <label htmlFor="fullName">Повне ім'я *</label>
            <br />
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              style={{ width: "100%" }}
            />
            {errors.fullName && <p>{errors.fullName}</p>}
          </div>

          <div style={{ marginBottom: "10px" }}>
            <label htmlFor="email">Електронна пошта *</label>
            <br />
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              style={{ width: "100%" }}
            />
            {errors.email && <p>{errors.email}</p>}
          </div>

          <div style={{ marginBottom: "10px" }}>
            <label htmlFor="phone">Телефон *</label>
            <br />
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="+380XXXXXXXXX"
              style={{ width: "100%" }}
            />
            {errors.phone && <p>{errors.phone}</p>}
          </div>

          <h2>Адреса доставки</h2>

          <div style={{ marginBottom: "10px" }}>
            <label htmlFor="address">Адреса *</label>
            <br />
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              style={{ width: "100%" }}
            />
            {errors.address && <p>{errors.address}</p>}
          </div>

          <div style={{ marginBottom: "10px" }}>
            <label htmlFor="city">Місто *</label>
            <br />
            <input
              type="text"
              id="city"
              name="city"
              value={formData.city}
              onChange={handleChange}
              style={{ width: "100%" }}
            />
            {errors.city && <p>{errors.city}</p>}
          </div>

          <div style={{ marginBottom: "10px" }}>
            <label htmlFor="postalCode">Поштовий індекс *</label>
            <br />
            <input
              type="text"
              id="postalCode"
              name="postalCode"
              value={formData.postalCode}
              onChange={handleChange}
              style={{ width: "100%" }}
            />
            {errors.postalCode && <p>{errors.postalCode}</p>}
          </div>

          <h2>Спосіб оплати</h2>

          <div style={{ marginBottom: "10px" }}>
            <div>
              <input
                id="card"
                name="paymentMethod"
                type="radio"
                value="card"
                checked={formData.paymentMethod === "card"}
                onChange={handleChange}
              />
              <label htmlFor="card"> Оплата карткою онлайн</label>
            </div>

            {formData.paymentMethod === "card" && (
              <div style={{ marginLeft: "20px", marginTop: "10px" }}>
                <div>
                  <input
                    id="mastercard"
                    name="paymentSystem"
                    type="radio"
                    value="mastercard"
                    checked={formData.paymentSystem === "mastercard"}
                    onChange={handleChange}
                  />
                  <label htmlFor="mastercard"> MasterCard</label>
                </div>
                <div>
                  <input
                    id="stripe"
                    name="paymentSystem"
                    type="radio"
                    value="stripe"
                    checked={formData.paymentSystem === "stripe"}
                    onChange={handleChange}
                  />
                  <label htmlFor="stripe"> Stripe</label>
                </div>
                <div>
                  <input
                    id="paypal"
                    name="paymentSystem"
                    type="radio"
                    value="paypal"
                    checked={formData.paymentSystem === "paypal"}
                    onChange={handleChange}
                  />
                  <label htmlFor="paypal"> PayPal</label>
                </div>
                <div>
                  <input
                    id="fondy"
                    name="paymentSystem"
                    type="radio"
                    value="fondy"
                    checked={formData.paymentSystem === "fondy"}
                    onChange={handleChange}
                  />
                  <label htmlFor="fondy"> Fondy</label>
                </div>
              </div>
            )}

            <div>
              <input
                id="cash"
                name="paymentMethod"
                type="radio"
                value="cash"
                checked={formData.paymentMethod === "cash"}
                onChange={handleChange}
              />
              <label htmlFor="cash"> Оплата при отриманні</label>
            </div>
          </div>

          <div style={{ marginBottom: "10px" }}>
            <input id="saveInfo" name="saveInfo" type="checkbox" checked={formData.saveInfo} onChange={handleChange} />
            <label htmlFor="saveInfo"> Зберегти цю інформацію</label>
          </div>

          <div style={{ marginTop: "20px" }}>
            <div style={{ marginBottom: "10px" }}>
              <span>Загальна сума: </span>
              <strong>{cartTotal.toFixed(2)} ₴</strong>
            </div>

            <button type="submit" style={{ padding: "10px 20px" }}>
              Підтвердити замовлення
            </button>

            <p style={{ marginTop: "10px" }}>
              Натискаючи "Підтвердити замовлення", ви погоджуєтесь з нашими умовами використання та політикою
              конфіденційності.
            </p>
          </div>
        </form>
      </div>
    </div>
  )
}

export default CheckoutForm
