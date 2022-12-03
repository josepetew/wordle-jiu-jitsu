import React from 'react';
import ReactDOM from 'react-dom';
import WordleUI from './WordleApp';

const App = () => {
    return (
        <div>
            <WordleUI/>
            <h1>Hello, React! 🚀</h1>
        </div>
    );
}

ReactDOM.render(<App />, document.getElementById('root'));
