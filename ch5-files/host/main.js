/*
 * Copyright (c) 2016-2023 Moddable Tech, Inc.
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

import Modules from "modules";

export default function () {
	if (!Modules.has("check") || !Modules.has("example"))
		return trace("Host installed. Ready for mods.\n");

	(Modules.importNow("check"))();

	if (Modules.has("wifi") && Modules.has("net") && Modules.has("mod/config")) {
		const WiFi = Modules.importNow("wifi");
		const Net = Modules.importNow("net");
		const config = Modules.importNow("mod/config");
		if (config.ssid) {
			trace(`Wi-Fi trying to connect to "${config.ssid}"\n`);

			WiFi.mode = 1;

			let monitor = new WiFi({ssid: config.ssid, password: config.password}, function(msg, code) {
			   switch (msg) {
				   case WiFi.gotIP:
						trace(`IP address ${Net.get("IP")}\n`);
						monitor.close();

						Modules.importNow("example");
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

	Modules.importNow("example");
}
