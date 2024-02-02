
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { faker } from "@faker-js/faker";

//apiye müdahale etme çekme süresini kendimiz belirlemek için
const pause = (duration) => {
    return new Promise((resolve) => {
        setTimeout(resolve, duration)
    })
}
const photosApi = createApi({
    reducerPath: "photos",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:3000",
        fetchFn: async (...args) => {
            await pause(1000);
            return fetch(...args);
        },
    }),
    endpoints(builder) {
        return {

            fetchPhotos: builder.query({
                providesTags: (result, error, album) => {
                    const tags = result.map((photo) => {
                        return { type: "Photo", id: photo.id };
                    });
                    tags.push({ type: "AlbumPhoto", id: album.id });
                    return tags;
                },
                query: (album) => {
                    return {
                        //db.json da adı neyse '/albums' olduğu için oraya istek atılacak
                        url: "/photos",
                        method: "GET",
                        params: {
                            // albumleri çekerken hangi kişiye ait olduğunu belirtmek için params atıyoruz , db.json da userId karşılığına user propsundan gelen user.id ye eşitliyoruz
                            albumId: album.id
                        }
                    };
                }
            }),

            //bir şeyi eklemek değiştirmek silmek güncellemek istediğimizde builder.mutation kullanırız.
            addPhoto: builder.mutation({
                invalidatesTags: (result, error, album) => {
                    // result error ve parametre olan user döndürür
                    return [{ type: "AlbumPhoto", id: album.id }];
                },
                query: (album) => {
                    return {
                        url: "/photos",
                        method: "POST",
                        body: {
                            albumId: album.id,
                            url: faker.image.abstract(150, 150, true),
                            //abstract ile image boyutlarını yukarıdki gibi ayarlıyoruz true yazmak zorunlu
                        }
                    };
                }
            }),
            removePhoto: builder.mutation({
                invalidatesTags: (result, error, photo) => {
                    return [{ type: "Photo", id: photo.id }];
                },
                // silme işleminde user ile bir işimiz yok yani querynin içerisine album propunu yollarak album id si ile silmemiz gerek
                query: (photo) => {
                    console.log("fotolar", photo);
                    return {
                        url: `/photos/${photo.id}`,
                        method: "DELETE",

                    };
                }
            }),

        };
    },
})
export const { useFetchPhotosQuery, useAddPhotoMutation, useRemovePhotoMutation } = photosApi;
export { photosApi };
