import React, {useEffect, useState} from 'react';
import s from './PluginUploadForm.scss';
import cs from 'src/styles/common.scss';
import Input from "../../../../shared/Input/Input";
import {classNames} from "../../../../utils/utils";
import Card from "../../shared/Card/Card";
import {IPluginUploadBody} from "../../api/jetbrains/jetbrains.api";
import Button from "../../../../shared/Button/Button";
import {cardInfoMock} from "./PluginUploadCardMock";
import {
    LOADING_STATE_TYPES, setCommonLoadingStatesToDefault,
    uploadPlugin,
    uploadPluginLoadingState
} from "../../api/jetbrains/jetbrains.slice";
import {useDispatch, useSelector} from "react-redux";

export interface IPluginUploadForm {
    closeUploadForm?: () => void;
}

function PluginUploadForm({closeUploadForm}: IPluginUploadForm) {
    const dispatch = useDispatch();
    const [cardInfo, setCardInfo] = useState(cardInfoMock as IPluginUploadBody);
    const pluginUploadLoading = useSelector(uploadPluginLoadingState);

    const handleInputChange = (change: Partial<IPluginUploadBody>) => {
        setCardInfo({...cardInfo, ...change})
    }

    const handleAddPluginClick = () => {
        const {name, fullDescription, author, icon} = cardInfo
        const pluginIcon = /.svg/.test(icon) ? icon : 'foo/bar.svg'; // OAPI не может без иконки ну никак, и без description
        dispatch(uploadPlugin({name, fullDescription, author, icon: pluginIcon, description: fullDescription}))
    }

    const handleCancelClick = () => {
        closeUploadForm();
    }

    useEffect(() => {
        if (pluginUploadLoading === LOADING_STATE_TYPES.COMPLETE) {
            dispatch(setCommonLoadingStatesToDefault());
            closeUploadForm();
        }

    }, [pluginUploadLoading])

    return (
        <div className={cs.flexColumn}>
            <span className={s.caption}>Add plugin</span>
            <div className={cs.flexRow}>
                <form className={s.form}>
                    <Input containerOuterStyles={s.input} onChange={(change) => handleInputChange({name: change})} labelOuterStyles={s.label} label='Name'/>
                    <Input containerOuterStyles={s.input} onChange={(change) => handleInputChange({author: change})} labelOuterStyles={s.label} label='Author name'/>
                    <Input containerOuterStyles={s.input} onChange={(change) => handleInputChange({icon: change})} labelOuterStyles={s.label} label='Icon' placeHolder='URL to an image'/>
                    <Input containerOuterStyles={classNames(s.input, s.input__description)} onChange={(change) => handleInputChange({fullDescription: change})} labelOuterStyles={s.label} label='Description' placeHolder='Optional'/>
                </form>
                <div className={s.card}>
                    <span className={s.card__label}>Card Preview</span>
                    <Card cardInfo={cardInfo} />
                </div>
            </div>
            <div className={s.buttons}>
                <Button outerStyles={s.buttons__button} name='Add Plugin' onClick={handleAddPluginClick} loadingOuterStyles={s.buttons__loading} loading={pluginUploadLoading}/>
                <Button outerStyles={s.buttons__button} name='Cancel' onClick={handleCancelClick}/>
            </div>
        </div>
    )
}

export default PluginUploadForm;
