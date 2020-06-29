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

import Timer from "timer";
import FT6206 from "ft6206";

let touch = new FT6206;
touch.points = [{}];

Timer.repeat(function() {
	let points = touch.points;
	let point = points[0];
	touch.read(points);
	switch (point.state) {
		case 0:
			trace("no touch\n");
			break;
		case 1:
			trace("touch begin @ ${point.x}, ${point.y}\n");
			break;
		case 2:
			trace("touch continue @ ${point.x}, ${point.y}\n");
			break;
		case 3:
			trace("touch end @ ${point.x}, ${point.y}\n");
			break;
	}
}, 33);
