import { Grid, Card, CardMedia, CardContent, Typography, Chip, Box } from '@mui/material';
import { Product } from '@/types/Product';

interface ProductListProps {
  products: Product[];
  onProductClick: (product: Product) => void;
}

export const ProductList = ({ products, onProductClick }: ProductListProps) => (
  <Grid container spacing={4}>
    {products.map((product) => (
      <Grid item xs={12} sm={6} md={3} key={product.id}>
        <Card
          sx={{
            border: 'none',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            height: 450,
            display: 'flex',
            flexDirection: 'column',
            transition: 'transform 0.2s, box-shadow 0.2s',
            cursor: 'pointer',
            '&:hover': { transform: 'scale(1.02)', boxShadow: '0 4px 8px rgba(0,0,0,0.2)' },
          }}
          onClick={() => onProductClick(product)}
        >
          <Box sx={{ height: 300, backgroundColor: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
            <CardMedia component="img" image={product.image} alt={product.title} sx={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain' }} />
          </Box>
          <CardContent sx={{ p: 2, flexGrow: 1 }}>
            <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#212121', mb: 0.5 }}>${product.price}</Typography>
            <Typography variant="body2" sx={{ fontSize: '0.9rem', color: '#212121', mb: 0.5 }}>{product.title}</Typography>
            <Typography variant="body2" sx={{ fontSize: '0.8rem', color: '#757575' }}>{product.category}</Typography>
            <Chip label="New" size="small" sx={{ mt: 1, backgroundColor: '#1976d2', color: '#fff' }} />
          </CardContent>
        </Card>
      </Grid>
    ))}
  </Grid>
);