import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';

import cart from './slices/cartSlice';
import filter from './slices/filterSlice';
import pizza from './slices/pizzasSlice';
import { goodsApi } from './slices/goodsApi';

//* Создаем хранилище, каждый slice это его часть.
export const store = configureStore({
    // это редьюсер - обработка slice
    reducer: {
        //динамическое имя goodsApi: и за счет createApi создается ключ редьюсер и он в себе будет хранить все необходимые endpoints
        [goodsApi.reducerPath]: goodsApi.reducer,

        //slice - состояние и логика (методы из reducers)
        cart: cart,
        filter,
        pizza,
    },
    // мидлваре - логика которая выполняется в момент запуска экшена до их выполнения
    middleware: (getDefaultMiddleware) => {
        // вызов даст массив и в него добавь еще мидлваре из goodsApi который RTK Query сам создаст
        return getDefaultMiddleware().concat(goodsApi.middleware);
    },
});

//! 1 - получаем тип всего хранилища (всех 3х cлайсов)
export type RootState = ReturnType<typeof store.getState>;
//! 2 - создаем специальный хук useAppDispatch (разрешаем передавать в dispatch - асинхроный экшн) тк поумолчанию TS думает что он может принимать только объекты.
type AppDispatch = typeof store.dispatch; //берем все action из slice и превращаем в тип для TS
export const useAppDispatch = () => useDispatch<AppDispatch>();
