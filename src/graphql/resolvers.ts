import ReportQuery from '../experienceReport/ReportQuery';
import { ReportSubstance } from '../experienceReport/ReportSubstance';
import { ReportAdministrationRoute } from '../experienceReport/ReportAdministrationRoute';

const resolvers = {
  Query: {
    parseReportQuery: async (_, { text }: { text: string }, __) => {
      const reportCriteria = new ReportQuery();
      await reportCriteria.parseFromText(text);
      reportCriteria.withSubstance(ReportSubstance.DMT).withRoute(ReportAdministrationRoute.VAPED);
      return reportCriteria;
    },
  },
};

export { resolvers };
