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

import {Server} from "http";

let server = new Server({port: 80});
server.callback = function(msg, value, etc) {
	if (Server.status == msg) {
		this.path = value;
		this.method = etc;
	}
	else if (Server.prepareResponse == msg)
		return {
			headers: ["Content-Type", "text/plain"],
			body: `hello. path "${this.path}". method "${this.method}".`
		};
}
