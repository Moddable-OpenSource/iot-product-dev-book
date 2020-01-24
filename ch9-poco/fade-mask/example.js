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
import Resource from "Resource";
import Timer from "timer";
import parseRLE from "commodetto/parseRLE";

let poco = new Poco(screen);
poco.begin();
	drawBars(poco);
poco.end();

let mask = parseRLE(new Resource("mask-alpha.bm4"));
let maskBlend = 0;
let blendStep = 4;
let maskColor = poco.makeColor(0, 0, 255);
Timer.repeat(function() {
	let y = (poco.height / 4) - (mask.height / 2);
	poco.begin(30, y, mask.width, mask.height);
	drawBars(poco);
	poco.drawGray(mask, maskColor, 30, y, 0, 0, mask.width, mask.height, maskBlend);
	poco.end();

	maskBlend += blendStep;
	if (maskBlend > 255)
		maskBlend = 0;
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
