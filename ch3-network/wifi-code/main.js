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

let wifiMonitor = new WiFi({
        ssid: "my wi-fi",
        password: "secret"
    },
    function(msg) {
        switch (msg) {
            case WiFi.gotIP:
                trace("network ready\n");
                break;

            case WiFi.connected:
                trace("connected\n");
                break;

            case WiFi.disconnected:
                trace("connection lost\n");
                break;
		}
	}
);
