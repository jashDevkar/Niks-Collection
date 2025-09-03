import mysql from 'mysql2/promise';

const db = mysql.createPool({
    host: 'localhost',      // or the hostname from Workbench
    user: 'jash',           // your Workbench username
    password: 'password',// your Workbench password
    database: 'MyDB',        // your Workbench database
    port: 3306,
    connectionLimit:10    ,
    queueLimit:0          
});




export default db;