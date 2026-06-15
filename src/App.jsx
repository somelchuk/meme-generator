import { useState, useEffect } from 'react'

export default function App() {
  // Стан для поточного мему (текст та картинка)
  const [meme, setMeme] = useState({
    topText: "Коли задеплоїв у хмару",
    bottomText: "З першого разу і без помилок",
    randomImage: "https://i.imgflip.com/1bij.jpg" // Дефолтний мем з Боромиром
  })

  // Стан для збереження всіх мемів, які прийдуть з API
  const [allMemes, setAllMemes] = useState([])

  // Отримуємо трендові шаблони мемів при завантаженні сторінки
  useEffect(() => {
    fetch("https://api.imgflip.com/get_memes")
      .then(res => res.json())
      .then(data => setAllMemes(data.data.memes))
      .catch(err => console.error("Помилка завантаження мемів:", err))
  }, [])

  // Функція для вибору випадкової картинки
  function getMemeImage() {
    if (allMemes.length === 0) return
    const randomNumber = Math.floor(Math.random() * allMemes.length)
    const url = allMemes[randomNumber].url
    setMeme(prevMeme => ({
      ...prevMeme,
      randomImage: url
    }))
  }

  // Слідкуємо за тим, що студент пише в інпутах
  function handleChange(event) {
    const { name, value } = event.target
    setMeme(prevMeme => ({
      ...prevMeme,
      [name]: value
    }))
  }

  return (
    <div className="app-container">
      {/* Хедер сторінки */}
      <header className="header">
        <span className="header-emoji">🚀</span>
        <h2 className="header-title">Meme Generator for Students</h2>
        <p className="header-subtitle">Workshop: Localhost to Cloud</p>
      </header>

      {/* Форма керування */}
      <main className="main-content">
        <div className="form">
          <div className="input-group">
            <input 
              type="text"
              placeholder="Верхній текст"
              className="form-input"
              name="topText"
              value={meme.topText}
              onChange={handleChange}
            />
            <input 
              type="text"
              placeholder="Нижній текст"
              className="form-input"
              name="bottomText"
              value={meme.bottomText}
              onChange={handleChange}
            />
          </div>
          <button className="form-button" onClick={getMemeImage}>
            🔄 Згенерувати новий мем
          </button>
        </div>

        {/* Область самого мему */}
        <div className="meme-wrapper">
          <img src={meme.randomImage} className="meme-image" alt="Meme template" />
          <h2 className="meme-text top">{meme.topText}</h2>
          <h2 className="meme-text bottom">{meme.bottomText}</h2>
        </div>
      </main>

      {/* Футер для кастомізації студентом */}
      <footer className="footer">
        <p>Розроблено та задеплоєно студентом: <span className="student-name">Ваше Ім'я</span></p>
      </footer>
    </div>
  )
}