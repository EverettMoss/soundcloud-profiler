const PORT = 8000

const axios = require('axios')
const express = require('express')
const cors = require('cors')
const cheerio = require('cheerio')

const app = express()
app.use(cors())

app.get('/', (req, res) => {
    const data = {
        name: 'test',
        age: 22
    }
    res.json(data)
})

app.get('/likes', async (req, res) => {
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

    console.log(response.data)
})

app.get('/tracks', (req, res) => {
    //get id



    const response = axios.get('https://api-v2.soundcloud.com/users/285572916/tracks', {
        params: {
            'representation': '',
            'client_id': '8m4K5d2x4mNmUHLhLmsGq9vxE3dDkxCm',
            'limit': '20',
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
    console.log(response.data.collection[0].track)
})


const getID = async (accountName) => {
    var id;
    const url = `https://soundcloud.com/${accountName}`
    const response = await axios.get(url)
    const html = response.data
    const $ = cheerio.load(html)

    $('script', html).each(function () {
        const idJSON = $(this).text()
        if (idJSON.includes('window.__sc_hydration')) {
            const trimmedStart = idJSON.substring(24) //trims before '='
            const accountObj = JSON.parse(trimmedStart.slice(0, -1)) //trims ';' & turns to object

            id = accountObj[6].data.id
        }
    })
    return id;
}


app.get('/getID', async (req, res) => {
    const d = await getID('everettbeats')
    console.log(d)
    //104009121

})

app.listen(PORT, () => {
    console.log(`node running on ${PORT}`)
})
