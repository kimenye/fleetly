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

function findById(id) {
  return knex('users')
  .select('*')
  .where({ id: parseInt(id) })
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

function updateUser(id, user) {
  return knex('users')
  .update(user)
  .where({ id: parseInt(id) })
  .returning('*');
}

module.exports = {
  getAllUsers,
  findByEmail,
  findById,
  findByInvitationTokenAndEmail,
  updateUser,
  addUser
}
