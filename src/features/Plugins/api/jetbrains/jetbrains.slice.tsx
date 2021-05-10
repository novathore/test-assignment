import {
    createAction,
    createAsyncThunk,
    createEntityAdapter,
    createSelector,
    createSlice,
    EntityState,
    PayloadAction
} from "@reduxjs/toolkit";
import {
    deletePluginAPI,
    getPluginAPI,
    getPluginsAPI,
    IGetPluginsParams,
    IPluginEntity,
    IPluginSearch,
    IPluginUploadBody,
    PLUGINS_CATEGORY,
    uploadPluginAPI
} from "./jetbrains.api";

export const pluginFeatureKey = 'plugins';
export const pluginsAdapter = createEntityAdapter();

export const pluginSearchFeatureKey = 'searchPlugins';
export const pluginSearchAdapter = createEntityAdapter();

export const commonPluginActionsFeatureKey = 'commonActions';
export const commonPluginActionsAdapter = createEntityAdapter();

const popularCustomKey = `redux$${PLUGINS_CATEGORY.popular}`;
const latestCustomKey = `redux$${PLUGINS_CATEGORY.latest}`;

export enum LOADING_STATE_TYPES {
    COMPLETE = 'complete',
    ERROR = 'error',
    PROGRESS = 'progress'
}

export interface PluginState extends EntityState<IPluginEntity> {
    loadingStatus: LOADING_STATE_TYPES;
    uploadStatus: LOADING_STATE_TYPES;
    deleteStatus: LOADING_STATE_TYPES;
    error: string;
    total?: number;
}

export const fetchPlugin = createAsyncThunk(
    'data/fetchPlugin',
    async (id: number) => {
        return getPluginAPI(id);
    }
);
export const uploadPlugin = createAsyncThunk(
    'data/postPlugin',
    async (body: IPluginUploadBody) => {
        return uploadPluginAPI(body);
    }
);
export const deletePlugin = createAsyncThunk(
    'data/deletePlugin',
    async (id: number) => {
        return deletePluginAPI(id);
    }
);
export const searchPlugins = createAsyncThunk(
    'data/searchPlugins',
    async (qp: IGetPluginsParams) => {
        return getPluginsAPI(qp);
    }
);

export const clearSearchStore = createAction('searchPlugins/clearSearchStore');
export const setCommonLoadingStatesToDefault = createAction('commonActions/setCommonLoadingStatesToDefault')

export const pluginsSlice = createSlice({
    name: pluginFeatureKey,
    initialState: pluginsAdapter.getInitialState(),
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(deletePlugin.fulfilled, (state: PluginState, action) => {
                pluginsAdapter.removeOne(state, action.meta.arg);
            })
            .addCase(
                searchPlugins.fulfilled,
                (state: PluginState, action: PayloadAction<IPluginSearch, string, {arg: IGetPluginsParams}>) => {
                    state.loadingStatus = LOADING_STATE_TYPES.COMPLETE;
                    if (action.meta?.arg?.query) {
                        return;
                    }
                    switch (action.meta?.arg?.category) {
                        case PLUGINS_CATEGORY.latest: {
                            const items = action.payload.payload?.map(item => {item[latestCustomKey] = true; return item}) || [];
                            pluginsAdapter.upsertMany(state, items);
                            break;
                        }
                        case PLUGINS_CATEGORY.popular: {
                            const items = action.payload.payload?.map(item => {item[popularCustomKey] = true; return item}) || [];
                            pluginsAdapter.upsertMany(state, items);
                            break;
                        }
                        default: {
                            pluginsAdapter.addMany(state, action.payload.payload);
                        }
                    }
                }
            )
            .addCase(searchPlugins.pending, (state: PluginState) => {
                state.loadingStatus = LOADING_STATE_TYPES.PROGRESS;
            })
            .addCase(searchPlugins.rejected, (state: PluginState, action) => {
                state.loadingStatus = LOADING_STATE_TYPES.ERROR;
                state.error = action.error.message;
            })
    },
});

