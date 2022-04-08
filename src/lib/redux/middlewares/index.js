import {customerApi} from "../services/customer";

const getRootMiddlewares = (getDefaultMiddleware,rest=[])=>{
    return getDefaultMiddleware().concat(...rest,customerApi.middleware)
}


export default getRootMiddlewares