var SkyRoads = (function() {
    
    var time = 0;
    var delta = 0;

    var cell = {
        size : { x: 200, y: 10 }
    };

    var camera = {
        targetOffset: 600,
        fov : 75,
        position : { x:0, y:0, z:0 },
        offsetPosition : { x:0, y:240, z:-500 }
    };

    var vehicle = {
        velocity : 0,
        acceleration : 10,
        horizontalVelocity : 1000,
        size : { x: 50, y: 30, z: 50 },
        position : { x:0, y:20, z:0 }
    }

    var keyboard = {
        keyUp : false,
        keyDown : false,
        keyLeft : false,
        keyRight : false
    };

    return {
        time: time,
        delta: delta,
        vehicle: vehicle,
        cell: cell,
        camera: camera,
        keyboard: keyboard
    }

})();
