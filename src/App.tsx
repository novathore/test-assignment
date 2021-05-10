import React from 'react';
import s from './App.scss';
import Plugins from "./features/Plugins/Plugins";
import {configureStore, getDefaultMiddleware} from "@reduxjs/toolkit";
import {
    commonPluginActionsFeatureKey,
    commonPluginActionsReducer,
    pluginFeatureKey,
    pluginSearchFeatureKey,
    pluginsReducer,
    pluginsSearchReducer
} from "./features/Plugins/api/jetbrains/jetbrains.slice";
import {Provider} from "react-redux";


const store = configureStore({
    reducer: {
        [pluginFeatureKey]: pluginsReducer,
        [pluginSearchFeatureKey]: pluginsSearchReducer,
        [commonPluginActionsFeatureKey]: commonPluginActionsReducer
    },
    middleware: [...getDefaultMiddleware()]
});

function App() {
    return (
        <Provider store={store}>
            <div className={s.container}>
                <Plugins/>
            </div>
        </Provider>
    );
}

export default App;
