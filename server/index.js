const path = require('path');
const absolutePath = path.join(__dirname, '.env');

require('dotenv').config({ path: absolutePath });
const express = require('express')
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)
const axios = require('axios')
const app = express()
const port = 3001
app.use(express.json())

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
app.get('/api/recipe/:id', async (req, res) => {
    try{
    const response = await axios.get(`https://api.spoonacular.com/recipes/${req.params.id}/information`, 
        {params: {apiKey: process.env.SPOONACULAR_API_KEY}})
    res.json({message: response.data.extendedIngredients})
    }
    catch(error) {
        console.log(error.message)
        res.status(500).send('API call failed')
    }})

app.post('/api/checkout', async (req,res) => {
    try{
    const session = await stripe.checkout.sessions.create({
        success_url: 'http://localhost:5173/success',
        cancel_url: 'http://localhost:5173/cancel',
        line_items: req.body.cart.map(ingredient => ({
            price_data: {
            currency: 'usd',
            product_data: {name: `${ingredient.originalName}`},
            unit_amount: 100,
    }, quantity: Math.round(ingredient.amount) || 1, 

})),
    mode: 'payment',
    })
    res.json({url: session.url})
}
    catch(error){
        console.log(error.message)
        res.status(500).send('API call failed')
}
    })
app.listen(port, () => {
    console.log(`Server running on port ${port}`)
    })
