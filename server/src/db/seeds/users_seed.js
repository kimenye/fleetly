exports.seed = function(knex) {

  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        { email: 'demo@example.com', invitation_token: '0000-0000-0000-0000', uid: 'twitter_id' }
      ]);
    });
};
