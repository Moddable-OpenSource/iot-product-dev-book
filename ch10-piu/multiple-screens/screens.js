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

import ASSETS from "assets";
import Timeline from "piu/Timeline";

class SplashScreenBehavior extends Behavior {
	onCreate(container, data) {
		this.data = data;
	}
	onDisplaying(container) {
		let data = this.data;
		let timeline = this.timeline = new Timeline();
		// Fade in
		timeline.from(data["LOGO1"], { state: 1, y: 10 }, 400, Math.quadEaseOut, 0);
		timeline.from(data["LOGO2"], { state: 1, y: 10 }, 300, Math.quadEaseOut, -300);
		timeline.from(data["LOGO3"], { state: 1, y: 10 }, 200, Math.quadEaseOut, -200);
		timeline.from(data["TITLE"], { state: 1 }, 600, Math.quadEaseOut, -200);
		// Fade out
		timeline.to(data["LOGO1"], { state: 1 }, 250, Math.quadEaseOut, 1500);
		timeline.to(data["LOGO2"], { state: 1 }, 250, Math.quadEaseOut, -250);
		timeline.to(data["LOGO3"], { state: 1 }, 250, Math.quadEaseOut, -250);
		timeline.to(data["TITLE"], { state: 1 }, 250, Math.quadEaseOut, -250);
		timeline.seekTo(0);
		container.duration = timeline.duration;
		container.time = 0;
		container.start();
	}
	onTimeChanged(container) {
		this.timeline.seekTo(container.time);
	}
	onFinished(container) {
		let data = this.data;
		// Remove references to content objects
		delete data["LOGO1"];
		delete data["LOGO2"];
		delete data["LOGO3"];
		delete data["TITLE"];
		// Transition to next screen
		container.bubble("switchScreen", "HOME");
	}
}

const SplashScreen = Container.template($ => ({
	top: 0, bottom: 0, left: 0, right: 0, 
	skin: ASSETS.backgroundSkin,
	contents: [
		Content($, { 
			anchor: "LOGO1", 
			top: 30, 
			skin: ASSETS.logoSkin1 
		}),
		Content($, { 
			anchor: "LOGO2", 
			top: 30, 
			skin: ASSETS.logoSkin2 
		}),
		Content($, { 
			anchor: "LOGO3", 
			top: 30, 
			skin: ASSETS.logoSkin3 
		}),
		Label($, { 
			anchor: "TITLE", 
			top: 155, 
			style: ASSETS.bigTextStyle, 
			string: "lorem ipsum" 
		})
	],
	Behavior: SplashScreenBehavior
}));


class RestartButtonBehavior extends Behavior {
	onTouchEnded(content) {
		content.container.delegate("animateOut");
	}
}

class HomeScreenBehavior extends Behavior {
	onCreate(container, data) {
		this.data = data;
	}
	onDisplaying(container) {
		let data = this.data;
		let timeline = this.timeline = new Timeline();
		timeline.from(data["ICON"], { x: -data["ICON"].width }, 350, Math.quadEaseOut, 0);
		timeline.from(data["TEXT"], { x: 320 }, 350, Math.quadEaseOut, -350);
		timeline.seekTo(0);
		container.duration = timeline.duration;
		container.time = 0;
		container.start();
	}
	animateOut(container) {
		let data = this.data;
		this.transitioningOut = true;
		let timeline = this.timeline = new Timeline();
		timeline.to(data["ICON"], { x: -data["ICON"].width }, 350, Math.quadEaseOut, 0);
		timeline.to(data["TEXT"], { x: 320 }, 350, Math.quadEaseOut, -350);
		container.duration = timeline.duration;
		container.time = 0;
		container.start();
	}
	onTimeChanged(container) {
		this.timeline.seekTo(container.time);
	}
	onFinished(container) {
		if (this.transitioningOut) {
			let data = this.data;
			// Remove references to content objects
			delete data["ICON"];
			delete data["TEXT"];
			// Transition to next screen
			container.bubble("switchScreen", "SPLASH");
		} 
		else
			delete this.timeline;
	}
}

const HomeScreen = Row.template($ => ({
	top: 0, bottom: 0, left: 0, right: 0, 
	skin: ASSETS.backgroundSkin,
	contents: [
		Content($, { 
			left: 0, right: 0 
		}),
		Container($, {
			anchor: "ICON", 
			skin: ASSETS.buttonBackgroundSkin,
			contents: [
				Content($, { 
					skin: ASSETS.restartArrowSkin 
				})
			],
			active: true, 
			Behavior: RestartButtonBehavior
		}),
		Label($, {
			anchor: "TEXT", 
			left: 10, 
			style: ASSETS.bigTextStyle, 
			string: "Restart"
		}),
		Content($, { 
			left: 0, right: 0 
		})
	],
	Behavior: HomeScreenBehavior
}));

export default {
	SplashScreen,
	HomeScreen
}