// A program by Bikash Das .
//----------------------------------------------------------------
page1();
ShowSSID();
status();
type();
function turnon() {
var lock = navigator.mozSettings.createLock();
lock.set({'tethering.wifi.enabled': true});
window.navigator.vibrate(120);
status();
}
function turnoff() {
    var lock = navigator.mozSettings.createLock();
    lock.set({'tethering.wifi.enabled': false});
    window.navigator.vibrate(120);
    status();   
}
function ssidnew() {
    var newssid = prompt("Enter New SSID");
    if (newssid.length > 0) {
    var lock = navigator.mozSettings.createLock();
    lock.set({'tethering.wifi.enabled': false});
    lock.set({'tethering.wifi.ssid': "" + newssid + ""});
    alert('SSID Changed !');
    document.getElementById("wifin").style.display = "none";  
    document.getElementById("wifif").style.display = "block";
    Update()}else {alert('SSID Can not be Empty');ssidnew()};   
}
function passn() {
    var pass = prompt("Enter New Password");
    if (pass.length > 7) {
    var lock = navigator.mozSettings.createLock();
    lock.set({'tethering.wifi.enabled': false});
    lock.set({'tethering.wifi.security.password': "" + pass + ""});
    lock.set({'tethering.wifi.security.type': "wpa2-psk"});
    document.getElementById("CurPass").style.display = "block";
    alert('Password Changed !');
    document.getElementById("wifin").style.display = "none";  
    document.getElementById("wifif").style.display = "block";Update();type();} 
    else {alert('Password Must be of 8 Characters or More');passn()};
}
function reset() {
    var lock = navigator.mozSettings.createLock();
    lock.set({'tethering.wifi.enabled': false});
    lock.set({'tethering.wifi.ip': "192.168.1.1"});
    lock.set({'tethering.wifi.prefix': "24"});
    lock.set({'tethering.wifi.dhcpserver.startip': "192.168.1.10"});
    lock.set({'tethering.wifi.dhcpserver.endip': "192.168.1.30"});
    lock.set({'tethering.wifi.ssid': "JioPhone"});
    lock.set({'tethering.wifi.security.type': "wpa2-psk"});
    lock.set({'tethering.wifi.security.password':  "12345678"});
    document.getElementById("CurPass").style.display = "block";
    alert('Hotspot Settings Resetted to Default ! SSID : JioPhone , Password : 12345678');
    Update();type();
}
function open() {
    var lock = navigator.mozSettings.createLock();
    lock.set({'tethering.wifi.enabled': false});
    lock.set({'tethering.wifi.security.type': "open"});
    alert('Hotspot Security Setted to Open !');
    document.getElementById("CurPass").style.display = "none";
    status();type();
}
function secure() {
    var lock = navigator.mozSettings.createLock();
    lock.set({'tethering.wifi.enabled': false});
    lock.set({'tethering.wifi.security.type': "wpa2-psk"});
    document.getElementById("CurPass").style.display = "block";
    alert('Hotspot Security Setted to type WPA2-PSK');
    Update();type();
}
//--------------------------------------------------------------------------
function ShowSSID() {
    var lock = navigator.mozSettings.createLock();
    var req = lock.get('tethering.wifi.ssid');
    req.onsuccess = function () {
    var CurSSID = req.result['tethering.wifi.ssid'];
    document.getElementById("CurSSID").innerHTML = " "+ CurSSID +"";
    }
}
function ShowPass() {
    var lock = navigator.mozSettings.createLock();
    var preq = lock.get('tethering.wifi.security.password');
    preq.onsuccess = function () {
    var CuPass = preq.result['tethering.wifi.security.password'];
    document.getElementById("CurPass").innerHTML = "PASSWORD : " + CuPass + "";
    }
}
function status() {
    var lock = navigator.mozSettings.createLock();
    var req = lock.get('tethering.wifi.enabled');
    req.onsuccess = function () {
    var sresult = req.result['tethering.wifi.enabled'];
    var res1 = ""+ sresult +"";
    if (res1 == "true") {
        document.getElementById("status").innerHTML = "Hotspot : ON";
        document.getElementById("wifin").style.display = "block";  
        document.getElementById("wifif").style.display = "none";
    }
    else if (res1 == "false") {
        document.getElementById("status").innerHTML = "Hotspot : OFF";
        document.getElementById("wifin").style.display = "none";  
        document.getElementById("wifif").style.display = "block";
    }    
    }
}
function type() {
    var lock = navigator.mozSettings.createLock();
    var req = lock.get('tethering.wifi.security.type');
    req.onsuccess = function () {
    var stype = req.result['tethering.wifi.security.type'];
    if (stype == "open") {
        document.getElementById("CurPass").style.display = "none";
        document.getElementById("CurType").innerHTML = "OPEN";
    }
    else if (stype == "wpa2-psk") {
        document.getElementById("CurType").innerHTML = "WPA2-PSK";
    }
    else if (stype == "wpa-psk"){
        document.getElementById("CurType").innerHTML = "WPA-PSK";
    }
    }
}
function Update(){
    ShowSSID();
    ShowPass();
    status()
}
function tips() {
    alert('JioHots is Faster than Setting App as it uses Keys directly. Mark it as Favorite to find it faster.');
}
//--------------------------------------------------------------------------------
function page1() {
    document.getElementById("ssidbox").style.display = "block";
    document.getElementById("lowbox").style.display = "none";
    document.getElementById("lowbox2").style.display = "none";
}
function page2() {
    document.getElementById("ssidbox").style.display = "none";
    document.getElementById("lowbox").style.display = "block";
    document.getElementById("lowbox2").style.display = "none";
}
function page3() {
    document.getElementById("ssidbox").style.display = "none";
    document.getElementById("lowbox").style.display = "none";
    document.getElementById("lowbox2").style.display = "block";
}
//--------------------------------------------------------------------------------

window.addEventListener('keydown', function(e) {
    switch(e.key) {
        case 'SoftRight':turnoff() //turn Hotspot Off
        break;
        case 'SoftLeft':turnon() //Turn Hotspot On
        break;
        case '0':reset() //Rest  Hotspot settings to default values
        break;
        case '1':ssidnew() //Create new SSID
        break;
        case '2':passn() //Create new Password
        break;
        case '3':secure() //change security Type to Secure
        break;
        case '4':open() //No security 
        break;
        case '5':ShowPass() //Unhide Password Field
        break;
        case '6':tips() //guide
        break;
        case '7':page1()
        break;
        case '8':page2()
        break;
        case '9':page3()
        break;
    }
})

