import { gql, GraphQLClient } from "graphql-request";

const endpoint = 'https://api-eu-central-1-shared-euc1-02.hygraph.com/v2/clw4uvypz0qfu07w8qjut1hbw/master';
const graphQLClient = new GraphQLClient(endpoint);

export const getPostsAndPortfolio = async () =>
{
  const query = gql`
    {
      portfolios {
        title
        slug
        description
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

export const getPortfolioItems = async () =>
{
  const query = gql`
    {
      portfolios {
        title
        slug
        description
        date
        coverImage {
          url
          height
          width
        }
      }
    }
  `;

  return await graphQLClient.request(query);
};

export const getPosts = async () =>
{
  const query = gql`
    {
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

export const getPortfolioItem = async (slug) =>
{
  const query = gql`
    query getPortfolio($slug: String!) {
      portfolios(where: { slug: $slug }) {
        title
        slug
        description
        date
        coverImage {
          url
          height
          width
        }
        content
      }
    }
  `;

  const variables = {
    slug,
  };

  return await graphQLClient.request(query, variables);
};

export const getPortfolioSlugs = async () =>
{
  const query = gql`
    {
      portfolios {
        slug
      }
    }
  `;

  return await graphQLClient.request(query);
};

export const getBlogSlugs = async () =>
{
  const query = gql`
      {
        posts {
          slug
        }
      }
    `;

  return await graphQLClient.request(query);
};

export const getPost = async (slug) =>
{
  const query = gql`
  query getPost($slug: String!) {
    posts(where: {slug: $slug}) {
      title
      slug
      description
      date
      content
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

  const variables = {
    slug,
  };
  return await graphQLClient.request(query, variables);
};