const amqp = require('amqplib');

async function startEventListener() {
    const connection = await amqp.connect('amqp://localhost');
    const channel = await connection.createChannel();
    const queue = 'event-stream';

    await channel.assertQueue(queue, { durable: true });
    console.log(`Waiting for messages in ${queue}...`);

    channel.consume(queue, async (msg) => {
        if (msg !== null) {
            const event = JSON.parse(msg.content.toString());
            console.log('Received event:', event);
            // Process the event
            await processEvent(event);
            channel.ack(msg);
        }
    });
}

module.exports = startEventListener;
