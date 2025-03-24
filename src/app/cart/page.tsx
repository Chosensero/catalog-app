'use client';

import { useCart } from '@/context/CartContext';
import { Box, Typography, Button, List, Divider } from '@mui/material';
import { CartItem } from '@/components/CartItem';

export default function Cart() {
  const { cart, removeFromCart, increaseQuantity, decreaseQuantity, clearCart } = useCart();
  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2);

  return (
    <Box>
      <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 4 }}>Корзина</Typography>
      {cart.length > 0 ? (
        <>
          <List>
            {cart.map((item) => (
              <div key={item.id}>
                <CartItem item={item} onIncrease={increaseQuantity} onDecrease={decreaseQuantity} onRemove={removeFromCart} />
                <Divider />
              </div>
            ))}
          </List>
          <Box sx={{ mt: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Итого: ${totalPrice}</Typography>
            <Button variant="contained" color="error" onClick={clearCart}>Очистить корзину</Button>
          </Box>
        </>
      ) : (
        <Typography variant="body1" sx={{ textAlign: 'center', color: 'text.secondary' }}>Корзина пуста</Typography>
      )}
    </Box>
  );
}