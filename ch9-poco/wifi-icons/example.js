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

let poco = new Poco(screen);
let black = poco.makeColor(0, 0, 0);
let white = poco.makeColor(255, 255, 255);

let mask = parseBMP(new Resource("wifi-strip-alpha.bmp"));

poco.begin();
	poco.fillRectangle(white, 0, 0, poco.width, poco.height);
	poco.drawGray(mask, black, 10, 20, 0, 0, 27, 27);    // top left
	poco.drawGray(mask, black, 37, 20, 0, 27, 27, 27);   // bottom left
	poco.drawGray(mask, black, 10, 47, 112, 0, 27, 27);  // top right
	poco.drawGray(mask, black, 37, 47, 112, 27, 27, 27); // bottom right
poco.end();
