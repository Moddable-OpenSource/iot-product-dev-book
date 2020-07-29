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

import BLEServer from "bleserver";
import {uuid} from "btutils";
import Timer from "timer";

const SERVICE_UUID = uuid`6E400001B5A3F393E0A9E50E24DCCA9E`;

const strings = [
	"Hello",
	"World"
]

class TextServer extends BLEServer {
	onReady() {
		this.deviceName = "esp";
		this.onDisconnected();
	}
	onConnected() {
		this.stopAdvertising();
	}
	onDisconnected() {
		this.startAdvertising({
			advertisingData: {
				flags: 6, 
				completeName: this.deviceName, 
				completeUUID128List: [SERVICE_UUID]
			}
		});
	}
	onCharacteristicNotifyEnabled(characteristic) {
		let index = 0;
	    this.timer = Timer.repeat(id => {
	    	this.text = strings[index];
	        this.notifyValue(characteristic, this.text);
	        index++;
	        if (index == strings.length)
	            index = 0;
	    }, 1000);
	}
	onCharacteristicNotifyDisabled(characteristic) {
		if (this.timer) {
			Timer.clear(this.timer);
			delete this.timer;
		}
	}
}

let server = new TextServer;
