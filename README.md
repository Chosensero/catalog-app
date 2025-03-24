# Каталог товаров

## О проекте
Каталог товаров — это приложение на Next.js, созданное с помощью `create-next-app`. Оно представляет собой простой каталог товаров с корзиной, развернутый на GitHub Pages.

## Структура проекта
```
catalog-app/ 
├── app/                    # Основная папка Next.js App Router
│   ├── layout.tsx          # Корневой лейаут
│   ├── page.tsx            # Главная страница (Home)
│   └── cart/               # Папка для страницы корзины
│       └── page.tsx        # Страница корзины
├── components/             # Папка для компонентов
│   ├── ProductList.tsx     # Компонент списка товаров
│   ├── Filters.tsx         # Компонент фильтров
│   ├── ProductDialog.tsx   # Компонент всплывающего окна товара
│   ├── Header.tsx          # Компонент шапки сайта (с динамической корзиной)
│   └── CartItem.tsx        # Компонент одного элемента корзины
├── context/                # Папка для контекстов
│   └── CartContext.tsx     # Контекст корзины
├── types/                  # Папка для интерфейсов
│   ├── Product.ts          # Интерфейс товара
│   ├── CartItem.ts         # Интерфейс элемента корзины
│   ├── CartContext.ts      # Интерфейс контекста корзины
│   ├── ProductList.ts      # Интерфейс пропсов ProductList
│   ├── Filters.ts          # Интерфейс пропсов Filters
│   ├── ProductDialog.ts    # Интерфейс пропсов ProductDialog
│   └── CartItemComponent.ts # Интерфейс пропсов CartItem
├── public/                 # Папка для статических файлов
│   └── (пусто)             # Пока нет ресурсов
├── next.config.js          # Конфигурация Next.js
├── package.json            # Файл зависимостей
└── tsconfig.json           # Конфигурация TypeScript
```

## Начало работы
### Установка зависимостей
```bash
npm install
```

### Запуск сервера разработки
```bash
npm run dev
# или
yarn dev
# или
pnpm dev
# или
bun dev
```
Откройте [http://localhost:3000](http://localhost:3000) в браузере, чтобы увидеть результат.

Вы можете редактировать приложение, изменяя файл `app/page.tsx`. Все изменения автоматически применяются при сохранении.

Проект использует `next/font` для автоматической оптимизации и загрузки шрифта Geist от Vercel.

## Доступ к опубликованной версии
Проект развернут по адресу: [https://chosensero.github.io/catalog-app/](https://chosensero.github.io/catalog-app/).

## Подробнее о разработке
### Полезные ресурсы по Next.js:
- [Документация Next.js](https://nextjs.org/docs) — подробное описание API и возможностей.
- [Учебник Next.js](https://nextjs.org/learn) — интерактивное руководство.
- [Репозиторий Next.js на GitHub](https://github.com/vercel/next.js) — для обратной связи и участия в разработке.

## Развертывание на GitHub Pages
Проект настроен для статического экспорта и развертывания на GitHub Pages.

### Настройка `next.config.js`
```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/catalog-app',
  assetPrefix: '/catalog-app/',
};

module.exports = nextConfig;
```

### Настройка `package.json`
```json
"scripts": {
  "dev": "next dev",
  "build": "next build",
  "export": "next export",
  "start": "next start",
  "lint": "next lint",
  "predeploy": "npm run build && npm run export",
  "deploy": "gh-pages -d out"
}
```

### Развертывание
```bash
npm run predeploy
npm run deploy
```
После этого изменения будут опубликованы на [https://chosensero.github.io/catalog-app/](https://chosensero.github.io/catalog-app/).

## Развертывание на Vercel
Самый простой способ развернуть приложение Next.js — использовать [Vercel](https://vercel.com/). Подробнее в [документации по развертыванию Next.js](https://nextjs.org/docs/deployment).

