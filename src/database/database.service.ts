import { Injectable } from '@nestjs/common';
import * as mysql from 'mysql2';
import { Connection } from 'mysql2';

@Injectable()
export class DatabaseService {
  private connection: Connection;

  constructor() {
    this.connection = mysql.createConnection({
        host: 'localhost',
        port: 3306,
        user: 'root', // Replace with your MySQL username
        database: 'auto_check', // Replace with your database name
    });
// DATABASE_URL= mysql://root@localhost:3306/digiyo_dev
    this.connection.connect((err) => {
      if (err) {
        console.error('Error connecting to the database:', err.stack);
        return;
      }
      console.log('Connected to the database');
    });
  }

  getConnection(): Connection {
    return this.connection;
  }
}