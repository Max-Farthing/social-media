const express = require('express')

const app = express()

app.use(express.json())

app.get("/api", (req, res, next) => {
    res.json({"users": ["USER1", "USER2", "USER3"]})
})

app.listen(5000, () => console.log("Server started on port 5000"))