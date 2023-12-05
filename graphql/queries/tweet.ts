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

export const q_getSignedUrlForImage = graphql(`
   query q_getSignedUrlForImage($imageName: String!, $imageType: String!) {
      getSignedUrlForImage(imageName: $imageName, imageType: $imageType)
   }
`)
