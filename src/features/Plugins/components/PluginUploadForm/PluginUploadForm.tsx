import React from 'react';
import s from './PluginUploadForm.scss';

function PluginUploadForm() {
    return (
        <div className={s.container}>
            <form className={s.form}></form>
            <div className={s.splitter}></div>
            <div className={s.card}></div>
        </div>
    )
}

export default PluginUploadForm;
