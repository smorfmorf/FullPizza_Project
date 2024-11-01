import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './scss/app.scss';

import RTKQuery from './pages/RTKQuery';

import MainLayout from './layout/MainLayout';

import Oplata from './components/Oplata';
import ZakazGotov from './components/Oplata/ZakazGotov';

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
                <Route path="oplata" element={<Oplata />} />
                <Route path="oplata/zakaz" element={<ZakazGotov />} />
                <Route path="*" element={<NotFound />} />
            </Route>
        </Routes>
    );
}
export default App;
