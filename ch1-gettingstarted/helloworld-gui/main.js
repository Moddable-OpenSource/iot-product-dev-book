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

import parseBMF from "commodetto/parseBMF";
import Poco from "commodetto/Poco";
import Resource from "Resource";

let render = new Poco(screen, { displayListLength: 2048 });

let black = render.makeColor(0, 0, 0);
let white = render.makeColor(255, 255, 255);

let font = parseBMF(new Resource("OpenSans-Regular-24.bf4"));
let text = "Hello, World";

render.begin();
	render.fillRectangle(white, 0, 0, render.width, render.height);
	render.drawText(text, font, black,
    	(render.width - render.getTextWidth(text, font)) >> 1,
    	(render.height - font.height) >> 1);
render.end();
