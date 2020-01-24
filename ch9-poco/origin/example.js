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
let white = poco.makeColor(255, 255, 255);
let yellow = poco.makeColor(255, 255, 0);
poco.begin();
	poco.fillRectangle(white, 0, 0, poco.width, poco.height);

	drawFrame();
	poco.origin(20, 20);
	drawFrame();
	poco.origin(20, 20);
	drawFrame();
	poco.origin();
	poco.origin();
	poco.origin(0, 65);
	drawFrame();
	poco.origin();
poco.end();

function drawFrame() {
	poco.fillRectangle(black, 0, 0, 40, 40);
	poco.fillRectangle(yellow, 4, 4, 32, 32);
}
