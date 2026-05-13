/**
 * Vercel serverless entry — re-exports the Express app (see server.js).
 * Do not call app.listen() here; Vercel invokes the handler per request.
 */
module.exports = require("../server.js");
