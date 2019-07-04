require('electron-reload')(__dirname); // reload
require('ts-node').register(); // This will register the TypeScript compiler
require('./index.ts'); // This will load our Typescript application
