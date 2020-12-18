const knex = require('../connection');

function getAllUsers() {
  return knex('users')
  .select('*');
}

function findByEmail(email) {
  return knex('users')
  .select('*')
  .where({ email: email })
}

function findByInvitationTokenAndEmail(invitation_token, email) {
  return knex('users')
    .select('*')
    .where({ email: email, invitation_token: invitation_token })
}

function addUser(user) {
  return knex('users')
  .insert(user)
  .returning('*');
}

module.exports = {
  getAllUsers,
  findByEmail,
  findByInvitationTokenAndEmail,
  addUser
}
