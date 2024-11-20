async function retryWithBackoff(fn, retries = 3, delay = 1000) {
    let attempt = 0;
    while (attempt < retries) {
        try {
            return await fn();
        } catch (error) {
            attempt++;
            if (attempt === retries) throw error;
            await new Promise((res) => setTimeout(res, delay * Math.pow(2, attempt)));
        }
    }
}

module.exports = { retryWithBackoff };
