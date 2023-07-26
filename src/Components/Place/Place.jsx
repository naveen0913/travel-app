import { Box, Button, Card, CardContent, CardMedia, Chip, Typography } from '@mui/material'
import React from 'react'
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CallIcon from '@mui/icons-material/Call';
import Rating from '@mui/material/Rating';
import CardActions from '@mui/material/CardActions'

const Place = ({place,selected,refProp}) => {

  console.log(place)

  if(selected) refProp?.current?.scrollIntoView({behavior:"smooth",block:"start"})

  return (
    <Card elevation={6}>
    <CardMedia 
           
      style={{height:350}}
          image={place.photo? place.photo.images.large.url: '' }
          title={place.name}
    />
    <CardContent>
      <Typography gutterBottom variant='h5' sx={{fontStyle:'inherit'}} >
        {place.name}
      </Typography>
      <Box display='flex' justifyContent='space-between' my={2} >
         <Rating  value={Number(place.rating)} readOnly />
         <Typography gutterBottom variant='subtitle1' > out of  {place.num_reviews} reviews </Typography>
       </Box>
      <Box display='flex' justifyContent='space-between' >
         <Typography variant='subtitle1' >Price</Typography>
         <Typography gutterBottom variant='subtitle1' sx={{color:'red'}} > {place.price_level} </Typography>
       </Box>
      <Box display='flex' justifyContent='space-between' >
      <Typography variant='subtitle1' >Ranking </Typography>
      <Typography gutterBottom variant='subtitle1' sx={{color:'green'}} > {place.ranking} </Typography>
      </Box>

    {
      place?.awards?.map((award)=>(
        <Box my={1} display="flex" justifyContent="space-between" alignItems="center" >
            <img src = {award.images.small} alt={award.images.small} />
             <Typography variant='subtitle2' color={"tomato"} >
              {award.display_name}
             </Typography> 
        </Box>
      ))
    }
    {
      place?.cuisine?.map(({name})=>(
        <Chip key={name} size='small' label={name} className='chip' />
      ))
    }

    {
      place?.address && (
        <Typography gutterBottom variant='subtitle2' color={'rosybrown'} className='subtitle' >
           <LocationOnIcon/> {place.address}
        </Typography>
      )}

      {
      place?.phone && (
        <Typography gutterBottom variant='subtitle2' color={'rosybrown'} className='spacing' >
           <CallIcon/> {place.phone}
        </Typography>
      )}
      <CardActions>
        <Button size='small' color='primary' onClick={()=>window.open(place.web_url,'_blank')} >
                 View the place
        </Button>
        <Button size='small' color='primary' onClick={()=>window.open(place.website,'_blank')} >
              Website
        </Button>
      </CardActions>
    </CardContent>
    </Card>
  )
}

export default Place