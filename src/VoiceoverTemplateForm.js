import React, { useState } from 'react';
import { CSVLink } from 'react-csv';
import CSVReader from 'react-csv-reader';

const Voice = () => {
  const [template, setTemplate] = useState({});
  const [csvHeaders, setCsvHeaders] = useState([]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setTemplate({ ...template, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Add the template to a list here
    console.log(template);
    setTemplate({});
  };

  const handleOnFileLoad = (data) => {
    console.log(data)
    if (data.length > 0) {
      const headers = data[0];
      const temp = headers.reduce(
        (accumulator, header) => ({ ...accumulator, [header]: '' }),
        {}
      )
      setCsvHeaders(headers);
      setTemplate(
        temp
      );
    }
  };

  const interpolateNamedValues = (templateValues, namedValues) => {
    console.log(csvHeaders);
    console.log(templateValues);
    return csvHeaders.map((header) => {
      let interpolatedValue = templateValues[header];
      for (const [key, value] of Object.entries(namedValues)) {
        interpolatedValue = interpolatedValue.replace(`{${key}}`, value);
      }
      return interpolatedValue;
    });
  };

  const csvData = csvHeaders.size > 0 ? [interpolateNamedValues(template, { name: 'John' })] : [];

  const renderInputFields = () => {
    return csvHeaders.map((header) => (
      <div key={header}>
        <label>
          {header}:
          <input
            type="text"
            name={header}
            value={template[header]}
            onChange={handleInputChange}
          />
        </label>
        <br />
      </div>
    ));
  };

  return (
    <div>
      <CSVReader
        onFileLoaded={handleOnFileLoad}
        config={{ header: true }}
      />
      <form onSubmit={handleSubmit}>
        {renderInputFields()}
        <button type="submit">Add to list</button>
      </form>
      <CSVLink
        data={csvData}
        filename={'templates.csv'}
      >
        Export CSV
      </CSVLink>
    </div>
  );
};

export default Voice;
