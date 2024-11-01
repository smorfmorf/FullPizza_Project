import React, { FC, Suspense } from 'react';

import Sort from '../components/Sort';
import Pagination from '../components/Pagination';

import Categories from '../components/Categories';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';

import qs from 'qs';

import { list } from '../components/Sort';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../redux/store';
import {
    selectFilter,
    setCategoryId,
    setCurrentPage,
    setFilters,
} from '../redux/slices/filterSlice';
import { SearchPizzaParams, fetchPizzas, selectPizzaData } from '../redux/slices/pizzasSlice';

const MyComp = React.lazy(() => import('../utils/math'));

const Home: React.FC = () => {
    //? useCallback возвращает функцию и говорим когда пересоздавать ее (при первом рендер и больше не пересоздавай функцию).
    const onChangeCategory = React.useCallback((id: number) => {
        dispatch(setCategoryId(id));
        console.log(id);
    }, []);

    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    //изначально query строка пустая
    const isSearch = React.useRef(false);

    //приложение отрендерилось или нет (был первый рендер или нет)
    const isMounted = React.useRef(false);

    const { categoryId, sortType, currentPage, searchValue } = useSelector(selectFilter);
    const { items, status } = useSelector(selectPizzaData);

    //* получение page из дочернего Компонента
    function onChangePage(page: number) {
        dispatch(setCurrentPage(page));
    }
    const getPizzas = async () => {
        const search = searchValue ? `&search=${searchValue}` : '';
        const category = categoryId > 0 ? `category=${categoryId}` : '';
        const sortBy = sortType.sortProperty.replace('-', ''); //удаляем минус из sort
        const order = sortType.sortProperty.includes('-') ? 'asc' : 'desc'; // есть ли минус

        dispatch(
            fetchPizzas({
                currentPage: String(currentPage),
                category,
                sortBy,
                order,
                search,
            }),
        );
    };

    //! ПОЛУЧАНИЕ ИЗ URL параметров - эти 3 useEffect
    // Если изменили параметры и был 1 рендер
    React.useEffect(() => {
        // на 2 перерисовку будем делать преобразование параметров в одну целую строку
        if (isMounted.current) {
            const queryString = qs.stringify({
                sortProperty: sortType.sortProperty,
                category: categoryId,
                currentPage: currentPage,
            }); //'queryString: ' sortProperty=rating&category=0&currentPage=1
            navigate(`?${queryString}`);
        }
        //сохраняем информацию о том что был первый рендер
        isMounted.current = true;
    }, [categoryId, sortType, searchValue, currentPage]);

    // Парсим параметры из search при первом рендре => превращаем в объект, берем конкретный sortType, и передаем в Redux.
    React.useEffect(() => {
        //если в URL есть параметры то мы парсим в объект
        if (window.location.search) {
            //убераем знак ? из URL, SearchPizzaParams - тип для BackEnd, чтобы мы передавали только строчки.
            const params = qs.parse(window.location.search.substring(1)) as SearchPizzaParams; // { sortProperty: 'rating', category: '1', currentPage: '1' }
            const sort = list.find((obj) => obj.sortProperty === params.sortBy);

            //эта функция setFilters ожидает получить тип FilterSliceState
            dispatch(
                setFilters({
                    searchValue: params.search,
                    categoryId: Number(params.category),
                    currentPage: Number(params.currentPage),
                    //если не получилось найти то берем первый из list
                    sortType: sort || list[0],
                }),
            );

            console.log('useEffect1', isSearch.current);
            // Если параметры пришли из URL - Да, => тогда не делай при первом рендере запрос на сервер тут #2.
            // и когда Redux обновит параметры, то вызывается #2 тк он следит за изменениями параметров в Redux
            isSearch.current = true;
        }
    }, []);

    //#2 Если был первый рендер, то запращиваем пиццы
    React.useEffect(() => {
        console.log('useEffect2', isSearch.current);

        window.scrollTo(0, 0);
        if (!isSearch.current) {
            getPizzas();
        }

        isSearch.current = false;
        console.log('useEffect2_isSearch', isSearch.current);
    }, [categoryId, sortType, searchValue, currentPage]);

    const skeletons = [...new Array(6)].map((_, index) => <Skeleton key={index} />);
    const pizzas = items.map((obj) => <PizzaBlock key={obj.id} {...obj} />);

    return (
        <div className="container">
            <div className="content__top">
                <Categories value={categoryId} onChangeCategory={onChangeCategory} />
                <Sort sortType={sortType} />
            </div>

            <h2 className="content__title">Все пиццы</h2>
            {status === 'error' ? (
                <div className="content__error-info">
                    <h2>Произошла ошибка 😕</h2>
                    <p>К сожалению, не удалось получить питцы. Попробуйте повторить попытку.</p>
                </div>
            ) : (
                <div className="content__items">{status === 'loading' ? skeletons : pizzas}</div>
            )}

            <Pagination currentPage={currentPage} onChangePage={onChangePage} />
        </div>
    );
};

export default Home;
