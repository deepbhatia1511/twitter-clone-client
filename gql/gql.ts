/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n   mutation m_createTweet($payload: createTweetData!) {\n      createTweet(payload: $payload) {\n         id\n      }\n   }\n": types.M_CreateTweetDocument,
    "\n\tquery q_getAllTweets {\n\t\tgetAllTweets {\n\t\t\tid\n\t\t\tcontent\n\t\t\timage\n\t\t\tauthor {\n            id\n\t\t\t\tfirstName\n\t\t\t\tlastName\n\t\t\t\tprofileImage\n\t\t\t}\n\t\t}\n\t}\n": types.Q_GetAllTweetsDocument,
    "\n   query q_verifyGoogleToken ($token: String!) {\n      verifyGoogleToken(token: $token)\n   }\n": types.Q_VerifyGoogleTokenDocument,
    "\n   query q_getCurrentUser {\n      getCurrentUser {\n         id\n         profileImage\n         email\n         firstName\n         lastName\n         tweets {\n            id\n            content\n            image\n            author {\n               id\n               firstName\n               lastName\n               profileImage\n            }\n         }\n      }\n   }\n": types.Q_GetCurrentUserDocument,
    "\n   query q_getUserById($id: ID!) {\n      getUserById(id: $id) {\n         id\n         firstName\n         lastName\n         profileImage\n         tweets {\n            id\n            author {\n               id\n               firstName\n               lastName\n               profileImage\n            }\n            image\n            content\n         }\n      }\n   }\n": types.Q_GetUserByIdDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n   mutation m_createTweet($payload: createTweetData!) {\n      createTweet(payload: $payload) {\n         id\n      }\n   }\n"): (typeof documents)["\n   mutation m_createTweet($payload: createTweetData!) {\n      createTweet(payload: $payload) {\n         id\n      }\n   }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n\tquery q_getAllTweets {\n\t\tgetAllTweets {\n\t\t\tid\n\t\t\tcontent\n\t\t\timage\n\t\t\tauthor {\n            id\n\t\t\t\tfirstName\n\t\t\t\tlastName\n\t\t\t\tprofileImage\n\t\t\t}\n\t\t}\n\t}\n"): (typeof documents)["\n\tquery q_getAllTweets {\n\t\tgetAllTweets {\n\t\t\tid\n\t\t\tcontent\n\t\t\timage\n\t\t\tauthor {\n            id\n\t\t\t\tfirstName\n\t\t\t\tlastName\n\t\t\t\tprofileImage\n\t\t\t}\n\t\t}\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n   query q_verifyGoogleToken ($token: String!) {\n      verifyGoogleToken(token: $token)\n   }\n"): (typeof documents)["\n   query q_verifyGoogleToken ($token: String!) {\n      verifyGoogleToken(token: $token)\n   }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n   query q_getCurrentUser {\n      getCurrentUser {\n         id\n         profileImage\n         email\n         firstName\n         lastName\n         tweets {\n            id\n            content\n            image\n            author {\n               id\n               firstName\n               lastName\n               profileImage\n            }\n         }\n      }\n   }\n"): (typeof documents)["\n   query q_getCurrentUser {\n      getCurrentUser {\n         id\n         profileImage\n         email\n         firstName\n         lastName\n         tweets {\n            id\n            content\n            image\n            author {\n               id\n               firstName\n               lastName\n               profileImage\n            }\n         }\n      }\n   }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n   query q_getUserById($id: ID!) {\n      getUserById(id: $id) {\n         id\n         firstName\n         lastName\n         profileImage\n         tweets {\n            id\n            author {\n               id\n               firstName\n               lastName\n               profileImage\n            }\n            image\n            content\n         }\n      }\n   }\n"): (typeof documents)["\n   query q_getUserById($id: ID!) {\n      getUserById(id: $id) {\n         id\n         firstName\n         lastName\n         profileImage\n         tweets {\n            id\n            author {\n               id\n               firstName\n               lastName\n               profileImage\n            }\n            image\n            content\n         }\n      }\n   }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;