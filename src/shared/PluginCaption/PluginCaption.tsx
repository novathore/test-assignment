import React from 'react';
import './PluginCaption.scss';
import Stars from "../Stars/Stars";

function PluginCaption() {
    return (
        <div className="Container">
            <div className="Container_img"/>
            <div className="Container__Caption">
                <span className="Container__Caption_primary">Drakula Disabler</span>
                <Stars/>
                <span className="Container__Caption_secondary">Jetbrains s.r.o</span>
            </div>
        </div>
    );
}

export default PluginCaption;
