//Imports
import Server from './models/server';

//Configuraciones
import dotenv from 'dotenv';
dotenv.config();

// Start server
const server = new Server();
server.listen();