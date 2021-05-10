import React, {useEffect, useState} from 'react';
import Header from "./components/Header/Header";
import Search from "./components/Search/Search";
import Dialog from "src/shared/Dialog/DIalog";
import {IGetPluginsParams, IPluginEntity, PLUGINS_CATEGORY} from "./api/jetbrains/jetbrains.api";
import {
    clearSearchStore,
    searchByCategoryLoadingState,
    searchByQueryLoadingState,
    searchByQueryTotalState,
    searchPlugins,
    selectLatestPlugins,
    selectPopularPlugins,
    selectSearchPlugins
} from "./api/jetbrains/jetbrains.slice";
import {useDispatch, useSelector} from "react-redux";
import WidgetList from "./components/WidgetList/WidgetList";
import s from './Plugins.scss';
import LiveScroll from "../../shared/LiveScroll/LiveScroll";
import CardPreview from "./components/CardPreview/CardPreview";
import PluginUploadForm from "./components/PluginUploadForm/PluginUploadForm";

function Plugins() {
    const [isOpen, setIsOpen] = useState(false);
    const [component, setComponent] = useState(null);
    const [searchString, setSearchString] = useState('');
    const [loadOnIntersectionAvailable, setLoadOnIntersectionAvailable] = useState(true);
    const placeHolder = 'Search plugins';

    const dispatch = useDispatch();

    const popularPluginsItems = useSelector(selectPopularPlugins) as Array<IPluginEntity>;
    const latestPluginsItems = useSelector(selectLatestPlugins) as Array<IPluginEntity>;
    const searchPluginsItems = useSelector(selectSearchPlugins) as Array<IPluginEntity>;
    const totalItemsByQueryLoading = useSelector(searchByQueryTotalState);
    const searchByQueryLoading = useSelector(searchByQueryLoadingState);
    const searchByCategoryLoading = useSelector(searchByCategoryLoadingState);

    const openDialog = (id) => {
        const component = createCardPreview(id, () => setIsOpen(false));
        setComponent(component);
        setIsOpen(true);
    }

    const handleHeaderClick = () => {
        const component = createPluginUploadForm(() => setIsOpen(false));
        setComponent(component);
        setIsOpen(true);
    }

    const liveScroll = () => {
        const offset = searchPluginsItems.length;
        const isLoadAvailable = totalItemsByQueryLoading > offset;
        setLoadOnIntersectionAvailable(isLoadAvailable);

        if (isLoadAvailable) {
            const parameters = {
                limit: 9,
                offset,
                query: searchString
            };
            dispatch(searchPlugins(parameters))
        }

    }

    const closeDialog = () => setIsOpen(false);

    const handleSearchSubmit = (s: string) => {
        if (s === searchString) {
            return;
        }

        setSearchString(s);
        setLoadOnIntersectionAvailable(true);

        if (!s) {
            searchPopularAndAdditions(dispatch);
            return;
        }

        if (s !== searchString) {
            dispatch(clearSearchStore());
        }

        dispatch(searchPlugins({query: s, limit: 9, offset: 0}));
    }

    useEffect(() => {
        searchPopularAndAdditions(dispatch);
    }, [])

    return (
        <React.Fragment>
            <Header onClick={handleHeaderClick}/>
            <Search searchSubmit={handleSearchSubmit} searchPlaceHolder={placeHolder}/>
                {
                    searchString && searchPluginsItems?.length > 0 && <LiveScroll loading={searchByQueryLoading} onScrollEnd={liveScroll} loadOnIntersectionAvailable={loadOnIntersectionAvailable}>
                        <div className={s.widgetList}>
                            <WidgetList openDialog={openDialog} payload={searchPluginsItems}/>
                        </div>
                    </LiveScroll>

                }
                {
                    searchString && searchPluginsItems?.length === 0 &&
                    <div className={s.notFound}>
                        <span>Plugins with name " {searchString} " does not exist</span>
                    </div>
                }
                {
                    !searchString && <div className={s.widgetList}>
                        <WidgetList openDialog={openDialog} payload={popularPluginsItems} caption='Most Popular' loading={searchByCategoryLoading}/>
                        <WidgetList openDialog={openDialog} payload={latestPluginsItems} caption='Latest Additions' loading={searchByCategoryLoading}/>
                    </div>
                }
            <Dialog openState={isOpen} component={component} onBackDropClick={closeDialog} dialogMode={true}/>
        </React.Fragment>
    );
}

function createCardPreview(id, closePreview) {
    return <CardPreview id={id} closePreview={closePreview}/>
}

function createPluginUploadForm(closeUploadPluginForm) {
    return <PluginUploadForm closeUploadForm={closeUploadPluginForm}/>
}

function searchPopularAndAdditions(dispatch) {
    const popularParams: IGetPluginsParams = {
        offset: 0,
        limit: 9,
        category: PLUGINS_CATEGORY.popular
    }
    const latestParams: IGetPluginsParams = {
        offset: 0,
        limit: 9,
        category: PLUGINS_CATEGORY.latest
    }
    dispatch(searchPlugins(popularParams));
    dispatch(searchPlugins(latestParams));
}

export default Plugins;
