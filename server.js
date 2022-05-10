import express from 'express';

app.get('/api', (req, res) => {
    res.json({
        message: "welcome to the api"
    })
})

// Format of Token 
// Authorization: bearer < access_token >

app.post('/api/posts', verifyToken, (req, res) => {
    jwt.verify(req.token, "JohnsSecretKey", (err, authData) => {
        if (err) {
            res.status(403)
        } else {
            return res.json({
                message: "post created",
                authData
            })
        }
    })
})

app.post('/api/login', (req, res) => {

    const user = {
        id: 1,
        username: "john",
        email: "john@gmail.com",
    }

    

})

