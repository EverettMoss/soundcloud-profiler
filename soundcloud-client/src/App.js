import { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';
//import { getLikes } from './sc';

function App() {

  const getLikes = async () => {
    const response = await axios.get('https://api-v2.soundcloud.com/users/285572916/likes', {
      params: {
        'client_id': '8m4K5d2x4mNmUHLhLmsGq9vxE3dDkxCm',
        'limit': '10',
        'offset': '0',
        'linked_partitioning': '1',
        'app_version': '1668781563',
        'app_locale': 'en'
      },
      headers: {
        'Accept': 'application/json, text/javascript, */*; q=0.01',
        'Accept-Language': 'en-US,en;q=0.9',
        'Connection': 'keep-alive',
        'Origin': 'https://soundcloud.com',
        'Referer': 'https://soundcloud.com/',
        'Sec-Fetch-Dest': 'empty',
        'Sec-Fetch-Mode': 'cors',
        'Sec-Fetch-Site': 'same-site',
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36',
        'sec-ch-ua': '"Google Chrome";v="107", "Chromium";v="107", "Not=A?Brand";v="24"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"macOS"'
      }
    });
    console.log(response.data);
  }


  return (
    <div className="App">
      <header className="App-header">
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <button onClick={getLikes}>
          hi
        </button>
      </header>
    </div>
  );
}

export default App;
