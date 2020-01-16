import LoadMod from "loadmod";

export default function () {
	if (LoadMod.has("check")) {
		let check = LoadMod.load("check");
		check();
		if (LoadMod.has("example"))
			LoadMod.load("example");
	} else {
		trace("Device flashed. Ready to install apps.\n");
	}
}