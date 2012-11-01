var SkyRoads = (function() {
    
    var time = 0;

    var cell = {
        size : { x: 200, y: 10 }
    };

    var camera = {
        targetOffset: 600,
        fov : 75,
        position : { x:0, y:240, z:-350 }
    };

    var vehicle = {
        acceleration : 5,
        size : { x: 50, y: 30, z: 50 },
        position : { x:0, y:20, z:0 }
    }

    return {
        time: time,
        vehicle: vehicle,
        cell: cell,
        camera: camera
    }

})();
