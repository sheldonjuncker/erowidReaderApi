import { gql } from 'apollo-server';

const typeDefs = gql`
  scalar DateTime
  type DosingInfo {
    units: String!
    amount: Float!
  }
  type DurationRange {
    units: String!
    amount: Float!
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

  type ReportQuery {
    titleContains: 
    substances: [String]
    dose: DosingInfo
    route: String
    technologies: [String]
  }

  type Query {
    parseReportQuery: [ReportQuery]
  }
`;

export { typeDefs };
