/*
 * Copyright (c) 2016-2020 Moddable Tech, Inc.
 *
 *   This file is part of the Moddable SDK.
 * 
 *   This work is licensed under the
 *       Creative Commons Attribution 4.0 International License.
 *   To view a copy of this license, visit
 *       <http://creativecommons.org/licenses/by/4.0>
 *   or send a letter to Creative Commons, PO Box 1866,
 *   Mountain View, CA 94042, USA.
 *
 */

import {Request} from "http";

function fetch(host, path = "/") {
    return new Promise((resolve, reject) => {
        let request = new Request({host, path, response: String});
        request.callback = function(msg, value) {
            if (Request.responseComplete === msg)
                resolve(value);
            else if (Request.error === msg)
                reject(-1);
        }
    });
}

async function httpTrace(host, path) {
	try {
		let body = await fetch(host, path);
		trace(body, "\n");
	}
	catch {
		trace("http get failed\n");
	}
}

httpTrace("www.example.com");
