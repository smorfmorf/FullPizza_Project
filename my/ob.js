// // async function delay() {
// //     let data = await fetch('https://jsonplaceholder.typicode.com/todos/1');
// //     console.log('1: ', data); //объект Response

// //     data = await data.json();
// //     console.log('2: ', data); // { userId: 1, id: 1, title: 'del'}

// //     return data;
// // }
// // const test = delay();
// // console.log('delay return: ', test);

// // fetch('https://jsonplaceholder.typicode.com/todos/1')
// //     .then((response) => {
// //         console.log('response', response); //объект Response
// //         return response.json(); // Promise { <pending> }
// //     })
// //     .then((response) => console.log(response)); // { userId: 1, id: 1, title: 'del'}

// //! доделать callback async await promise...
// // function step1(callback) {
// //     setTimeout(() => {
// //         console.log('step 1');
// //         callback();
// //     }, 1000);
// // }

// // function step2(callback) {
// //     setTimeout(() => {
// //         console.log('step 2');
// //         callback();
// //     }, 1000);
// // }

// // //передаем функцию, которая вызовится внутри setTimeout
// // step1(() => {
// //     step2(() => {
// //         console.log('Все callback выполнены');
// //     });
// // });

// !!!!!!!!!!!!!!!!!!!!!!!!!!!

// function sendData(body, callback) {
//     const xhr = new XMLHttpRequest();

//     xhr.open('POST', 'https://jsonplaceholder.typicode.com/todos/1');

//     // событие load срабатывает после того, как запрос был отправлен и получен  положительный ответ от сервера - код 200. (в случае успешного завершения запроса)
//     xhr.addEventListener('load', () => {
//         const data = JSON.parse(xhr.response);
//         callback(data);
//     });

//     xhr.addEventListener('error', () => {
//         console.error('Error');
//     });

//     // Отправляется запрос на сервер
//     xhr.send(JSON.stringify(body));
// }

// const form = document.querySelector('#form');
// form.addEventListener('submit', (event) => {
//     event.preventDefault();
//     sendData(
//         {
//             title: form.title.value,
//             body: form.description.value,
//         },
//         (data) => {
//             form.textContent = `Заявка отправлена номер ${data.id}`;
//         },
//     );
// });
// //! методы массивов про reduce и find
// // const pizzas = [
// //     { id: 1, title: 'Сырная', count: 0 },
// //     { id: 2, title: 'Пепперони', count: 0 },
// // ];

// // //ищем пицу в массиве пиц, если нашли увеличиваем count иначе добавляем новую пиццу
// // function foo(item) {
// //     const findItem = pizzas.find((obj) => obj.id === item.id);

// //     if (findItem) {
// //         findItem.count++;
// //     } else {
// //         pizzas.push({ ...item, count: 1 });
// //     }
// // }
// // foo({ id: 2 });
// // console.log('pizzas: ', pizzas);

// //? Важно тк работаем с сылочными типами, когда мы вытаскиваем из массива объект `findItem` и изменяем ее свойство `count` на 1. Оно изменится и в массиве `pizzas`.

// пример callback

// loadScript('1.js', function (error, script) {
//     if (error) {
//         console.log(error);
//     } else {
//         console.log(script);
//         loadScript('2.js', function (error, script) {
//             if (error) {
//                 console.log(error);
//             } else {
//                 console.log(script);
//             }
//         });
//     }
// });

////////////////////////!
//Ошибки, возникающие в процессе выполнения XMLHttpRequest (например, сетевые ошибки), будут обработаны с помощью обработчика события error, а не блоком catch. Поэтому try/catch не нужен.
// function http() {
//     const xhr = new XMLHttpRequest();

//     xhr.open('GET', 'https://jsonplaceholder.typicode.com/todos/1');

//     // событие load срабатывает после того, как запрос был отправлен и получен   положительный ответ от сервера - код 200. (в случае успешного завершения запроса)
//     xhr.addEventListener('load', () => {
//         const data = JSON.parse(xhr.response);
//         console.log(data);
//     });

//     xhr.addEventListener('error', () => {
//         console.error('Error_xhr');
//     });

//     // Отправляется запрос на сервер
//     xhr.send();
// }
// http();

