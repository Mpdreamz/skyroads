var SkyRoads = (function() {
    var plane = {
        size : { x: 200, y: 10, z: 200 },
        rotation : { x: 0, y: 0, z: 0 }
    };

    var camera = {
        position : { x:0, y:240, z:-500 }
    };

    var vehicle = {
        size : { x: 50, y: 30, z: 50 },
        position : { x:0, y:20, z:0 }
    }

    return {
        vehicle: vehicle,
        plane: plane,
        camera: camera

    }

})();
