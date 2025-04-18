import { apiSlice } from "./apiSlice";
import { CATEGORY_URL } from "../constants";


export const categoryApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        createCategory: builder.mutation({
            query: (newCategory) => ({
                url: `${CATEGORY_URL}`,
                method: "POST",
                body: newCategory
            })
        }),

        updateCategory: builder.mutation({
            query: ({categoryId, updatedCategory}) => ({
                url: `${CATEGORY_URL}/${categoryId}`,
                method: "PUT",
                body: updatedCategory
            })
        }),

        deleteCategory: builder.mutation({
            query: (categoryId) => ({
                url: `${CATEGORY_URL}/${categoryId}`,
                method: "DELETE"
            })
        }),

        fetchCategories: builder.query({
            query: () => ({
                url: `${CATEGORY_URL}/categories`,
            }),
        }),

        fetchCurrCategory: builder.query({
            query: (categoryId) => ({
                url: `${CATEGORY_URL}/${categoryId}`,
            }),
        })
    }),
})

export const {
    useCreateCategoryMutation,
    useUpdateCategoryMutation,
    useDeleteCategoryMutation,
    useFetchCategoriesQuery,
    useFetchCurrCategoryQuery
} = categoryApiSlice
