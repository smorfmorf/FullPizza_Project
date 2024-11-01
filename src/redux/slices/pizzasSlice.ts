import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../store';

//Асинхроный экшн (асинхроная функция запроса на сервак в Redux)
export const fetchPizzas = createAsyncThunk<Pizza[], SearchPizzaParams>(
    'pizza/fetchPizzasStatus',
    async (params) => {
        console.log('params: ', params);
        const { currentPage, category, sortBy, order, search } = params;
        const { data } = await axios.get<Pizza[]>(
            `https://63ebb32b32a0811723906e45.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`,
        );
        console.log('data: ', data);
        return data;
    },
);

// тип для BackEnd - чтобы мы передавали только строчки.
export type SearchPizzaParams = {
    currentPage: string;
    category: string;
    sortBy: string;
    order: string;
    search: string;
};

export type Pizza = {
    id: string;
    title: string;
    price: number;
    imageUrl: string;
    sizes: number[];
    types: number[];
};

enum Status {
    LOADING = 'loading',
    SUCCESS = 'success',
    ERROR = 'error',
}

interface PizzaSliceState {
    items: Pizza[];
    status: Status;
}

//наш state
const initialState: PizzaSliceState = {
    items: [],
    status: Status.LOADING, // loading | success | error
};

//логика обработки нашего state
const pizzasSlice = createSlice({
    name: 'pizza',
    initialState: initialState,

    //методы которые будут менять наш state
    reducers: {
        setItems(state, action) {
            state.items = action.payload;
        },
    },

    //*Асинхроный экшен - С помощью 1 функции сделать 3 разных действия.
    //выполнение запроса, но если успешно выполнится делай что-то
    //для асинхроных экшенов - возвращает 3 статуса.
    extraReducers(builder) {
        //builder - сам типизируется.
        builder.addCase(fetchPizzas.pending, (state, action) => {
            console.log('Идет отправка: ', state);
            state.status = Status.LOADING;
            state.items = [];
        });
        // в action.payload - вернутся данные если запрос ОК
        builder.addCase(fetchPizzas.fulfilled, (state, action) => {
            console.log('Запрос выполнен: ', state);
            state.status = Status.SUCCESS;
            state.items = action.payload;
        });
        builder.addCase(fetchPizzas.rejected, (state, action) => {
            console.log('Была ошибка: ', state);
            state.status = Status.ERROR;
            state.items = [];
        });
    },
});

//* Типизация selector
export const selectPizzaData = (state: RootState) => state.pizza;

export const { setItems } = pizzasSlice.actions;
export default pizzasSlice.reducer;
