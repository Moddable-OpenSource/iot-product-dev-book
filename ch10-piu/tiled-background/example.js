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
 
const tileTexture = new Texture({
	path: "tile.png"
});

const tileSkin = new Skin({
	texture: tileTexture,
	height: 50, width: 50,
	tiles: {
		left: 0, right: 0, top: 0, bottom: 0
	}
});

const background = new Content(null, { 
	left: 0, right: 0, top: 0, bottom: 0,
	skin: tileSkin
});

application.add(background);