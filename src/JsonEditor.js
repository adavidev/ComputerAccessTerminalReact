import React, { useState, useEffect } from "react";
import SingleEditor from "./SingleEditor"

function JsonEditor() {
  const [inputs, setInputs] = useState({});
  const [jsonString, setJsonString] = useState("");

  useEffect(() => {
    const json = JSON.stringify(inputs, null, 2);
    setJsonString(json);
  }, [inputs]);

  const getUpdatedInputs = (name, value, inputs) => {
    const [parent, ...keys] = name.split(".");
    const newInputs = { ...inputs };
    let current = newInputs[parent];
    for (const key of keys.slice(0, -1)) {
      current = current[key];
    }
    current[keys[keys.length - 1]] = value;
    return newInputs;
  };
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputs(prevState => getUpdatedInputs(name, value, prevState));
  };

  const handleInputAdd = (name, value) => {
    console.log(value)
    console.log(inputs)
    setInputs(prevState => getUpdatedInputs(name, value, prevState));
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsText(file, "UTF-8");
    reader.onload = (event) => {
      const json = JSON.parse(event.target.result);
      setInputs(json);
    };
  };

  const handleFileDownload = () => {
    const filename = "data.json";
    const json = JSON.stringify(inputs, null, 2);
    const blob = new Blob([json], { type: "application/json" });
    const href = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = href;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const renderInputField = (name, value) => {
    if (Array.isArray(value)) {
      return (
        <div key={name}>
          <label htmlFor={name}>{name}: </label>
          {value.map((item, index) => (
            <div key={index}>
              {renderInputField(`${name}.${index}`, item)}
            </div>
          ))}
        </div>
      );
    }
    if (typeof value === "object") {
      return (
        <div key={name}>
          <label htmlFor={name}>{name}: </label>
          {Object.entries(value).map(([childName, childValue]) => {
            console.log(`${name}.${childName}`)
            return renderInputField(`${name}.${childName}`, childValue)
          })}
          <SingleEditor name={`${name}`} jsonObject={value} setJsonObject={handleInputAdd}/>
        </div>
      );
    }
    return (
      <div key={name}>
        <label htmlFor={name}>{name}: </label>
        <input type="text" id={name} name={name} value={value} onChange={handleInputChange} />
      </div>
    );
  };

  return (
    <div>
      {Object.entries(inputs).map(([name, value]) =>
        renderInputField(name, value)
      )}
      <div>
        <label htmlFor="json">JSON: </label>
        <textarea id="json" name="json" value={jsonString} readOnly />
      </div>
      <div>
        <label htmlFor="file-upload">Upload JSON file: </label>
        <input type="file" id="file-upload" onChange={handleFileUpload} />
      </div>
      <button onClick={handleFileDownload}>Download JSON file</button>
    </div>
  );
}

export default JsonEditor;
