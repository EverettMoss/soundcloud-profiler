const PORT = 8000

const axios = require('axios')
const express = require('express')
const cors = require('cors')
const cheerio = require('cheerio')

const app = express()
app.use(cors())

//constants
const params = {
    'client_id': '8m4K5d2x4mNmUHLhLmsGq9vxE3dDkxCm',
    'limit': '20',
    'offset': '0',
    'linked_partitioning': '1',
    'app_version': '1668781563',
    'app_locale': 'en'
}

const headers = {
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

app.get('/tracks/:accountName', async (req, res) => {
    //where all track data is stored
    tracks = []

    //get id
    const id = await getID(req.params.accountName)

    //create url
    var baseURL = 'https://api-v2.soundcloud.com/users/'
    const url = baseURL + `${id}/tracks`

    //get tracks json
    var response = await axios.get(url, {
        params: params,
        headers: headers
    });

    // store data from 1st page
    const firstPage = response.data
    var nextURL = firstPage.next_href
    var currentPage = firstPage.collection

    while (nextURL != null) {
        for (let index = 0; index < currentPage.length; index++) {
            //assign wanted data to variables
            const plays = currentPage[index].playback_count
            const track_title = currentPage[index].title
            const genre = currentPage[index].genre
            const comments = currentPage[index].comment_count
            const artwork = currentPage[index].artwork_url
            const artist_name = currentPage[index].user.username
            const artist_link = currentPage[index].user.permalink_url
            const artist_picture = currentPage[index].user.avatar_url
            const song_link = currentPage[index].permalink_url
            const likes = currentPage[index].likes_count
            const reposts = currentPage[index].reposts_count

            //add track data to array
            tracks.push({
                title: track_title,
                artist: artist_name,
                plays: plays,
                comments: comments,
                genre: genre,
                artwork: artwork,
                link: song_link,
                likes: likes,
                reposts: reposts,
                artist_link: artist_link,
                profile_picture: artist_picture
            })
        }

        //set variable for next page
        if (baseURL != nextURL) {
            baseURL = nextURL

            var response = await axios.get(baseURL, {
                params: params,
                headers: headers
            });
            const newPage = response.data
            currentPage = newPage.collection

            nextURL = newPage.next_href
        }

    }
    res.json(tracks)
    console.log(tracks)
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

            id = accountObj[6].data.id //this is where id is located
        }
    })
    return id;
}

app.listen(PORT, () => {
    console.log(`node running on ${PORT}`)
})
