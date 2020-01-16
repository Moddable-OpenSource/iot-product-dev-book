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

const jsLogoTexture = new Texture({
	path: "js.png"
});

const jsLogoSkin = new Skin({
	texture: jsLogoTexture,
	height: 100, width: 100
});

const jsLogo = new Content(null, { 
	skin: jsLogoSkin
});

application.add(jsLogo);