import { gql, GraphQLClient } from "graphql-request";

// Defining the endpoint for the GraphQL API
const endpoint = 'https://api-eu-central-1-shared-euc1-02.hygraph.com/v2/clw4uvypz0qfu07w8qjut1hbw/master';
const graphQLClient = new GraphQLClient(endpoint);

// Function to fetch the latest 3 posts and 3 portfolio items, ordered by date in descending order
export const getPostsAndPortfolio = async () => {
  const query = gql`
    {
      portfolios(first: 3, orderBy: date_DESC) {
        title
        tags
        slug
        description
        date
        coverImage {
          url
          width
          height
        }
      }
      posts(first: 3, orderBy: date_DESC) {
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

  // Sending the query request to the GraphQL API and returning the response
  return await graphQLClient.request(query);
};

// Function to fetch all portfolio items, ordered by date in descending order
export const getPortfolioItems = async () => {
  const query = gql`
    {
      portfolios(orderBy: date_DESC) {
        title
        tags
        slug
        description
        date
        coverImage {
          url
          width
          height
        }
      }
    }
  `;

  // Sending the query request to the GraphQL API and returning the response
  return await graphQLClient.request(query);
};

// Function to fetch all posts, ordered by date in descending order
export const getPosts = async () => {
  const query = gql`
    {
      posts(orderBy: date_DESC) {
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

  // Sending the query request to the GraphQL API and returning the response
  return await graphQLClient.request(query);
};

// Function to fetch a specific portfolio item by its slug
export const getPortfolioItem = async (slug) => {
  const query = gql`
    query getPortfolio($slug: String!) {
      portfolios(where: { slug: $slug }) {
        title
        tags
        slug
        description
        date
        coverImage {
          url
          width
          height
        }
        content
      }
    }
  `;

  const variables = {
    slug,
  };

  // Sending the query request to the GraphQL API with variables and returning the response
  return await graphQLClient.request(query, variables);
};

// Function to fetch the slugs of all portfolio items
export const getPortfolioSlugs = async () => {
  const query = gql`
    {
      portfolios {
        slug
      }
    }
  `;

  // Sending the query request to the GraphQL API and returning the response
  return await graphQLClient.request(query);
};

// Function to fetch the slugs of all blog posts
export const getBlogSlugs = async () => {
  const query = gql`
    {
      posts {
        slug
      }
    }
  `;

  // Sending the query request to the GraphQL API and returning the response
  return await graphQLClient.request(query);
};

// Function to fetch a specific blog post by its slug
export const getPost = async (slug) => {
  const query = gql`
    query getPost($slug: String!) {
      posts(where: { slug: $slug }) {
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
    `;

  const variables = {
    slug,
  };

  // Sending the query request to the GraphQL API with variables and returning the response
  return await graphQLClient.request(query, variables);
};
