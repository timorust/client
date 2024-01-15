import { Consumer } from "@prisma/client";
import { api } from "./api";

export const consumersApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllConsumers: builder.query<Consumer[], void>({
      query: () => ({
        url: "/consumers",
        method: "GET",
      }),
    }),
    getConsumer: builder.query<Consumer[], string>({
      query: (id) => ({
        url: `/consumers/${id}`,
        method: "GET",
      }),
    }),
    editConsumer: builder.mutation<string, Consumer>({
      query: (consumer) => ({
        url: `/consumer/edit/${consumer.id}`,
        method: "PUT",
      }),
    }),
    removeConsumer: builder.mutation<string, string>({
      query: (id) => ({
        url: `/consumer/remove/${id}`,
        method: "POST",
        body: { id },
      }),
    }),
    addConsumer: builder.mutation<Consumer, Consumer>({
      query: (consumer) => ({
        url: "/consumer/add",
        method: "POST",
        body: consumer,
      }),
    }),
  }),
});

export const {
  useGetAllConsumersQuery,
  useGetConsumerQuery,
  useEditConsumerMutation,
  useRemoveConsumerMutation,
  useAddConsumerMutation,
} = consumersApi;

export const {
  endpoints: {
    getAllConsumers,
    getConsumer,
    editConsumer,
    removeConsumer,
    addConsumer,
  },
} = consumersApi;
