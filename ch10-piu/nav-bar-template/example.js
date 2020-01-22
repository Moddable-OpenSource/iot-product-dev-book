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
	font: "semibold 16px Open Sans", 
	color: "black", 
	top: 5, bottom: 5 
});

const clockTexture = new Texture({ 
	path: "clock.png" 
});

const clockSkin = new Skin({ 
	texture: clockTexture, 
	width: 56, height: 56,
	color: "#2eb335",
});

const settingsTexture = new Texture({ 
	path: "settings.png" 
});

const settingsSkin = new Skin({ 
	texture: settingsTexture, 
	width: 56, height: 56,
	color: "#3474eb",
});

const sunTexture = new Texture({ 
	path: "sun.png" 
});

const sunSkin = new Skin({ 
	texture: sunTexture, 
	width: 56, height: 56,
	color: "#fcca4c",
});

const outlineSkin = new Skin({
	fill: "transparent",
	stroke: "#dedede", 
	borders: { left: 2, right: 2, top: 2, bottom: 2 }
});

const Button = Column.template($ => ({
	skin: outlineSkin,
	width: 80,
	contents: [
		Content(null, {
			top: 5,
			skin: $.skin
		}),
		Label(null, {
			top: 0,
			style: textStyle,
			string: $.string
		})
	]
}));

const settingsButton = new Button({
	skin: settingsSkin,
	string: "Settings"
});

const weatherButton = new Button({ 
	skin: sunSkin, 
	string: "Weather" 
});

const timeButton = new Button({ 
	skin: clockSkin, 
	string: "Time" 
});

const navBar = new Row(null, {
	left: 0, right: 0,
	contents: [
		Content(null, {left: 0, right: 0}),
		settingsButton, 
		Content(null, {left: 0, right: 0}),
		weatherButton, 
		Content(null, {left: 0, right: 0}),
		timeButton,
		Content(null, {left: 0, right: 0})
	]
});

application.add(navBar);