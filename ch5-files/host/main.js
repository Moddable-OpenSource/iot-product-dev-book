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

import LoadMod from "modules";
import WiFi from "wifi";
import Net from "net";

export default function () {
	if (!LoadMod.has("check") || !LoadMod.has("example"))
		return trace("Host installed. Ready for mods.\n");

	(LoadMod.importNow("check"))();

	if (LoadMod.has("mod/config")) {
		const config = LoadMod.importNow("mod/config");
		if (config.ssid) {
			trace(`Wi-Fi trying to connect to "${config.ssid}"\n`);

			WiFi.mode = 1;

			let monitor = new WiFi({ssid: config.ssid, password: config.password}, function(msg, code) {
			   switch (msg) {
				   case WiFi.gotIP:
						trace(`IP address ${Net.get("IP")}\n`);
						monitor.close();

						LoadMod.importNow("example");
						break;

					case WiFi.connected:
						trace(`Wi-Fi connected to "${Net.get("SSID")}"\n`);
						break;

					case WiFi.disconnected:
						trace((-1 === code) ? "Wi-Fi password rejected\n" : "Wi-Fi disconnected\n");
						break;
				}
			});
			return;
		}
		if (config.wifi && !Net.get("SSID"))
			throw new Error(`This example requires Wi-Fi. When executing mcrun specify ssid and password.\n`);
	}

	LoadMod.importNow("example");
}
