// import { graphqlClient } from "@/clients/api"
// import { query2 } from "@/graphql/queries/user"
// import { useQuery } from "@tanstack/react-query"

// export const useCurrentUser = () => {
//    const query = useQuery({
//       queryKey: ["current-user"],
//       queryFn: () => graphqlClient.request(query2)
//    })
   
//    return { ...query, user: query.data?.getCurrentUser }
// }