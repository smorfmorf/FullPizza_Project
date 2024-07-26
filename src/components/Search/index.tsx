import React, { FC } from 'react';
import style from './Search.module.scss';

import debounce from 'lodash.debounce';
import { setSearchValue } from '../../redux/slices/filterSlice';
import { useDispatch } from 'react-redux';

const Search: FC = () => {
    const [value, setValue] = React.useState('');
    const dispatch = useDispatch();

    const inputRef = React.useRef<HTMLInputElement>(null);

    const onClickClear = () => {
        setValue('');
        dispatch(setSearchValue(''));

        inputRef?.current?.focus();
    };

    //Сохраняю ссылку на функцию чтобы она не пересоздавалась каждый раз
    const updateSearchValue = React.useCallback(
        debounce((str) => {
            dispatch(setSearchValue(str));
        }, 1000),
        [],
    );

    //Для onChange - ChangeEvent и Указываем в <> откуда приходит событие
    const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value);
        updateSearchValue(event.target.value);
    };

    //! //мой фикс типо когда нажимаем другую категорию то не работает поиск по категории
    // const categoryId = useSelector((state: any) => state.filter.categoryId);
    // if (categoryId !== 0) {
    //     return;
    // }

    return (
        <div className={style.root}>
            <svg
                className={style.icon}
                height="512"
                viewBox="0 0 512 512"
                width="512"
                xmlns="http://www.w3.org/2000/svg">
                <title />
                <path d="M456.69,421.39,362.6,327.3a173.81,173.81,0,0,0,34.84-104.58C397.44,126.38,319.06,48,222.72,48S48,126.38,48,222.72s78.38,174.72,174.72,174.72A173.81,173.81,0,0,0,327.3,362.6l94.09,94.09a25,25,0,0,0,35.3-35.3ZM97.92,222.72a124.8,124.8,0,1,1,124.8,124.8A124.95,124.95,0,0,1,97.92,222.72Z" />
            </svg>
            <input
                ref={inputRef}
                value={value}
                onChange={onChangeInput}
                className={style.input}
                placeholder="Поиск пиццы..."
            />
            {value && (
                <svg
                    onClick={onClickClear}
                    className={style.clearIcon}
                    fill="none"
                    height="24"
                    viewBox="0 0 24 24"
                    width="24"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M6.2253 4.81108C5.83477 4.42056 5.20161 4.42056 4.81108 4.81108C4.42056 5.20161 4.42056 5.83477 4.81108 6.2253L10.5858 12L4.81114 17.7747C4.42062 18.1652 4.42062 18.7984 4.81114 19.1889C5.20167 19.5794 5.83483 19.5794 6.22535 19.1889L12 13.4142L17.7747 19.1889C18.1652 19.5794 18.7984 19.5794 19.1889 19.1889C19.5794 18.7984 19.5794 18.1652 19.1889 17.7747L13.4142 12L19.189 6.2253C19.5795 5.83477 19.5795 5.20161 19.189 4.81108C18.7985 4.42056 18.1653 4.42056 17.7748 4.81108L12 10.5858L6.2253 4.81108Z"
                        fill="currentColor"
                    />
                </svg>
            )}
        </div>
    );
};
export default Search;
