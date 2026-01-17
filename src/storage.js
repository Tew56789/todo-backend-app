import fs from "fs"
import path from "path"

const dataDir = path.resolve("data")
const filePath = path.join(dataDir, "todos.json")

// สร้างโฟลเดอร์ + ไฟล์ ถ้ายังไม่มี
export function ensureStorage() {
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true })
  }

  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, JSON.stringify([], null, 2))
  }
}

export function readTodos() {
  try {
    ensureStorage()
    const data = fs.readFileSync(filePath, "utf-8")
    return JSON.parse(data)
  } catch (err) {
    console.error("readTodos error:", err)
    return []
  }
}

export function writeTodos(todos) {
  try {
    ensureStorage()
    fs.writeFileSync(filePath, JSON.stringify(todos, null, 2))
  } catch (err) {
    console.error("writeTodos error:", err)
  }
}