// Зачем нужен try/catch - когда идет запрос к API, БД или сервису и тд, и получаем ошибку. Когда ошибка приходит в наше приложение из-за нее может упасть программа.                    И чтобы этого не было нужно такие моменты отлавливать и обрабатывать.

//! Это есть в скрине про JS
// //метод fetch - возвращает Promise. / воспользуемся блоком try/catch - для выполнения запроса и обработки ошибок.  Оператор await - дождаться ответа от сервера.
// // fetch - принимает в себя URL запроса и Объект options куда можно передать   (метод, заголовки, тело запроса)
// // в конце преобразуем полученный результат в json и выводим в консоль
// async function getPosts() {
//     try {
//         const res = await fetch('https://jsonplaceholder.typicode.com/posts', {
//             method: 'GET',
//             headers: {},
//             body: {},
//         });
//         //Распарить данный запрос .json()
//         const data = await res.json();
//         console.log(data[1]);
//     } catch (error) {
//         console.log(error);
//     }
// }
// getPosts();

// //KAK PABOTAET EVENT LOOP...
// // * Микрозадачи (microtask) и задачи (task): сначала выполняются все микрозадачи (microtask queue),  а затем задачи из основной очереди событий (task queue).

// console.log(1);
// setTimeout(() => console.log(2), 0);

// // выполняется асинхроно, когда завершится и получит ответ вызовит then.
// fetch('https://jsonplaceholder.typicode.com/todos/1').then((res) => console.log('fetch 3'));

// // Создается resolved promise, который сразу же выполняется в микротаске
// Promise.resolve().then(() => console.log('promise 4'));
// console.log(5);

// //about Queue
// // 1 setTimeout in Task Queue
// // 2 Promise in Microtask Queue
// // 3 fetch in Microtask Queue

// // Интерпретатор JavaScript выполняет код построчно, начиная с верхней строки и двигаясь вниз по файлу.
// // Когда интерпретатор JavaScript достигнет строки с вызовом fetch, он сразу инициирует сетевой запрос.

//!
// //Глобальный компонент
// Vue.component('my-component', {
//     data() {
//         return {
//             obj: {
//                 id: 1,
//                 name: 'mazaka',
//                 count: 1,
//             },
//         };
//     },
//     //<slot></slot>  Контент внутри <my-component> без указания имени слота будет вставлен в этот слот.
//     template: `
//         <div class="my-component">
//             <div>
//                 <p>Static content before slot.</p>
//                 <slot></slot>
//                 <p>Static content after slot.</p>

//                 <p v-for="(value, key, index) in obj" :key="index">obj - value:{{value}} key:{{key}}<p>

//                 <footer>
//                     <slot name="footer"></slot>
//                 </footer>
//             </div>
//         </div>
//     `,
// });

// //Создает корневой экземпляр Vue, который управляет приложением.
// new Vue({
//     el: '#app',
//     data() {
//         return {
//             value: '',

//             user: {
//                 name: 'max',
//                 age: '22',
//                 city: 'Moscow',
//             },
//         };
//     },
//     // локальный компонент
//     components: {
//         'my-app': {
//             data() {
//                 return {
//                     cars: ['bmw', 'mercedes', 'audi'],
//                 };
//             },
//             template: `<main>Main Content</main>`,
//         },
//     },
// });

// new Vue({
//     el: '#app2',
//     data() {
//         return {
//             formField: {
//                 firstName: '',
//                 secondName: '',
//                 lastName: '',
//             },
//             addField: '',
//             arrArray: [],
//         };
//     },
//     methods: {
//         addNewField() {
//             this.$set(this.formField, this.addField, '');
//             // this.formField[this.addField] = '';
//             // console.log(this.formField);

//             this.$set(this.arrArray, 1, '123');
//             console.log('arrArray: ', this.arrArray);
//         },
//     },
// });

// по факту SFC - это синтаксический сахар для создания Компонента Vue.
//интерполяция {{ }} чтобы встроить в шаблон переменную из data
// Компоненты во Vue обычные js объекты, с определенными полями.
const App = {
    data() {
        return {
            inputValue: '',
            list: ['one', 'two', 'three'],
        };
    },
    methods: {
        addNewNotes(event) {
            this.list.push(event.target.value);
            this.inputValue = '';
        },

        deleteNote(index) {
            this.list.splice(index, 1);
        },
    },
};

Vue.createApp(App).mount('#app');
