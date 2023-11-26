import { useMutation, useQueryClient } from "@tanstack/react-query"
import { graphqlClient } from "@/clients/api"
import { m_createTweet } from "@/graphql/mutations/tweet"
import { CreateTweetData } from "@/gql/graphql"
import toast from "react-hot-toast"


export const useCreateTweet = () => {
   const queryClient = useQueryClient()
   const result = useMutation({
      mutationKey: ["create-tweet"],
      mutationFn: (payload: CreateTweetData) => graphqlClient.request(m_createTweet, {payload}),
      onMutate: () => toast.loading("Posting Tweet.", {id:"1"}) ,
      onSuccess: async (payload) => {
         await queryClient.invalidateQueries({queryKey: ["all-tweets"]})
         toast.success("Posted", {id:"1"})
      }
   })
   return result
}

