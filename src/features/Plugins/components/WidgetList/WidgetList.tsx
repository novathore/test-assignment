import React from 'react';
import s from './WidgetList.scss';
import {IPluginEntity} from "../../api/jetbrains/jetbrains.api";
import Card from "../../shared/Card/Card";
import {LOADING_STATE_TYPES} from "../../api/jetbrains/jetbrains.slice";
import Loader from "../../../../shared/Loader/Loader";
import {classNames} from "../../../../utils/utils";

interface IWidgetListProps {
    openDialog: (id: string) => any;
    payload: Array<IPluginEntity>;
    caption?: string;
    loading?: LOADING_STATE_TYPES;
}


function WidgetList({openDialog, payload, caption, loading}: IWidgetListProps) {
    const isLoading = loading === LOADING_STATE_TYPES.PROGRESS;
    const cardMock = Array.from({ length: 9 }, (v, k) => k);

    return (
        <div className={s.container}>
            {caption ? <span className={s.caption}>{caption}</span> : null}
            <div className={s.content}>
                {
                    isLoading && cardMock.map((_, index) => {
                        return <div key={index} className={classNames(s.cardStyles, s.cardMockStyles)}>
                            <Loader outerStyles={s.cardMockStyles__loader}/>
                        </div>
                    })
                }
                {
                    !isLoading && payload?.length > 0 && payload.map((val) => {
                        return <Card key={val.id} onClick={() => openDialog(val.id)} outerStyles={s.cardStyles} cardInfo={val} />
                    })
                }
            </div>
        </div>
    );
}

export default WidgetList;


