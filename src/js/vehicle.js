var Vehicle = (function () {
    var mesh;

    function init() {
        var g = new THREE.CubeGeometry( 1, 1, 1 );
        var m = new THREE.MeshBasicMaterial( { color: 0xff0000, wireframe: true } );
        mesh =  new THREE.Mesh( g, m );
        update();
    }

    function updateState() {
        if (SkyRoads.keyboard.keyUp) {
            SkyRoads.vehicle.velocity += SkyRoads.vehicle.acceleration * SkyRoads.delta;
        }
        if (SkyRoads.keyboard.keyDown) {
            SkyRoads.vehicle.velocity -= SkyRoads.vehicle.deceleration * SkyRoads.delta;
        }
        SkyRoads.vehicle.velocity = Math.min(SkyRoads.vehicle.velocity, SkyRoads.vehicle.maximumVelocity);
        SkyRoads.vehicle.velocity = Math.max(0, SkyRoads.vehicle.velocity);

        if (SkyRoads.keyboard.keyLeft) {
            SkyRoads.vehicle.position.x -= SkyRoads.vehicle.horizontalVelocity * SkyRoads.delta;
        }
        if (SkyRoads.keyboard.keyRight) {
            SkyRoads.vehicle.position.x += SkyRoads.vehicle.horizontalVelocity * SkyRoads.delta;
        }

        SkyRoads.vehicle.position.z -= SkyRoads.vehicle.velocity;
    }

    function move() {
        mesh.position.x = SkyRoads.vehicle.position.x;
        mesh.position.y = SkyRoads.vehicle.position.y;
        mesh.position.z = SkyRoads.vehicle.position.z;
    }

    function scale() {
        mesh.scale.x = SkyRoads.vehicle.size.x;
        mesh.scale.y = SkyRoads.vehicle.size.y;
        mesh.scale.z = SkyRoads.vehicle.size.z;
    }

    function update() {
        updateState();
        move();
        scale();
    }

    init();

    return {
        update: update,
        mesh: mesh
    };

});