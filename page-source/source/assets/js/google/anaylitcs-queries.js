/**
 * google analytics query collections
 */

/**
 * get page views by path
 * @param {{ startDate?: string, endDate?: string, value: string, viewId: string, [key:string]: any }} value
 * @returns
 */
export const byPath = ({ startDate, endDate, value, viewId }) => {
  return {
    reportRequests: [
      {
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
      },
    ],
  };
};

/**
 * get all page views with the path
 * @param {{ [key:string]: any; startDate: string, endDate: string; viewId: string; }} param0
 * @returns
 */
export const getAllPagePathsWithView = ({ startDate, endDate, viewId }) => {
  return {
    reportRequests: [
      {
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
      },
    ],
  };
};
