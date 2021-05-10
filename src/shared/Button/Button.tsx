import React from 'react';
import s from './Button.scss';
import {classNames} from "../../utils/utils";
import {LOADING_STATE_TYPES} from "../../features/Plugins/api/jetbrains/jetbrains.slice";
import Loader from "../Loader/Loader";

export interface IButtonProps {
    name?: string;
    outerStyles?: any;
    onClick?: () => void;
    loading?: LOADING_STATE_TYPES;
    loadingOuterStyles?: any;
}

function Button({name, outerStyles, onClick, loading, loadingOuterStyles}: IButtonProps) {
    const isLoading = LOADING_STATE_TYPES.PROGRESS === loading;
    return (
        <div onClick={onClick} className={classNames(s.button, outerStyles)}>
            {!isLoading && <span>{name}</span>}
            {isLoading && <Loader outerStyles={loadingOuterStyles}/>}
        </div>
    )
}

export default Button;
