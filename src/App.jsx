import React, { useState, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTrash, faSave, faTimes, faEdit } from '@fortawesome/free-solid-svg-icons';
import styles from './App.module.css';


const App = () => {
  const [formData, setFormData] = useState({
      codes: [{ code: '', weight: '', m3: '', color: '' }],
  });
  const codeRefs = useRef([]);

  const handleCodeChange = (index, field, value) => {
      const newCodes = [...formData.codes];
      newCodes[index][field] = value;
      setFormData({ codes: newCodes });
  };

  const addNewRow = (index) => {
      setFormData((prev) => ({
          codes: [...prev.codes, { code: '', weight: '', m3: '', color: '' }],
      }));
      setTimeout(() => {
          if (codeRefs.current[index + 1]) {
              codeRefs.current[index + 1].focus();
          }
      }, 0);
  };

  const handleKeyDown = (e, index) => {
      if (e.key === 'Enter') {
          e.preventDefault(); // Prevent form submission
          addNewRow(index);
      }
  };

  return (
      <form className={styles.formContainer}>
          <h3>Add New Entry</h3>
          <table className={styles.table}>
              <thead>
                  <tr>
                      <th>No</th>
                      <th>Code</th>
                      <th>Weight</th>
                      <th>M3</th>
                      <th>Color</th>
                      <th>Action</th>
                  </tr>
              </thead>
              <tbody>
                  {formData.codes.map((code, index) => (
                      <tr key={index}>
                          <td>{index + 1}</td>
                          <td>
                              <input
                                  ref={(el) => (codeRefs.current[index] = el)}
                                  type="text"
                                  value={code.code}
                                  onChange={(e) => handleCodeChange(index, 'code', e.target.value)}
                                  onKeyDown={(e) => handleKeyDown(e, index)}
                                  className={styles.input}
                              />
                          </td>
                          <td>
                              <input
                                  type="text"
                                  value={code.weight}
                                  onChange={(e) => handleCodeChange(index, 'weight', e.target.value)}
                                  className={styles.input}
                              />
                          </td>
                          <td>
                              <input
                                  type="text"
                                  value={code.m3}
                                  onChange={(e) => handleCodeChange(index, 'm3', e.target.value)}
                                  className={styles.input}
                              />
                          </td>
                          <td>
                              <select
                                  value={code.color}
                                  onChange={(e) => handleCodeChange(index, 'color', e.target.value)}
                                  className={styles.input}
                              >
                                  <option value="">Select Color</option>
                                  <option value="red">Red</option>
                                  <option value="blue">Blue</option>
                              </select>
                          </td>
                          <td>
                              <button 
                                  onClick={() => deleteRow(index)}
                                  className={styles.deleteButton}
                                  type="button"
                              >
                                  <FontAwesomeIcon icon={faTrash} />
                              </button>
                          </td>
                      </tr>
                  ))}
              </tbody>
          </table>
          <button type="submit" className={styles.button}>
              <FontAwesomeIcon icon={faSave} /> Save
          </button>
      </form>
  );
};

export default App;