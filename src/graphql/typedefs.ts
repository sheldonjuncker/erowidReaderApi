import { gql } from 'apollo-server';

const typeDefs = gql`
  scalar DateTime
  type DosingInfo {
    units: String!
    amount: Float!
  }
  type IntensityRange {
    min: Int!
    max: Int!
  }
  type ReportQuery {
    title: String
    body: String
    author: String
    gender: String
    intensity: IntensityRange
    language: String
    substances: [String]
    dose: DosingInfo
    route: String
    activity: String
  }

  type Query {
    parseReportQuery: [ReportQuery]
  }
`;

export { typeDefs };
