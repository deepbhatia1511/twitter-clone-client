import { query2 } from "@/graphql/queries/user"
import { useQuery } from "@tanstack/react-query"
import { graphqlClient } from "@/clients/api"


export const useCurrentUser = () => {
   const result = useQuery({
      queryKey: ["current-user"],
      queryFn: () => graphqlClient.request(query2)
   })
   return result.data?.getCurrentUser
}
