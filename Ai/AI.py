import sqlite3
import pandas as pd
import nltk
import string
from nltk.corpus import stopwords
from nltk.probability import FreqDist
import tensorflow as tf
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Dense
import tkinter as tk
from tkinter import ttk, messagebox

# ==========================
# 1. Підключення до бази даних
# ==========================
conn = sqlite3.connect(r'C:\Users\user\Desktop\DB-Server-sport\SportThings.db')
query = "SELECT Name, Price, Size FROM sport"
data = pd.read_sql_query(query, conn)
conn.close()

# ==========================
# 2. Нейронна мережа
# ==========================
tf1 = Sequential()
tf1.add(Dense(10, activation='relu', input_shape=(2,)))  # Вхідні дані: ціна + розмір
tf1.add(Dense(5, activation='relu'))
tf1.add(Dense(1, activation='sigmoid'))  # Вихід: рейтинг або рекомендація
tf1.compile(optimizer='adam', loss='binary_crossentropy', metrics=['accuracy'])

# ==========================
# 3. NLP: Обробка тексту
# ==========================
nltk.download('stopwords')
stop_words = set(stopwords.words('english'))

tokens = ["example", "words", "here"]  # Замініть на реальні токени
tokens = [token for token in tokens if token.isalpha() and token not in stop_words and token not in string.punctuation]
fdisq = FreqDist(tokens)

# ==========================
# 4. Функції GUI
# ==========================
def recommend_product():
    try:
        price = float(price_entry.get())
        size = float(size_entry.get())

        # Генерація "псевдовхідних" даних для нейромережі
        input_data = [[price, size]]
        prediction = tf1.predict(input_data)

        # Вибір товару з бази
        recommended_product = data.loc[(data['Price'] <= price) & (data['Size'] == size)]

        if not recommended_product.empty:
            result_label.config(text=f"Рекомендуємо: {recommended_product.iloc[0]['Name']}")
        else:
            result_label.config(text="Не знайдено товарів за такими параметрами.")
    except ValueError:
        messagebox.showerror("Помилка", "Будь ласка, введіть правильні числові значення!")

# ==========================
# 5. Графічний інтерфейс (Tkinter)
# ==========================
root = tk.Tk()
root.title("Рекомендація товарів")
root.geometry("400x300")

# Поля введення
ttk.Label(root, text="Ціна:").pack(pady=5)
price_entry = ttk.Entry(root)
price_entry.pack(pady=5)

ttk.Label(root, text="Розмір:").pack(pady=5)
size_entry = ttk.Entry(root)
size_entry.pack(pady=5)

# Кнопка рекомендації
recommend_button = ttk.Button(root, text="Рекомендувати товар", command=recommend_product)
recommend_button.pack(pady=10)

# Поле для результату
result_label = ttk.Label(root, text="", font=("Arial", 12))
result_label.pack(pady=10)

# Запуск GUI
root.mainloop()

