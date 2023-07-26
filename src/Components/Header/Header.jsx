import * as React from 'react';
import { styled } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
//import Autocomplete from '@mui/material/Autocomplete';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
//import { useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import {Autocomplete} from '@react-google-maps/api'

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor:'transparent',
  marginLeft: 0,
  width: '100%',
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
  },
}));

export default function SearchAppBar({onLoad,onPlaceChanged}) {
  
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed">
        <Toolbar>
         
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
            Travel Advisor
          </Typography>
          <Box display={'flex'} >
          <Typography variant='h6' 
                   component="div"
                   sx={{ flexGrow: 1, display: { xs: 'grid', sm: 'grid' } }}
                   noWrap
           >
                Explore the places
           </Typography>
          </Box>
          <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search for places"
              inputProps={{ 'aria-label': 'search for places' }}
            />
          </Search>
          </Autocomplete>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

