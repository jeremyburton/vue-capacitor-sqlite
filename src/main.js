import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

import {
  createTables,
  dropTables,
  importTwoTeams,
  importTwelveMembers,
} from "@/utils/utils-db";

import { CapacitorSQLite, SQLiteConnection } from "@capacitor-community/sqlite";
// Create an SQLite connection
const sqliteConnection = new SQLiteConnection(CapacitorSQLite);

const app = createApp(App).use(router);

const initDB = async () => {
  // Create a connection to the MY_DB db
  console.log("$$$ Make initial connection to db... $$$");
  try {
    let db = await sqliteConnection.createConnection("MY_DB", false);
    // Open the MY_DB db
    await db.open();
    // Drop existing db tables for testing purposes
    let ret = await db.execute(dropTables);
    console.log(`$$$ Execute 1: ${JSON.stringify(ret)} $$$`);
    // Create the db tables if they don't already exist
    ret = await db.execute(createTables);
    console.log(`$$$ Execute 2: ${JSON.stringify(ret)} $$$`);
    // Add some sample data to the tables
    ret = await db.execute(importTwoTeams);
    console.log(`$$$ Execute 3: ${JSON.stringify(ret)} $$$`);
    ret = await db.execute(importTwelveMembers);
    console.log(`$$$ Execute 4: ${JSON.stringify(ret)} $$$`);
  } catch (err) {
    console.log(`$$$ error: ${err}`);
  }
};

// Share SQLite connection
app.config.globalProperties.$sqliteConnection = sqliteConnection;

router.isReady().then(() => {
  initDB().then(() => {
    app.mount("#app");
  });
});
