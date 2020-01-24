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
import parseBMF from "commodetto/parseBMF";

let poco = new Poco(screen);

let regular16 = parseBMF(new Resource("OpenSans-Regular-16.bf4"));
let bold28 = parseBMF(new Resource("OpenSans-Semibold-28.bf4"));

let white = poco.makeColor(255, 255, 255);
let lightGray = poco.makeColor(192, 192, 192);
let blue = poco.makeColor(0, 0, 255);

poco.begin();
	poco.fillRectangle(white, 0, 0, poco.width, poco.height);

	let text = "Drop Shadow";
	poco.drawText(text, bold28, lightGray, 0 + 2, 100 + 2);
	poco.drawText(text, bold28, blue, 0, 100);
poco.end();
