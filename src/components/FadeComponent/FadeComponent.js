
import React from 'react';
import styles from './FadeComponent.module.css';

export const FadeComponent = ({fade, deley, children}) => {

    return (
        <div 
            className={`${styles.block} ${fade ? styles.iosFadeOut : styles.iosFadeIn}`} 
            style={{ animationDuration: `${deley || 0.75}s` }}
        >
            {children}
        </div>
    )
}