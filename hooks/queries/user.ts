import { q_getCurrentUser, q_getUserById } from "@/graphql/queries/user"
import { useQuery } from "@tanstack/react-query"
import { graphqlClient } from "@/clients/api"


export const useCurrentUser = () => {
   const result = useQuery({
      queryKey: ["current-user"],
      queryFn: () => graphqlClient.request(q_getCurrentUser)
   })
   return result.data?.getCurrentUser
}