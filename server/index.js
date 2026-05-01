const path = require('path');
const absolutePath = path.join(__dirname, '.env');

require('dotenv').config({ path: absolutePath });
const express = require('express')
const axios = require('axios')
const app = express()
const port = 3001


app.get('/api/recipes', async (req, res) => {
    try{
    const response = await axios.get('https://api.spoonacular.com/recipes/complexSearch', 
        {params: {apiKey: process.env.SPOONACULAR_API_KEY,query: req.query.query}})
    res.json({message: response.data})
    }
    catch(error) {
        console.log(error.message)
        res.status(500).send('API call failed')
    }

    })

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
    })