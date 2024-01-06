# dp_react_native

Rozbehanie simulatora

ngrok tcp 35005  
ngrok                                                                                                   (Ctrl+C to quit)                                                                                                                        Build better APIs with ngrok. Early access: ngrok.com/early-access                                                                                                                                                                              Session Status                online                                                                                    Account                       martinusX (Plan: Free)                                                                    Update                        update available (version 3.5.0, Ctrl-U to update)                                        Version                       3.3.5                                                                                     Region                        Europe (eu)                                                                               Latency                       13ms                                                                                      Web Interface                 http://127.0.0.1:4040                                                                     Forwarding                    tcp://0.tcp.eu.ngrok.io:17545 -> localhost:35005                                                                                                                                                                  Connections                   ttl     opn     rt1     rt5     p50     p90                                                                             0       0       0.00    0.00    0.00    0.00

python -m elm -s car -n 35005

function readFromEmulator() {
return new Promise((resolve, reject) => {
console.log('Attempting to connect to the emulator...');

    // Create a TCP connection to the emulator
    const client = TcpSocket.createConnection(
      {
        host: '7.tcp.eu.ngrok.io', // Corrected hostname without 'tcp://'
        port: 18329, // Corrected to the ngrok forwarded port
      },
      () => {
        console.log('Connected to the emulator');

        // Send OBD-II command for vehicle speed
        client.write('010D\r');
      },
    );

    client.on('data', data => {
      console.log('Received data:', data.toString());
      parseAndPrintSpeed(data.toString());
      resolve(data.toString());
      client.destroy(); // Close the connection
    });

    client.on('error', error => {
      console.error('Connection error:', error);
      reject(error);
    });

    client.on('close', () => {
      console.log('Connection closed');
    });
});
}
Musis byt exportovany cez ngrok nasledne pouzivas tcp protokol na komunikaciu
