import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios'


function App() {
  const [location, setLocation] = useState()
  const [weather, setWeather] = useState()
  const [btnChange, setBtnChange] = useState(false)
  const [loading, setLoading] = useState(true)
  const [nameLocation, setNameLocation] = useState()
  
  useEffect(() => {
    const success = (position) => {  
      const location = {
      longitude: position.coords.longitude,
      latitude: position.coords.latitude
      }
      setLocation(location)
    }
    navigator.geolocation.getCurrentPosition(success)
  },[])

  useEffect(() => {
    if(location){
    const URL = `https://api.openweathermap.org/data/2.5/weather?lat=${location.latitude}&lon=${location.longitude}&appid=7d5873d34efaee7f63c2364c11120c97`
    axios.get(URL)
      .then(res => setTimeout(() => {
        setLoading(false)
        setWeather(res.data)
      }, 100))
      .catch(err => console.log(err))}
    if(nameLocation){
      let words = nameLocation.split(' ')
      let capital = words.map(p => p[0].toUpperCase() + p.slice(1)).join(' ')
      console.log(capital)
      const URL = `https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=7d5873d34efaee7f63c2364c11120c97`
    axios.get(URL)
      .then(res => setTimeout(() => {
        setLoading(false)
        setWeather(res.data)
      }, 100))
      .catch(err => console.log(err))}
  },[location, nameLocation])
  
  const handleChangeInput = e => {
    e.preventDefault()
    setNameLocation(e.target.text.value)
    e.target.text.value = ""
  }
  

  const handleChange = () => {
    setBtnChange(!btnChange)
  }
  let temperatureF = Math.round((weather?.main.temp-273.15)*1.8+32)
  let temperatureC = Math.round((temperatureF-32)/1.8)
  let tempMinF = Math.round((weather?.main.temp_min-273.15)*1.8+32)
  let tempMaxF = Math.round((weather?.main.temp_max-273.15)*1.8+32)
  let tempMinC = Math.round((tempMinF-32)/1.8)
  let tempMaxC = Math.round((tempMaxF-32)/1.8)
  if(loading) {
    return(
      <div className={`App ${weather?.weather[0].main}`}  >
      <ul className='name-town load'></ul>
       <main className='load container-principal'>
        <section className='container-second'>
          <article className='load cont temperature'></article>
          <article className='load cont  article-left'></article>
          <article className='load img'></article>
          <article className='load cont article-rigth'></article>
          <article className='load cont article-weather'></article>
        </section>
       </main>
    </div>
    )
  }
  else {
  return (
    <div className={`App ${weather?.weather[0].main}`}  >
      <ul className='name-town'><li>{`${weather?.name}, ${weather?.sys.country}`}</li></ul>
       <main className='container-principal'>
        <div className='container-one'>
        <section className='container-second'>
          <article className='cont temperature'>
            <h1 className='temp'>{btnChange?`${temperatureC} C°`:`${temperatureF} F°`}</h1>
            <button onClick={handleChange} className='btn-change'>{btnChange?'Change F°':'Change C°'}</button>
          </article>
          <article className='cont  article-left'>
            <article className='container-min minmax'>
              <h3 className='title min'>Min</h3>
              <h2 className='value-weather'>{btnChange?`${tempMinC} C°`:`${tempMinF} F°`}</h2>
            </article>
            <article className='container-humidity'>
              <h3 className='title'>Humidity</h3>
              <h2 className='value-weather'>{`${weather?.main.humidity} %`}</h2>
            </article>
          </article>
          <article className='img'>
            <img src={`http://openweathermap.org/img/wn/${weather?.weather[0].icon}@2x.png`}/>
          </article>
          <article className='cont article-rigth'>
            <article className='container-max minmax'>
              <h3 className='title max'>Max</h3>
              <h2 className='value-weather'>{btnChange?`${tempMaxC} C°`:`${tempMaxF} F°`}</h2>
            </article>
            <article className='container-humidity'>
              <h3 className='title'>Clouds</h3>
              <h2 className='value-weather'>{`${weather?.clouds.all}`}</h2>
            </article>
          </article>
          <article className='cont article-weather'>
            <form className='container-search'  onSubmit={handleChangeInput}>
              <input type="text" id='text' placeholder="Enter your location" autoCapitalize='sentences' />
              <button className='btn-change btn-search'>Search</button>
            </form>
            <h2 className='description'>"{`${weather?.weather[0].description}`}"</h2>
          </article>
        </section>
        </div>
       </main>
    </div>
  )}
}

export default App
