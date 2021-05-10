import React, {useCallback, useEffect, useRef} from 'react';
import Loader from '../Loader/Loader';
import s from './LiveScroll.scss';
import {LOADING_STATE_TYPES} from "../../features/Plugins/api/jetbrains/jetbrains.slice";

export interface ILiveScrollProps {
    children?: any;
    loading?: LOADING_STATE_TYPES;
    loadOnIntersectionAvailable?: boolean;
    onScrollEnd?: () => void;
}

function LiveScroll(props: ILiveScrollProps) {
    const { children, loading, loadOnIntersectionAvailable, onScrollEnd } = props;
    const isLoading = loading === LOADING_STATE_TYPES.PROGRESS;
    const isLoadingComplete = loading === LOADING_STATE_TYPES.COMPLETE;

    const options = {
        root: null,
        rootMargin: '5px',
        threshold: 0.5
    }
    const loaderRef = useRef(null);

    const calculateIntersect = useCallback((entry) => {
        const intersection = entry[0] as IntersectionObserverEntry;

        if (intersection?.isIntersecting && isLoadingComplete && loadOnIntersectionAvailable) {
            onScrollEnd();
        }
    }, [isLoadingComplete, loadOnIntersectionAvailable]);


    useEffect(() => {
        const observer = new IntersectionObserver(calculateIntersect, options);
        observer.observe(loaderRef.current);

        return () => {
            if (loaderRef.current) {
                return observer.unobserve(loaderRef.current)
            }

            return observer.disconnect();
        };
    }, [loaderRef, calculateIntersect]);

    return (
        <React.Fragment>
            {children}
            <div className={s.loader} ref={loaderRef}>
                {isLoading && <Loader/>}
            </div>
        </React.Fragment>
    )
}

export default LiveScroll;
