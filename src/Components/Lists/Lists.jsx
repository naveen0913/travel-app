import React from 'react'
import { Grid,Typography } from '@mui/material'
import InputLabel from '@mui/material/InputLabel';
import CircularProgress from '@mui/material/CircularProgress';
import './list.css'
import Place from '../Place/Place'
import Select from '@mui/material/Select';
import { useState,createRef } from 'react'
import MenuItem from '@mui/material/MenuItem';
import { useEffect } from 'react'
import FormControl from '@mui/material/FormControl';
import SwapVertIcon from '@mui/icons-material/SwapVert';
import Box from '@mui/material/Box';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
//import DatePicker from './List_1';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';

const Lists = ({places,type,setType,setRating,rating,isLoading,childClicked,distance,setDistance,date,setDate}) => {


   //element References on our requirement
  const [elementRefs,setElementRefs]=useState([])
 
  useEffect(() => {

    const refs=Array(places?.length).fill().map((_,i)=>elementRefs[i] || createRef())
    setElementRefs(refs);

 
  }, [places,type, rating, distance, date])      //type, rating, distance, date
  
  console.log({childClicked});
  console.log(elementRefs);


 
  return (
    <div style={{padding:'40px'}}>  
    
    <div style={{display:'flex',justifyContent:'center'}} >

    <FormControl  
            sx={{margin:'29px',minWidth:'120px',
             shapeOutside:'content-box',borderRadius:'6px'}} 
        >
      <Box sx={{display:'flex',justifyContent:'center'}} >
        <Typography sx={{textAlign:'center',fontFamily:'serif',fontSize:19}}>Distance </Typography>
        <SwapVertIcon sx={{padding:'5px',height:'30px',width:'30px'}} />
      </Box> 

      <InputLabel id='distance'></InputLabel>
      <Select value={distance} id='distance' onChange={(e)=>setDistance(e.target.value)} >
      <MenuItem value={0} >All</MenuItem>
      <MenuItem value={1.0} >Within 1.0 km</MenuItem>
      <MenuItem value={2.0} >Within 2.0 km</MenuItem>
      <MenuItem value={3.0} >Within 3.0km</MenuItem>
      <MenuItem value={4.0} >within 4.0 km</MenuItem>
      <MenuItem value={5.0} >Upto 5.0 km</MenuItem>
      </Select>
      </FormControl>
    

      <FormControl  
            sx={{margin:'29px',minWidth:'120px',
             shapeOutside:'content-box',borderRadius:'6px'}} 
      >

      <Box sx={{display:'flex',justifyContent:'center'}} >
        <Typography sx={{textAlign:'center',fontFamily:'serif',fontSize:19}}>Date </Typography>
        
        <CalendarMonthIcon sx={{padding:'5px',height:'30px',width:'30px'}} />
      </Box> 
      <InputLabel id='date'></InputLabel>
      <Select value={distance} id='date' onChange={(e)=>setDate(e.target.value)} >
      <MenuItem value={0} >All</MenuItem>
      <MenuItem value={1} >Today</MenuItem>
      <MenuItem value={2} >Tomorrow</MenuItem>
      <MenuItem value={2} >Next Day</MenuItem>
      </Select>
      </FormControl>
  
    </div>
     
      {
        isLoading ? (
          <div className='loading' >
              <CircularProgress size="5rem" />
          </div>
        ):(

        <>
        
      <div style={{display:'flex',justifyContent:'center',alignItems:'center',flexDirection:'row'}} >
      
      <FormControl sx={{margin:'auto',minWidth:'120px',
             marginBottom:'30px',
             shapeOutside:'content-box',borderRadius:'6px'}} 
        >
    <Box sx={{display:'flex',justifyContent:'center'}} >
      <Typography sx={{textAlign:'center',fontFamily:'serif',fontSize:21}} >Places</Typography>
      <LocationOnOutlinedIcon sx={{height:'20px',width:'25px',marginTop:'7px'}} /> 
    </Box>  
      <InputLabel id='type' ></InputLabel>
      <Select value={type} id='type' onChange={(e)=>setType(e.target.value)} >
      <MenuItem    value={'hotels'}     sx={{fontFamily:'serif'}} > Hotels</MenuItem>
      <MenuItem  value={'restaurants'}  sx={{fontFamily:'serif'}} >Restaurants</MenuItem>
      <MenuItem value={'attractions'} sx={{fontFamily:'serif'}}  > Attractions</MenuItem>
      </Select>
      </FormControl>
      <FormControl  sx={{margin:'auto',minWidth:'120px',
             marginBottom:'30px',
             shapeOutside:'content-box',borderRadius:'6px'}} 
        >

  <Box sx={{display:'flex',justifyContent:'center'}} >
    <Typography sx={{textAlign:'center',fontFamily:'serif',fontSize:22}} >Rating</Typography>
      <ThumbUpOffAltIcon sx={{height:'30px',width:'30px'}} />  
  </Box>    
      <InputLabel id='rating'></InputLabel>
      <Select value={rating} id='rating' onChange={(e)=>setRating(e.target.value)} >
      <MenuItem value={0} >All</MenuItem>
      <MenuItem value={3} >Above 3.0</MenuItem>
      <MenuItem value={4} >Above 4.0</MenuItem>
      <MenuItem value={4.5} >Above 4.5</MenuItem>
      </Select>
      </FormControl>
    
      </div>
      <Grid container spacing={3} className='' sx={{overflow:'auto',height:'65vh'}} >
        {places?.map((place,i)=>(
          <Grid ref={elementRefs[i]} item key={i} xs={12}  >  
          <Place  place={place} 
                  selected={Number(childClicked)===i} 
                  refProp={elementRefs[i]}
          />
          </Grid>
        ))}
      </Grid>
      </>
      
      )}
    </div>
    
  )
}

export default Lists