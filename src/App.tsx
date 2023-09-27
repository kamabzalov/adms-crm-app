import { lazy, Suspense } from 'react';

const Content = lazy(() => import('./Content'));

const Loader = () => {
    document.getElementById('splash-screen')?.remove();
    return (
        <div
            id='splash-screen'
            className='splash-screen d-flex justify-content-center align-items-center flex-column h-100'
        >
            <img src='/logo/admss_logo.png' className='logo w-25' alt='ADMS' />
            <div>Loading ...</div>
        </div>
    );
};

const App: React.FC = () => {
    return (
        <Suspense fallback={<Loader />}>
            <Content />
        </Suspense>
    );
};

export default App;
