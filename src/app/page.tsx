'use client';

import { useState, useEffect } from 'react';
import { useCart } from '@/context/CartContext';
import { Box, Typography, CircularProgress } from '@mui/material';
import { ProductList } from '@/components/ProductList';
import { Filters } from '@/components/Filters';
import { ProductDialog } from '@/components/ProductDialog';
import { Product } from '@/types/Product';

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const { addToCart } = useCart();
  const [quantities, setQuantities] = useState<{ [key: number]: number }>({});
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Функция для капитализации первой буквы строки
  const capitalize = (str: string) => str ? str.charAt(0).toUpperCase() + str.slice(1) : str;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productsResponse, categoriesResponse] = await Promise.all([
          fetch('https://fakestoreapi.com/products'),
          fetch('https://fakestoreapi.com/products/categories'),
        ]);
        
        // Проверяем, что оба запроса успешно выполнены
        if (!productsResponse.ok || !categoriesResponse.ok) throw new Error('Ошибка загрузки данных');
        
        const productsData: Product[] = await productsResponse.json();
        const categoriesData: string[] = await categoriesResponse.json();
        
        setProducts(productsData);
        setCategories(['all', ...categoriesData]);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    // Дебаунс для предотвращения частых обновлений при вводе поиска
    const handler = setTimeout(() => setDebouncedSearch(searchQuery), 500);
    return () => clearTimeout(handler);
  }, [searchQuery]);

  // Фильтрация товаров по поисковому запросу и выбранной категории
  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(debouncedSearch.toLowerCase()) &&
    (selectedCategory === 'all' || product.category === selectedCategory)
  );

  // Обновление количества товара
  const handleQuantityChange = (productId: number, value: number) => {
    setQuantities((prev) => ({ ...prev, [productId]: Math.max(1, value) }));
  };

  // Открытие модального окна с деталями товара
  const handleOpenDialog = (product: Product) => {
    setSelectedProduct(product);
    setOpenDialog(true);
  };

  // Закрытие модального окна
  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedProduct(null);
  };

  // Добавление товара в корзину с выбранным количеством
  const handleAddToCart = () => {
    if (selectedProduct) {
      addToCart(
        { id: selectedProduct.id, title: selectedProduct.title, price: selectedProduct.price, image: selectedProduct.image },
        quantities[selectedProduct.id] || 1
      );
      handleCloseDialog();
    }
  };

  // Отображение загрузочного индикатора
  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
        <CircularProgress size={60} thickness={4} sx={{ color: '#1976d2' }} />
      </Box>
    );
  }

  // Отображение ошибки при загрузке данных
  if (error) {
    return (
      <Box sx={{ textAlign: 'center', mt: 4 }}>
        <Typography variant="h6" color="error">Ошибка: {error}</Typography>
      </Box>
    );
  }

  return (
    <Box>
      <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 3, color: '#212121' }}>
        Все предложения: {filteredProducts.length}
      </Typography>
      <Filters
        categories={categories}
        selectedCategory={selectedCategory}
        searchQuery={searchQuery}
        onCategoryChange={setSelectedCategory}
        onSearchChange={setSearchQuery}
        capitalize={capitalize}
      />
      {filteredProducts.length > 0 ? (
        <ProductList products={filteredProducts} onProductClick={handleOpenDialog} />
      ) : (
        // Сообщение о пустом списке товаров после фильтрации
        <Typography variant="body1" sx={{ textAlign: 'center', color: '#757575' }}>Ничего не найдено</Typography>
      )}
      <ProductDialog
        open={openDialog}
        product={selectedProduct}
        quantity={selectedProduct ? quantities[selectedProduct.id] || 1 : 1}
        onClose={handleCloseDialog}
        onQuantityChange={(value) => selectedProduct && handleQuantityChange(selectedProduct.id, value)}
        onAddToCart={handleAddToCart}
      />
    </Box>
  );
}
