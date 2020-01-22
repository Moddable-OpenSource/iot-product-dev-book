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
 
import {} from "piu/MC"
import LoadMod from "loadmod";

const textStyle = new Style({
    font: "24px Open Sans",
    color: "black"
});
const readyText = new Label(null, { 
	top: 20, bottom: 20, left: 20, right: 20, 
	style: textStyle, string: "Ready to install apps!"
});

class AppBehavior extends Behavior {
	onCreate(app) {
		if (LoadMod.has("check")) {
			let check = LoadMod.load("check");
			check();
			if (LoadMod.has("example"))
				LoadMod.load("example");
		} else {
			app.add(readyText);
		}
	}
}

export default new Application(null, {
	displayListLength: 8192,
	commandListLength: 4096,
	skin: new Skin({
		fill: "white"
	}),
	Behavior: AppBehavior
});