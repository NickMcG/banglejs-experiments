
/* Example fix:
{ "lat": NaN, "lon": NaN, "alt": NaN, "speed": NaN,
  "course": NaN,
  "time": Date: Wed Dec 21 2022 15:47:04 GMT-0500,
  "satellites": 0, "fix": 0, "hdop": 25.5 }
*/

Bangle.on('GPS',
    function(fix) {
        // If we have a timestamp, then set the time
        if (fix && fix.time) {
            /*print('---------');
            print('Time before:');
            print(getTime());
            print(new Date(getTime() * 1000));
            print('Time from fix:');
            print(fix.time.getTime());
            print(new Date(fix.time.getTime()));
            print('---------');*/
            setTime(fix.time.getTime() / 1000);
            Bangle.setGPSPower(false, 'widtimesync');
        }
    }
);

Bangle.on('lock',
    function() {
        // If Bangle is getting unlocked and GPS is not turned on...
        // Then, turn on GPS for 5 minutes, then turn it off.
        if (!Bangle.isLocked() && Bangle.getGPSFix() === undefined) {
            Bangle.setGPSPower(true, 'widtimesync');

            // Timeout for 5 minutes to turn it off, if it is still on
            setTimeout(function() {
                Bangle.setGPSPower(false, 'widtimesync');
            }, 1000*60*5);
        }
    }
);

WIDGETS['timesync'] = {
    area: 'tl',
    sortorder: 5,
    width: 0,
    draw: function(_w) {
        // Nothing to draw
    }
};

/*
Bangle.setGPSPower(true, 'testing');

Bangle.on('GPS', function(fix) { if(fix && fix.time) { let time = fix.time.replace('Date: ', ''); print(new Date(time)); } });

Bangle.on('GPS', function(fix) { if(fix && fix.time) { print(typeof fix.time); } });

Bangle.on('GPS', function(fix) { if(fix && fix.time) { print(fix.time.getTime() / 1000); } });

Bangle.on('GPS', function(fix) { if(fix && fix.time) { setTime(fix.time.getTime() / 1000); Bangle.setGPSPower(false); } });

Bangle.setGPSPower(false, 'testing');
*/