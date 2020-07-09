import sqlite from 'sqlite3';

const DATABASE = process.env.DATABASE || 'db-geld';

export const getAll = () =>
  new Promise<Geld.Expense[]>((resolve, reject) => {
    const db = new sqlite.Database(DATABASE);

    db.all(`SELECT * FROM Expense`, function (
      this,
      err: Error,
      rows: Geld.Expense[]
    ) {
      if (err) {
        reject(err);
      }

      resolve(rows);
    });

    db.close();
  });

export const getById = (id: string) =>
  new Promise<Geld.Expense>((resolve, reject) => {
    const db = new sqlite.Database(DATABASE);

    db.get(`SELECT * FROM Expense WHERE id = $id`, { $id: id }, function (
      this,
      err: Error,
      rows: Geld.Expense
    ) {
      if (err) {
        reject(err);
      }

      resolve(rows);
    });

    db.close();
  });

export const create = (input: Geld.Expense) =>
  new Promise<Geld.Expense>((resolve, reject) => {
    const db = new sqlite.Database(DATABASE);

    db.run(
      `
    INSERT INTO Expense (description, date, amount, attachment)
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

        db.get(`SELECT * from Expense WHERE id = ${this.lastID}`, function (
          this,
          err,
          row: Geld.Expense
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

export const update = (id: string, input: Geld.Expense) =>
  new Promise<Geld.Expense>((resolve, reject) => {
    const db = new sqlite.Database(DATABASE);

    db.run(
      `
      UPDATE Expense
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

        db.get(`SELECT * from Expense WHERE id = ${id}`, function (
          this,
          err,
          row: Geld.Expense
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

export const remove = (id: string) =>
  new Promise<boolean>((resolve, reject) => {
    const db = new sqlite.Database(DATABASE);

    db.run(`DELETE FROM Expense WHERE id = $id`, { $id: id }, function (
      this,
      err
    ) {
      if (err) {
        reject(err);
      }

      resolve(true);
    });

    db.close();
  });
