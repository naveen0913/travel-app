
import React, {  } from 'react'
import GoogleMapReact from "google-map-react";
import {Typography} from '@mui/material';
import Rating from '@mui/material/Rating';
import RestaurantMenuOutlinedIcon from '@mui/icons-material/RestaurantMenuOutlined';
import Paper from '@mui/material/Paper';
import useMediaQuery from '@mui/material/useMediaQuery';
import './map.css'
import mapstyles from './Mapstyles';


const Maps = ({setCoordinates,setBounds,coordinates,places,setchildClicked,weatherData}) => {
 
  const desktopView= useMediaQuery('(min-width:600px)')
  
  //const [childClicked, setChildClicked] = useState(null)

  return (
    <div style={{height:'100%',width:'100%'}} >  
    <GoogleMapReact
    bootstrapURLKeys={{key: process.env.GOOGLE_API_KEY}}
    defaultCenter={coordinates}
    center={coordinates}
    defaultZoom={14}
    margin={[50,50,50,50]}
    options={{disableDefaultUI:true,zoomControl:true, styles:mapstyles }}
    onChange={(e)=>{
      console.log(e)
      setCoordinates({lat: e.center.lat , lng: e.center.lng })
      setBounds({ne:e.marginBounds.ne , sw:e.marginBounds.sw})
    }}
    onChildClick={(child)=>{setchildClicked(child)}}
    >
    {places?.length && places?.map((place,i)=>(
      <div className='marker-container' 
           lat={Number(place.latitude)}
           lng={Number(place.longitude)}
           key={i}
        >
        {
          !desktopView?(
            <RestaurantMenuOutlinedIcon color='warning' fontSize='large' />
          ):(
            <Paper elevation={3} className='paper' >
              <Typography variant='subtitle2' 
                   gutterBottom 
                   sx={{fontFamily:'sans-serif',
                   color:'darkred',
                   fontWeight:600,
                   fontStyle:'initial'
              }} 
              >
                {place.name}
              </Typography>
             <img src={place.photo? place.photo.images.large.url:''}
                  className='pointer' 
                  alt='pointer' 
                  title={place.name}
              />
              <Rating name='read-only' size='small' value={Number(place.rating)} readOnly />
            </Paper>
          )

        }

      </div>
    ))}
    {weatherData?.list?.length && weatherData?.list?.map((data,i)=>(
        <div key={i} lat={data.coord.lat} lng={data.coord.lng}>
          <img src={`https://openweathermap.org/img/w/${data.weather[0].icon}.png`} 
             alt='img'
             className='img' 

          /> 
        </div>
      ))}
    </GoogleMapReact>
    </div>
  
  )
}

export default Maps 