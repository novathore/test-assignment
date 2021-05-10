import React from 'react';
import s from './Input.scss';
import cs from "src/styles/common.scss";
import {classNames} from "src/utils/utils";
import Icon, {IIcon} from "../Icon/Icon";

export interface IInput {
    icon?: IIcon;
    outerStyles?: { [key in string]: any };
    placeHolder?: string;
    onChange: (string) => void;
}

function Input({ icon, outerStyles, placeHolder, onChange }: IInput) {
    return (
        <div className={classNames(s.container, outerStyles)}>
            <input placeholder={placeHolder} onChange={(e) => onChange(e.target.value)}/>
            {icon && renderIcon(icon)}
        </div>
    );
}

function renderIcon(icon: IIcon) {
    return (
        <div className={classNames(cs.flexCenter, cs.flexRow, cs['p-r-5'])}>
            <Icon size={icon.size} icon={icon.icon}/>
        </div>
    )
}

export default Input;
