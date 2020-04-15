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
#include "stdint.h"
#include "stdlib.h"
#include "mc.xs.h"			// for xsID_ values

void xs_bitarray_constructor(xsMachine *the)
{
	int bitCount = xsmcToInteger(xsArg(0));
	int byteCount = (bitCount + 7) / 8;
	uint8_t *bytes = calloc(byteCount + sizeof(int), 1);
	if (!bytes)
		xsUnknownError("no memory");
	
	*(int *)bytes = bitCount;
	xsmcSetHostData(xsThis, bytes);
}

void xs_bitarray_destructor(void *data)
{
	if (data)
		free(data);
}

void xs_bitarray_close(xsMachine *the)
{
	uint8_t *buffer = xsmcGetHostData(xsThis);
	xs_bitarray_destructor(buffer);
	xsmcSetHostData(xsThis, NULL);
}

void xs_bitarray_set(xsMachine *the)
{
	int index = xsmcToInteger(xsArg(0));
	int byteIndex = index >> 3;
	int bitIndex = index & 0x07;

	uint8_t *buffer = xsmcGetHostData(xsThis);
	if (NULL == buffer)
		xsUnknownError("closed");

	int bitCount = *(int *)buffer;
	buffer += sizeof(int);
	if ((index >= bitCount) || (index < 0))
		xsRangeError("invalid bit index");

	int value = xsmcToInteger(xsArg(1));
	if (value)
		buffer[byteIndex] |= 1 << bitIndex;
	else
		buffer[byteIndex] &= ~(1 << bitIndex);
}

void xs_bitarray_get(xsMachine *the)
{
	int index = xsmcToInteger(xsArg(0));
	int byteIndex = index >> 3;
	int bitIndex = index & 0x07;

	uint8_t *buffer = xsmcGetHostData(xsThis);
	if (NULL == buffer)
		xsUnknownError("closed");

	int bitCount = *(int *)buffer;
	buffer += sizeof(int);
	if ((index >= bitCount) || (index < 0))
		xsRangeError("invalid bit index");

	if (buffer[byteIndex] & (1 << bitIndex))
		xsmcSetInteger(xsResult, 1);
	else
		xsmcSetInteger(xsResult, 0);
}

void xs_bitarray_get_length(xsMachine *the)
{
	uint8_t *buffer = xsmcGetHostData(xsThis);
	if (NULL == buffer)
		xsUnknownError("closed");

	int bitCount = *(int *)buffer;
	xsmcSetInteger(xsResult, bitCount);
}
