import React from 'react';
import s from './PluginCaption.scss';
import Rating from "@material-ui/lab/Rating";
import {IPluginEntity} from "../../api/jetbrains/jetbrains.api";


interface IPluginCaption {
    cardInfo: IPluginEntity;
    iconStyles?: any;
}

function PluginCaption({cardInfo, iconStyles}: IPluginCaption) {
    const rating = +Number(cardInfo.rating).toFixed(2);
    return (
        <div className={s.container}>
            <img className={iconStyles} src={cardInfo.icon}/>
            <div className={s.container__caption}>
                <span className={s.primary}>{cardInfo.name}</span>
                <Rating readOnly defaultValue={rating} precision={0.1} />
                <span className={s.secondary}>{cardInfo.author}</span>
            </div>
        </div>
    );
}

export default PluginCaption;
