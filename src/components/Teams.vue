<template>
  <div class="home">
    <h1>Teams</h1>
    <ul v-if="teams">
      <li v-for="team in teams" :key="team.id">
        {{ team.name }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "Teams",
  data() {
    return {
      teams: [],
    };
  },
  async mounted() {
    this.teams = await this.getTeams();
  },
  methods: {
    async getTeams() {
      // Retrieve exisiting sqlite connection
      const sqliteConnection = this.$sqliteConnection;
      let db;
      console.log("Check if we have an exisiting db connection...");
      if (
        !(await sqliteConnection.isConnection("MY_DB")) ||
        !sqliteConnection.checkConnectionConsistency()
      ) {
        // Create a connection to the MY_DB db
        console.log("Create a connection to the db...");
        db = await sqliteConnection.createConnection("MY_DB", false);
        // Open the MY_DB db
        await db.open();
      } else {
        // Retrieve existing db connection
        console.log("Retrieve exisiting db connection...");
        db = await sqliteConnection.retrieveConnection("MY_DB");
      }
      // Query the MY_DB db for all teams
      let res = await db.query("SELECT * FROM teams");
      console.log(`res.values: ${JSON.stringify(res.values)}`);
      // Return teams
      return res.values;
    },
  },
};
</script>
