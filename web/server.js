const express = require('express');
const app = express();
const rclient = require('redis');
const redisClient = rclient.createClient({ url: process.env.REDIS_HOSTS || 'redis://redis:6379' });

redisClient.on("error", error => {
    if(error) {
        console.error("ERROR***",error);
    }else {
        console.log("Redis connect.");
    }
});

(async () => {
    await redisClient.connect(); 
})()

app.get('/', async function(req, res) {
    let numVisits = await redisClient.get('numVisits');
    if (!numVisits) numVisits = 0;

    numVisits++;
    await redisClient.set('numVisits', numVisits);

    res.send('Number of visits is: ' + numVisits);
});

app.listen(process.env.PORT || 5000, function() {
    console.log(`Web application is listening on port ${process.env.PORT || 5000}`);
});