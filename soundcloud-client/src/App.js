import { useState } from 'react';
import './App.css';
import axios from 'axios'

function App() {
  const [name, setName] = useState(null)
  const [accountName, setAccountName] = useState(null)
  const [tracks, setTracks] = useState([])

  const getTracks = async () => {
    console.log("start")
    const response = await axios.get(`http://localhost:8000/tracks/${accountName}`)
    console.log(response)
    setTracks(response.data)
    console.log(tracks)
    console.log("end")
  }

  const updateName = (e) => {
    setName(e.target.value)
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setAccountName(name)
    getTracks()
  };

  return (
    <div className="App">

      <form onSubmit={handleSubmit}>
        <label>
          Account Name:
          <input type="text" id="accountName" onChange={(e) => updateName(e)} />
        </label>
        <input type="submit" value="Submit" />
      </form>

      {accountName}
      {console.log(tracks)}


    </div>
  );
}

export default App;
