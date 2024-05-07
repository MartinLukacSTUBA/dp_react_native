# Systém správy firemných vozidiel

**Tento projekt je diplomovým projektom inžinierskeho štúdia na FEI STU.**

Projekt sa skladá z dvoch častí

Frontend - React-Native: [GitHub Repository](https://github.com/MartinLukacSTUBA/dp_react_native)

Backend - Java Spring: [GitHub Repository](https://github.com/MartinLukacSTUBA/dp_spring_backend)

**Ide o Open-Source softvér, ktorý firmám umožňuje prevádzkovať vlastný firemný softvér pre Správu firemných vozidiel.**
_______________________________
Cieľom diplomovej práce bolo vyvinúť aplikáciu na monitorovanie a správu vozidiel. Aplikácia
by mala byť použiteľná pre mnoho firiem, ktoré majú firemnú flotilu vozidiel a
chceli by jednotlivé vozidlá monitorovať. V teoretickej časti diplomovej práce sme si opísali
protokol On board diagnostic 2, rôzne možnosti vývoja frontendovej časti aplikácie
a taktiež aj môžnosti vývoja serverovej časti aplikácie. Popísali sme si ako v súčastnej
dobe komunikujú aplikácie naprieč internetom, a predstavili sme si jednotlivé typy databáz.
V praktickej časti sme sa venovali vývoju aplikácie na frontendovej a serverovej
časti, taktiež sme vytvorili databázu aplikácie. V aplikácii je možné prihlásiť sa pomocou
jedinečného účtu zabezpečeného pomocou JWT tokenu. Používatelia aplikácie s rolou
Admin, dokážu vytvárať a meniť používateľské účty v aplikácii alebo vytvárať a meniť
vozidlá vo firemnej flotile, taktiež majú možnosť prezriet si všetky historické dáta jednotlivých
jázd. Používatelia aplikácie s rolou User, si vedia priradiť už existujúce vozidlá a
zaznamenávať parametre jednotlivých jázd, taktiež si vedia pozrieť históriu svojich jázd
s podrobnými parametrami. Všetky tieto údaje sú uložené v databáze, a používateľ si
ich môže kedykoľvek pozrieť. Pre vyhnutie sa problémom s neplatnými dokumentmi, ako
je Stav technickej kontroly, sme implementovali v aplikácii kontrolu stavu vozidiel. Ak
vozidlu čoskoro končí platnosť dokumentov, majiteľovi vozidla je zaslaný email o čoskorom
expirovaní platnosti dokumentov. Navrhnutá aplikácia je jednoducho nasaditeľná a
nakonfigurovateľná pre rôzne typy konektorov On Board Diagnostic 2. Implementovaním
v JavaScript knižnici Reac-Native je táto aplikácia kompatibilná pre operačné systémy
Android a iOS.

#### Kľúčové slová: OBD2, frontend, react-native, backend, framework spring, database

____________________________________
Využívané technológie pri vývoji serverovej časti:

- **JavaScript - React-Native**
- **Android Studio**
- **[GitHub Repository - Emulator OBD2 327](https://github.com/Ircama/ELM327-emulator)**
- **[Export  emulátora - NgRok](https://ngrok.com/)**
- **[Export  serverovej časti - SSL](https://theboroer.github.io/localtunnel-www/)**
- **[Server - Java Spring](https://github.com/MartinLukacSTUBA/dp_spring_backend)**

Vývojové prostredie servera  : **Webstorm 2023**
_____________________________________
Pre úspešné spustenie a nasadenie našej aplikácie je potrebné mať zapnutú serverovú časť nášho systému.
Serverovú časť nášho systému nájdeme na [Backend - Java Spring](https://github.com/MartinLukacSTUBA/dp_spring_backend).
Po úspešnom spustení Serveru, pre produkčné účely aplikácie, je potrebné tento server vyexportovať na verejnú doménu.
Pre vývojové účely sme pre tento export aplikácie
používali [Export  serverovej časti - SSL](https://theboroer.github.io/localtunnel-www/).

Po úspešnom spustení a vyexportovaní aplikácie môžeme prejsť ku konfigurácii našej mobilnej aplikácie.

- **Mať napojené mobilné zariadenie s operačným systémom Android na počítač.**
- **Mať nainštalovaný Android Studio s ľubovoľným emulátorom.**

Prostredníctvom Android Studia sme schopní vygenerovať aplikáciu zo zdrojového kódu pre operačný systém Android.

(Poznámka: Ak chceme generovať aplikáciu pre operačný systém iOS, musíme použiť zariadenie s nainštalovaným softvérom
Xcode.
Treba si všimnúť, že softvér Xcode podporuje len operačné systémy macOS, takže na Windows alebo Linux operačných
systémoch nie je možné vygenerovať túto aplikáciu
pre operačný systém iOS.)

Pri spúštaní projektu je potrebné splniť :
Ak máme správnu URL adresu našej serverovej časti aplikácie, **je potrebné túto URL nastaviť ako koncový bod mobilnej
aplikácie.**
Tento koncový bod mobilnej aplikácie sa nastavuje v súbore **config.js konkrétne v premennej BASE_URL**.
Po úspešnom nastavení tohto koncového bodu je naša aplikácia schopná pripojiť sa na server a komunikovať s ním.

V tomto **config.js** taktiež existuje **OBD_URL**. Do tejto konštanty nastavíme **port** na ktorom naše OBD2 zariadenie
komunikuje.
**Host** tejto konštanty je nastavovaný automaticky po pripojení sa mobilnej aplikácii na wifi adaptér OBD2.
___
Pri vývoji aplikácii sme využívali
taktiež [GitHub Repository - Emulator OBD2 327](https://github.com/Ircama/ELM327-emulator). Vďaka tomuto emulátoru sme
boli schopný
simulovať reálne čítanie dát z automobilu. Tento emulátor sme vyexportovali prostredníctvom
technológie [Export  emulátora - NgRok](https://ngrok.com/).
___
Krok po kroku

0. úspešné spustenie servera

(krok 1 v prípade testovania / vývoja prostredníctvom
simulátora [Emulator OBD2 327](https://github.com/Ircama/ELM327-emulator))

1. pre spustenie ELM327 emulátora,v priečinku kde
   je [GitHub Repository - Emulator OBD2 327](https://github.com/Ircama/ELM327-emulator) je potrebné spustiť príkaz  *
   *python -m elm -s car -n 35005** ---> simuluje konkektor OBD2
2. otvoriť aplikáciu Ngrok a napísať príkaz run **ngrok tcp 35005** ---> to nám zabezpečí vytvorenie simulácie
   komunikácie TCP
3. v priečinku dp_react_native, je potrebné pre spustenie aplikácie napísať *npm start*
4. následne pre spustenie aplikácie v zariadeni stlačiť **a**
5. ak server beží na localhoste, vyexportovať jeho port na verejnú adresu **lt --port 8080** --> nasadenie servera
   verejne
6. nastaviť URL servera do **config.js**
7. ak používame emulátor, nastaviť URL
   emulátora ([Export  emulátora - NgRok](https://ngrok.com/) + [GitHub Repository - Emulator OBD2 327](https://github.com/Ircama/ELM327-emulator) )
   do **config.js** / ak používame reálny OBD2 konektor, je potrebné
   nastaviť jeho port v **config.js** a následne využiť funkciu **getWifiIpAddress** z LoginScreen.js ktorá nám zistí IP
   adresu konektora na ktorý sme napojený, následne po nastavní IP adresy v **config.js** pre komunikáciu TCP/IP je
   možná komunikácia so zariadením OBD2

___

# Návod k implementácií vlastných funkcií OBD2

```javascript
function readDataFromOBDVIN() {
    return new Promise((resolve, reject) => {
        console.log('Attempting to connect to the emulator...');
        const client = TcpSocket.createConnection(
            {
                host: OBD_URL.host,
                port: OBD_URL.port,
            },
            () => {
                console.log('Connected to the emulator');
                client.write('0902\r');
            },
        );

        client.on('data', data => {
            console.log('Received data:', data.toString());
            resolve(data.toString());
            client.destroy();
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
   ```

Ako môžeme vidieť, implementácia tejto komunikácie prebieha prostredníctvom komunikácie **TCP**. Adresu a Host pre túto
komunikáciu
naša aplikácia získava z konštánt. Pre jednotlivé OBD2 príkazy a získavanie jednotlivých OBD2 dát používame OBD2 príkazy
v  **client.write('0902\r');**.
Pre vlastnú implemnetáciu OBD2 príkazov je potrebné si naštudovať OBD2 knižnicu.
___

# Company Vehicle Management System - EN

**This project is a diploma project for engineering studies at FEI STU.**

The project consists of two parts:

Frontend - React-Native: [GitHub Repository](https://github.com/MartinLukacSTUBA/dp_react_native)

Backend - Java Spring: [GitHub Repository](https://github.com/MartinLukacSTUBA/dp_spring_backend)

**It is an Open-Source software that allows companies to run their own company software for Company Vehicle Management.
**
_______________________________
The aim of the present diploma thesis was to develop an application for monitoring and
managing vehicles. The application should be suitable for many companies that possess a
fleet of company vehicles and would like to monitor individual ones. In the theoretical part
of diploma thesis, we described the On board diagnostic 2 protocol, different possibilities
of frontend development and also the possibilities of server side development.We described
how applications communicate across the Internet nowadays and introduced various types
of databases. The analytical part examined the development of application on the frontend
and server side, we also created the database of the application. Users can log in to the
application with a unique account secured with a JWT token. The Admin users of the
application can create and change user accounts or create and change vehicles in the
company fleet, they are able to view all the historical data of individual trips. Users with
the User role can assign existing vehicles and record trip parameters, as well as view the
history of their trips with detailed parameters. All this data is stored in a database, so the
user can see it at any time. To prevent issues with invalid documents, such as Technical
Inspection Status, we implemented a vehicle status check in the application. If a vehicle’s
documents are about to expire, the owner of the vehicle will receive an email, notifying
them of impending expiry. The designed application is easy to deploy and configure with
various types of On Board Diagnostic 2 connectors. Thanks to the React-Native JavaScript
library ), this app is compatible with both Android and iOS operating systems.

#### Key words: OBD2, frontend, react-native, backend, framework spring, database

____________________________________
Technologies used in the development of the server part:

- **JavaScript - React-Native**
- **Android Studio**
- **[GitHub Repository - Emulator OBD2 327](https://github.com/Ircama/ELM327-emulator)**
- **[Export  emulátora - NgRok](https://ngrok.com/)**
- **[Export  serverovej časti - SSL](https://theboroer.github.io/localtunnel-www/)**
- **[Server - Java Spring](https://github.com/MartinLukacSTUBA/dp_spring_backend)**

Enviroment  : **Webstorm 2023**
_____________________________________
For the successful launch and deployment of our application, it is necessary to have the server part of our system
turned on.
The server part of our system can be found
at [Backend - Java Spring](https://github.com/MartinLukacSTUBA/dp_spring_backend).
After the successful launch of the Server, for production purposes of the application, it is necessary to export this
server to the public domain.
For development purposes, we export this application
they used [Export server part - SSL](https://theboroer.github.io/localtunnel-www/).

After successfully launching and exporting the application, we can proceed to the configuration of our mobile
application.

- **Have a mobile device with the Android operating system connected to the computer.**
- **Have Android Studio installed with any emulator.**

Through Android Studio, we are able to generate an application from the source code for the Android operating system.

(Note: If we want to generate an app for the iOS operating system, we need to use a device with the software installed
Xcode.
It should be noted that Xcode software only supports macOS operating systems, so on Windows or Linux operating systems
systems cannot generate this application
for the iOS operating system.)

When starting a project, one of the following must be met:
If we have the correct URL of our server part of the application, **need to set this URL as the mobile endpoint
applications.**
This mobile application endpoint is set in the **config.js file specifically in the BASE_URL** variable.
After successfully setting up this endpoint, our application is able to connect to the server and communicate with it.

There is also an **OBD_URL** in this **config.js**. To this constant we set the **port** on which our OBD2 device
communicates.
**The host** of this constant is set automatically after connecting the mobile application to the OBD2 wifi adapter.
___
When developing the application, we used
also [GitHub Repository - OBD2 Emulator 327](https://github.com/Ircama/ELM327-emulator). Thanks to this emulator we are
were able
simulate real reading of data from a car. We exported this emulator via
technology [Emulator export - NgRok](https://ngrok.com/).
___
Step by step

0. server started successfully

(steps 1 case of testing / development via
simulator [Emulator OBD2 327](https://github.com/Ircama/ELM327-emulator))

1. to start the ELM327 emulator, in the folder where
   is [GitHub Repository - Emulator OBD2 327](https://github.com/Ircama/ELM327-emulator) it is necessary to run the
   command *
   *python -m elm -s car -n 35005** ---> simulates an OBD2 connector
2. open the Ngrok application and write the command run **ngrok tcp 35005** ---> this will ensure the creation of a
   simulation
   TCP communication
3. in the dp folder, it is necessary to write *npm start* to start the application
4. then press **a** to start the application on the device
5. if the server is running on localhost, export its port to the public address **lt --port 8080** --> server deployment
   publicly
6. set the server URL in **config.js**
7. if we use an emulator, set the URL of the emulator in **config.js** / if we use a real OBD2 connector, it is
   necessary
   set its port in **config.js**

___

# How to implement own OBD2 functions

```javascript
function readDataFromOBDVIN() {
    return new Promise((resolve, reject) => {
        console.log('Attempting to connect to the emulator...');
        const client = TcpSocket.createConnection(
            {
                host: OBD_URL.host,
                port: OBD_URL.port,
            },
            () => {
                console.log('Connected to the emulator');
                client.write('0902\r');
            },
        );

        client.on('data', data => {
            console.log('Received data:', data.toString());
            resolve(data.toString());
            client.destroy();
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
   ```

As we can see, the implementation of this communication takes place through **TCP** communication. Address and Host for
this
communication
our application obtains from constants. We use OBD2 commands for individual OBD2 commands and obtaining individual OBD2
data
in **client.write('0902\r');**.
For your own implementation of OBD2 commands, you need to study the OBD2 library.
___
