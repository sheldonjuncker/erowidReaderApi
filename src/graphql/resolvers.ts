import ReportQueryBuilder from '../experienceReport/ReportQueryBuilder';
import ErowidSearch from '../erowidSearch/ErowidSearch';

const resolvers = {
  Query: {
    parseReportQuery: async (_, { text }: { text: string }, __) => {
      const queryBuilder = new ReportQueryBuilder();
      const query = await queryBuilder.fromText(text);
      const search = new ErowidSearch(query);
      await search.search(query.getLimit());
      return query;
    },
  },
};

export { resolvers };
