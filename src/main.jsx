import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router'

import App from './App.jsx'
import CatalogsPage from './pages/CatalogsPage.jsx'
import ContactsPage from './pages/ContactsPage.jsx'
import CatalogPage from './pages/CatalogPage.jsx'
import ProductPage from './pages/ProductPage.jsx'
import MainLayout from './components/layouts/MainLayout.jsx'
import BreadcrumbLayout from './components/layouts/BreadCrumb.jsx'
import OrdersPage from './pages/OrdersPage.jsx'
import FavoritesPage from './pages/FavoritesPage.jsx'
import BasketPage from './pages/BasketPage.jsx'
import AboutPage from './pages/AboutPage.jsx'
import { Provider } from 'react-redux'
import { store } from './app/store.js'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store} >

      <BrowserRouter>
        <Routes>
          <Route element={<MainLayout />}>
            <Route index element={<App />} />
            <Route element={<BreadcrumbLayout />}>
              <Route path="catalogs">
              <Route index element={<CatalogsPage />} />
              <Route path=":catalogId" element={<CatalogPage />} />
              <Route path=":catalogId/:productId" element={<ProductPage />} />
            </Route>
            <Route path="contacts" element={<ContactsPage />} />
            <Route path='orders' element={<OrdersPage/>} />
            <Route path='favorites' element={<FavoritesPage/>} />
            <Route path='basket' element={<BasketPage/>} />
            <Route path='about' element={<AboutPage/>} />
            </Route>
            
          </Route>
        </Routes>
      </BrowserRouter>

    </Provider>
  </StrictMode>
)
