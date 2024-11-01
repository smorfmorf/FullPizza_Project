import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { getCartFromLS } from '../../utils/getCartFromLS';

export type CartItem = {
    id: string;
    title: string;
    type: string;
    size: number;
    price: number;
    imageUrl: string;
    count: number;
};

interface CartSliceState {
    totalPrice: number;
    items: CartItem[];
}

const { totalPrice, items } = getCartFromLS();

//так типизируется весь state
//(тк если не указать тип TS-берет его из значений и будет ошибка тк items:[] - never[])
const initialState: CartSliceState = {
    totalPrice, //totalPrice: 0
    items, //items: []
};

//createSlice взял тип из initialState и автоматически типизирует наши функции.
const cartSlice = createSlice({
    name: 'cart',
    initialState: initialState,

    //методы которые будут менять(обрабатывать) наш state
    reducers: {
        //тип PayloadAction и что хотим получить в action.payload указываем в <>
        addItem(state, action: PayloadAction<CartItem>) {
            const findItem = state.items.find((obj) => obj.id === action.payload.id);
            if (findItem) {
                findItem.count++;
            } else {
                state.items.push({
                    ...action.payload,
                    count: 1,
                });
            }
            state.totalPrice = state.items.reduce((sum, obj) => {
                //пребовляем предыдущюю сумму к вот этому
                return obj.price * obj.count + sum;
            }, 0);
        },
        // В Redux из action.payload ожидаем строчку тк obj.id = string,           чтобы Компоненты знали, что ничто другое нельзя передавать.
        minusItem(state, action: PayloadAction<string>) {
            const findItem = state.items.find((obj) => obj.id === action.payload);
            if (findItem) {
                findItem.count--;
            }

            //подсчет общей цены после изменение кол-во пиц
            state.totalPrice = state.items.reduce((sum, obj) => {
                return obj.price * obj.count + sum;
            }, 0);
        },
        removeItem(state, action: PayloadAction<string>) {
            state.items = state.items.filter((obj) => obj.id !== action.payload);

            state.totalPrice = state.items.reduce((sum, obj) => {
                return obj.price * obj.count + sum;
            }, 0);
        },
        clearItems(state) {
            state.items = [];
            state.totalPrice = 0;
        },
    },
});
//*Типизация Selectora, Типизируем весь state(со всеми reducerами) и из него достаем, тот state который нам нужен
export const selectCart = (state: RootState) => state.cart;

export const selectCartItemById = (id: string) => (state: RootState) =>
    state.cart.items.find((obj) => obj.id === id);

//экспорт всех функций(экшены) из slice
export const { addItem, minusItem, removeItem, clearItems } = cartSlice.actions;
// логика обработки всего нашего state, для store.
export default cartSlice.reducer;
