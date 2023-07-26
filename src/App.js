
import './App.css';
import Header from './Components/Header/Header';
//import Place from './Components/Place/Place';
import Maps from './Components/Map/Maps';
import Lists from './Components/Lists/Lists';
import { useState,useEffect } from 'react';
import Grid from '@mui/material/Grid';
import CssBaseline from '@mui/material/CssBaseline';
import getPlacesData from './api';
import  getWeatherData  from './api';


function App() {

  const [places, setPlaces] = useState([])
  const [filteredPlaces,setFilteredPlaces]=useState([])

  const [coordinates, setCoordinates] = useState({})
  const [bounds,setBounds]=useState({})

  const [childClicked, setchildClicked] = useState(null)
  const [isLoading,setIsLoading]=useState(false)

  const [type, setType] = useState('hotels')
  const [rating, setRating] = useState('0')
  const [distance,setDistance]= useState('0')
  const [date,setDate] = useState('0')

  const [weatherData,setWeatherData]=useState([])
  

  useEffect(() => {
    const filteredPlaces=places.filter((place)=>place.rating>rating && place.distance<distance && place.is_closed===false ? places : null)
    setFilteredPlaces(filteredPlaces)
    
  },[rating,distance,date])
  
  
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(({coords:{latitude,longitude}})=>{
      setCoordinates({lat:latitude,lng:longitude})
    })
  }, [])
  


  useEffect(()=>{

    if(bounds.sw && bounds.ne){   
    setIsLoading(true)

    getWeatherData(coordinates.lat,coordinates.lng)
    .then((data)=>setWeatherData(data))

    getPlacesData(type,bounds.sw,bounds.ne)
    .then((data)=>{
      console.log(data)
      setPlaces(data?.filter((place)=>place.name && place.num_reviews > 0))
      setIsLoading(false)
      setFilteredPlaces([])
      
    })
  }  
  },[bounds,type])

  
  console.log(filteredPlaces);
  console.log(weatherData);

  const [autocomplete,setAutoComplete] = useState(null)

  const onLoad=(autoC)=>setAutoComplete(autoC)

  const onPlaceChanged=()=>{

    const lat=autocomplete.getPlace().geometry.location.lat()
    const lng=autocomplete.getPlace().geometry.location.lng()

    setCoordinates({lat,lng})

    console.log(lat);
    console.log(lng);
  }


  return (
    <>
      <CssBaseline/>
      <Header onPlaceChanged={onPlaceChanged} onLoad={onLoad} />
      <Grid container spacing={3} style={{width:'100%'}} >
          <Grid item xs={12} md={5}>
          <Lists places={filteredPlaces.length ? filteredPlaces : places}
                 childClicked={childClicked} 
                 isLoading={isLoading} 
                 type={type}
                 setType={setType}
                 rating={rating}
                 setRating={setRating}
                 distance={distance}
                 setDistance={setDistance}
                 date={date}
                 setDate={setDate}
            />
          </Grid>
          <Grid item xs={12} md={7} > 
            <Maps
              places={filteredPlaces.length ? filteredPlaces : places}
              setCoordinates={setCoordinates}
              setBounds={setBounds}
              coordinates={coordinates}
              setchildClicked={setchildClicked}
              weatherData={weatherData}
            />
          </Grid>
      </Grid>
    </>
  );
}

export default App;
