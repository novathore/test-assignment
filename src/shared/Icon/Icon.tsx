import React from 'react';
import s from './Icon.scss';

export enum ICONS {
    plus = 'plus',
    search = 'search',
    starGrey = 'starGrey',
    starBlue = 'starBlue',
    dotsVertical = 'dotsVertical'
}

export interface IIcon {
    size: number;
    width?: number;
    height?: number;
    icon: ICONS;
    onClick?: () => void;
}

function Icon(props: IIcon) {
    const { size, icon, width, height, onClick } = props;
    const style = {
        backgroundSize: `${size}px`,
        width: `${size || width}px`,
        height: `${size || height}px`
    };

    return (
        <div onClick={onClick} style={style} className={s[icon]}/>
    );
}

export default Icon;
