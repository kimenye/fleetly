const { groupByDate } = require('../src/util');


test('Can group items by date', () => {

  let data = [
    {
      tweeted_at: '2020-02-03T12:31:24.000',
    },
    {
      tweeted_at: '2020-02-03T12:50:24.000'
    },
    {
      tweeted_at: '2020-02-04T12:31:24.000'
    }
  ]

  let result = groupByDate(data);

  expect(result).toStrictEqual({
    '2020-02-03': [
      { tweeted_at: '2020-02-03T12:31:24.000' },
      { tweeted_at: '2020-02-03T12:50:24.000' }
    ],
    '2020-02-04': [ { tweeted_at: '2020-02-04T12:31:24.000' } ]
  });
})
