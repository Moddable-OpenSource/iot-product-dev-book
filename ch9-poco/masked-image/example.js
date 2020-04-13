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
import parseBMP from "commodetto/parseBMP";
import Timer from "timer";

let poco = new Poco(screen);

let image = parseBMP(new Resource("train-color.bmp"));
let mask = parseBMP(new Resource("mask_circle.bmp"));

let gray = poco.makeColor(128, 128, 128);
poco.begin();
poco.fillRectangle(gray, 0, 0, poco.width, poco.height);
poco.end();

let x = 30, y = 30;
let sx = image.width - mask.width;
let step = 2;

Timer.repeat(function() {
	poco.begin(x, y, mask.width, mask.height);
		poco.fillRectangle(gray, x, y, mask.width, mask.height);
		poco.drawMasked(image, x, y, sx, 0, mask.width, mask.height, mask, 0, 0);
	poco.end();

	sx -= step;
	if (sx <= 0)
		sx = image.width - mask.width;
}, 16);
