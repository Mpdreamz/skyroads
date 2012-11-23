var Vehicle = (function () {
    var mesh;

    function init() {
        var g = new THREE.CubeGeometry( 1, 1, 1 );
        var m = new THREE.MeshLambertMaterial( { color: 0x999fff } );
        mesh =  new THREE.Mesh( g, m );
        dead = false;
        update();
    }

    function updateState() {
        // forward
        if (SkyRoads.keyboard.keyUp) {
            SkyRoads.vehicle.velocity.z += SkyRoads.vehicle.acceleration * SkyRoads.delta;
        }
        if (SkyRoads.keyboard.keyDown) {
            SkyRoads.vehicle.velocity.z -= SkyRoads.vehicle.deceleration * SkyRoads.delta;
        }
        SkyRoads.vehicle.velocity.z = Math.min(SkyRoads.vehicle.velocity.z, SkyRoads.vehicle.maximumVelocity.z);
        SkyRoads.vehicle.velocity.z = Math.max(0, SkyRoads.vehicle.velocity.z);

        // left / right
        SkyRoads.vehicle.velocity.x = 0;
        if (SkyRoads.keyboard.keyLeft) {
            SkyRoads.vehicle.velocity.x -= SkyRoads.vehicle.maximumVelocity.x;
        }
        if (SkyRoads.keyboard.keyRight) {
            SkyRoads.vehicle.velocity.x += SkyRoads.vehicle.maximumVelocity.x;
        }
        SkyRoads.vehicle.velocity.x = Math.min(SkyRoads.vehicle.velocity.x, SkyRoads.vehicle.maximumVelocity.x);
        SkyRoads.vehicle.velocity.x = Math.max(SkyRoads.vehicle.velocity.x, -SkyRoads.vehicle.maximumVelocity.x);

        // collision detection
        // We could be exploding
        if ( hasFrontalCollisions() ) {
            console.log('explosion');
            SkyRoads.vehicle.dead = true;
        }
        // Or pushing up against the side of a block
        else if (hasLateralCollisions()) {

            SkyRoads.vehicle.velocity.x = 0;
        }

        // jumping
        var minHeight = getMinHeight();
        SkyRoads.vehicle.canJump = SkyRoads.vehicle.position.y === minHeight;
        if (SkyRoads.keyboard.spacebar && SkyRoads.vehicle.canJump) {
            SkyRoads.vehicle.velocity.y = SkyRoads.vehicle.maximumVelocity.y;
        }
        SkyRoads.vehicle.velocity.y -= SkyRoads.world.gravity * SkyRoads.delta;

        // Handle special tile properties
        var tile = Level.getTileAt(mesh.position.x, mesh.position.z);

        if (tile) {
            // 1. Booster tile
            if (tile.cell.type === "booster") {
                SkyRoads.vehicle.acceleration += 5;
            }
        }

        SkyRoads.vehicle.position.x += SkyRoads.vehicle.velocity.x * SkyRoads.delta;
        SkyRoads.vehicle.position.y += SkyRoads.vehicle.velocity.y * SkyRoads.delta;
        SkyRoads.vehicle.position.z -= SkyRoads.vehicle.velocity.z * SkyRoads.delta;

        // falling
        if (SkyRoads.vehicle.position.y < minHeight && SkyRoads.vehicle.position.y > -50) {
            SkyRoads.vehicle.position.y = minHeight;
            SkyRoads.vehicle.velocity.y = -SkyRoads.vehicle.velocity.y * SkyRoads.world.bounciness;
        }
        // detect death by falling
        if (SkyRoads.vehicle.position.y < -5000) {
            console.log("death by falling");
            SkyRoads.vehicle.dead = true;
        }
    }

    function getMinHeight() {
        var pos = SkyRoads.vehicle.position;
        var boxRadiusX = SkyRoads.vehicle.size.x / 2;
        var boxRadiusY = SkyRoads.vehicle.size.y / 2;
        var boxRadiusZ = SkyRoads.vehicle.size.z / 2;

        var cornerTiles = [];
        cornerTiles.push(Level.getTileAt( pos.x - boxRadiusX, pos.z - boxRadiusZ));
        cornerTiles.push(Level.getTileAt( pos.x - boxRadiusX, pos.z + boxRadiusZ));
        cornerTiles.push(Level.getTileAt( pos.x + boxRadiusX, pos.z - boxRadiusZ));
        cornerTiles.push(Level.getTileAt( pos.x + boxRadiusX, pos.z + boxRadiusZ));

        var minHeight = -100000;
        _.each(cornerTiles, function(tile) {
            if (tile !== undefined) {
                minHeight = Math.max(minHeight, tile.cell.h);
            }
        });
        return minHeight + boxRadiusY + 1;
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

    function hasLateralCollisions() {
        var boxRadiusX = SkyRoads.vehicle.size.x / 2;
        var directionVector = new THREE.Vector3(SkyRoads.vehicle.velocity.x, 0, 0);
        return hasCollisions(directionVector, boxRadiusX);
    }

    function hasFrontalCollisions() {
        var boxRadiusZ = SkyRoads.vehicle.size.z / 2;
        var directionVector = new THREE.Vector3(0, 0, -SkyRoads.vehicle.velocity.z);
        return hasCollisions(directionVector, boxRadiusZ);
    }

    function hasCollisions(directionVector, boxRadius) {
        var originPoint = mesh.position.clone();
        originPoint = originPoint.subSelf(new THREE.Vector3(0, SkyRoads.vehicle.size.y / 2, 0));

        var ray = new THREE.Ray(originPoint, directionVector.clone().normalize());
        var collisionResults = ray.intersectObjects(Level.getMeshes());
        if (collisionResults.length > 0 && (collisionResults[0].distance - boxRadius) < directionVector.length() * SkyRoads.delta) {
            return true;
        }
        return false;
    }

    function update() {
        updateState();
        move();
        scale();

        _.each(Level.getTiles(), function(tile) {
            tile.setColor();
        });
        var tile = Level.getTileAt(mesh.position.x, mesh.position.z);
        if (tile) {
            tile.mesh.material.color.setHex(0x00ff00);
        }
    }

    init();

    return {
        update: update,
        mesh: mesh,
        dead: dead
    };
});