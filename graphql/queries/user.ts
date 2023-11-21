import { graphql } from "../../gql"

export const query1 = graphql(`
   query query1 ($token: String!) {
      verifyGoogleToken(token: $token)
   }
`)

export const query2 = graphql(`
   query query2 {
      getCurrentUser {
         id
         profileImage
         email
         firstName
         lastName
      }
   }
`)
