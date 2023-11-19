import { graphql } from "../../gql"

export const query1 = graphql(`#graphql
   query query1 ($token: String!) {
      verifyGoogleToken(token: $token)
   }
`)

export const query2 = graphql(`#graphql
   query query2 {
      getCurrentUser {
         id
         profileImageUrl
         email
         firstName
         lastName
      }
   }
`)
