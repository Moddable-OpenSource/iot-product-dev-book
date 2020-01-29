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

import {Server} from "websocket";

let server = new Server;

server.callback = function (msg, value) {
	switch (msg) {
		case Server.connect:
			trace("connected\n");
			break;

		case Server.handshake:
			trace("handshake success\n");
			break;

		case Server.receive:
			trace(`received: ${value}\n`);
			this.write(value);
			break;

		case Server.disconnect:
			trace("closed\n");
			break;
	}
}