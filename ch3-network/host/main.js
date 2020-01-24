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

export default function () {
	if (!LoadMod.has("check") || !LoadMod.has("example"))
		return trace("Host installed. Ready for mods.\n");

	(LoadMod.load("check"))();

	if (LoadMod.has("mod/config")) {
		const config = LoadMod.load("mod/config");
		if (config.ssid) {
			WiFi.mode = 1;

			let monitor = new WiFi({ssid: config.ssid, password: config.password}, function(msg, code) {
			   switch (msg) {
				   case "gotIP":
						trace(`IP address ${Net.get("IP")}\n`);
						monitor.close();

						LoadMod.load("example");
						break;

					case "connect":
						trace(`Wi-Fi connected to "${Net.get("SSID")}"\n`);
						break;

					case "disconnect":
						trace((-1 === code) ? "Wi-Fi password rejected\n" : "Wi-Fi disconnected\n");
						break;
				}
			});
			return;
		}
	}

	LoadMod.load("example");
}
