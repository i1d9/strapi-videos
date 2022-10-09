module.exports = {
    routes: [
        { // Path defined with an URL parameter
            method: 'GET',
            path: '/media/:id/play',
            handler: 'media.play',
        }
    ]
}