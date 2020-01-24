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
 
import BLEClient from "bleclient";
import {uuid} from "btutils";

const PERIPHERAL_NAME = 'esp';
const SERVICE_UUID = uuid`6E400001B5A3F393E0A9E50E24DCCA9E`;
const CHARACTERISTIC_UUID = uuid`6E400003B5A3F393E0A9E50E24DCCA9E`;

class TextClient extends BLEClient {
	onReady() {
		this.startScanning();
	}
	onDiscovered(device) {
		if (PERIPHERAL_NAME === device.scanResponse.completeName) {
			this.stopScanning();
			this.connect(device);
		}
	}
	onConnected(device) {
		device.discoverPrimaryService(SERVICE_UUID);
	}
	onServices(services) {
		let service = services.find(service => service.uuid.equals(SERVICE_UUID));
		if (service) {
			trace(`Found service\n`);
			service.discoverCharacteristic(CHARACTERISTIC_UUID);
		} else
			trace(`Service not found\n`);
	}
	onCharacteristics(characteristics) {
		let characteristic = characteristics.find(characteristic => characteristic.uuid.equals(CHARACTERISTIC_UUID));
		if (characteristic) {
			trace(`Enabling notifications\n`);
			characteristic.enableNotifications();
		} else
			trace(`Characteristic not found\n`);
	}
	onCharacteristicNotification(characteristic, buffer) {
		trace(String.fromArrayBuffer(buffer));
	}
}

let textClient = new TextClient;