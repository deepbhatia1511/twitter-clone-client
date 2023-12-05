import { graphql } from "../../gql";

export const m_followUser = graphql(`
   mutation m_followUser($to: ID!) {
      followUser(to: $to)
   }
`)

export const m_unfollowUser = graphql(`
   mutation m_unfollowUser($to: ID!) {
      unfollowUser(to: $to)
   }
`)
