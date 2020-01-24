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
poco.begin();
	drawBars(poco);
poco.end();

let boxSize = 30;
let boxBlend = 64;
let boxStep = 2;
let boxColor = poco.makeColor(0, 0, 0);
let x = (poco.width - boxSize) / 2, y = 0;
Timer.repeat(function() {
	poco.begin(x, y - boxStep, boxSize, boxSize + boxStep * 2);
	drawBars(poco);
	poco.blendRectangle(boxColor, boxBlend, x, y, boxSize, boxSize);
	poco.end();

	y += boxStep;
	if (y >= poco.height)
		y = 0;
}, 16);

function drawBars(poco) {
	let w = poco.width;
	let h = poco.height / 4;
	poco.fillRectangle(poco.makeColor(255, 255, 255),
		0, 0, w, h);
	poco.fillRectangle(poco.makeColor(255, 0, 0),
		0, h, w, h);
	poco.fillRectangle(poco.makeColor(0, 255, 0),
		0, h * 2, w, h);
	poco.fillRectangle(poco.makeColor(0, 0, 255),
		0, h * 3, w, h);
}
