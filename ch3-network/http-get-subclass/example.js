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

import {Request} from "http";

const APPID = "94de4cda19a2ba07d3fa6450eb80f091";

class WeatherRequest extends Request {
	constructor(zip, country) {
		super({
			host: "api.openweathermap.org",
			path: `/data/2.5/weather?appid=${APPID}&zip=${zip},${country}&units=imperial`,
			response: String
		});
	}
	callback(msg, value) {
		if (Request.responseComplete == msg) {
			value = JSON.parse(value, 
					["main", "name", "temp", "weather"]);
			this.onReceived({
				temperature: value.main.temp,
				condition: value.weather[0].main}
			);
		}
	}
}
	
let weather = new WeatherRequest(94025, "us");

weather.onReceived = function(result) {
	trace(`Temperature is ${result.temperature}\n`);
	trace(`Condition is ${result.condition}\n`);
}
