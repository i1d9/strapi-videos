'use strict';

/**
 * media controller
 */
const fs = require('fs');

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::media.media', ({ strapi }) => ({
    async play(ctx) {
        let { video } = await strapi.entityService.findOne('api::media.media', ctx.request.params.id, {

            populate: {
                video: true
            },
        });
        ctx.set('Content-Type', 'video/mp4')
        ctx.set('Accept-Ranges', 'bytes')
        //Get path from db
        const videoPath = "YOUR_PATH" + video.url;
        const videoStat = fs.statSync(videoPath);
        const fileSize = videoStat.size;
        const videoRange = ctx.request.headers.range;
        //Some browsers send a range in the initial request, but others don’t. 
        if (videoRange) {
            const parts = videoRange.replace(/bytes=/, "").split("-");
            const start = parseInt(parts[0], 10);
            const end = parts[1]
                ? parseInt(parts[1], 10)
                : fileSize - 1;
            const chunksize = (end - start) + 1;
            ctx.status = 206
            ctx.set('Content-Length', chunksize);
            ctx.set('Content-Range', `bytes ${start}-${end}/${fileSize}`);
            ctx.body = fs.createReadStream(videoPath, { start, end })

        } else {
            ctx.status = 200
            ctx.set('Content-Length', fileSize)
            ctx.body = fs.createReadStream(videoPath)
        }
    },
}));
