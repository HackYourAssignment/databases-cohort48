const { MongoClient, ServerApiVersion } = require("mongodb");
require("dotenv").config();

const { seedDatabase } = require("./seedDatabase.js");

async function createEpisodeExercise(client) {
  
  const newEpisode = {
    episode: "S09E13",
    title: "MOUNTAIN HIDE-AWAY",
    elements: [
      "CIRRUS",
      "CLOUDS",
      "CONIFER",
      "DECIDIOUS",
      "GRASS",
      "MOUNTAIN",
      "MOUNTAINS",
      "RIVER",
      "SNOWY_MOUNTAIN",
      "TREE",
      "TREES",
    ],
    // Write code that will add this to the collection!
  };
  const result = await client
    .db("databaseWeek3")
    .collection("bob_ross_episodes")
    .insertOne(newEpisode);
  console.log(
    `Created season 9 episode 13 and the document got the id ${result.insertedId}`
  );
}

async function findEpisodesExercises(client) {
  
  // Find the title of episode 2 in season 2 [Should be: WINTER SUN]

  const resultOfEpisodeTwo = await client
    .db("databaseWeek3")
    .collection("bob_ross_episodes")
    .findOne({ episode: "S02E02" });

  if (resultOfEpisodeTwo != null) {
    console.log(
      `The title of episode 2 in season 2 is ${resultOfEpisodeTwo.title}`
    );
  } else {
    console.log("title of episode 2 in season 2 not found");
  }

  // Find the season and episode number of the episode called "BLACK RIVER" [Should be: S02E06]

  const cursor2 = client
    .db("databaseWeek3")
    .collection("bob_ross_episodes")
    .find({ title: "BLACK RIVER", episode: "S02E06" });

  const resultsBlackRiver = await cursor2.toArray();
  if (resultsBlackRiver.length > 0) {
    resultsBlackRiver.forEach((result) => {
      console.log(
        `The season and episode number of the "BLACK RIVER" episode is ${result.episode}`
      );
    });
  } else {
    console.log(
      "season and episode number of the episode called BLACK RIVER not found"
    );
  }

  //Find all of the episode titles where Bob Ross painted a CLIFF [Should be: NIGHT LIGHT, EVENING SEASCAPE, SURF'S UP, CLIFFSIDE, BY THE SEA, DEEP WILDERNESS HOME, CRIMSON TIDE, GRACEFUL WATERFALL]

  const cursor3 = await client
    .db("databaseWeek3")
    .collection("bob_ross_episodes")
    .find({ elements: "CLIFF" });

  const resultsCliff = await cursor3.toArray();

  if (resultsCliff.length > 0) {
    resultsCliff.forEach((result) => {
      console.log(
        `The episodes that Bob Ross painted a CLIFF are ${result.title}`
      );
    });
  } else {
    console.log("episodes that Bob Ross painted a CLIFF not found");
  }

  // Find all of the episode titles where Bob Ross painted a CLIFF and a LIGHTHOUSE [Should be: NIGHT LIGHT]
  const cursor4 = client
    .db("databaseWeek3")
    .collection("bob_ross_episodes")
    .find({ elements: { $all: ["CLIFF", "LIGHTHOUSE"] } });

  const resultsCliffLighthouse = await cursor4.toArray();

  if (resultsCliffLighthouse.length > 0) {
    resultsCliffLighthouse.forEach((result) => {
      console.log(
        `The episodes that Bob Ross painted a CLIFF and a LIGHTHOUSE are ${result.title}`
      );
    });
  } else {
    console.log(
      "episodes that Bob Ross painted a CLIFF and a LIGHTHOUSE not found"
    );
  }
}

async function updateEpisodeExercises(client) {
  
  // Episode 13 in season 30 should be called BLUE RIDGE FALLS, yet it is called BLUE RIDGE FALLERS now. Fix that
  const result = await client
    .db("databaseWeek3")
    .collection("bob_ross_episodes")
    .updateOne({ episode: "S30E13" }, { $set: { title: "BLUE RIDGE FALLS" } });

  console.log(
    `Ran a command to update episode 13 in season 30 and it updated ${result.matchedCount} episodes`
  );

  
  // Update all of the documents in the collection that have `BUSHES` in the elements array to now have `BUSH`
  // It should update 120 episodes!

  const result2 = await client
    .db("databaseWeek3")
    .collection("bob_ross_episodes")
    .updateMany({ elements: "BUSHES" }, { $set: { elements: "BUSH" } });

  console.log(
    `Ran a command to update all the BUSHES to BUSH and it updated ${result2.matchedCount} episodes`
  );
}

async function deleteEpisodeExercise(client) {
  /**
   * It seems an errand episode has gotten into our data.
   * This is episode 14 in season 31. Please remove it and verify that it has been removed!
   */

  const result = await client
    .db("databaseWeek3")
    .collection("bob_ross_episodes")
    .deleteOne({ episode: "S31E14" });
  if (result.deletedCount === 1) {
    console.log("Ran a command to delete episode and it deleted 1 episodes");
  } else {
    console.log("The episode was not found or could not be deleted.");
  }
}

async function main() {
  if (process.env.MONGODB_URL == null) {
    throw Error(
      `You did not set up the environment variables correctly. Did you create a '.env' file and add a package to create it?`
    );
  }
  const client = new MongoClient(process.env.MONGODB_URL, {
    serverApi: ServerApiVersion.v1,
  });

  //console.log("client", client);
  try {
    await client.connect().catch((err) => console.log("error", err));

    // Seed our database
    await seedDatabase(client);

    // CREATE
    await createEpisodeExercise(client);

    // READ
    await findEpisodesExercises(client);

    // UPDATE
    await updateEpisodeExercises(client);

    // DELETE
    await deleteEpisodeExercise(client);
  } catch (err) {
    console.error(err);
  } finally {
    // Always close the connection at the end
    console.log("closing client");
    client.close();
  }
}

main();

/**
 * In the end the console should read something like this: 

Created season 9 episode 13 and the document got the id 625e9addd11e82a59aa9ff93
The title of episode 2 in season 2 is WINTER SUN
The season and episode number of the "BLACK RIVER" episode is S02E06
The episodes that Bob Ross painted a CLIFF are NIGHT LIGHT, EVENING SEASCAPE, SURF'S UP, CLIFFSIDE, BY THE SEA, DEEP WILDERNESS HOME, CRIMSON TIDE, GRACEFUL WATERFALL
The episodes that Bob Ross painted a CLIFF and a LIGHTHOUSE are NIGHT LIGHT
Ran a command to update episode 13 in season 30 and it updated 1 episodes
Ran a command to update all the BUSHES to BUSH and it updated 120 episodes
Ran a command to delete episode and it deleted 1 episodes
 
*/