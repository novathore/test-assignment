import React from 'react';
import * as s from './App.scss';
import jetBrainsLogo from './assets/jetbrains-logo.svg'
import Card from "./shared/Card/Card";

function App() {
    return (
        <div className={s.App}>
            <div className="App__Header">
                <div className="flex-row">
                    <img src={jetBrainsLogo}/>
                    <div className="App__Header_info">
                        <span>Marketplace</span>
                    </div>
                </div>

                <div className="flex-row">
                    <div className="App__Header_button">Add Plugin</div>
                </div>
            </div>
            <div className="App__SearchContainer">
                <div className="SearchBar">
                    <span className="SearchBar_caption">Explore plugins for JetBrains Products</span>
                    <div className="SearchBar__InputContainer">
                        <input/>
                    </div>
                </div>
            </div>
            <div className="App__Container">
                <span className="App__Container_caption">Most Popular</span>
                <div className="Most-Popular">
                    <div className="Card">
                        <Card/>
                    </div>
                    <div className="Card">
                        <Card/>
                    </div>
                    <div className="Card">
                        <Card/>
                    </div>
                    <div className="Card">
                        <Card/>
                    </div>
                    <div className="Card">
                        <Card/>
                    </div>
                </div>
                <span className="App__Container_caption">Latest Additions</span>
                <div className="Most-Popular">
                    <div className="Card">
                        <Card/>
                    </div>
                    <div className="Card">
                        <Card/>
                    </div>
                    <div className="Card">
                        <Card/>
                    </div>
                    <div className="Card">
                        <Card/>
                    </div>
                    <div className="Card">
                        <Card/>
                    </div>
                </div>
            </div>
            <div className="App__Footer"/>
        </div>
    );
}

export default App;
