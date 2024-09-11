import React, { useState, useEffect, useCallback } from 'react';
import './AddDevice.css';

const AddDevice = () => {
  const [formData, setFormData] = useState({
    IMEI_NO: '',
    dateTime: '',
    imei: '',
    sim: '',
    dcVoltage: '',
    dcCurrent: '',
    dcPower: '',
    acVoltage: '',
    acCurrent: '',
    acPower: '',
    fault: '',
    todayProduction: '',
    totalProduction: '',
    creation: '',
    dropdownOption: '', 
  });

  const [data, setData] = useState([]);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };


  const addData = useCallback(() => {
    setData(prevData => [...prevData, formData]);
    setFormData({
      IMEI_NO: '',
      dateTime: '',
      imei: '',
      sim: '',
      dcVoltage: '',
      dcCurrent: '',
      dcPower: '',
      acVoltage: '',
      acCurrent: '',
      acPower: '',
      fault: '',
      todayProduction: '',
      totalProduction: '',
      creation: '',
      dropdownOption: '', 
    });
  }, [formData]);

 
  const handleSubmit = (e) => {
    e.preventDefault();
    addData();
  };

 
  useEffect(() => {
    const intervalId = setInterval(() => {
      setFormData({
        IMEI_NO: '',
        dateTime: new Date().toLocaleString(),
        imei: '',
        sim: '',
        dcVoltage: '',
        dcCurrent: '',
        dcPower: '',
        acVoltage: '',
        acCurrent: '',
        acPower: '',
        fault: '',
        todayProduction: '',
        totalProduction: '',
        creation: new Date().toLocaleString(),
        dropdownOption: formData.dropdownOption,
      });
      addData();
    }, 300000); 

    return () => clearInterval(intervalId);
  }, [addData, formData.dropdownOption]);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="datafield">
        
          <label>Select Option</label>
          <select
            name="dropdownOption"
            value={formData.dropdownOption}
            onChange={handleChange}
          >
            <option value="">Select Option</option>
            <option value="IMEI_NO">IMEI_NO</option>
            <option value="Power_Plant">Power Plant</option>
          </select>
        </div>

        
        {formData.dropdownOption === 'IMEI_NO' && (
          <div className="datafield">
            <label>IMEI Number</label>
            <input
              type="number"
              name="IMEI_NO"
              placeholder="Enter IMEI Number"
              onChange={handleChange}
              value={formData.IMEI_NO}
            />
          </div>
        )}

        {formData.dropdownOption === 'Power_Plant' && (
          <div className="datafield">
            <label>Power Plant</label>
            <input
              type="text"
              name="powerPlant"
              placeholder="Enter Power Plant Name"
              onChange={handleChange}
              value={formData.powerPlant || ''}
            />
          </div>
        )}

        <button type="submit">Submit</button>
      </form>
      <table>
        <thead>
          <tr>
            <th>Date/Time</th>
            <th>IMEI_NO</th>
            <th>SIM_NO</th>
            <th>Dc_Voltage</th>
            <th>Dc_Current</th>
            <th>Dc_Power</th>
            <th>Ac_Voltage</th>
            <th>Ac_Current</th>
            <th>Ac_Power</th>
            <th>Fault</th>
            <th>Today_Production</th>
            <th>Total_Production</th>
            <th>CreatedOn</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index}>
              <td>{row.dateTime}</td>
              <td>{row.IMEI_NO}</td>
              <td>{row.sim}</td>
              <td>{row.dcVoltage}</td>
              <td>{row.dcCurrent}</td>
              <td>{row.dcPower}</td>
              <td>{row.acVoltage}</td>
              <td>{row.acCurrent}</td>
              <td>{row.acPower}</td>
              <td>{row.fault}</td>
              <td>{row.todayProduction}</td>
              <td>{row.totalProduction}</td>
              <td>{row.creation}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AddDevice;
