import Flash from "flash";

let partition = new Flash("storage");

const SIGNATURE = 0xa82aa82a;

let signature = partition.read(0, 4);
signature = (new Uint32Array(signature))[0];
if (signature !== SIGNATURE)
	initialize(partition);


function initialize(partition) {
	let signature = Uint32Array.of(SIGNATURE);

	partition.erase(0);
	partition.write(0, 4, signature.buffer);
}

function write(partition, newValue) {
	for (let i = 1; i < 1024; i++) {
		let currentValue = partition.read(i * 4, 4);
		currentValue = (new Uint32Array(currentValue))[0];
		if (0xFFFFFFFF === currentValue) {
			partition.write(i * 4, 4, Uint32Array.of(newValue).buffer);
			return;
		}
	}
	initialize(partition);
	partition.write(4, 4, Uint32Array.of(newValue).buffer);
}

function read(partition) {
	let i;

	for (i = 1; i < 1024; i++) {
		let currentValue = partition.read(i * 4, 4);
		currentValue = (new Uint32Array(currentValue))[0];
		if (0xFFFFFFFF === currentValue)
			break;
	}

	let result = partition.read((i - 1) * 4, 4);
	return (new Uint32Array(result))[0];
}