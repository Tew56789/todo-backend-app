import express from "express"
import cors from "cors"
import { readTodos, writeTodos } from "./storage.js"

const app = express()
const PORT = process.env.PORT || 5000

app.use(cors())
app.use(express.json())

// ⭐ root route (Render จะเช็กอันนี้)
app.get("/", (req, res) => {
  res.send("Todo Backend is running 🚀")
})

// GET todos
app.get("/api/todos", (req, res) => {
  res.json(readTodos())
})

// ADD todo
app.post("/api/todos", (req, res) => {
  const todos = readTodos()

  const newTodo = {
    id: Date.now(),
    title: req.body.title,
    completed: false
  }

  todos.push(newTodo)
  writeTodos(todos)

  res.json(newTodo)
})

// UPDATE
app.put("/api/todos/:id", (req, res) => {
  const id = Number(req.params.id)
  const todos = readTodos().map(t =>
    t.id === id ? { ...t, ...req.body } : t
  )

  writeTodos(todos)
  res.json({ success: true })
})

// DELETE
app.delete("/api/todos/:id", (req, res) => {
  const id = Number(req.params.id)
  const todos = readTodos().filter(t => t.id !== id)

  writeTodos(todos)
  res.json({ success: true })
})

app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`)
})
