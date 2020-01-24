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

let best;

WiFi.scan({}, accessPoint => {
	if (!accessPoint) {
		if (!best) {
			trace("no open access points found\n");
			return;
		}
		trace(`connecting to ${best.ssid}\n`);
		WiFi.connect({ssid: best.ssid});
		return;
	}

	if ("none" != accessPoint.authentication)
		return;	// not open
	
	if (!best) {
		best = accessPoint; // first open access point found
		return;
	}

	if (best.rssi < accessPoint.rssi)
		best = accessPoint; // new best
});