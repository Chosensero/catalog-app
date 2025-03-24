import { ListItem, ListItemAvatar, Avatar, ListItemText, IconButton, Box, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteIcon from '@mui/icons-material/Delete';

interface CartItemProps {
  item: { id: number; title: string; price: number; image: string; quantity: number };
  onIncrease: (id: number) => void;
  onDecrease: (id: number) => void;
  onRemove: (id: number) => void;
}

export const CartItem = ({ item, onIncrease, onDecrease, onRemove }: CartItemProps) => (
  <ListItem
    secondaryAction={
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <IconButton onClick={() => onDecrease(item.id)}><RemoveIcon /></IconButton>
        <Typography>{item.quantity}</Typography>
        <IconButton onClick={() => onIncrease(item.id)}><AddIcon /></IconButton>
        <IconButton onClick={() => onRemove(item.id)} color="error"><DeleteIcon /></IconButton>
      </Box>
    }
  >
    <ListItemAvatar>
      <Avatar variant="square" src={item.image} sx={{ width: 80, height: 80, mr: 2, objectFit: 'contain' }} />
    </ListItemAvatar>
    <ListItemText
      primary={item.title}
      secondary={<Typography variant="body2" color="text.secondary">${item.price} x {item.quantity} = ${(item.price * item.quantity).toFixed(2)}</Typography>}
    />
  </ListItem>
);