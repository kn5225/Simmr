const express = require('express')
const app = express()
const port = 3001

app.get('/api/hello', (req,res) => {
    res.json({ message: "hello from the server" })
})

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})