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

const Square = Content.template($ => ({
	width: 80, height: 80,
	skin: new Skin({ fill: $ })
}));

const redSquare = new Square("red", { left: 20, top: 20 });
const yellowSquare = new Square("yellow");
const blueSquare = new Square("blue", { right: 20, bottom: 20 });

application.add(redSquare);
application.add(yellowSquare);
application.add(blueSquare);