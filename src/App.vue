<template>
  <div id="nav">
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
  </div>
  <router-view />
</template>

<script>
import {
  createTables,
  dropTables,
  importTwoTeams,
  importTwelveMembers,
} from "@/utils/utils-db";

export default {
  name: "App",
  mounted() {
    this.initDB();
  },
  methods: {
    async initDB() {
      // Get shared SQLite connection
      const sqliteConnection = this.$sqliteConnection;
      let db;
      if (
        !sqliteConnection.isConnection("MY_DB") ||
        !sqliteConnection.checkConnectionConsistency()
      ) {
        // Create a connection to the MY_DB db
        db = await sqliteConnection.createConnection("MY_DB", false);
        // Open the MY_DB db
        await db.open();
      } else {
        // Get existing db connection
        db = await sqliteConnection.retrieveConnection("MY_DB");
      }
      // Drop existing db tables for testing purposes
      await db.execute(dropTables);
      // Create the db tables if they don't already exist
      await db.execute(createTables);
      // Add some sample data to the tables
      await db.execute(importTwoTeams);
      await db.execute(importTwelveMembers);
      // await sqliteConnection.closeConnection("MY_DB", false);
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
