import React, { FC, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';

const FullPizza: FC = () => {
    const [pizza, setPizza] = React.useState<{
        imageUrl: string;
        title: string;
        price: number;
    }>();

    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchPizza() {
            try {
                const { data } = await axios.get(
                    'https://63ebb32b32a0811723906e45.mockapi.io/items/' + id,
                );
                setPizza(data);
            } catch (error) {
                alert('Ошибка получания пиццы');
                navigate('/');
            }
        }
        fetchPizza();
    }, []);

    //Чтобы не было ошибок делаем условный рендер, тк изначально в pizza лежит undefined и TS показывает, что может быть ошибка - при вызове свойства у undefined
    if (!pizza) return <>Загрузка...</>;

    return (
        <div className="container">
            <img src={pizza.imageUrl} style={{ width: '500px', height: '500px' }} />
            <h2>цена: {pizza.price} ₽</h2>
            <p>{pizza.title}</p>
            <Link to="/">
                <button style={{ margin: '2px', padding: '5px', borderRadius: 10 }}>Назад</button>
            </Link>
        </div>
    );
};
export default FullPizza;
