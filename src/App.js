import React from 'react';
import JSONUploader from './components/JSONUploader';

const App = () => {
  return (
    <div className="App">
      <header className="bg-gray-800 text-white p-4 text-center">
        <h1 className="text-2xl">JSON Filter App</h1>
      </header>
      <main className="p-4">
        <JSONUploader />
      </main>
    </div>
  );
};

export default App;
