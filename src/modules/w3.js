'use strict';
/* global Promise */

import w3cjs from 'w3cjs';

//-------------------------------------
// Functions

/**
 * Checks if is compliant
 *
 * @param {object} req
 * @returns
 */
const isCompliant = (req) => {
    const documentHtml = req.domReq.window.document.documentElement.outerHTML;

    // Now lets validate
    const promise = new Promise((resolve, reject) => {
        w3cjs.validate({
            input: documentHtml,
            callback: res => resolve(res && res.messages) || reject(res)
        });
    })
    .then((data) => {
        // Parse it as we expect it
        data = data.map((val) => {
            const status = val.type === 'error' ? 'failed' : val.type;
            return { status, msg: val.message, raw: val };
        });

        return data;
    });

    return promise;
};

//-------------------------------------
// Export

export default {
    name: 'w3',
    rules: [
        { name: 'isCompliant', fn: isCompliant }
    ]
};
