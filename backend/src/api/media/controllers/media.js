'use strict';

/**
 * media controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::media.media', ({ strapi }) => ({


    async play(ctx) {
        ctx.body = "ok";
    }
}));
