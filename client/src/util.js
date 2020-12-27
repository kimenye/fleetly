
module.exports = {

  groupByDate: (data) => {
    let groups = {}
    data.forEach((tweet) => {
      const date = tweet.tweeted_at.split('T')[0];
      if (groups[date]) {
        groups[date].push(tweet);
      } else {
        groups[date] = [tweet];
      }
    });
    return groups;
  }
}
