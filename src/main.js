import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

import { CapacitorSQLite, SQLiteConnection } from "@capacitor-community/sqlite";
// Create an SQLite connection
const sqliteConnection = new SQLiteConnection(CapacitorSQLite);

const app = createApp(App).use(router);

// Share SQLite connection
app.config.globalProperties.$sqliteConnection = sqliteConnection;

router.isReady().then(() => {
  app.mount("#app");
});
