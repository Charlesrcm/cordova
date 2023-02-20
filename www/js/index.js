

// Wait for the deviceready event before using any of Cordova's device APIs.
// See https://cordova.apache.org/docs/en/latest/cordova/events/events.html#deviceready
document.addEventListener('deviceready', onDeviceReady, false);

var nom = document.querySelector('#nomPizza');
var ingredient = document.querySelector('#ingredient');

function onDeviceReady() {
    // Cordova is now initialized. Have fun!
    document.querySelector('#newPizza').innerHTML = '<p>' + nom.value + '</p>' + '</br>' + '<p>' + ingredient.value + '</p>';

    console.log('Running cordova-' + cordova.platformId + '@' + cordova.version);
    document.getElementById('deviceready').classList.add('ready');
}
