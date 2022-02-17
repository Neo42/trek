import {QueryKey, useQueryClient} from 'react-query'

const useQueryConfig = (
  queryKey: QueryKey,
  callback: (target: any, existingItems?: any[]) => any[] | undefined,
) => {
  const queryClient = useQueryClient()

  return {
    onSuccess: () =>
      queryClient.invalidateQueries(
        Array.isArray(queryKey) ? queryKey[0] : queryKey,
      ),

    onMutate: async (target: any) => {
      // Cancel any outgoing refetches (so they don't overwrite the optimistic update)
      queryClient.cancelQueries(
        Array.isArray(queryKey) ? queryKey[0] : queryKey,
      )

      const previousItems = queryClient.getQueryData(queryKey)

      if (previousItems) {
        queryClient.setQueryData(
          queryKey,
          (existingItems?: any[]) => callback(target, existingItems) || [],
        )
      }

      return {previousItems}
    },

    onError: (error: any, newItem: any, context: any) => {
      queryClient.setQueryData(
        queryKey,
        (context as {previousItems: any[]}).previousItems,
      )
    },
  }
}

export const useDeleteConfig = (queryKey: QueryKey) =>
  useQueryConfig(queryKey, (target, existingItems) =>
    existingItems?.filter((item) => item.id !== target.id),
  )

export const useEditConfig = (queryKey: QueryKey) =>
  useQueryConfig(queryKey, (target, existingItems) =>
    existingItems?.map((item) =>
      item.id === target.id ? {...item, ...target} : item,
    ),
  )

export const useAddConfig = (queryKey: QueryKey) =>
  useQueryConfig(queryKey, (target, existingItems) =>
    existingItems ? [...existingItems, target] : [],
  )
