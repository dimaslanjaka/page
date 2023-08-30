/**
 * google analytics query collections
 */

/**
 * get page views by path
 * @param {{ startDate: string, endDate: string, value: string }} value
 * @returns
 */
const byPath = ({ startDate, endDate, value }) => {
  return {
    dimensions: [{ name: 'pagePath' }],
    metrics: [{ name: 'screenPageViews' }],
    dateRanges: [{ startDate: startDate || 'yesterday', endDate: endDate || 'today' }],
    dimensionFilter: {
      filter: {
        fieldName: 'pagePath',
        stringFilter: { matchType: 'EXACT', value },
      },
    },
    orderBys: [{ dimension: { orderType: 'ALPHANUMERIC', dimensionName: 'pagePath' } }],
    metricAggregations: ['TOTAL'],
  };
};

module.exports = { byPath };
