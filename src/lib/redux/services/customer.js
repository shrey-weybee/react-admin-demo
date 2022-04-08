import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import {BASE_URL} from "../../api/apiConfig";

// Define a service using a base URL and expected endpoints
export const customerApi = createApi({
    reducerPath: 'customers',
    baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
    tagTypes:['customers'],
    endpoints: (builder) => ({
        getAllCustomers:builder.query({
            query(arg) {
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
            query(arg) {
                return {
                    url :'customers',
                    method:"POST",
                    body:arg.data
                }
            },
            transformResponse(baseQueryReturnValue, meta, arg) {
                if(arg && arg.onSuccess) {
                    arg.onSuccess(baseQueryReturnValue)
                }
                return baseQueryReturnValue
            },
            invalidatesTags:[{type:'customers',id:'LIST'}]
        }),
        updateCustomer:builder.mutation({
            query({data:customer}) {
                return {
                    url :`customers/${customer.id}`,
                    method:"PUT",
                    body:customer
                }
            },
            transformResponse(baseQueryReturnValue, meta, arg) {
                if(arg && arg.onSuccess) {
                    arg.onSuccess(baseQueryReturnValue)
                }
                return baseQueryReturnValue
            },
            invalidatesTags(result,context, {data}) {
                return [{type:'customer',id:data.id},{type:'customers',id:'LIST'}]
            }
        }),
        deleteCustomer:builder.mutation({
            query(id) {
                return {
                    url :`customers/${id}`,
                    method:"DELETE",
                }
            },
            invalidatesTags(result,context, id) {
                return [{type:'customer',id},{type:'customers',id:'LIST'}]
            }
        }),

    }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetAllCustomersQuery, useGetCustomerByIdQuery, useAddCustomerMutation, useUpdateCustomerMutation, useDeleteCustomerMutation } = customerApi