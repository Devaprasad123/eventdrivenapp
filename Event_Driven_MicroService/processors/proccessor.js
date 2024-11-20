const { validateSchema, transformPayload } = require('./processors.js');

async function processEvent(event) {
    try {
        // Step 1: Validate schema
        if (!validateSchema(event)) throw new Error('Schema validation failed');

        // Step 2: Transform payload
        const transformedData = transformPayload(event);

        // Step 3: Store in DB
        await saveToDatabase(transformedData);

        console.log('Event processed successfully:', event.id);
    } catch (error) {
        console.error('Error processing event:', event.id, error);
        await retryWithBackoff(() => processEvent(event));
    }
}

module.exports = processEvent;
