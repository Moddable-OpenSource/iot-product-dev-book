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

let server = new Server;

server.callback = function(msg, value, etc) {
	switch (msg) {
		case Server.status:
			if ("PUT" !== etc)
				this.close();
			return;

		case Server.headersComplete:
			return String;

		case Server.requestComplete:
			this.json = {
				error: "none",
				when: (new Date).toString(),
				request: JSON.parse(value)
			};
			break;

		case Server.prepareResponse:
			return {
				headers: ["Content-Type", "application/json"],
				body: JSON.stringify(this.json)
			};
	}
}

