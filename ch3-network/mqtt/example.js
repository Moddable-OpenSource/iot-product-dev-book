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

import MQTT from "mqtt";
import Net from "net";

let mqtt = new MQTT({
	host: "test.mosquitto.org",
	port: 1883,	
	id: "iot_" + Net.get("MAC")
})

mqtt.onReady = function () {
	trace("connection established\n");
	mqtt.subscribe("test/json");

	mqtt.publish("test/json", JSON.stringify({
		message: "hello",
		version: 1
	}));
}

mqtt.onMessage = function (topic, data) {
	trace(`received message on topic "${topic}"\n`);
	trace(`${String.fromArrayBuffer(data)}\n`);
}

mqtt.onClose = function() {
	trace("connection lost\n");
};
