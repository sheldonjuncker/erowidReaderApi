import axios from 'axios';
import ReportQuery from '../experienceReport/ReportQuery';

const resolvers = {
  Query: {
    parseReportQuery: async (_, { text }: { text: string }, __) => {
      const reportCriteria = new ReportQuery();
      await reportCriteria.parseFromText(text);
      return reportCriteria;
    },
  },
  Mutation: {},
};

export { resolvers };
