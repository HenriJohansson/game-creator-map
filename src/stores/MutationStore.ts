import { UUIDMark } from '@/interfaces/Mark';
import gql from 'graphql-tag'
import { provideApolloClient } from "@vue/apollo-composable";
import { apolloClient } from '../apolloclient';
import { UserStoreHooks } from './UserStore';
provideApolloClient(apolloClient);

export const MutationStore = {

  ADD_MARKER_MUTATION: gql`
  mutation addMarker($markerName: String!, $location: GeoJsonPointInput!, $creationDate: DateTime!, $addMarkerId: ID! , $token: String!) {
  addMarker(marker_name: $markerName, location: $location, creation_date: $creationDate, id: $addMarkerId, owner: [$owner] , token: $token) {
    id
    marker_name
    description
    creation_date
    location {
      coordinates
    }
    owner {
      id
    }
    token
  }
}`
  ,
  getAddMarkerVariables: (marker: UUIDMark) => {

    const variables = {
      addMarkerId: marker.id,
      markerName: marker.marker_name,
      description: marker.description,
      creationDate: marker.creation_date,
      location: marker.location,
      owner: {
        id: UserStoreHooks.getUserId(),
      },
      token: UserStoreHooks.getToken()
    }

    return {
      variables
    }
  }
  /*UPDATE_MARKER_LOCATION_MUTATION: gql``, */
}
