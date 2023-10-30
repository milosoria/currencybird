import { Database } from "sqlite3";

interface DatabaseRow {
  id: number;
  amount: number;
  email: string;
  retries: number;
  transferCode: string;
}

// Define the type for the result of the getData function
type GetDataResult = DatabaseRow | null; // Assumes db.get can return null

export const getData = async (
  db: Database,
  sql: string,
  values: Array<string>,
): Promise<GetDataResult> => {
  const data = await new Promise((resolve, reject) => {
    db.get(sql, values, (err, row) => {
      if (err) reject(err);
      else resolve(row);
    });
  });

  return data as GetDataResult;
};
