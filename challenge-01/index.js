const express = require('express');

const server = express();

server.use(express.json());

let numberOfRequests = 0;
const projects = [];

server.use((req, res, next) => {
  numberOfRequests++;

  console.log(`${numberOfRequests} request on the server until now.`);

  next();
  
})

const checkProjectExists = (req, res, next) => {
  const { id } = req.params;
  const project = projects.find(p => p.id === id)

  if (!project) return res.status(400).json({ error: 'Project not found' });

  req.project = project;
  return next();
}

server.get('/projects', (req, res) => {
  return res.json(projects);
})

server.post('/projects', (req, res) => {
  const { id, title } = req.body;

  const newProject = {
    id,
    title,
    tasks: []
  }
  projects.push(newProject);

  return res.json(projects);
})

server.post('/projects/:id/tasks', checkProjectExists, (req, res) => {
  const { title } = req.body;

  const index = projects.indexOf(req.project);

  projects[index].tasks.push(title);

  return res.json(projects);
})

server.put('/projects/:id', checkProjectExists, (req, res) => {
  const { title } = req.body;

  const index = projects.indexOf(req.project);
  projects[index].title = title;

  return res.json(projects);
})

server.delete('/projects/:id', checkProjectExists, (req, res) => {

  const index = projects.indexOf(req.project);
  projects.splice(index, 1);

  return res.send();
})

server.listen(3003);