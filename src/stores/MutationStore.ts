import { UUIDMark } from '@/interfaces/Mark';
import gql from 'graphql-tag'
import { provideApolloClient } from "@vue/apollo-composable";
import { apolloClient } from '../apolloclient';
provideApolloClient(apolloClient);

export const MutationStore = {

  ADD_MARKER_MUTATION: gql`
    mutation addMarker($addMarkerId: ID!, $markerName: String!, $description: String!, $location: GeoJsonPointInput!, $creationDate: DateTime!) {
    addMarker(id: $addMarkerId, marker_name: $markerName, description: $description, location: $location, creation_date: $creationDate) {
      id
      marker_name
      creation_date
      description
      location {
        coordinates
      }
    }
  }`,
  getAddMarkerVariables: (marker: UUIDMark) => {

    const variables = {
      addMarkerId: marker.id,
      markerName: marker.marker_name,
      description: marker.description,
      location: marker.location,
      creationDate: marker.creation_date
    }

    return {
      variables
    }
  },
  DELETE_MARKER: gql`
    mutation deleteMarker($deleteMarkerId: ID!) {
    deleteMarker(id: $deleteMarkerId) {
      id
    }
  }`,
  getDeleteMarkerVariables: (marker: UUIDMark) => {

    const variables = {
      deleteMarkerId: marker.id,
    }
    return {
      variables
    }
  }
  /*UPDATE_MARKER_LOCATION_MUTATION: gql``, */
}
