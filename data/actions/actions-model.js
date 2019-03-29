const db = require('../dbConfig.js');

module.exports = {
  find,
  findById,
  add
};

function find() {
  return db('actions');
}

function findById(id) {
  return db('actions')
    .where({ id })
    .first();
}

function add(action) {
    return db('actions')
        .insert(action)
        .then(ids => {
            return findById(ids[0])
        });
}