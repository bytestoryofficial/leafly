import { baseApi } from '@/store/baseApi';

type Plant = {
  _id: string;
  slug: string;
  latinName: string;
};

/**
 * @API with injection "plants"
 */
export const plantsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getPlants: build.query<Plant[], void>({
      query: () => 'plants',
    }),
  }),
});

export const { useGetPlantsQuery } = plantsApi;

/**
 * @HOOK for get shallow-compared state
 */
export const usePlantsList = () => {
  return useGetPlantsQuery(undefined, {
    selectFromResult: ({ data, isLoading, error }) => ({
      plants: data,
      isLoading,
      error,
    }),
  });
};
