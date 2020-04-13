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
import JPEG from "commodetto/readJPEG";
import Resource from "Resource";

let poco = new Poco(screen);
let jpeg = new JPEG(new Resource("harvard.jpg"));
while (jpeg.ready) {
	let block = jpeg.read();
	poco.begin(block.x, block.y, block.width, block.height);
		poco.drawBitmap(block, block.x, block.y);
	poco.end();
}
