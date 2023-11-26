import { graphql } from "../../gql"

export const q_verifyGoogleToken = graphql(`
   query q_verifyGoogleToken ($token: String!) {
      verifyGoogleToken(token: $token)
   }
`)

export const q_getCurrentUser = graphql(`
   query q_getCurrentUser {
      getCurrentUser {
         id
         profileImage
         email
         firstName
         lastName
         tweets {
            id
            content
            image
            author {
               id
               firstName
               lastName
               profileImage
            }
         }
      }
   }
`)

export const q_getUserById = graphql(`
   query q_getUserById($id: ID!) {
      getUserById(id: $id) {
         id
         firstName
         lastName
         profileImage
         tweets {
            id
            author {
               id
               firstName
               lastName
               profileImage
            }
            image
            content
         }
      }
   }
`)

