import { request, gql } from "graphql-request";
import { server } from '../config';

const graphqlAPI = process.env.NEXT_PUBLIC_HYGRAPH_ENDPOINT;

export const getPosts = async () => {
    const query = gql`
        query MyQuery {
            postsConnection {
                edges {
                    node {
                        author {
                            bio
                            name
                            id
                            photo {
                                url
                            }
                        }
                        createdAt
                        slug
                        title
                        excerpt
                        featuredImage {
                            url
                        }
                        categories {
                            name
                            slug
                        }
                    }
                }
            }
        }
    `

    const result = await request(graphqlAPI, query);

    return result.postsConnection.edges;
};

export const getPostDetails = async (slug) => {
  const query = gql`
    query GetPostDetails($slug : String!) {
      post(where: {slug: $slug}) {
        title
        excerpt
        featuredImage {
          url
        }
        author{
          name
          bio
          photo {
            url
          }
        }
        createdAt
        slug
        content {
          raw
        }
        categories {
          name
          slug
        }
      }
    }
  `;

  const result = await request(graphqlAPI, query, { slug });

  return result.post;
};

export const getRecentPosts = async () => {
    const query = gql`
        query getRecentPosts {
        posts(
            orderBy: createdAt_ASC,
            last: 3
        ) {
            title
            featuredImage {
                url
            }
            createdAt
            slug
        }
        }
    `

    const result = await request(graphqlAPI, query);

    return result.posts;
};

export const getRelatedPosts = async (categories, slug) => {
    const query = gql`
        query GetPostDetails($slug: String!, $categories: [String!]) {
            posts(
                where: { slug_not: $slug, AND: { categories_some: { slug_in: $categories}}}
                last: 3
            ) {
                title
                featuredImage {
                    url
                }
                createdAt
                slug
            }
        }
    `

    const result = await request(graphqlAPI, query, { categories, slug });

    return result.posts;
};

export const getCategories = async () => {
    const query = gql`
        query getCategories {
            categories {
                name
                slug
            }
        }
    `

    const result = await request(graphqlAPI, query);

    return result.categories;
};

export const submitComment = async (obj) => {
  const result = await fetch(`${server}/api/comments`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(obj),
  });

  return result.json();
};

export const getComments = async (slug) => {
  const query = gql`
    query GetComments($slug:String!) {
      comments(where: {post: {slug:$slug}}){
        name
        createdAt
        comment
      }
    }
  `;

  const result = await request(graphqlAPI, query, { slug });

  return result.comments;
};

export const getFeaturedPosts = async () => {
  const query = gql`
    query GetFeaturedPosts() {
      posts(where: {featuredPost: true}) {
        author {
          name
          photo {
            url
          }
        }
        featuredImage {
          url
        }
        title
        slug
        createdAt
      }
    }   
  `;

  const result = await request(graphqlAPI, query);

  return result.posts;
};

export const getCategoryPosts = async (slug) => {
    const query = gql`
        query GetCategoryPosts($slug:String!) {
          postsConnection(where: {categories_every: {slug:$slug}}) {
            edges {
              node {
                author {
                  bio
                  name
                  id
                  photo {
                    url
                  }
                }
                createdAt
                slug
                title
                excerpt
                featuredImage {
                  url
                }
                categories {
                  name
                  slug
                }
              }
            }
          }
        }
    `

    const result = await request(graphqlAPI, query, { slug });

    return result.postsConnection.edges;
};

export const getCategory = async (slug) => {
  const query = gql`
    query GetCategory {
      category(where: {slug: "siglo-xix"}) {
        name
      }
    }
  `;

  const result = await request(graphqlAPI, query);

  return result.post;
};
