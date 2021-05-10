import React from 'react';
import s from './Header.scss';
import cs from 'src/styles/common.scss';
import jetBrainsLogo from "assets/jetbrains-logo.svg";
import Icon, {ICONS} from "src/shared/Icon/Icon";
import {classNames} from "src/utils/utils";

export interface IHeaderProps {
    onClick: () => void;
}

function Header({onClick}: IHeaderProps) {
    return (
        <div className={s.container}>
            <div className={cs.flexRow}>
                <img src={jetBrainsLogo}/>
                <div className={s.container__info}>
                    <span>Marketplace</span>
                </div>
            </div>

            <div className={classNames(cs.flexRow, cs.alignCenter)}>
                <div onClick={onClick} className={s.container__button}>
                    <Icon size={20} icon={ICONS.plus}/>
                    <span className={classNames(cs['p-t-4'], cs['p-l-2'])}>Add Plugin</span>
                </div>
            </div>
        </div>

    );
}

export default Header;
