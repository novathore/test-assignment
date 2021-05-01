import React from 'react';
import './Card.scss';
import PluginCaption from "../PluginCaption/PluginCaption";
import PluginDownloads from "../PluginDownloads/PluginDownloads";


function Card() {
    return (
        <div className="Container">
            <div className="Container__Caption">
                <PluginCaption/>
            </div>
            <div className="Container__Description">
                Feel tired about Darkula theme? Did you know that inverted colour schemas make text unbearable for people with astigmatism? This plugin kills Darkula once and for good.
            </div>
            <PluginDownloads/>
        </div>
    );
}

export default Card;
