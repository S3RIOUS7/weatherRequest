import '../mainContainer/mainContainer.scss'
import Sun from '../../assets/img/SUN.svg'
function MainContainer (props) {

return(
 
          <div className="weather">
            <div className='weatherPic'>
            <div className='weather-info'>
            <h2>{props.city}</h2>
            <p>{props.date}</p>
            <p>{props.temperature}°C</p>
            </div>
           
            <div className='picture'><img src={Sun}/></div>
            </div>
            <div className='tempLowHigh'>
            <div className='lowHigh'><p>{props.maxTemp}°C</p></div>
            <div className='lowHigh'><p>{props.minTemp}°C</p></div>
            </div>
          </div>

       
)
}
export default MainContainer