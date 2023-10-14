import gql from 'graphql-tag'
import { provideApolloClient } from "@vue/apollo-composable";
import { apolloClient } from '../apolloclient';
provideApolloClient(apolloClient);

export const Queries = {
  queryForMarkers: gql`
  query {
    markers {
      id
      marker_name
      location {
        coordinates
      }
    }`,
  login: gql`
    mutation Login($credentials: Credentials!) {
      login(credentials: $credentials) {
        message
        token
        user {
          email
          id
          user_name
        }
      }
    }
      `,
  checkToken: gql`
    query CheckToken {
        checkToken {
          message
          user {
            full_name
          }
        }
      }
    `
    }
  }`
}
