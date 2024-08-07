import { FC } from 'react';
import styles from './NotFoundBlock.module.scss';

const NotFountBlock: FC = () => {
    console.log('styles: ', styles);

    return (
        <div className={styles.root}>
            <h1>
                <span>😕</span>
                <br />
                Ничего не найдено
            </h1>
            <p className={styles.description}>
                К сожалению данная страница отсутсвует в нашем интернет-магазине
            </p>
        </div>
    );
};

export default NotFountBlock;
