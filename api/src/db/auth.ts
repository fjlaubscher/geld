import sqlite from 'sqlite3';

const DATABASE = process.env.DATABASE || 'db-geld';

export const get = (token: string) =>
  new Promise<Geld.Auth>((resolve, reject) => {
    const db = new sqlite.Database(DATABASE);

    db.get(
      `SELECT * FROM Auth WHERE token = $token`,
      { $token: token },
      function (this, err: Error, rows: Geld.Auth) {
        if (err) {
          reject(err);
        }

        resolve(rows);
      }
    );

    db.close();
  });

export const create = (token: string) =>
  new Promise<Geld.Auth>((resolve, reject) => {
    const db = new sqlite.Database(DATABASE);

    db.run(
      `
    INSERT INTO Auth (token)
    VALUES ($token)`,
      {
        $token: token
      },
      function (this, err) {
        if (err) {
          reject(err);
        }

        db.get(`SELECT * from Auth WHERE id = ${this.lastID}`, function (
          this,
          err,
          row: Geld.Auth
        ) {
          if (err) {
            reject(err);
          }

          resolve(row);
        });
      }
    );

    db.close();
  });

export const remove = (token: string) =>
  new Promise<boolean>((resolve, reject) => {
    const db = new sqlite.Database(DATABASE);

    db.run(
      `DELETE FROM Auth WHERE token = $token`,
      { $token: token },
      function (this, err) {
        if (err) {
          reject(err);
        }

        resolve(true);
      }
    );

    db.close();
  });
