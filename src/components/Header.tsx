'use client';

import { AppBar, Toolbar, Typography, IconButton, Box, TextField, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { keyframes } from '@emotion/react';

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: scale(0.8);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
`;

const fadeOut = keyframes`
  from {
    opacity: 1;
    transform: scale(1);
  }
  to {
    opacity: 0;
    transform: scale(0.8);
  }
`;

export const Header = () => {
  const { cart } = useCart();
  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <AppBar position="static" sx={{ backgroundColor: '#fff', color: '#000', boxShadow: 'none' }}>
      <Box sx={{ maxWidth: '1200px', width: '100%', margin: '0 auto' }}>
        <Toolbar sx={{ minHeight: '48px', py: 1 }}>
          <Typography variant="h6" component={Link} href="/" sx={{ textDecoration: 'none', color: 'inherit', fontWeight: 'bold' }}>
            Магазин
          </Typography>
          <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center', gap: 3 }}>
            {['MAIN', 'FAMILY', 'SALE', 'NEW & TRENDING'].map((item) => (
              <Typography
                key={item}
                component={Link}
                href={item === 'MAIN' ? '/' : `/${item.toLowerCase().replace(' & ', '-')}`}
                sx={{ textDecoration: 'none', color: item === 'SALE' ? '#d32f2f' : '#000', fontWeight: 'medium', fontSize: '0.9rem', '&:hover': { textDecoration: 'underline' } }}
              >
                {item}
              </Typography>
            ))}
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <TextField
              placeholder="Search"
              size="small"
              InputProps={{ startAdornment: <InputAdornment position="start"><SearchIcon sx={{ color: '#000', fontSize: 20 }} /></InputAdornment> }}
              sx={{ width: 150, backgroundColor: '#f5f5f5', borderRadius: 1, '& .MuiOutlinedInput-root': { '& fieldset': { border: 'none' } } }}
            />
            <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
              <IconButton color="inherit"><AccountCircleIcon sx={{ fontSize: 24 }} /></IconButton>
              <IconButton color="inherit"><FavoriteBorderIcon sx={{ fontSize: 24 }} /></IconButton>
              <Box sx={{ display: 'flex', alignItems: 'flex-start', position: 'relative' }}>
                <IconButton color="inherit" component={Link} href="/cart">
                  <ShoppingCartIcon sx={{ fontSize: 24 }} />
                </IconButton>
                {cartItemCount > 0 && (
                  <Box
                    sx={{
                      backgroundColor: '#d32f2f',
                      color: '#fff',
                      borderRadius: '50%',
                      width: 18,
                      height: 18,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '0.7rem',
                      fontWeight: 'bold',
                      marginLeft: '-10px', 
                      marginTop: '-8px',  
                      animation: `${cartItemCount > 0 ? fadeIn : fadeOut} 0.3s ease-in-out`,
                    }}
                  >
                    {cartItemCount}
                  </Box>
                )}
              </Box>
            </Box>
          </Box>
        </Toolbar>
        <Box sx={{ borderBottom: '2px solid #d32f2f' }} />
      </Box>
    </AppBar>
  );
};