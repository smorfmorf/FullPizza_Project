import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './scss/app.scss';

import RTKQuery from './pages/RTKQuery';

import MainLayout from './layout/MainLayout';

import Home from './pages/Home';
const Cart = React.lazy(() => import(/* webpackChunkName: "Cart" */ './pages/Cart'));
const FullPizza = React.lazy(() => import('./pages/FullPizza'));
const NotFound = React.lazy(() => import('./pages/NotFound'));

function App() {
    return (
        <Routes>
            <Route path="/" element={<MainLayout />}>
                {/* Это все Outlet для MainLayout */}
                <Route path="" element={<Home />} />
                <Route path="cart" element={<Cart />} />
                <Route path="pizza/:id" element={<FullPizza />} />
                <Route path="*" element={<NotFound />} />
            </Route>
        </Routes>
    );
}
export default App;
