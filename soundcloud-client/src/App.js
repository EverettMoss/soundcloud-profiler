import { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios'

function App() {
  const [accountName, setAccountName] = useState(null)
  const [tracks, setTracks] = useState(null)

  const getTracks =  async () => {
    const newData = await axios.get(`http://localhost:8000/tracks/${accountName}`)
    console.log(newData)
    setTracks(newData)
  };

  const updateName = (e) => {
    setAccountName(e.target.value)
  };

  return (
    <div className="App">
      <form onSubmit={getTracks}>
        <label>
          Account Name: 
          <input type="text" id="accountName" onChange={(e) => updateName(e)}/>
        </label>
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}

export default App;
