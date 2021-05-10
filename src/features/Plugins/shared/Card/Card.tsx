import React from 'react';
import s from './Card.scss';
import {classNames} from "src/utils/utils";
import {IPluginEntity} from "../../api/jetbrains/jetbrains.api";
import PluginCaption from "../PluginCaption/PluginCaption";
import PluginDownloads from "../PluginDownloads/PluginDownloads";

interface ICard {
    outerStyles?: any;
    onClick?: () => any;
    cardInfo?: IPluginEntity;
}

function Card({outerStyles, onClick, cardInfo}: ICard) {

    return (
        <div onClick={onClick} className={classNames(s.container,outerStyles)}>
            <div className={s.container__caption}>
                <PluginCaption cardInfo={cardInfo} iconStyles={s.container__caption_icon}/>
            </div>
            <div className={s.container__description}>
                {cardInfo.fullDescription}
            </div>
            <PluginDownloads cardInfo={cardInfo}/>
        </div>
    );
}

export default Card;
