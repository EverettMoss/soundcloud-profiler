import { useState } from 'react';
import './App.css';
import axios from 'axios'

function App() {
  const [accountName, setAccountName] = useState(null)
  const [tracks, setTracks] = useState([])

  const getTracks = async () => {
    console.log("start")
    const response = await axios.get(`http://localhost:8000/tracks/${accountName}`)
    const data = response.data
    console.log(data)
    setTracks(data)
    console.log("end")
  }

  const updateAccountName = (e) => {
    setAccountName(e.target.value)
  };

  const handleSubmit = (e) => {
    e.preventDefault()
    getTracks()
  };

  return (
    <div className="App">

      <form onSubmit={handleSubmit}>
        <label>
          Account Name:
          <input type="text" id="accountName" onChange={(e) => updateAccountName(e)} />
        </label>
        <input type="submit" value="Submit" />
      </form>

      {accountName}

    </div>
  );
}

export default App;
