#include "xsAll.h"
#include "xs.h"

void xs_loadmod_has(xsMachine *the)
{
	char name[128];

	xsToStringBuffer(xsArg(0), name, sizeof(name));
	xsResult = xsAwaitImport(name, XS_IMPORT_DEFAULT | XS_IMPORT_PREFLIGHT);
}

void xs_loadmod_load(xsMachine *the)
{
	char name[128];

	xsToStringBuffer(xsArg(0), name, sizeof(name));
	xsResult = xsAwaitImport(name, XS_IMPORT_DEFAULT);
}
