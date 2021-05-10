import axios from 'axios';

axios.defaults.headers.post['Content-Type'] ='application/json;charset=utf-8';
axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';

const baseUrl = '/plugins';

export enum PLUGINS_CATEGORY {
    popular = 'popular',
    latest = 'latest'
}

export enum PLUGIN_ACTIONS_URI_MAP {
    SEARCH = '?',
    GET = '/',
    POST = '/upload',
    DELETE = '/delete/'
}

export interface IPluginEntity {
    id?: string;
    name?: string;
    downloads?: number;
    date?: number;
    author?: string;
    rating?: number;
    description?: string;
    icon?: string,
    fullDescription?: string;
}

export interface IPluginUploadBody {
    name?: string;
    author?: string;
    icon?: string;
    fullDescription?: string;
    description?: string;
}

export interface IGetPluginsParams {
    category?: PLUGINS_CATEGORY;
    query?: string;
    offset?: number;
    limit?: number;
}

export interface IPluginSearch {
    total: number;
    payload: Array<IPluginEntity>;
}

export interface IFormUrlParams {
    qp?: IGetPluginsParams;
    action?: PLUGIN_ACTIONS_URI_MAP;
    pluginId?: number;
}

function formUrl({qp, action, pluginId}: IFormUrlParams): string {
    switch (action) {
        case PLUGIN_ACTIONS_URI_MAP.SEARCH: {
            return baseUrl + PLUGIN_ACTIONS_URI_MAP.SEARCH + formQP(qp);
        }
        case PLUGIN_ACTIONS_URI_MAP.GET: {
            return baseUrl + PLUGIN_ACTIONS_URI_MAP.GET + pluginId;
        }
        case PLUGIN_ACTIONS_URI_MAP.POST: {
            return baseUrl + PLUGIN_ACTIONS_URI_MAP.POST;
        }
        case PLUGIN_ACTIONS_URI_MAP.DELETE: {
            return baseUrl + PLUGIN_ACTIONS_URI_MAP.DELETE + pluginId;
        }
    }
}

function formQP(data: Object): string {
    const values = Object.keys(data).map(key => `${key}=${data[key]}`);

    return values?.length ? `${values.join('&')}` : '';
}

export async function getPluginsAPI(qp: IGetPluginsParams): Promise<IPluginSearch> {
    const url = formUrl({qp, action: PLUGIN_ACTIONS_URI_MAP.SEARCH});
    const {data} = await axios.get<IPluginSearch>(url);

    return data;
}

export async function getPluginAPI(pluginId: number): Promise<IPluginEntity> {
    const url = formUrl({pluginId, action: PLUGIN_ACTIONS_URI_MAP.GET});

    const {data} = await axios.get<IPluginEntity>(url);

    return data;
}

export async function uploadPluginAPI(body: IPluginUploadBody): Promise<IPluginEntity> {
    const url = formUrl({action: PLUGIN_ACTIONS_URI_MAP.POST});
    const {data} = await axios.post<IPluginEntity>(url, body);

    return data;
}

export async function deletePluginAPI(pluginId: number): Promise<IPluginEntity> {
    const url = formUrl({pluginId, action: PLUGIN_ACTIONS_URI_MAP.DELETE});
    const {data} = await axios.delete<IPluginEntity>(url);

    return data;
}
