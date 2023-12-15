// function that waits for a given number of milliseconds
export const wait = (ms: number) => new Promise((res) => setTimeout(res, ms));
