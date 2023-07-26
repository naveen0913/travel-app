import axios from 'axios'

 const getPlacesData=async(type,sw,ne)=>{
    try{
        const {data:{data}}= await axios.get(`https://travel-advisor.p.rapidapi.com/${type}/list-in-boundary`,{
            params: {
                bl_latitude: sw.lat,   //bottom-left -> south west
                tr_latitude: ne.lat,   //top-right -> north east
                bl_longitude: sw.lng,  
                tr_longitude: ne.lng,
              },
              headers: {
                'X-RapidAPI-Key': process.env.RAPID_API_KEY ,
                'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com'
              }
        }) ;
        return data
    }catch(error){
        console.log("error",error)
    }
}

export default getPlacesData


export const getWeatherData= async(lat,lng)=>{
  try{
    const {data:{data}} = await axios.get('https://ai-weather-by-meteosource.p.rapidapi.com/current',{
      params: {
    lat: lat,
    lon: lng,
  },
  headers: {
    'X-RapidAPI-Key': process.env.RAPID_API_KEY ,
    'X-RapidAPI-Host': 'ai-weather-by-meteosource.p.rapidapi.com'
  }
  })
  return data;
   
  }catch(error){
    console.log("error",error);
  }
}


