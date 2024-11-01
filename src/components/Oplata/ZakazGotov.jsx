import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearItems } from '../../redux/slices/cartSlice';
import { Link } from 'react-router-dom';

const ZakazGotov = () => {
    const dispatch = useDispatch();
    dispatch(clearItems());

    const styl = {
        height: '50px',
        margin: '20px',
        padding: '10px 30px',
        border: 'none',
        textTransform: 'uppercase',
        color: '#fff',
        background: '#f24701',
        boxShadow: '2px 2px 5px rgba(0,0,0, 0.82)',
        fontSize: '15px',
        cursor: 'pointer',
    };

    const oplataZakaza = localStorage.getItem('oplataZakaza');

    return (
        <div style={{ textAlign: 'center', width: '80%', margin: '0 auto' }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="160" height="160" viewBox="0 0 24 24">
                <path d="m10.933 13.519-2.226-2.226-1.414 1.414 3.774 3.774 5.702-6.84-1.538-1.282z" />
                <path d="M19 3H5c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2h14c1.103 0 2-.897 2-2V5c0-1.103-.897-2-2-2zM5 19V5h14l.002 14H5z" />
            </svg>
            <h1>Заказ оформлен. Спасибо!</h1>
            <p>Номер вашего заказа №{oplataZakaza}</p>
            <p>Наши операторы свяжутся с вами в ближайшее время для уточнения вашего заказа</p>
            <Link to="/">
                <button style={styl}> На главную</button>
            </Link>
        </div>
    );
};
export default ZakazGotov;
