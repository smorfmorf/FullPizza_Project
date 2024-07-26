import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Sort, SortProperyEnum, selectSort, setSort } from '../redux/slices/filterSlice';

type SortItem = {
    name: string;
    sortProperty: SortProperyEnum;
};
export const list: SortItem[] = [
    { name: 'популярности (DESC)', sortProperty: SortProperyEnum.RATING_DESC },
    { name: 'популярности  (ASC)', sortProperty: SortProperyEnum.RATING_ASC },
    { name: 'цене (DESC)', sortProperty: SortProperyEnum.PRICE_DESC },
    { name: 'цене (ASC)', sortProperty: SortProperyEnum.PRICE_ASC },
    { name: 'алфавиту (DESC)', sortProperty: SortProperyEnum.TITLE_DESC },
    { name: 'алфавиту (ASC)', sortProperty: SortProperyEnum.TITLE_ASC },
];

type SortPopupProps = {
    sortType: Sort;
};

const SortPopup: React.FC<SortPopupProps> = React.memo(({ sortType }) => {
    const [open, setOpen] = React.useState(false);

    const sortRef = React.useRef<HTMLDivElement>(null);

    const dispatch = useDispatch();

    const onClickListItem = (obj: SortItem) => {
        dispatch(setSort(obj));
        setOpen(false);
    };

    React.useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (sortRef.current && !event.composedPath().includes(sortRef.current)) {
                setOpen(false);
            }
        };
        // если передаем функцию как ссылка, в нее передается поумолчанию event
        document.body.addEventListener('click', handleClickOutside);

        //Если Компонент захочет размонтироваться, удаляем click с body
        return () => {
            document.body.removeEventListener('click', handleClickOutside);
        };
    }, []);

    return (
        <div ref={sortRef} className="sort">
            <div className="sort__label">
                <svg
                    width="10"
                    height="6"
                    viewBox="0 0 10 6"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
                        fill="#2C2C2C"
                    />
                </svg>
                <b>Сортировка по:</b>
                <span onClick={() => setOpen(!open)}>{sortType.name}</span>
            </div>
            {open && (
                <div className="sort__popup">
                    <ul>
                        {list.map((obj, index) => (
                            <li
                                key={index}
                                onClick={() => onClickListItem(obj)}
                                className={
                                    sortType.sortProperty === obj.sortProperty ? 'active' : ''
                                }>
                                {obj.name}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
});

export default SortPopup;
