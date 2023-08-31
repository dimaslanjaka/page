/**
 * google analytics query collections
 * source: https://developers.google.com/analytics/devguides/reporting/core/v4/rest/v4/reports/batchGet?apix_params=%7B%22resource%22%3A%7B%22reportRequests%22%3A%5B%7B%22dateRanges%22%3A%5B%7B%22startDate%22%3A%22today%22%2C%22endDate%22%3A%22today%22%7D%5D%2C%22dimensions%22%3A%5B%7B%22name%22%3A%22ga%3ApagePath%22%7D%5D%2C%22viewId%22%3A%22ga%3A159996509%22%2C%22metrics%22%3A%5B%7B%22expression%22%3A%22ga%3Apageviews%22%7D%5D%2C%22dimensionFilterClauses%22%3A%5B%7B%22filters%22%3A%5B%7B%22dimensionName%22%3A%22ga%3ApagePath%22%2C%22operator%22%3A%22EXACT%22%2C%22expressions%22%3A%5B%22%2Fchimeraland%2Findex.html%22%5D%7D%5D%7D%5D%7D%5D%7D%7D
 * explorer https://ga-dev-tools.google/dimensions-metrics-explorer/
 */

export class AnalyticsQueries {
  /**
   * get all page views with the path
   * @param {{ [key:string]: any; startDate: string, endDate: string; viewId: string; }} param0
   * @returns
   */
  static getAllPagePathsWithView = ({ startDate = 'today', endDate = 'today', viewId = 'ga:159996509' } = {}) => {
    return {
      dateRanges: [
        {
          startDate,
          endDate,
        },
      ],
      dimensions: [
        {
          name: 'ga:pagePath',
        },
      ],
      viewId,
      metrics: [
        {
          expression: 'ga:pageviews',
        },
      ],
    };
  };

  /**
   * get page views by path
   * @param value
   * @returns
   */
  static byPath = ({
    startDate = 'today',
    endDate = 'today',
    value = undefined as string,
    viewId = 'ga:159996509',
  } = {}) => {
    return {
      dateRanges: [
        {
          startDate,
          endDate,
        },
      ],
      dimensions: [
        {
          name: 'ga:pagePath',
        },
      ],
      viewId: viewId || 'ga:159996509',
      metrics: [
        {
          expression: 'ga:pageviews',
        },
      ],
      dimensionFilterClauses: [
        {
          filters: [
            {
              dimensionName: 'ga:pagePath',
              operator: 'IN_LIST' /*EXACT*/,
              expressions: [value],
            },
          ],
        },
      ],
    };
  };
}

export default AnalyticsQueries;
