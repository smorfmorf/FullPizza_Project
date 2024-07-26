import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';

export enum SortProperyEnum {
    RATING_DESC = 'rating',
    RATING_ASC = '-rating',
    TITLE_DESC = 'title',
    TITLE_ASC = '-title',
    PRICE_DESC = 'price',
    PRICE_ASC = '-price',
}

export type Sort = {
    name: string;
    sortProperty: SortProperyEnum;
};

export interface FilterSliceState {
    searchValue: string;
    currentPage: number;
    categoryId: number;
    sortType: Sort;
}

//наш state
const initialState: FilterSliceState = {
    searchValue: '',
    currentPage: 1, //! Pagination
    categoryId: 0,
    sortType: {
        name: 'популярности',
        sortProperty: SortProperyEnum.PRICE_DESC, //price
    },
};

//логика обработки нашего state
const filterSlice = createSlice({
    name: 'filter',
    initialState: initialState,

    //методы которые будут менять наш state
    reducers: {
        // тк state.categhoryId - ожидает number из payload (значит тип number)
        setCategoryId(state, action: PayloadAction<number>) {
            state.categoryId = action.payload;
            console.log(action);
        },
        // в Redux когда будет вызываться функция setSort нельзя передавать какой-то не понятный объект, а только тот который соотвествует Sort
        setSort(state, action: PayloadAction<Sort>) {
            state.sortType = action.payload;
        },
        setCurrentPage(state, action: PayloadAction<number>) {
            state.currentPage = action.payload;
        },
        setSearchValue(state, action: PayloadAction<string>) {
            state.searchValue = action.payload;
        },
        // setFilters - Фильтр ожидает получить все свойства, которые есть в нашем state
        // Когда хотим обновить все фильтры, которые есть. (в <Home/> есть логика которая парсит URL параметры и передает их все в slice) //  В payload разрешаем передавать весь state (все его свойства)
        setFilters(state, action: PayloadAction<FilterSliceState>) {
            state.sortType = action.payload.sortType;
            state.currentPage = Number(action.payload.currentPage);
            state.categoryId = Number(action.payload.categoryId);
        },
    },
});

export const selectFilter = (state: RootState) => state.filter;
export const selectSort = (state: RootState) => state.filter.sortType;

export const { setCategoryId, setSort, setCurrentPage, setFilters, setSearchValue } =
    filterSlice.actions;

export default filterSlice.reducer;
