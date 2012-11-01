var SkyRoads = (function() {
    var cell = {
        size : { x: 200, y: 10 }
    };

    var camera = {
        fov : 75,
        position : { x:0, y:240, z:-500 }
    };

    var vehicle = {
        size : { x: 50, y: 30, z: 50 },
        position : { x:0, y:20, z:0 }
    }

    return {
        vehicle: vehicle,
        cell: cell,
        camera: camera

    }

})();
