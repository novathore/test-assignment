import React from 'react';
import loader from 'assets/loader.svg';

export interface ILoaderProps {
    outerStyles?: any;
}

function Loader({outerStyles}: ILoaderProps) {
    return <img className={outerStyles} src={loader} />;
}

export default Loader;
