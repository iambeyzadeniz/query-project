
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { faker } from "@faker-js/faker";

//apiye müdahale etme çekme süresini kendimiz belirlemek için
const pause = (duration) => {
    return new Promise((resolve) => {
        setTimeout(resolve, duration)
    })
}
const usersApi = createApi({
    reducerPath: "users",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:3000",
        fetchFn: async (...args) => {
            await pause(1000);
            return fetch(...args);
        },
    }),
    endpoints(builder) {
        return {
            //bir şeyi çekmek istediğimizde builder.query yapıyoruz
            // otomatik fetch etmek yani ekler eklemez listede göstermek için query içinde tag ataması yapılıyor. fetchusers a provideTags içinde değer belirliiyoruz o sırada kişi eklendiğinde
            // db de kişi sayısı artıyor ve biz de fetchUser ı uyarmak istiyoruz tekrardan fetch edip eklenen kişiyi listede görmemiz için 
            // addUser a ekleme işlemi yaptığımızda invalidatesTags:() diyerek [{type: "User "}] belirterek yani User tagını iptal et diyoruz.
            fetchUsers: builder.query({
                providesTags: ["User"],
                query: () => {
                    return {
                        url: "/users",
                        method: "GET",
                    };
                }
            }),

            //bir şeyi eklemek değiştirmek silmek güncellemek istediğimizde builder.mutation kullanırız.
            addUser: builder.mutation({
                invalidatesTags: () => {
                    return [{ type: "User" }]
                },
                query: () => {
                    return {
                        url: "/users",
                        method: "POST",
                        body: {
                            name: faker.name.fullName(),
                        }
                    };
                }
            }),
            removeUser: builder.mutation({
                invalidatesTags: () => {
                    return [{ type: "User" }]
                },
                query: (user) => {
                    return {
                        url: `/users/${user.id}`,
                        method: "DELETE",

                    };
                }
            }),

        };
    },
})
export const { useFetchUsersQuery, useAddUserMutation, useRemoveUserMutation } = usersApi
export { usersApi };
