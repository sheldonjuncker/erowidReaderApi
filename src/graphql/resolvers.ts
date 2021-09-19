import ReportQueryBuilder from '../experienceReport/ReportQueryBuilder';

const resolvers = {
  Query: {
    parseReportQuery: async (_, { text }: { text: string }, __) => {
      const queryBuilder = new ReportQueryBuilder();
      return queryBuilder.fromText(text);
    },
  },
};

export { resolvers };
