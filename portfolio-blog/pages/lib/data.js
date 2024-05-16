import { gql, GraphQLClient } from 'graphql-request';

export const getPostsAndPortfolio = async () =>
{
    const endpoint = 'https://api-eu-central-1-shared-euc1-02.hygraph.com/v2/clw4uvypz0qfu07w8qjut1hbw/master';
    const graphQLClient = new GraphQLClient(endpoint);

    const query = gql`
  {
    portfolios {
      title
      slug
      descritpion
      date
      coverImage {
        url
        height
        width
      }
    }
    posts {
      title
      slug
      description
      date
      tags
      author {
        name
        image {
          url
          width
          height
        }
      }
    }
  }
`;

    return await graphQLClient.request(query);
};