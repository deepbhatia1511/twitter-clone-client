import { graphql } from "../../gql";

export const q_getAllTweets = graphql(`
	query q_getAllTweets {
		getAllTweets {
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
`);
