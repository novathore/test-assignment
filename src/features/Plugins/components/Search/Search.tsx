import React, {useState} from 'react';
import s from './Search.scss';

import {ICONS, IIcon} from "src/shared/Icon/Icon";
import Input from "src/shared/Input/Input";

export interface ISearchParams {
    searchPlaceHolder?: string;
    searchSubmit?: (search: string) => void;
}

function Search({searchPlaceHolder, searchSubmit}: ISearchParams) {
    const [searchString, setSearchString] = useState('');

    const icon: IIcon = {
        size: 30,
        icon: ICONS.search
    };

    return (
        <form onSubmit={(e) => { e.preventDefault(); searchSubmit(searchString); }}>
            <div className={s.container}>
                <div className={s.searchbar}>
                    <span className={s.searchbar__caption}>Explore plugins for JetBrains Products</span>
                    <Input onIconClick={() => searchSubmit(searchString)} icon={icon} placeHolder={searchPlaceHolder} outerIconStyles={s.searchbar__input_icon} containerOuterStyles={s.searchbar__input} onChange={(search) => setSearchString(search)}/>
                </div>
            </div>
        </form>
    );
}

export default Search;
