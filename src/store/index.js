import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { usersApi } from "./apis/usersApi";
import { albumsApi } from "./apis/albumsApi";
import { photosApi } from "./apis/photosApi";


export const store = configureStore({

    reducer: {
        //usersApi nin içindeki reducerlara ulaşıyoruz
        [usersApi.reducerPath]: usersApi.reducer,
        [albumsApi.reducerPath]: albumsApi.reducer,
        [photosApi.reducerPath]: photosApi.reducer,
    },
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware().concat(usersApi.middleware).concat(albumsApi.middleware).concat(photosApi.middleware);
    },

})

setupListeners(store.dispatch);
export {
    useAddPhotoMutation,
    useFetchPhotosQuery,
    useRemovePhotoMutation
} from "./apis/photosApi";
export {
    useFetchAlbumsQuery,
    useAddAlbumMutation,
    useRemoveAlbumMutation
} from "./apis/albumsApi";
export {
    useFetchUsersQuery,
    useAddUserMutation,
    useRemoveUserMutation,
} from "./apis/usersApi";