# Corrigendum

This document lists errors discovered after the publication of the book. If you find an error that is not listed here, please  [open an issue](https://github.com/Moddable-OpenSource/iot-product-dev-book/issues) in this repository.

***

### Page 152

Listing 3-15 does not match the [`https-get` example](./ch3-network/https-get). The listing leaves out the `port` property in the dictionary passed to the `Request` constructor; it should be as follows:

```js
let request = new Request({
	host: "www.example.com",
	path: "/",
	response: String,
	Socket: SecureSocket,
	port: 443
});
```

***

### Page 159

Listing 3-21 returns `String` for the `Server.status` message instead of the `Server.headersComplete` message. The full corrected listing is as follows:

```
let server = new Server;

server.callback = function(msg, value, etc) {
	switch (msg) {
		case Server.status:
			if ("PUT" !== etc)
				this.close();
			return;

		case Server.headersComplete:
			return String;

		case Server.requestComplete:
			this.json = {
				error: "none",
				when: (new Date).toString(),
				request: JSON.parse(value)
			};
			break;

		case Server.prepareResponse:
			return {
				headers: ["Content-Type", "application/json"],
				body: JSON.stringify(this.json)
			};
	}
}
```


***

### Page 160-161

> To ask the HTTP `Server` class to deliver the request body in fragments, the callback returns `true` to the `prepareRequest` message. 
 
This sentence is incorrect. The callback returns true to the `headersComplete` message, not the `prepareRequest` message.

In addition, Listing 3-22 does not match the [`https-server-streaming-put` example](./ch3-network/http-server-streaming-put). The listing uses quotation marks instead of backticks in the first trace statement and the `prepareRequest` message instead of the `headersComplete` message; it should be as follows:

```js
let server = new Server;

server.callback = function(msg, value) {
	switch (msg) {
		case Server.status:
			trace(`\n ** begin upload to ${value} **\n`);
			break;

		case Server.headersComplete:		// prepare for request body
			return true;					// provide request body in fragments

		case Server.requestFragment:
			trace(this.read(String));
			break;

		case Server.requestComplete:
			trace("\n ** end of file **\n");
			break;
	}
}
```

***

### Page 193-200

The **Creating Two-Way Communication** section explains how to use the Bluefruit mobile app to create a peripheral. However, the Bluefruit mobile app no longer has the **Peripheral Mode** feature described in the text, so the instructions in this section are no longer valid.

The [`text-server` example](./ch4-ble/text-server) may be used as a replacement  if you have a second ESP32 device. To use this example, follow these steps:

- Connect one of your ESP32 devices to your computer with a USB cable.

- Install the `text-server` example on the ESP32 using `mcconfig`.

	```text
	cd $EXAMPLES/ch4-ble/text-server
	mcconfig -m -p esp32
	```

- Disconnect the first ESP32 and connect the other ESP32.

- Install the `text-client` example as described in the book.

- Connect the first ESP32 to a power source.

The devices will automatically pair, and the `text-client` will subscribe to notifications from the `text-server` as described. However, instead of typing in messages and manually sending them from your phone, the `text-server` app will automatically sends a message every second.

***

### Page 266

The **Monitoring for Changes** section does not provide the import statement for the `Monitor` class used in Listing 6-5.

```js
import Monitor from "pins/digital/monitor";
```

***

### Page 338

> Figure 8-8 shows the same circle mask drawn in blue (which appears gray in printed versions of this book).

The comment in parentheses is incorrect. The book is published in color, though it was planned to be published in grayscale.
