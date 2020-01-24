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

server.callback = function(msg, value) {
	switch (msg) {
		case Server.status:
			trace("\n ** begin upload to ${value} **\n");
			break;

		case Server.prepareRequest:
			return true;

		case Server.requestFragment:
			trace(this.read(String));
			break;

		case Server.requestComplete:
			trace("\n ** end of file **\n");
			break;
	}
}
