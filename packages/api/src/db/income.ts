import sqlite from 'sqlite3';

const DATABASE = process.env.DATABASE || 'db-geld';

export const getTaxableAmount = () =>
  new Promise<number>((resolve, reject) => {
    const db = new sqlite.Database(DATABASE);

    db.get(
      `
      SELECT
      (SELECT SUM(amount) FROM Income) as TotalIncome,
      (SELECT SUM(amount) FROM Expense) as TotalExpenses
    `,
      function (
        this,
        err,
        row: { TotalIncome: number; TotalExpenses: number }
      ) {
        if (err) {
          reject(err);
        }

        resolve(row.TotalIncome - row.TotalExpenses);
      }
    );

    db.close();
  });

export const getAll = () =>
  new Promise<Geld.Income[]>((resolve, reject) => {
    const db = new sqlite.Database(DATABASE);

    db.all(`SELECT * FROM Income`, function (this, err, rows: Geld.Income[]) {
      if (err) {
        reject(err);
      }

      resolve(rows);
    });

    db.close();
  });

export const getById = (id: string) =>
  new Promise<Geld.Income>((resolve, reject) => {
    const db = new sqlite.Database(DATABASE);

    db.get(`SELECT * FROM Income WHERE id = $id`, { $id: id }, function (
      this,
      err,
      row: Geld.Income
    ) {
      if (err) {
        reject(err);
      }

      resolve(row);
    });

    db.close();
  });

export const create = (input: Geld.Income) =>
  new Promise<Geld.Income>((resolve, reject) => {
    const db = new sqlite.Database(DATABASE);

    db.run(
      `
    INSERT INTO Income (description, date, amount, attachment)
    VALUES ($description, $date, $amount, $attachment)`,
      {
        $description: input.description,
        $date: input.date,
        $amount: input.amount,
        $attachment: input.attachment || null
      },
      function (this, err) {
        if (err) {
          reject(err);
        }

        db.get(`SELECT * from Income WHERE id = ${this.lastID}`, function (
          this,
          err,
          row: Geld.Income
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

export const update = (id: string, input: Geld.Income) =>
  new Promise<Geld.Income>((resolve, reject) => {
    const db = new sqlite.Database(DATABASE);

    db.run(
      `
      UPDATE Income
      SET description = $description, date = $date, amount = $amount, attachment = $attachment
      WHERE id = $id
      `,
      {
        $id: id,
        $description: input.description,
        $date: input.date,
        $amount: input.amount,
        $attachment: input.attachment || null
      },
      function (this, err) {
        if (err) {
          reject(err);
        }

        db.get(`SELECT * from Income WHERE id = ${id}`, function (
          this,
          err,
          row: Geld.Income
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
