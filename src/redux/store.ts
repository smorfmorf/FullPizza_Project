import { configureStore } from '@reduxjs/toolkit';
import cart from './slices/cartSlice';
import filter from './slices/filterSlice';
import pizza from './slices/pizzasSlice';
import { useDispatch } from 'react-redux';

//* Создаем хранилище, каждый slice это его часть.
export const store = configureStore({
    // это редьюсер - обработка slice
    reducer: {
        //slice - состояние и логика (методы из reducers)
        cart: cart,
        filter,
        pizza,
    },
});

console.log(store);

//! 1 - получаем тип всего хранилища!!!, он его автоматически сам получает
//глобальный state - в котором тип 3 slice.
export type RootState = ReturnType<typeof store.getState>;

//! 2 - создаем специальный хук useAppDispatch (разрешаем передавать в dispatch - асинхроный экшн) тк поумолчанию TS думает что он может принимать только объекты.
//тип для dispatch - делаем более продвинутый хук useDispatch
type AppDispatch = typeof store.dispatch; //берем все action из slice и превращаем в тип для TS
//теперь у нас есть специальный хук, мы взяли анонимую F которая вызывает useDispatch но внутрь его передаст специальный тип со всеми моими экшенами
export const useAppDispatch = () => useDispatch<AppDispatch>();
// или так
// export const useAppDispatch = useDispatch.withTypes<AppDispatch>;
