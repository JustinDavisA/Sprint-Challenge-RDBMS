const express = require('express');
const helmet = require('helmet');

const db = require('./data/dbConfig.js');
const Projects = require('./data/projects/projects-model.js');
const Actions = require('./data/actions/actions-model.js');

const server = express();

server.use(helmet());
server.use(express.json());

// Project endpoints

server.get('/api/projects', async (req, res) => {
  try {
    const projects = await Projects.find();
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json(error);
  }
});

server.get('/api/projects/:id', async (req, res) => {
  try {
    const project = await Projects.findById(req.params.id);
    res.status(200).json(project);
  } catch (error) {
    res.status(500).json(error);
  }
});

const errors = {
  '19': 'Another record with that value exists',
};

server.post('/api/projects', async (req, res) => {
  try {
    const [id] = await db('projects').insert(req.body);

    const project = await db('projects')
      .where({ id: id })
      .first();
    res.status(201).json(project);
  } catch (error) {
    const message = errors[error.errno] || 'We ran into an error';
    res.status(500).json({ message, error });
  }
});

// Action endpoints

server.get('/api/actions', async (req, res) => {
  try {
    const actions = await Actions.find();
    res.status(200).json(actions);
  } catch (error) {
    res.status(500).json(error);
  }
});

server.get('/api/actions/:id', async (req, res) => {
  try {
    const action = await Actions.findById(req.params.id);
    res.status(200).json(action);
  } catch (error) {
    res.status(500).json(error);
  }
});

server.post('/api/actions', async (req, res) => {
  try {
    const [id] = await db('actions').insert(req.body);

    const action = await db('actions')
      .where({ id: id })
      .first();
    res.status(201).json(action);
  } catch (error) {
    const message = errors[error.errno] || 'We ran into an error';
    res.status(500).json({ message, error });
  }
});

const port = process.env.PORT || 5000;
server.listen(port, () =>
  console.log(`\n** API running on http://localhost:${port} **\n`)
);
