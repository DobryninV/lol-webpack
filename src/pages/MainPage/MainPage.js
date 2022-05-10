
import React, { useState, useEffect } from 'react';
import { Sketch, chengeImage } from '../../gCore/main';
import styles from './MainPage.module.css';

const scetch = new Sketch();

export const MainPage = () => {
    const [navigation, setNavigation] = useState('main');

    useEffect(() => {
        scetch.start()
    }, [])

    useEffect(() => {
        chengeImage(navigation)
    }, [navigation])

    const navigationHandle = (link) => () => {
        setNavigation(link)
    }

    return (
        <div className={styles.container}>
            <div id="container"></div>
            <div className={styles.contant}>
                <div className={styles.navigation}>
                    <button onClick={navigationHandle('main')}>
                        MAIN
                    </button>
                    <button onClick={navigationHandle('about')}>
                        ABOUT
                    </button>
                </div>
            </div>
        </div>
    )
}