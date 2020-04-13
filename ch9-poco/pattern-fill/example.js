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
import parseBMP from "commodetto/parseBMP";
import Resource from "Resource";
import Timer from "timer";

let poco = new Poco(screen);
let white = poco.makeColor(255, 255, 255);
poco.begin();
	poco.fillRectangle(white, 0, 0, poco.width, poco.height);
poco.end();

let tile = parseBMP(new Resource("tiles-color.bmp"));
let size = 30;
let x = 40, y = 50;
let phase = 0;
Timer.repeat(function() {
	poco.begin(x, y, size * 5, size * 5);
		poco.fillPattern(tile, x, y, size * 5, size * 5, phase * size, 0, size, size);
	poco.end();
	phase = (phase + 1) % 8;
}, 66);