var subdomain = "";
if (subdomain) {
    subdomain = subdomain.substr(0,subdomain.length-1).split('.').join('_').toLowerCase() + '.';
}

// El siguiente es el objeto oprios que se agregará a la conexión de jitsi para configurar la conexión
export default {
    hosts: {
        domain: 'meet.jit.si',

        muc: 'conference.'+subdomain+'meet.jit.si', // FIXME: use XEP-0030
        focus: 'focus.meet.jit.si',
    },
    serviceUrl: 'wss://meet.jit.si/xmpp-websocket',
    disableSimulcast: false, // Transmisión simultánea por más de un medio
    enableRemb: true,
    enableTcc: true,
    resolution: 720,
    constraints: { // establece el tamaño de los contenedores donde se visualizaran los Tracks
        video: {
            height: {
                ideal: 720,
                max: 720,
                min: 180
            },
            width: {
                ideal: 1280,
                max: 1280,
                min: 320
            }
        }
    },
    enableInsecureRoomNameWarning: true,
    externalConnectUrl: 'https://meet.jit.si/http-pre-bind',
    analytics: {
        amplitudeAPPKey: "fafdba4c3b47fe5f151060ca37f02d2f",
        whiteListedEvents: [ 'conference.joined', 'page.reload.scheduled', 'rejoined', 'transport.stats' ],
    },
    enableP2P: true, // flag to control P2P connections
    // New P2P options
    p2p: {
        enabled: true, // habilita o deshabilita la conexión de igual a igual, si está deshabilitada, 
        // todos los medios se enrutarán a través de Jitsi Videobridge.
        preferH264: true, // DEPRECATED. Use preferredCodec instead.
        // preferredCodec the mime type of the codec that needs to be made the preferred codec for the connection.
        disableH264: true, // DEPRECATED. Use disabledCodec instead.
        // disabledCodec - the mime type of the code that should not be negotiated on the peerconnection.
        useStunTurn: true // use XEP-0215 to fetch STUN and TURN servers for the P2P connection
    },
    useStunTurn: true, // use XEP-0215 to fetch TURN servers for the JVB connection
    useTurnUdp: false,
    bosh: 'https://meet.jit.si/http-bind', // FIXME: use xep-0156 for that
    websocket: 'wss://meet.jit.si/xmpp-websocket', // FIXME: use xep-0156 for that


    clientNode: 'http://jitsi.org/jitsimeet', // The name of client node advertised in XEP-0115 'c' stanza
    //deprecated desktop sharing settings, included only because older version of jitsi-meet require them
    desktopSharing: 'ext', // Desktop sharing method. Can be set to 'ext', 'webrtc' or false to disable.
    chromeExtensionId: 'kglhbbefdnlheedjiejgomgmfplipfeb', // Id of desktop streamer Chrome extension
    desktopSharingSources: ['screen', 'window'],
    googleApiApplicationClientID: "39065779381-bbhnkrgibtf4p0j9ne5vsq7bm49t1tlf.apps.googleusercontent.com",
    microsoftApiApplicationClientID: "00000000-0000-0000-0000-000040240063",
    enableCalendarIntegration: true,
    //new desktop sharing settings
    desktopSharingChromeExtId: 'kglhbbefdnlheedjiejgomgmfplipfeb', // Id of desktop streamer Chrome extension
    desktopSharingChromeDisabled: false,
    desktopSharingChromeSources: ['screen', 'window', 'tab'],
    desktopSharingChromeMinExtVersion: '0.2.6.2', // Required version of Chrome extension
    desktopSharingFirefoxDisabled: false,
    useRoomAsSharedDocumentName: false,
    enableLipSync: false,
    disableRtx: false, // Enables RTX everywhere
    enableScreenshotCapture: false,
    openBridgeChannel: 'websocket', // habilita o desabilita el canal puente. Los valores pueden ser "datachanel" o "websocket", 
    // true (que lo tratará como datachanel), undefined (lo tratará como canal de datos) y false (no abrirá nin gún canal)
    channelLastN: -1, // The default value of the channel attribute last-n.
    startBitrate: "800",
    disableAudioLevels: false, // Propiedad booleana que habilita o desabilita los niveles de audio
    disableSuspendVideo: true,
    stereo: false,
    forceJVB121Ratio:  -1, // "Math.random () < forceJVB121Ratio" determinará si una conferencia de 2 personas debe trasladarse a JVB en lugar de P2P. 
    // La decisión se toma en el lado del respondedor, después de que ICE tiene éxito en la conexión P2P.
    // La función Math.random() retorna un punto flotante, un número pseudo-aleatorio dentro del rango [0, 1).
    enableTalkWhileMuted: true, // Habilita o desabilita la detección al hablar con el micrófono silenciado.

    enableNoAudioDetection: true,

    enableNoisyMicDetection: true,

    enableClosePage: true,

    disableLocalVideoFlip: true,

    hiddenDomain: 'recorder.meet.jit.si',
    dropbox: {
        appKey: '3v5iyto7n7az02w'
    },
    transcribingEnabled: false,
    enableRecording: true,
    liveStreamingEnabled: true,
    fileRecordingsEnabled: true,
    fileRecordingsServiceEnabled: false,
    fileRecordingsServiceSharingEnabled: false,
    requireDisplayName: false,
    enableWelcomePage: true,
    isBrand: false,
    dialInNumbersUrl: 'https://api.jitsi.net/phoneNumberList',
    dialInConfCodeUrl:  'https://api.jitsi.net/conferenceMapper',

    dialOutCodesUrl:  'https://api.jitsi.net/countrycodes',
    dialOutAuthUrl: 'https://api.jitsi.net/authorizephone',
    peopleSearchUrl: 'https://api.jitsi.net/directorySearch',
    inviteServiceUrl: 'https://api.jitsi.net/conferenceInvite',
    inviteServiceCallFlowsUrl: 'https://api.jitsi.net/conferenceinvitecallflows',
    peopleSearchQueryTypes: ['user','conferenceRooms'],
    startAudioMuted: 9,
    startVideoMuted: 9,
    enableUserRolesBasedOnToken: false,
    enableLayerSuspension: false, // si se establece en 'true', se limitará la tasa de bits de envío de video 
    // cuando se nos diga que no hemos sido seleccionados por ningún punto final 
    // (y por lo tanto las transmisiones que no son en miniatura no están en uso).
    feedbackPercentage: 0,
    deploymentUrls: {
        userDocumentationURL: "https://jitsi.github.io/handbook/help",
    },
    chromeExtensionBanner: {
        url: "https://chrome.google.com/webstore/detail/jitsi-meetings/kglhbbefdnlheedjiejgomgmfplipfeb",
        chromeExtensionsInfo: [{"path": "jitsi-logo-48x48.png", "id": "kglhbbefdnlheedjiejgomgmfplipfeb"}]
    },
    prejoinPageEnabled: false,
    hepopAnalyticsUrl: "",
    hepopAnalyticsEvent: {
        product: "lib-jitsi-meet",
        subproduct: "meet-jit-si",
        name: "jitsi.page.load.failed",
        action: "page.load.failed",
        actionSubject: "page.load",
        type: "page.load.failed",
        source: "page.load",
        attributes: {
            type: "operational",
            source: 'page.load'
        },
        server: "meet.jit.si"
    },
    deploymentInfo: {
        environment: 'meet-jit-si',
        envType: 'prod',
        releaseNumber: '735',
        shard: 'meet-jit-si-eu-central-1a-s52',
        region: 'eu-central-1',
        userRegion: 'eu-central-1',
        crossRegion: 0
    },
    rttMonitor: {
        enabled: false,
        initialDelay: 30000,
        getStatsInterval: 10000,
        analyticsInterval: 60000,
        stunServers: {"us-east-1": "all-us-east-1-turn.jitsi.net:443", "ap-se-2": "all-ap-se-2-turn.jitsi.net:443", "ap-se-1": "all-ap-se-1-turn.jitsi.net:443", "us-west-2": "all-us-west-2-turn.jitsi.net:443", "eu-central-1": "all-eu-central-1-turn.jitsi.net:443", "eu-west-1": "all-eu-west-1-turn.jitsi.net:443"}
    },
    e2eping: {
        pingInterval: -1
    },
    abTesting: {
    },
    testing: {
        capScreenshareBitrate: 1,
        octo: {
            probability: 1
        }
    }
};