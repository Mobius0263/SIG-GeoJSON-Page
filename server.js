const express = require('express');
const { MongoClient } = require('mongodb');
const app = express();
const port = 3000;

const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);
const dbName = 'flightDB';

app.use(express.static('public')); // Serves your HTML

// API Endpoint: Check for intersecting flights
app.get('/api/check-intersect', async (req, res) => {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection('flights');

    // The "Proposed" Route (Pondok Cabe -> Kertajati)
    const proposedRoute = {
        type: "LineString",
        coordinates: [
            [106.7596, -6.3427], // PCB
            [108.1683, -6.6433]  // KJT
        ]
    };

    // The MongoDB Query
    const query = {
        path: {
            $geoIntersects: {
                $geometry: proposedRoute
            }
        }
    };

    const results = await collection.find(query).toArray();

    // We return the database matches, AND the proposed route (so the UI can draw both)
    res.json({
        matches: results,
        proposed: proposedRoute
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
