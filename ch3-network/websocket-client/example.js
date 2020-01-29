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

import {Client} from "websocket";

let ws = new Client({
	host: "echo.websocket.org"
});

ws.callback = function(msg, value) {
	switch (msg) {
		case Client.connect:
			trace("connected\n");
			break;

		case Client.handshake:
			trace("handshake success\n");
			this.write(JSON.stringify({
				count: 1,
				toggle: true
			}));
			break;

		case Client.receive:
			trace(`received: ${value}\n`);
			value = JSON.parse(value);
			value.count += 1;
			value.toggle = !value.toggle;
			this.write(JSON.stringify(value));
			break;

		case Client.disconnect:
			trace("disconnected\n");
			break;
	}
}