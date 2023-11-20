import { graphql } from "../../gql"
// import { TypedDocumentNode } from '@graphql-typed-document-node/core';
import { TypedDocumentNode } from '@graphql-typed-document-node/core';

export const query1 = graphql(`#graphql
   query query1 ($token: String!) {
      verifyGoogleToken(token: $token)
   }
`) as unknown as TypedDocumentNode<{}, { token: string }>;

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
