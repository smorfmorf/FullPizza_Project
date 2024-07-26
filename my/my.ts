//* Базовые типы
let firstName: string = 'Max';
let age: number = 22;
let isOwner: boolean = true;

let profile: undefined = undefined;
let city: null = null;

let isHasGirl: unknown = null;
let MyName: any = true;

//* Структура объекта
const userProfile: {
    firstName: string;
    age: number;
    isOwner: boolean;
} = {
    age: 22,
    firstName: 'Max',
    isOwner: true,
};

userProfile.age = 23;

//* Массивы и кортежи
const numbers: number[] = [1, 2, 3];
//дженерик
const numbers2: Array<number> = [1, 2, 3];
//кортеж/typles
const profileX: [string, number] = ['mazaka', 22];

//* Функции
//В функциях описываем аргумент и что она возвращает (необязательный параметр пишем через ?)
function getAge(name?: string): number {
    return 22;
}
//* типизация стрелочной функции
const getAge2 = (name?: string): number => 22;

//можно еще и так типизировать стрелочную, но так лучше не делать
//тип функция без аргументов и возвращает число и сразу присваиваем функцию.
const arrowFunc: () => number = () => 22;

//? Немного практики.
// В TypeScript, обязательный параметр не может следовать за необязательным параметром в определении функции.
function getUser(login: (name?: string) => string, user?: string): string | undefined {
    return `user: ${user}, login: ${login()}`;
}
function defaultLogin(name?: string): string {
    return name ? `Welcome, ${name}!` : 'Guest';
}
// Вызов функции getUser с определенными параметрами
const result = getUser(defaultLogin, 'Alice');
//?

// REST
function getFullName(firstName: string, ...names: string[]): string {
    return `${firstName} ${names.join(' ')}`;
}

// Функциональные перегрузки (если строка - вернем строку и тд. и чтобы это все работало обозначаем саму функцию, но с параметрами any)
function getInfo(name: string): string;
function getInfo(age: number): number;
function getInfo(age: boolean): boolean;
function getInfo(value: any): any {
    return value;
}

const res = getInfo('Max');
const res2 = getInfo(123);

// Продвинутые концепции
