import { createPool } from "mysql2/promise";

export const pool = createPool({
    host:'localhost',
    user: 'root',
    password:'mmc251',
    port: 3306,
    database:'gestionutn1.1'
})

