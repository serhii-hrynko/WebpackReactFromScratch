import React, { Suspense, lazy } from 'react';
import ReactDom from 'react-dom';

import ConnectionBackground from './assets/images/connection-background.jpg';

import Counter from './components/Counter';

import './assets/styles/styles.css';
import styles from './assets/styles/styles.module.css';

const Config = lazy(
    (): LazyImport =>
        new Promise((resolve) => {
            setTimeout(() => resolve(import('./components/Config')), 3000);
        }),
);

const App = () => {
    return (
        <div className={styles.testName}>
            <h1 className={styles.title}>Hello! React Webpack from scratch.</h1>
            <img
                className={styles.image}
                src={ConnectionBackground}
                alt="image"
            />
            <Suspense fallback="Loading...">
                <Config />
            </Suspense>

            <Counter />
        </div>
    );
};

ReactDom.render(<App />, document.getElementById('root'));
