import {Server} from "http";
import Resource from "Resource";

let data = new Resource("mydata.dat");

let server = new Server();
server.callback = function(message, value, etc) {
	switch (message) {
		case Server.prepareResponse:
			return {headers: ["Content-type", "text/html"], body: data};
	}
}