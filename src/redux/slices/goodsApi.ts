import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface goodsApi {
    id: string;
    name: string;
}
// goodsApi - это тип данных, который вернет сервер в ответе.
// string - это тип данных, который вы передаете в качестве параметра запроса.
export const goodsApi = createApi({
    reducerPath: 'goodsApi',
    // fetchBaseQuery может принимать разные заголовки, так же передаем url
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3001' }),
    tagTypes: ['Products'],
    endpoints: (builder) => ({
        getGoods: builder.query<goodsApi[], string>({
            query: (limit = '') => `goods?${limit && `_limit=${limit}`}`,
            // обеспечиваем некие теги для каждого товара добавляем уникальный id, и указываем тип этой сущности, и что все это список.
            providesTags: (result) =>
                result
                    ? [
                          ...result.map(({ id }) => ({ type: 'Products' as const, id })),
                          { type: 'Products', id: 'LIST' },
                      ]
                    : [{ type: 'Products', id: 'LIST' }],
        }),

        addProduct: builder.mutation({
            query: (body) => ({
                url: 'goods',
                method: 'POST',
                body: body,
            }),
            //После мутации говорим что поменялось: изменился список продуктов.
            invalidatesTags: [{ type: 'Products', id: 'LIST' }],
        }),

        deleteProduct: builder.mutation({
            query: (id) => ({
                //! запрос по этому адресу с методом DELETE
                url: `goods/${id}`,
                method: 'DELETE',
            }),
            //После мутации говорим что поменялось: изменился список продуктов.
            invalidatesTags: [{ type: 'Products', id: 'LIST' }],
        }),
    }),
});

export const { useGetGoodsQuery, useAddProductMutation, useDeleteProductMutation } = goodsApi;
