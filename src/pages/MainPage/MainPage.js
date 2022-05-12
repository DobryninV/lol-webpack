
import React, { useState, useCallback, useEffect } from 'react';
import { Sketch } from '../../gCore/main';
import styles from './MainPage.module.css';

const scetch = new Sketch();

export const MainPage = () => {
    const [route, setRoute] = useState('pole')

    useEffect(() => {
        scetch.start()
    }, [])

    const navigationHandle = useCallback((link) => () => {
        scetch.changeRoute(link).then((data) => {
            if (data) {
                setRoute(link)
            }
        })
    }, [])

    return (
        <div className={styles.container}>
            <div id="container"></div>
            <div className={styles.contant}>
                <div className={styles.navigation}>
                    <button onClick={navigationHandle('pole')}>
                        POLE
                    </button>
                    <button onClick={navigationHandle('pole2')}>
                        POLE2
                    </button>
                    <button onClick={navigationHandle('mountains')}>
                        MOUNTAINS
                    </button>
                </div>
                <div >
                    {route}
                </div>
            </div>
        </div>
    )
}