import React, { useState } from 'react';
import { saveAs } from 'file-saver';

const JSONUploader = () => {
  const [jsonData, setJsonData] = useState(null);
  const [selectedKeys, setSelectedKeys] = useState({});
  const [availableKeys, setAvailableKeys] = useState([]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (event) => {
      const data = JSON.parse(event.target.result);
      setJsonData(data);
      setAvailableKeys(Object.keys(data[0]));
    };
    reader.readAsText(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    const reader = new FileReader();
    reader.onload = (event) => {
      const data = JSON.parse(event.target.result);
      setJsonData(data);
      setAvailableKeys(Object.keys(data[0]));
    };
    reader.readAsText(file);
  };

  const handleCheckboxChange = (key) => {
    setSelectedKeys((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleGenerateJSON = () => {
    if (!jsonData) return;
    const filteredData = jsonData.map((item) =>
      Object.fromEntries(
        Object.entries(item).filter(([key]) => selectedKeys[key]),
      ),
    );
    const blob = new Blob([JSON.stringify(filteredData, null, 2)], {
      type: 'application/json',
    });
    saveAs(blob, 'filtered.json');
  };

  return (
    <div className="container mx-auto p-4">
      <div
        className="border-4 border-dashed border-gray-300 p-6 rounded-md text-center"
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <input
          type="file"
          accept=".json"
          onChange={handleFileChange}
          className="hidden"
          id="fileInput"
        />
        <label htmlFor="fileInput" className="cursor-pointer">
          Arraste e solte um arquivo JSON aqui ou clique para fazer upload
        </label>
      </div>
      {jsonData && (
        <div className="mt-4">
          <h2 className="text-lg font-bold mb-2">Selecione as chaves:</h2>
          <div className="flex flex-wrap gap-4">
            {availableKeys.map((key) => (
              <div key={key} className="flex items-center">
                <input
                  type="checkbox"
                  id={key}
                  checked={selectedKeys[key] || false}
                  onChange={() => handleCheckboxChange(key)}
                  className="mr-2"
                />
                <label htmlFor={key}>{key}</label>
              </div>
            ))}
          </div>
          <button
            onClick={handleGenerateJSON}
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Gerar JSON
          </button>
        </div>
      )}
    </div>
  );
};

export default JSONUploader;
