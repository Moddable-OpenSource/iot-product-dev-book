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

import LoadMod from "loadmod";
import WiFi from "wifi";
import Net from "net";
import config from "mc/config";

export default function () {
	if (!LoadMod.has("check") || !LoadMod.has("example"))
		return trace("Host installed. Ready for mods.\n");

	(LoadMod.load("check"))();

	let credentials;
	if (LoadMod.has("mod/config")) {
		credentials = LoadMod.load("mod/config");
		if (!credentials.ssid)
			credentials = undefined;
	}
	credentials ??= config;
	if (!credentials.ssid)
		return trace("This example requires Wi-Fi. When executing mcrun specify ssid and password.\n");

	trace(`Wi-Fi trying to connect to "${credentials.ssid}"\n`);

	WiFi.mode = 1;

	const monitor = new WiFi({ssid: credentials.ssid, password: credentials.password}, function(msg, code) {
	   switch (msg) {
		   case WiFi.gotIP:
				trace(`IP address ${Net.get("IP")}\n`);
				monitor.close();

				LoadMod.load("example");
				break;

			case WiFi.connected:
				trace(`Wi-Fi connected to "${Net.get("SSID")}"\n`);
				break;

			case WiFi.disconnected:
				trace((-1 === code) ? "Wi-Fi password rejected\n" : "Wi-Fi disconnected\n");
				break;
		}
	});
}
