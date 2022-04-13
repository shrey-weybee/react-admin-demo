import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import {BASE_URL} from "../../api/apiConfig";

// Define a service using a base URL and expected endpoints
export const customerApi = createApi({
    reducerPath: 'customers',
    baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
    tagTypes:['customers'],
    endpoints: (builder) => ({
        getAllCustomers:builder.query({
            query() {
                return 'customers'
            },
            providesTags:[{type:'customers',id:'LIST'}]
        }),
        getCustomerById:builder.query({
            query(id) {
                return `customers/${id}`
            },
            providesTags(result,context,id) {
                return [{type:'customer',id}]
            }
        }),
        addCustomer:builder.mutation({
            query(customer) {
                return {
                    url :'customers',
                    method:"POST",
                    body:customer
                }
            },
            async onQueryStarted({ ...patch }, { dispatch, queryFulfilled }) {
                try {
                    const { data: customer } = await queryFulfilled
                    const patchResult = dispatch(
                        customerApi.util.updateQueryData('getAllCustomers', undefined, (draft) => {
                            draft.push({...customer})
                        })
                    )
                } catch {}
            },
            // invalidatesTags:[{type:'customers',id:'LIST'}]
        }),
        updateCustomer:builder.mutation({
            query(customer) {
                return {
                    url :`customers/${customer.id}`,
                    method:"PUT",
                    body:customer
                }
            },
            invalidatesTags(result,context, {id}) {
                return [{type:'customer',id}]
            }
        }),
        deleteCustomer:builder.mutation({
            query(id) {
                return {
                    url :`customers/${id}`,
                    method:"DELETE",
                }
            },
            async onQueryStarted({ id, ...patch }, { dispatch, queryFulfilled }) {
                try {
                    await queryFulfilled
                    const patchResult = dispatch(
                        customerApi.util.updateQueryData('getAllCustomers', undefined, (draft) => {
                            const index = draft.findIndex(x=>x.id==id)
                            draft.splice(index,1)
                        })
                    )
                } catch {}
            },
            invalidatesTags(result,context, id) {
                return [{type:'customer',id}]
            }
        }),

    }),
})

export const { useGetAllCustomersQuery, useGetCustomerByIdQuery, useAddCustomerMutation, useUpdateCustomerMutation, useDeleteCustomerMutation } = customerApi