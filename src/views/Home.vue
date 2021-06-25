<template>
  <div class="home">
    <h1>Teams</h1>
    <ul>
      <li v-for="team in teams" :key="team.id">
        <router-link :to="'/teams/' + team.id + '/groups'">{{
          team.name
        }}</router-link>
        <class-actions />
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      teams: [
        // { id: 1, name: "Team 1", last_modified: 1624370619 },
        // { id: 2, name: "Team 2", last_modified: 1624370619 },
      ],
    };
  },
  mounted() {
    this.getTeams();
  },
  methods: {
    async getTeams() {
      // Retrieve exisiting sqlite connection
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
      // Query the MY_DB db for all teams
      let res = await db.query("SELECT * FROM teams");
      // Store teams
      this.teams = res.values;
      // Close database connection
      // await sqliteConnection.closeConnection("MY_DB", false);
    },
  },
};
</script>
