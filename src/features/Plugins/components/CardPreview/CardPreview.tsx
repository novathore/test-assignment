import React, {useEffect, useState} from 'react';
import s from './CardPreview.scss';
import PluginCaption from "../../shared/PluginCaption/PluginCaption";
import {
    commonPluginActionLoadingState, deletePlugin, fetchPlugin, getPluginEntity,
    LOADING_STATE_TYPES
} from "../../api/jetbrains/jetbrains.slice";
import Loader from "../../../../shared/Loader/Loader";
import {useDispatch, useSelector} from "react-redux";
import {IPluginEntity} from "../../api/jetbrains/jetbrains.api";
import Icon, {ICONS} from "../../../../shared/Icon/Icon";
import Dialog from "../../../../shared/Dialog/DIalog";

interface ICardPreview {
    id: number;
    closePreview: () => void;
}

function CardPreview({id, closePreview}: ICardPreview) {
    const dispatch = useDispatch();
    const fetchPluginLoading = useSelector(commonPluginActionLoadingState);
    const pluginData = useSelector(getPluginEntity(id)) as IPluginEntity;
    const isLoading = fetchPluginLoading === LOADING_STATE_TYPES.PROGRESS;
    const [isPopupOpen, setPopUpOpen] = useState(false);
    const [component, setComponent] = useState(null);
    const [anchorPositions, setAnchorPositions] = useState(null)

    const handActionClick = () => {
        console.log('clicked');
        setPopUpOpen(false);
        dispatch(deletePlugin(id));
        closePreview();
    }

    const handleMoreButtonClick = () => {
        const popup = createPopupTemplate({onClick: handActionClick});
        const domRect = document.getElementById('anchor').getBoundingClientRect();
        const { top, left } = domRect;
        const anchor = {
            top: top + 50,
            left: left - 165
        };
        // TODO жестоко проиграл диалогу и в текущей реализации не получить у children размеров т.к он не отрендерен
        // поэтому anchor фактически расчитан руками
        // вот тут есть средней средности пример как это следовало бы сделать
        // https://github.com/mbrookson/react-simple-hook-modal
        setAnchorPositions(anchor);
        setComponent(popup);
        setPopUpOpen(true);
    }

    useEffect(() => {
        dispatch(fetchPlugin(id));
    }, []);

    return (
        <div className={s.container}>
            {
                isLoading && <div className={s.loader}>
                    <Loader outerStyles={s.loader__icon}/>
                </div>
            }
            {
                !isLoading && pluginData &&
                <React.Fragment>
                    <div className={s.caption}>
                        <PluginCaption iconStyles={s.caption__icon} cardInfo={pluginData}/>
                        <div id="anchor" onClick={handleMoreButtonClick} className={s.caption__button}>
                            <Icon size={36} icon={ICONS.dotsVertical} />
                        </div>
                    </div>
                    <div className={s.content}>
                        {pluginData.fullDescription}
                    </div>
                    <Dialog anchorPositions={anchorPositions} openState={isPopupOpen} onBackDropClick={() => {setPopUpOpen(false)}} component={component}/>
                </React.Fragment>
            }
        </div>
    );
}

function createPopupTemplate({onClick}) {
    return <div onClick={onClick} className={s.popup}>
        <span className={s.popup__label}>Delete plugin</span>
    </div>
}

export default CardPreview;