export const commonPluginActionsSlice = createSlice({
    name: commonPluginActionsFeatureKey,
    initialState: commonPluginActionsAdapter.getInitialState(),
    reducers: {
        setCommonLoadingStatesToDefault: (state: PluginState, action: PayloadAction<number>) => {
            state.uploadStatus = undefined;
            state.deleteStatus = undefined;
            state.loadingStatus = undefined;
        }
    },
    extraReducers: (builder) => {
        // @ts-ignore
        builder
            .addCase(
                fetchPlugin.fulfilled,
                (state: PluginState, action: PayloadAction<IPluginEntity>) => {
                    state.loadingStatus = LOADING_STATE_TYPES.COMPLETE;
                    pluginsAdapter.addOne(state, action.payload);
                }
            )
            .addCase(fetchPlugin.pending, (state: PluginState) => {
                state.loadingStatus = LOADING_STATE_TYPES.PROGRESS;
            })
            .addCase(fetchPlugin.rejected, (state: PluginState, action) => {
                state.loadingStatus = LOADING_STATE_TYPES.ERROR;
                state.error = action.error.message;
            })
            .addCase(
                uploadPlugin.fulfilled,
                (state: PluginState, action: PayloadAction<IPluginEntity>) => {
                    state.uploadStatus = LOADING_STATE_TYPES.COMPLETE;
                    pluginsAdapter.upsertOne(state, action.payload);
                }
            )
            .addCase(uploadPlugin.pending, (state: PluginState) => {
                state.uploadStatus = LOADING_STATE_TYPES.PROGRESS;
            })
            .addCase(uploadPlugin.rejected, (state: PluginState, action) => {
                state.uploadStatus = LOADING_STATE_TYPES.ERROR;
                state.error = action.error.message;
            })
            .addCase(
                deletePlugin.fulfilled,
                (state: PluginState, action: PayloadAction<IPluginEntity, string, {arg: string}>) => {
                    state.loadingStatus = LOADING_STATE_TYPES.COMPLETE;
                    pluginsAdapter.removeOne(state, action.meta.arg);
                }
            )
            .addCase(deletePlugin.pending, (state: PluginState) => {
                state.loadingStatus = LOADING_STATE_TYPES.PROGRESS;
            })
            .addCase(deletePlugin.rejected, (state: PluginState, action) => {
                state.loadingStatus = LOADING_STATE_TYPES.ERROR;
                state.error = action.error.message;
            })
    },
});

export const pluginsSearchSlice = createSlice({
    name: pluginSearchFeatureKey,
    initialState: pluginSearchAdapter.getInitialState(),
    reducers: {
        clearSearchStore: (state, action: PayloadAction<number>) => pluginSearchAdapter.removeAll(state)
    },
    extraReducers: (builder) => {
        builder
            .addCase(deletePlugin.fulfilled, (state: PluginState, action) => {
                pluginsAdapter.removeOne(state, action.meta.arg);
            })
            .addCase(deletePlugin.rejected, (state: PluginState, action) => {
                state.loadingStatus = LOADING_STATE_TYPES.ERROR;
                state.error = action.error.message;
            })
            .addCase(
                searchPlugins.fulfilled,
                (state: PluginState, action: PayloadAction<IPluginSearch, string, {arg: IGetPluginsParams}>) => {
                    state.loadingStatus = LOADING_STATE_TYPES.COMPLETE;
                    state.total = action.payload.total;
                    if (action.meta?.arg?.query) {
                        pluginSearchAdapter.addMany(state, action.payload.payload);
                    }
                }
            )
            .addCase(searchPlugins.pending, (state: PluginState) => {
                state.loadingStatus = LOADING_STATE_TYPES.PROGRESS;
            })
            .addCase(searchPlugins.rejected, (state: PluginState, action) => {
                state.loadingStatus = LOADING_STATE_TYPES.ERROR;
                state.error = action.error.message;
            })
    },
});
// search popular and latest and actions state
const allPluginsSelectors = pluginsAdapter.getSelectors();
export const getPluginsState = (rootState: unknown) =>
    rootState[pluginFeatureKey];
export const selectPlugins = createSelector(getPluginsState, allPluginsSelectors.selectAll);
export const selectPopularPlugins = createSelector(selectPlugins, (data) => {
    return data.filter(val => val[popularCustomKey]);
})
export const selectLatestPlugins = createSelector(selectPlugins, (data) => {
    return data.filter(val => val[latestCustomKey]);
})
export const searchByCategoryLoadingState = createSelector(getPluginsState, (state) => {
    return state.loadingStatus
});

// search by query state
const searchPluginsSelector = pluginSearchAdapter.getSelectors();
export const getSearchPluginsState = (rootState: unknown) =>
    rootState[pluginSearchFeatureKey];
export const selectSearchPlugins = createSelector(getSearchPluginsState, searchPluginsSelector.selectAll);
export const searchByQueryLoadingState = createSelector(getSearchPluginsState, (state) => {
    return state.loadingStatus
});
export const searchByQueryTotalState = createSelector(getSearchPluginsState, (state) => {
    return state.total;
})

// common plugin actions state
const commonPluginActionsSelector = commonPluginActionsAdapter.getSelectors();
export const getCommonActionsPluginsState = (rootState: unknown) =>
    rootState[commonPluginActionsFeatureKey];
export const commonPluginActionLoadingState = createSelector(getCommonActionsPluginsState, (state) => {
    return state.loadingStatus
});
export const uploadPluginLoadingState = createSelector(getCommonActionsPluginsState, (state) => {
    return state.uploadStatus;
});
export const getPluginEntity = id => createSelector(getCommonActionsPluginsState, (state) => commonPluginActionsSelector.selectById(state, id));

export const pluginsReducer = pluginsSlice.reducer;
export const pluginsSearchReducer = pluginsSearchSlice.reducer;
export const commonPluginActionsReducer = commonPluginActionsSlice.reducer;

