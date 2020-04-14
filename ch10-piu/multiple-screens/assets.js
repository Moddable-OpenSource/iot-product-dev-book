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

const TRANSPARENT = "transparent";
const BLACK = "black";
const WHITE = "white";

const backgroundSkin = new Skin({ 
	fill: BLACK 
});

const bigTextStyle = new Style({ 
	font: "24px Open Sans", 
	color: [WHITE, TRANSPARENT] 
});
const smallTextStyle = new Style({ 
	font: "semibold 16px Open Sans", 
	color: [WHITE, TRANSPARENT] 
});

const logoTexture1 = new Texture({ 
	path: "logo1.png" 
});
const logoSkin1 = new Skin({
	texture: logoTexture1,
	color: ["#9c2448af", TRANSPARENT],
	height: 117, width: 146
});

const logoTexture2 = new Texture({ 
	path: "logo2.png" 
});
const logoSkin2 = new Skin({
	texture: logoTexture2,
	color: ["#6F64E8af", TRANSPARENT],
	height: 117, width: 146
});

const logoTexture3 = new Texture({ 
	path: "logo3.png" 
});
const logoSkin3 = new Skin({
	texture: logoTexture3,
	color: ["#7AFFE7af", TRANSPARENT],
	height: 117, width: 146
});

const buttonBackgroundTexture = new Texture({ 
	path: "button-bkg.png" 
});
const buttonBackgroundSkin = new Skin({
	texture: buttonBackgroundTexture,
	color: "#9c2448af",
	height: 60, width: 60
});

const restartArrowTexture = new Texture({ 
	path: "restart-arrow.png" 
});
const restartArrowSkin = new Skin({
	texture: restartArrowTexture,
	color: [BLACK, TRANSPARENT],
	height: 31, width: 34
});

export default {
	bigTextStyle,
	smallTextStyle,
	backgroundSkin,
	logoSkin1,
	logoSkin2,
	logoSkin3,
	buttonBackgroundSkin,
	restartArrowSkin,
}