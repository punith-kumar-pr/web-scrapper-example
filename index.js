const PORT = 8000
const axois = require('axios')
const cheerio = require('cheerio')
const express = require('express')

const app = express()

const url = `https://www.hindustantimes.com/`

const articles = []

app.get('/',(req, res, next)=>{
    res.json("This is my web scrapper");
})

app.get('/results',(req, res, next)=>{
    axois(url)
    .then(response => {
        const html = response.data;
        // console.log(html);
        const $ = cheerio.load(html);
        $('.hdg3', html).each(function () {
            const title = $(this).text()
            const url = $(this).find('a').attr('href')
            articles.push({
                title,
                url
            })
        })
        res.json(articles)
    }).catch(err => console.log(err))
})



app.listen(PORT, () => {
    console.log(`app is listening to http://localhost:8000`)
})