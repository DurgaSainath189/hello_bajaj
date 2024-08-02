import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
    const [jsonInput, setJsonInput] = useState('');
    const [response, setResponse] = useState(null);
    const [error, setError] = useState('');
    const [selectedOptions, setSelectedOptions] = useState([]);

    const handleJsonChange = (e) => {
        setJsonInput(e.target.value);
    };

    const handleSubmit = async () => {
        try {
            const parsedInput = JSON.parse(jsonInput);
            if (!Array.isArray(parsedInput.data)) {
                throw new Error("Invalid input format. Expected { data: [] }.");
            }
            const res = await axios.post('https://bajaj-ap21110011291.onrender.com/bfhl', parsedInput);
            setResponse(res.data);
            console.log(res.data)
            setError('');
        } catch (err) {
            setError('Invalid JSON input or incorrect format. Expected { data: [] }.');
            setResponse(null);
        }
    };

    const handleOptionChange = (e) => {
        const value = Array.from(e.target.selectedOptions, option => option.value);
        setSelectedOptions(value);
    };

    return (
        <div className="App">
            <h1>{response?.roll_number || 'BFHL Challenge'}</h1>
            <textarea
                value={jsonInput}
                onChange={handleJsonChange}
                placeholder="Enter JSON input here"
                rows="4"
                cols="50"
            />
            <br />
            <button onClick={handleSubmit}>Submit</button>
            {error && <div className="error">{error}</div>}
            {response && (
                <div>
                    <label>Select options:</label>
                    <select multiple={true} value={selectedOptions} onChange={handleOptionChange}>
                        <option value="alphabets">Alphabets</option>
                        <option value="numbers">Numbers</option>
                        <option value="highest_alphabet">Highest Alphabet</option>
                    </select>
                    <div className="response">
                        {selectedOptions.includes('alphabets') && (
                            <div>Alphabets: {JSON.stringify(response.alphabets)}</div>
                        )}
                        {selectedOptions.includes('numbers') && (
                            <div>Numbers: {JSON.stringify(response.numbers)}</div>
                        )}
                        {selectedOptions.includes('highest_alphabet') && (
                            <div>Highest Alphabet: {JSON.stringify(response.highest_alphabet)}</div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

export default App;
