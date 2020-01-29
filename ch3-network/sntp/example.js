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

import SNTP from "sntp";
import Time from "time";

new SNTP({
		host: "pool.ntp.org"
	},
	function(msg, value) {
		if (SNTP.time !== msg) 
			return;

		Time.set(value);
		trace("UTC time now: ",
				(new Date).toUTCString(), "\n");
	}
);