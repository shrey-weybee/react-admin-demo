import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '../../api/apiConfig';

// Define a service using a base URL and expected endpoints
export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  tagTypes: ['customers'],
  endpoints: (builder) => ({
    getAllCustomers: builder.query({
      query() {
        return 'customers';
      },
      providesTags: [{ type: 'customers', id: 'LIST' }],
    }),
    loginUser: builder.mutation(),
  }),
});

export const { useGetAllCustomersQuery } = authApi;
