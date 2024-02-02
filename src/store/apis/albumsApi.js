
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { faker } from "@faker-js/faker";

//apiye müdahale etme çekme süresini kendimiz belirlemek için
const pause = (duration) => {
    return new Promise((resolve) => {
        setTimeout(resolve, duration)
    })
}
const albumsApi = createApi({
    reducerPath: "albums",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:3000",
        fetchFn: async (...args) => {
            await pause(1000);
            return fetch(...args);
        },
    }),
    endpoints(builder) {
        return {

            fetchAlbums: builder.query({
                providesTags: (result, error, user) => {
                    const tags = result.map((album) => {
                        return { type: "Album", id: album.id };
                    });
                    tags.push({ type: "UsersAlbums", id: user.id });
                    return tags;
                },
                query: (user) => {
                    return {
                        //db.json da adı neyse '/albums' olduğu için oraya istek atılacak
                        url: "/albums",
                        method: "GET",
                        params: {
                            // albumleri çekerken hangi kişiye ait olduğunu belirtmek için params atıyoruz , db.json da userId karşılığına user propsundan gelen user.id ye eşitliyoruz
                            userId: user.id
                        }
                    };
                }
            }),

            //bir şeyi eklemek değiştirmek silmek güncellemek istediğimizde builder.mutation kullanırız.
            addAlbum: builder.mutation({
                invalidatesTags: (result, error, user) => {
                    // result error ve parametre olan user döndürür
                    return [{ type: "UsersAlbums", id: user.id }];
                },
                query: (user) => {
                    return {
                        url: "/albums",
                        method: "POST",
                        body: {
                            userId: user.id,
                            title: faker.music.songName(),
                        }
                    };
                }
            }),
            removeAlbum: builder.mutation({
                invalidatesTags: (result, error, album) => {
                    return [{ type: "Album", id: album.id }];
                },
                // silme işleminde user ile bir işimiz yok yani querynin içerisine album propunu yollarak album id si ile silmemiz gerek
                query: (album) => {
                    console.log("hsjkl", album);
                    return {
                        url: `/albums/${album.id}`,
                        method: "DELETE",

                    };
                }
            }),

        };
    },
})
export const { useFetchAlbumsQuery, useAddAlbumMutation, useRemoveAlbumMutation } = albumsApi
export { albumsApi };
