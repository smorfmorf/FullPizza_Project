// import React, { useState } from 'react';

// import './style.css';
// import style from './Search.module.scss';

// const Block = () => {
//     const styles = {
//         color: 'yellow',
//         backgroundColor: 'black',
//         fontSize: '15px',
//     };

//     return (
//         <>
//             {/* SCSS модули  */}
//             <div className={style.root}>
//                 {/* global style */}
//                 <h2 className="title">global style</h2>
//                 {/* inline-style */}
//                 <h3 style={{ color: 'red', fontSize: 40 }}>Text</h3>
//                 <p style={styles}>Text</p>
//             </div>
//         </>
//     );
// };

// export default Block;

const clearData = {
    title: '',
    body: '',
};

function App() {
    const [posts, setPosts] = React.useState([{ id: 1, title: 'Js', body: 'Description' }]);

    const [data, setData] = useState(clearData);

    const addEventPost = (event) => {
        event.preventDefault();
        // console.log('data: ', data);

        setPosts([...posts, { ...data, id: Date.now() }]);
    };

    return (
        <div className="App">
            <form>
                {/* Управляемый компонент - двусторонее связывание данных */}
                <MyInput
                    value={title}
                    onChange={(event) => setData({ ...data, title: event.target.value })}
                    type="text"
                    placeholder="Название поста"
                />
                <MyInput
                    value={body}
                    onChange={(event) => setData({ ...data, body: event.target.value })}
                    type="text"
                    placeholder="Название поста"
                />

                <MyButton onClick={addEventPost}>Создать пост</MyButton>
            </form>

            <PostList posts={posts} />
        </div>
    );
}

//! Задача:  Создать функцию, которая эмулирует задержку в 1 секунду, а затем выводит сообщение в консоль.

//* 1. Callback:

function delay(message, callback) {
    setTimeout(() => {
        console.log(message);
        callback(); // Вызов колбэка
    }, 1000);
}

delay('Привет через 1 секунду!', () => {
    console.log('Функция завершена!');
});

// 2. Promise:

function delay(message) {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log(message);
            resolve(); // Выполнение промиса
        }, 1000);
    });
}

delay('Привет через 1 секунду!').then(() => {
    console.log('Функция завершена!');
});

//* 3. Async/Await:

async function delay(message) {
    await new Promise((resolve) => {
        setTimeout(() => {
            console.log(message);
            resolve(); // Выполнение промиса
        }, 1000);
    });
}

async function main() {
    await delay('Привет через 1 секунду!');
    console.log('Функция завершена!');
}

main();
