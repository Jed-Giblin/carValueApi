import app from "./app";
const PORT = process.env.NODE_PORT || 3000;

// Start the express server. Export for inclusion in unit testing
export const server = app.listen(PORT, () => {
    console.log('Express server listening on port ' + PORT);
})