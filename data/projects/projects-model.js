const db = require('../data/dbConfig.js');

module.exports = {
  find,
  findById,
  add
};

function find() {
  return db('projects');
}

function findById(id) {
  return db('projects')
    .where({ id })
    .first();
}

function add(project) {
    return db('recipes')
        .insert(project)
        .then(ids => {
            return findById(ids[0])
        });
}
