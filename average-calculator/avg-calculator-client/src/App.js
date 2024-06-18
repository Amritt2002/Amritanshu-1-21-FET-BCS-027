import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
    const [numberId, setNumberId] = useState('e');
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);

    const fetchData = async () => {
        setError(null);
        try {
            const response = await axios.get(`http://localhost:9876/numbers/${numberId}`);
            setData(response.data);
        } catch (error) {
            setError('Error fetching data');
            console.error("Error fetching data", error);
        }
    };

    return (
        <div className="App">
            <h1>Average Calculator</h1>
            <select value={numberId} onChange={(e) => setNumberId(e.target.value)}>
                <option value="p">Prime</option>
                <option value="f">Fibonacci</option>
                <option value="e">Even</option>
                <option value="r">Random</option>
            </select>
            <button onClick={fetchData}>Fetch Numbers</button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {data && (
                <div>
                    <h2>Results</h2>
                    <p><strong>Previous State:</strong> {data.windowPrevState.join(', ')}</p>
                    <p><strong>Current State:</strong> {data.windowCurrState.join(', ')}</p>
                    <p><strong>Numbers:</strong> {data.numbers.join(', ')}</p>
                    <p><strong>Average:</strong> {data.avg}</p>
                </div>
            )}
        </div>
    );
}

export default App;
