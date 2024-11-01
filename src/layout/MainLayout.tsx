import { FC } from 'react';
import Header from '../components/Header';
import { Outlet } from 'react-router-dom';
import { Suspense } from 'react';
import { RotatingLines } from 'react-loader-spinner';

const MainLayout: FC = () => {
    return (
        <div className="wrapper">
            <Header />
            <div className="content">
                <Suspense
                    fallback={
                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                            <RotatingLines
                                width="80"
                                visible={true}
                                strokeWidth="5"
                                animationDuration="0.75"
                                ariaLabel="rotating-lines-loading"
                            />
                        </div>
                    }>
                    <Outlet />
                </Suspense>
            </div>
        </div>
    );
};
export default MainLayout;

//
