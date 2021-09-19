import { gql } from 'apollo-server';

const typeDefs = gql`
  scalar DateTime
  # Substance Types
  type Resource {
    name: String
    url: String
  }
  type WeightMod {
    multiplier: Float
    cap: Float
    minDose: Float
    maxDose: Float
  }
  type DosingInfo {
    units: String!
    unitsDescription: String
    threshold: Float
    light: Float
    moderate: Float
    strong: Float
    heavy: Float
    weightMod: WeightMod
  }
  type DurationRange {
    units: String
    min: Float
    max: Float
  }
  type Substance {
    id: ID!
    name: String!
    description: String
    resources: [Resource]
    dosing: DosingInfo
    duration: DurationRange
    onset: DurationRange
    effects: [String]
    warnings: [String]
  }

  # Contacts
  type Contact {
    id: ID!
    name: String!
    address: String
    type: String
    active: Boolean
  }
  input ContactInput {
    id: ID!
    name: String!
    address: String
    type: String
    active: Boolean
  }

  # Generic
  type ResponseStatus {
    success: Boolean
    error: String
  }
  type SpotifyToken {
    token: String
    type: String
    expiresAt: DateTime
    scope: String
    refreshToken: String
  }
  type MusicOptions {
    id: ID!
    spotifyPlaylistId: String
    spotifyDeviceId: String
    localPlaylistFolder: String
  }
  input MusicOptionsInput {
    id: ID!
    spotifyPlaylistId: String
    spotifyDeviceId: String
    localPlaylistFolder: String
  }

  type Query {
    substances: [Substance]
    contacts: [Contact]
    spotifyToken(userCode: String!): SpotifyToken
    refreshSpotifyToken(refreshToken: String!): SpotifyToken
    musicOptions: MusicOptions
  }

  type Mutation {
    createContact(contact: ContactInput!): Contact
    updateContact(contact: ContactInput!): Contact
    deleteContact(contact: ContactInput!): ResponseStatus
    musicOptions(musicOptions: MusicOptionsInput!): MusicOptions
  }
`;

export { typeDefs };
