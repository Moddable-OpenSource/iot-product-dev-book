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

let request = new Request({
	host: "www.bing.com",
	path: "/"
});

request.callback = function(msg, value, etc) {
	if (Request.responseFragment === msg)
		trace(this.read(String), "\n");
	else if (Request.responseComplete === msg)
		trace(`\n\nTransfer complete.\n\n`);
}
