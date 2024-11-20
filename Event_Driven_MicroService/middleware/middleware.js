const redis = require('redis');
const client = redis.createClient();

async function rateLimiter(userId) {
    const key = `rate:${userId}`;
    const limit = 100; // Max 100 events per minute
    const ttl = 60; // 60 seconds

    const current = await client.incr(key);
    if (current === 1) client.expire(key, ttl);

    if (current > limit) throw new Error('Rate limit exceeded');
}

module.exports = { rateLimiter };
