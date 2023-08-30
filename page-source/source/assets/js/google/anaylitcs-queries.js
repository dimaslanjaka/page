/**
 * google analytics query collections
 */

/**
 * get page views by path
 * @param {{ startDate?: string, endDate?: string, value: string, viewId: string, [key:string]: any }} value
 * @returns
 */
const byPath = ({ startDate, endDate, value, viewId }) => {
  return {
    viewId,
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
