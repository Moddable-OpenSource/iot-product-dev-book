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

### Page 338

> Figure 8-8 shows the same circle mask drawn in blue (which appears gray in printed versions of this book).

The comment in parentheses is incorrect. The book is published in color, though it was planned to be published in grayscale.
