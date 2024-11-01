import React from 'react';
import styles from './Oplata.module.scss';
import { useSelector, useDispatch } from 'react-redux';
import { setMySlice } from '../../redux/slices/mySlice';

const Oplata = () => {
    const { totalPrice, items } = useSelector((state) => state.cart);
    console.log('items', items);

    const [email, setEmail] = React.useState('');
    const [inputNumber, setInputNumber] = React.useState('+7');
    const [inputNum2, setInputNum2] = React.useState('');
    const [inputAdress, setInputAdress] = React.useState('');

    const curentUrl = window.location.href + '/zakaz';

    const baseUrl = 'http://localhost:8000';

    const itemsList = items.map((el) => {
        return `${el.title}, Цена:${el.price} руб,  кол-во:${el.count}, размер:${el.size} тесто:${el.type}  `;
    });

    const dispatch = useDispatch();
    React.useEffect(() => {
        dispatch(setMySlice(10000));
    }, []);

    const { numberZakaz } = useSelector((state) => state.mySlice);
    localStorage.setItem('oplataZakaza', JSON.stringify(numberZakaz));

    const sendEmail = async () => {
        let dataSend = {
            email,
            subject: ' Информация о заказе: ' + itemsList,
            inputAdress,
            inputNum2,
            numberZakaz,
        };

        const res = await fetch(`${baseUrl}/email/sendEmail`, {
            method: 'POST',
            body: JSON.stringify(dataSend),
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        })
            // HANDLING ERRORS
            .then((res) => {
                console.log(res);
                if (res.status > 199 && res.status < 300) {
                    alert('Send Successfully !');
                }
            });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        sendEmail();
        //перенаправления браузера на другую страницу
        window.location.assign(curentUrl);
    };
    return (
        <div className={styles.root}>
            <h1>Оформление заказа</h1>

            <form onSubmit={handleSubmit}>
                <h2>Информация для оплаты и доставки заказа</h2>
                <div className="group">
                    <label htmlFor="FIO">email</label>
                    <input
                        required
                        type="email"
                        id="FIO"
                        onChange={(event) => {
                            setEmail(event.target.value);
                        }}
                        value={email}
                    />
                </div>

                <div>
                    <div>
                        <label htmlFor="num" style={{ width: '900px' }}>
                            Телефон
                        </label>
                    </div>

                    <input
                        disabled
                        type="text"
                        value={inputNumber}
                        onChange={(event) => setInputNumber(event.target.value)}
                        style={{
                            width: '55px',
                            marginLeft: '5px',
                            marginRight: '5px',
                        }}
                    />
                    <input
                        style={{ width: '315px' }}
                        required
                        type="number"
                        id="num"
                        value={inputNum2}
                        onChange={(e) => setInputNum2(e.target.value)}
                    />
                </div>

                <div>
                    <label htmlFor="adress">Адрес доставки</label>
                    <input
                        onChange={(event) => {
                            setInputAdress(event.target.value);
                        }}
                        value={inputAdress}
                        type="text"
                        id="adress"
                        required
                        placeholder="Улица, дом, квартира"
                    />
                </div>

                <h3>Общая стоймость {totalPrice} ₽</h3>

                <center>
                    <button type="submit">
                        {/* <Link to="/oplata/zakaz">Оформить заказ</Link> */}
                        Оформить заказ
                    </button>
                </center>
            </form>
        </div>
    );
};

export default Oplata;
