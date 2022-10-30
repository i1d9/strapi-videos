module.exports = {
    routes: [
        { // Path defined with an URL parameter
            method: 'GET',
            path: '/medias/:id/play',
            handler: 'media.play',
        }
    ]
}