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

const textStyle = new Style({ 
	font: "24px Open Sans", 
	color: "white" 
});

const headerSkin = new Skin({ 
	fill: "#1932ab" 
});

const jsLogoTexture = new Texture({ 
	path: "js.png" 
});

const jsLogoSkin = new Skin({
	texture: jsLogoTexture,
	height: 40, width: 40
});

const jsLogo = new Content(null, { 
    left: 10,
    skin: jsLogoSkin
});

const headerText = new Label(null, {
    style: textStyle,
    string: "Example" 
});

const header = new Container(null, {
    top: 0, height: 50, left: 0, right: 0,
    skin: headerSkin,
    contents: [
        jsLogo,
        headerText
    ]
});

application.add(header);