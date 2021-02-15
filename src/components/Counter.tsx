import React, { useState } from 'react';

import styles from '../assets/styles/counter.module.css';

export const Counter: React.FC = () => {
    const [count, setCount] = useState<number>(0);

    return (
        <div className={styles.counterWrapper}>
            Counter
            <div className={styles.counterContent}>
                <button onClick={() => setCount((state) => state + 1)}>Increment</button>
                <button onClick={() => setCount((state) => state - 1)}>Decrement</button>
                <code>{count}</code>
            </div>
        </div>
    );
};

export default Counter;
