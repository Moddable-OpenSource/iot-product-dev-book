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
import {IOCapability} from "sm";

class HeartRateService extends BLEServer {
	onReady() {
		this.deviceName = "Heart Rate Monitor";
		this.securityParameters = { 
			bonding: true, 
			mitm: true, 
			ioCapability: IOCapability.DisplayOnly 
		};
		this.onDisconnected();
		this.battery = 100;
	}
	onPasskeyDisplay(params) {
		let passkey = this.passkeyToString(params.passkey);
		trace(`server display passkey: ${passkey}\n`);
	}
	onAuthenticated() {
		this.authenticated = true;
	}
	passkeyToString(passkey) {
		return passkey.toString().padStart(6, "0");
	}
	onConnected() {
		this.stopAdvertising();
	}
	onDisconnected() {
		this.stopMeasurements();
		this.startAdvertising({
			advertisingData: {
				flags: 6, 
				completeName: this.deviceName, 
				completeUUID16List: [uuid`180D`, uuid`180F`]
			}
		});
	}
	onCharacteristicNotifyEnabled(characteristic) {
		if (this.authenticated) {
			this.bump = +1;
			this.timer = Timer.repeat(id => {
				this.notifyValue(characteristic, this.bpm);
				this.bpm[1] += this.bump;
				if (this.bpm[1] === 65) {
					this.bump = -1;
					this.bpm[1] = 64;
				}
				else if (this.bpm[1] === 55) {
					this.bump = +1;
					this.bpm[1] = 56;
				}
			}, 1000);
		}
	}
	onCharacteristicNotifyDisabled(characteristic) {
		this.stopMeasurements();
	}
	onCharacteristicRead(params) {
		if (params.name === "battery") {
			if (this.battery == 0) this.battery = 100;
			return this.battery--;
		}
	}
	stopMeasurements() {
		if (this.timer) {
			Timer.clear(this.timer);
			delete this.timer;
		}
		this.bpm = [0, 60]; // flags, beats per minute
	}
}

let hrs = new HeartRateService;



