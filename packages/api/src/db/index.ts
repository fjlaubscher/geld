import sqlite from 'sqlite3';

const DATABASE = process.env.DATABASE || 'db-geld';

export const init = () =>
  new Promise((resolve, reject) => {
    const db = new sqlite.Database(DATABASE);

    db.run(`
    CREATE TABLE IF NOT EXISTS Income (
      id INTEGER PRIMARY KEY,
      description TEXT NOT NULL,
      date TEXT NOT NULL,
      amount INT NOT NULL,
      attachment TEXT
    )
  `);

    db.run(`
    CREATE TABLE IF NOT EXISTS Expense (
      id INTEGER PRIMARY KEY,
      description TEXT NOT NULL,
      date TEXT NOT NULL,
      amount INT NOT NULL,
      attachment TEXT
    )
  `);

    db.close((err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
