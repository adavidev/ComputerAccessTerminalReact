import React, { useState } from 'react';

function SingleEditor({name = "", jsonObject = {}, setJsonObject}) {
  const [newName, setNewName] = useState('');
  const [newValue, setNewValue] = useState('');
  const [newObjectKey, setNewObjectKey] = useState('');

  function addAttribute() {
    setJsonObject(name, { ...jsonObject, [newName]: newValue });
    setNewName('');
    setNewValue('');
  }

  function addObject() {
    setJsonObject(name, { ...jsonObject, [newObjectKey]: {} });
    setNewObjectKey('');
  }

  return (
    <div>
      <h3>Add Attribute</h3>
      <label htmlFor="nameInput">Name:</label>
      <input type="text" id="nameInput" value={newName} onChange={(e) => setNewName(e.target.value)} />
      <br /><br />
      <label htmlFor="valueInput">Value:</label>
      <input type="text" id="valueInput" value={newValue} onChange={(e) => setNewValue(e.target.value)} />
      <br /><br />
      <button onClick={addAttribute}>Add Attribute</button>
      <br /><br />
      <h3>Add Object</h3>
      <label htmlFor="objectKeyInput">Name:</label>
      <input type="text" id="objectKeyInput" value={newObjectKey} onChange={(e) => setNewObjectKey(e.target.value)} />
      <br /><br />
      <button onClick={addObject}>Add Object</button>
    </div>
  );
}

export default SingleEditor;
