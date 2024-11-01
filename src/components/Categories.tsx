import React, { FC } from 'react';
import { useWhyDidYouUpdate } from 'ahooks';

// тип объект, который содержит 2 свойства
type CategoriesProps = {
    value: number;
    onChangeCategory: (id: number) => void; // Нужно сказать что функция получает и возвращает
};
const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];

// Мы сказали - ты функциональный Компонент, который хранит в себе пропсы.
//типизация props - FC ты принимаешь в себя <тип пропсов>, и он сам их типизирует

const Categories: FC<CategoriesProps> = React.memo(({ value, onChangeCategory }) => {
    useWhyDidYouUpdate('Categories', { value, onChangeCategory });

    return (
        <div className="categories">
            <ul>
                {categories.map((item, index) => (
                    <li
                        key={index}
                        onClick={() => onChangeCategory(index)}
                        className={value === index ? 'active' : ''}>
                        {item}
                    </li>
                ))}
            </ul>
        </div>
    );
});

export default Categories;

//rafc
