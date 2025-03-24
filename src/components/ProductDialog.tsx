import { Suspense, lazy } from 'react';
import { Box, Button, Typography } from '@mui/material';
import Image from 'next/image';

const Dialog = lazy(() => import('@mui/material/Dialog'));
const DialogTitle = lazy(() => import('@mui/material/DialogTitle'));
const DialogContent = lazy(() => import('@mui/material/DialogContent'));
const DialogActions = lazy(() => import('@mui/material/DialogActions'));
const QuantityField = lazy(() => import('@mui/material/TextField'));

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
}

interface ProductDialogProps {
  open: boolean;
  product: Product | null;
  quantity: number;
  onClose: () => void;
  onQuantityChange: (value: number) => void;
  onAddToCart: () => void;
}

export const ProductDialog = ({ open, product, quantity, onClose, onQuantityChange, onAddToCart }: ProductDialogProps) => (
  <Suspense fallback={<Typography>Загрузка...</Typography>}>
    <Dialog open={open} onClose={onClose}>
      <DialogTitle sx={{ color: '#212121' }}>{product?.title}</DialogTitle>
      <DialogContent>
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
          <Box sx={{ width: 100, height: 100, backgroundColor: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
            {product && <Image src={product.image} alt={product.title} width={100} height={100} style={{ objectFit: 'contain' }}  unoptimized={true} />}
          </Box>
          <Box>
            <Typography variant="h6" sx={{ color: '#212121' }}>${product?.price}</Typography>
            <Typography variant="body2" sx={{ color: '#757575' }}>{product?.category}</Typography>
            <QuantityField
              type="number"
              label="Количество"
              size="small"
              inputProps={{ min: 1 }}
              value={quantity}
              onChange={(e) => onQuantityChange(parseInt(e.target.value))}
              sx={{ mt: 2, width: 100 }}
            />
          </Box>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} sx={{ color: '#757575' }}>Отмена</Button>
        <Button variant="contained" onClick={onAddToCart} sx={{ backgroundColor: '#1976d2' }}>Заказать</Button>
      </DialogActions>
    </Dialog>
  </Suspense>
);