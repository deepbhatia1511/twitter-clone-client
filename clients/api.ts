import { GraphQLClient } from "graphql-request"

const isClient = typeof window !== "undefined"

export const graphqlClient = new GraphQLClient("https://d1899f7mzmayyt.cloudfront.net/graphql", {
   headers: () => ({
      Authorization: isClient ? `Bearer ${window.localStorage.getItem("_twitter_token")}` : "",
   })
})
