import React from 'react';
import ReactDOM from 'react-dom/client';
import App from "./App";

export default function AppOld() {
    return (
        <div>
            <h1>Hello, React! 🚀</h1>
            <p>{xdata.prompt}</p>
        </div>
    );
}

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);
root.render(<App />)
