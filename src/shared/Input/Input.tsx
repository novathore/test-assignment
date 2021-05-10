import React from 'react';
import s from './Input.scss';
import cs from "src/styles/common.scss";
import {classNames} from "src/utils/utils";
import Icon, {IIcon} from "../Icon/Icon";

export interface IInput {
    icon?: IIcon;
    containerOuterStyles?: any;
    placeHolder?: string;
    onChange?: (string) => void;
    label?: string;
    labelOuterStyles?: any;
    type?: string;
}

function Input({ icon, containerOuterStyles, placeHolder, onChange, label, labelOuterStyles, type }: IInput) {
    return (
        <React.Fragment>
            {label && renderInputLabel(label, labelOuterStyles)}
            <div className={classNames(s.container, containerOuterStyles)}>
                {type === 'textarea' && <textarea placeholder={placeHolder} onChange={(e) => onChange(e.target.value)} />}
                {type !== 'textarea' && <input placeholder={placeHolder} onChange={(e) => onChange(e.target.value)}/>}
                {icon && renderIcon(icon)}
            </div>
        </React.Fragment>
    );
}

function renderIcon(icon: IIcon) {
    return (
        <div className={classNames(cs.flexCenter, cs.flexRow, cs['p-r-5'])}>
            <Icon size={icon.size} icon={icon.icon}/>
        </div>
    )
}

function renderInputLabel(label: string, labelOuterStyles: any) {
    return (
        <span className={classNames(s.label, labelOuterStyles)}>{label}</span>
    )
}

export default Input;
