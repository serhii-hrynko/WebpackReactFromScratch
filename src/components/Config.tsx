import React from 'react';

import config from '../config';
import styles from '../assets/styles/config.module.css';

export const Config: React.FC = () => {
    return (
        <div className={styles.config}>
            Config<code>{JSON.stringify(config)}</code>
        </div>
    );
};

export default Config;
