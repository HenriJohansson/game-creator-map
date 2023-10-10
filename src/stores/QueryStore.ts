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
      }
    }`
}
