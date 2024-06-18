const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = 9876;

app.use(cors());

const WINDOW_SIZE = 10;
const TIMEOUT = 500; // 500 milliseconds
const URLS = {
    'p': 'http://20.244.56.144/test/primes',
    'f': 'http://28.244.56.144/test/fibo',
    'e': 'http://20.244.56.144/test/even',
    'r': 'http://20.244.56.144/test/rand'
};

let numberWindow = [];

app.get('/numbers/:id', async (req, res) => {
    const id = req.params.id;
    if (!URLS[id]) {
        return res.status(400).json({ error: 'Invalid ID' });
    }

    const url = URLS[id];
    let numbers = [];

    try {
        const response = await axios.get(url, { timeout: TIMEOUT });
        numbers = response.data.numbers;
    } catch (error) {
        return res.status(500).json({ error: 'Error fetching data' });
    }

    const prev_state = [...numberWindow];
    numbers.forEach(num => {
        if (!numberWindow.includes(num)) {
            numberWindow.push(num);
            if (numberWindow.length > WINDOW_SIZE) {
                numberWindow.shift();
            }
        }
    });

    const avg = numberWindow.length ? (numberWindow.reduce((a, b) => a + b, 0) / numberWindow.length).toFixed(2) : 0;

    res.json({
        windowPrevState: prev_state,
        windowCurrState: numberWindow,
        numbers: numbers,
        avg: parseFloat(avg)
    });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
