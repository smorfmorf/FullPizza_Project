import { createSlice } from '@reduxjs/toolkit';

//первое состояние (state)
const initialState = {
    numberZakaz: 1,
};

//логика которая будет обрабатывать наш state
export const mySlice = createSlice({
    name: 'mySlice',
    initialState,
    reducers: {
        //*Когда будем вызывать эту функцию в компоненте каком-то, она тут вызовится, но когда вызовится она получит свое состояние state
        //?Когда будем передавать в dispatch нашу функцию setCategoryId то мы можем сделать так dispatch(setCategoryId(5)) и это 5 будет хранится в action.payload

        setMySlice(state, action) {
            state.numberZakaz = Math.floor(Math.random() * action.payload);
        },
    },
});

//достаем нашу функцию которая будет менять стейт из экшенов
export const { setMySlice } = mySlice.actions;

// reducer делает обработку нашего стейта (изменяет его) в него передаем наши экшены
export default mySlice.reducer;
