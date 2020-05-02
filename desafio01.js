const express = require("express");

const app = express();

app.use(express.json());

const projects = [];

function checkIdExists(req, res, next){
  const { id } = res.params;

  const project = projects.find(p => p.id == id);
  if(!project){
    return res.status(400).json({ error: "Error id not found" });
  }

  return next();
}

function logCount(req, res, next){
  console.count("Número de requisições");

  return next();
}

app.use(logCount);

app.post('/projects', (req, res) => {
  const { id , title} = req.body;
  projects.push({ "id": id, "title": title, "tasks": []});
  return res.json(projects);
})

app.post('/projects/:id/:tasks', checkIdExists, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  const project = projects.find(p => p.id == id);
  project.tasks.push(title);

  return res.json(projects);
})

app.get('/projects', (req, res) => {
  return res.json(projects);
})

app.put('/projects/:id', checkIdExists, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  const project = projects.find(p => p.id == id);
  project.title = title;

  return res.json(project);
})


app.delete('/projects/:id', checkIdExists, (req, res) => {
  const { id } = req.params;
  const index = projects.findIndex(p => p.id == id);

  projects.splice(index, 1);
  
  return res.send();
})



app.listen(3000);