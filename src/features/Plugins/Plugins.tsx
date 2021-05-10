import React, {useEffect, useState} from 'react';
import Header from "./components/Header/Header";
import Search from "./components/Search/Search";
import Footer from "./components/Footer/Footer";
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
        console.log('headerClick');
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
                {searchString ?
                    <LiveScroll loading={searchByQueryLoading} onScrollEnd={liveScroll} loadOnIntersectionAvailable={loadOnIntersectionAvailable}>
                        <div className={s.widgetList}>
                            <WidgetList openDialog={openDialog} payload={searchPluginsItems}/>
                        </div>
                    </LiveScroll> :
                    <div className={s.widgetList}>
                        <WidgetList openDialog={openDialog} payload={popularPluginsItems} caption='Most Popular' loading={searchByCategoryLoading}/>
                        <WidgetList openDialog={openDialog} payload={latestPluginsItems} caption='Latest Additions' loading={searchByCategoryLoading}/>
                    </div>
                }
            <Footer/>
            <Dialog openState={isOpen} component={component} onBackDropClick={closeDialog} dialogMode={true}/>
        </React.Fragment>
    );
}

function createCardPreview(id, closePreview) {
    return <CardPreview id={id} closePreview={closePreview}/>
}

function createPluginUploadForm() {
    return <PluginUploadForm/>
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

// dispatch(uploadPlugin({
//     name: 'new plugin',
//     author: 'Me',
//     description: 'Some discription',
//     icon: 'foo/bar.svg',
//     fullDescription: 'full desc'
// }));

// dispatch(fetchPlugin(12));

// dispatch(deletePlugin(13));
