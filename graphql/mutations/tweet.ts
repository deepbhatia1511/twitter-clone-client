import { graphql } from "../../gql";

export const m_createTweet = graphql(`
   mutation m_createTweet($payload: createTweetData!) {
      createTweet(payload: $payload) {
         id
      }
   }
`)
