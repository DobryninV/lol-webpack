
import React, { useState, useCallback, useEffect } from 'react';
import { FadeComponent } from '../../components';
import { Sketch } from '../../gCore/main';
import styles from './MainPage.module.css';

const DALAY = 1.5

const scetch = new Sketch(DALAY);

export const MainPage = () => {
    const [route, setRoute] = useState('pole')
    const [fade, setFade] = useState(false)

    useEffect(() => {
        scetch.start()
    }, [])

    const navigationHandle = useCallback((link) => () => {
        if (link === route) return;
        setFade(true)
        scetch.changeRoute(link).then((data) => {
            if (data) {
                setRoute(link)
                setFade(false)
            }
        })
    }, [route])

    return (
        <div className={styles.container}>
            <div id="container"></div>
            <div className={styles.wrapper}>
                <div className={styles.navigation}>
                    <button onClick={navigationHandle('pole')} disabled={fade}>
                        MOZG
                    </button>
                    <button onClick={navigationHandle('pole2')} disabled={fade}>
                        LUSIY
                    </button>
                    <button onClick={navigationHandle('mountains')} disabled={fade}>
                        GUS'
                    </button>
                </div>
                <div className={styles.content}>
                    <FadeComponent fade={fade} deley={DALAY*0.5}>{route}</FadeComponent>
                </div>
            </div>
        </div>
    )
}