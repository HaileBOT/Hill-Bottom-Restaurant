// Database connection setup
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.join(__dirname, '../../../database/data.sqlite');
const db = new sqlite3.Database(dbPath);

// Initialize tables if not exist
const initDb = () => {
  db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS messages (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      message TEXT NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )`);
    db.run(`CREATE TABLE IF NOT EXISTS reservations (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      phoneNumber TEXT,
      date TEXT NOT NULL,
      time TEXT NOT NULL,
      guests INTEGER NOT NULL,
      note TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )`);
  });
};

initDb();

module.exports = db;
