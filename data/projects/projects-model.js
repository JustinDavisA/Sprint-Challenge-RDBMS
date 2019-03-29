const db = require('../dbConfig.js');

module.exports = {
  find,
  findById,
  add,
  remove,
  update
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

function remove(id) {
  return db('projects')
      .where({ id })
      .del()
}

function update(id, changes) {
  return db('projects')
      .where({ id })
      .update(changes)
} 