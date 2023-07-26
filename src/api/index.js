import axios from 'axios'


/*

const options = {
  method: 'GET',
  url: 'https://travel-advisor.p.rapidapi.com/hotels/list-in-boundary',
  params: {
    bl_latitude: '11.847676',
    bl_longitude: '108.473209',
    tr_longitude: '109.149359',
    tr_latitude: '12.838442',
    limit: '30',
    currency: 'USD',
    subcategory: 'hotel,bb,specialty',
    adults: '1'
  },
  headers: {
    'X-RapidAPI-Key': '828c69946cmsh6f7d430082a7da9p138656jsn8b5d99575e2c',
    'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com'
  }
};



*/

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


