const { processEvent } = require('../src/processors');

test('should process valid events successfully', async () => {
    const mockEvent = { id: '123', userAction: 'click', payload: {} };
    await expect(processEvent(mockEvent)).resolves.not.toThrow();
});

test('should fail for invalid schema', async () => {
    const invalidEvent = { id: '123' };
    await expect(processEvent(invalidEvent)).rejects.toThrow('Schema validation failed');
});
