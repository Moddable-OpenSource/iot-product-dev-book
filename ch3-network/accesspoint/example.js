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

import WiFi from "wifi";
import Net from "net";
import DNSServer from "dns/server";
import {Server as HTTPServer} from "http";

WiFi.accessPoint({
	ssid: "South Village",
});

new DNSServer(function(msg, value) {
	if (DNSServer.resolve === msg)
		return Net.get("IP");
});

(new HTTPServer).callback = function(msg, value) {
	if (HTTPServer.prepareResponse === msg) {
		return {
			headers: ["Content-Type", "text/plain"],
			body: "hello"
		};
	}
}