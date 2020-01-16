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
	font: "24px Open Sans" 
});

class LabelBehavior  extends Behavior {
	onTouchBegan(label) {
		const message = label.message;
		label.string = message.substring(0, label.string.length + 1);
		if (label.string === message) 
			label.active = false;
	}
}

const sampleLabel = new Label(null, { 
	top: 0, bottom: 0, left: 0, right: 0, 
	style: textStyle,
	string: "",
	active: true,
	Behavior: LabelBehavior
});
sampleLabel.message = "Hello, World";

application.add(sampleLabel);
