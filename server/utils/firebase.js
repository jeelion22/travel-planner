const admin = require("firebase-admin");

const serviceAccount = require("../travel-planner-ee3e2-firebase-adminsdk-ik3d9-e1bfed67de.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});
