var SkyRoads = (function() {
    
    var time = 0;
    var delta = 0;
    var restart = false;

    var world = {
        gravity : 10000,
        bounciness : 0.75,
        killDepth : 500
    };

    var cell = {
        size : { x: 200, y: 10 },
        maxGrid: { x: 9, y: 50, z: 400 }
    };

    var camera = {
        targetOffset: 600,
        fov : 75,
        position : { x:0, y:0, z:0 },
        offsetPosition : { x:0, y:240, z: 500 }
    };

    var vehicle = {
        velocity :  { x: 0, y: 0, z: 0 },
        acceleration : 250,
        deceleration : 1000,
        maximumVelocity : { x: 1000, y: 2500, z: 2000 },
        size : { x: 15, y: 15, z: 20 },
        rotation: { x : 0, y: 3.141527, z: 0 },
        position : { x:0, y:36, z:0 },
        canJump : true,
        dead: false,
        winning: false
    };

    var explosion = {
        color: 0xfabe82,
        size: 40,
        speed: 5,
        duration: 5
    };

    var keyboard = {
        keyUp : false,
        keyDown : false,
        keyLeft : false,
        keyRight : false,
        spacebar : false
    };



    return {
        time: time,
        delta: delta,
        world: world,
        vehicle: vehicle,
        cell: cell,
        camera: camera,
        keyboard: keyboard,
        restart: restart,
        explosion: explosion
    };

})();
