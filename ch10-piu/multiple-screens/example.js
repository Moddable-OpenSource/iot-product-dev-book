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

 import SCREENS from "screens";

 class MainContainerBehavior extends Behavior {
 	onCreate(container, data) {
 		this.data = data;
 	}
 	onDisplaying(container) {
 		this.switchScreen(container, "SPLASH");
 	}
 	switchScreen(container, nextScreenName) {
 		container.defer("doSwitchScreen", nextScreenName);
 	}
 	doSwitchScreen(container, nextScreenName) {
 		container.empty();
 		application.purge();
 		switch (nextScreenName) {
 			case "SPLASH":
 				container.add(new SCREENS.SplashScreen(this.data));
 				break;
 			case "HOME":
 				container.add(new SCREENS.HomeScreen(this.data));
 				break;
 		}
 	}
 }

const MainContainer = Container.template($ => ({
	top: 0, bottom: 0, left: 0, right: 0,
	 Behavior: MainContainerBehavior
}));

application.add(new MainContainer({}));
