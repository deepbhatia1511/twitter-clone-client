import { q_getAllTweets } from "@/graphql/queries/tweet"
import { useQuery } from "@tanstack/react-query"
import { graphqlClient } from "@/clients/api"


export const useAllTweets = () => {
   const result = useQuery({
      queryKey: ["all-tweets"],
      queryFn: () => graphqlClient.request(q_getAllTweets)
   })
   return { ...result, tweets: result.data?.getAllTweets}
}
