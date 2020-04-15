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

#include "xsmc.h"
#include "mc.xs.h"			// for xsID_ values
#include "xsHost.h"
#include "modTimer.h"

#if ESP32
	#include "esp_wifi.h"
#endif

typedef struct RSSINotifyRecord RSSINotifyRecord;
typedef struct RSSINotifyRecord *RSSINotify;

enum {
	kRSSIUnknown,
	kRSSIWeak,
	kRSSIStrong,
};

struct RSSINotifyRecord {
	int 		threshold;
	int 		state;
	modTimer	timer;
	xsMachine	*the;
	xsSlot		obj;
};

static void checkRSSI(modTimer timer, void *refcon, int refconSize);

void xs_wifirssinotify_constructor(xsMachine *the)
{
	RSSINotify rn = calloc(sizeof(RSSINotifyRecord), 1);
	if (!rn)
		xsUnknownError("no memory");

	rn->state = kRSSIUnknown;
	rn->obj = xsThis;
	rn->the = the;

	xsTry {
		int poll;

		xsmcVars(1);

		if (xsmcHas(xsArg(0), xsID_poll)) {
			xsmcGet(xsVar(0), xsArg(0), xsID_poll);
			poll = xsmcToInteger(xsVar(0));
		}
		else
			poll = 5000;

		if (!xsmcHas(xsArg(0), xsID_threshold))
			xsUnknownError("threshold required");
		xsmcGet(xsVar(0), xsArg(0), xsID_threshold);
		rn->threshold = xsmcToInteger(xsVar(0));

		rn->timer = modTimerAdd(1, poll, checkRSSI, &rn, sizeof(rn));
		if (!rn->timer)
			xsUnknownError("no timer");
	}
	xsCatch {
		free(rn);
		xsThrow(xsException);
	}

	xsmcSetHostData(xsThis, rn);
	xsRemember(rn->obj);
}

void xs_wifirssinotify_destructor(void *data)
{
	RSSINotify rn = data;
	if (rn) {
		modTimerRemove(rn->timer);
		free(rn);
	}
}

void xs_wifirssinotify_close(xsMachine *the)
{
	RSSINotify rn = xsmcGetHostData(xsThis);
	if (rn) {
		xsForget(rn->obj);
		xs_wifirssinotify_destructor(rn);
		xsmcSetHostData(xsThis, NULL);
	}
}

void checkRSSI(modTimer timer, void *refcon, int refconSize)
{
	RSSINotify rn = *(RSSINotify *)refcon;
	int rssi = 0;
	xsIndex callbackID;

#if ESP32
	wifi_ap_record_t config;

	if (ESP_OK == esp_wifi_sta_get_ap_info(&config))
		rssi = config.rssi;
#elif defined(__ets__)
	rssi = wifi_station_get_rssi();
#else
	#error Unsupported target
#endif
	xsBeginHost(rn->the);
		xsLog("rssi %d\n", rssi);
	xsEndHost(rn->the);

	if (rssi > rn->threshold) {
		if (kRSSIStrong == rn->state)
			return;
		rn->state = kRSSIStrong;
		callbackID = xsID_onStrongSignal;
	}
	else {
		if (kRSSIWeak == rn->state)
			return;
		rn->state = kRSSIWeak;
		callbackID = xsID_onWeakSignal;
	}

	xsBeginHost(rn->the);
		xsmcVars(1);
		xsmcSetInteger(xsVar(0), rssi);
		if (xsmcHas(rn->obj, callbackID))
			xsCall1(rn->obj, callbackID, xsVar(0));
	xsEndHost(rn->the);
}
