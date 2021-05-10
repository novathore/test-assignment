import React from 'react';
import s from './PluginDownloads.scss';
import moment from 'moment';
import {IPluginEntity} from "../../api/jetbrains/jetbrains.api";

interface IPluginDownloads {
    cardInfo: IPluginEntity;
}

function PluginDownloads({cardInfo}: IPluginDownloads) {
    const date = moment(cardInfo.date).format('DD.MM.YYYY');

    return (
        <div className={s.container}>
            <span>{cardInfo.downloads} downloads</span>
            <span>{date}</span>
        </div>
    );
}

export default PluginDownloads;
