const attach = (app) => {
    app.use('/', (req, res) => {
        res.send('Hello')
    })
}

module.exports = { attach };
