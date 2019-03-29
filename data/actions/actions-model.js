const db = require('../dbConfig.js');

module.exports = {
  find,
  findById,
  add,
  remove,
  update,
  findBy
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

function remove(id) {
  return db('actions')
      .where({ id })
      .del()
}

function update(id, changes) {
  return db('actions')
      .where({ id })
      .update(changes)
} 

function findBy(projectId) {
  return db('actions')
      .where({project_id: projectId})
}