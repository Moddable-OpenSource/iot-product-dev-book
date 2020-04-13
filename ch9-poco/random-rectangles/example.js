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

import Poco from "commodetto/Poco";
import Timer from "timer";

let poco = new Poco(screen);
let black = poco.makeColor(0, 0, 0);
poco.begin();
	poco.fillRectangle(black, 0, 0, poco.width, poco.height);
poco.end();

Timer.repeat(function() {
	let x = Math.random() * poco.width;
	let y = Math.random() * poco.height;
	let width = (Math.random() * 50) + 5;
	let height = (Math.random() * 50) + 5;
	let color = poco.makeColor(255 * Math.random(),
				255 * Math.random(), 255 * Math.random());
	poco.begin(x, y, width, height);
		poco.fillRectangle(color, 0, 0, poco.width, poco.height);
	poco.end();
}, 16);