var Vehicle = (function () {
    var mesh;

    function init() {
        var g = new THREE.CubeGeometry( 1, 1, 1 );
        var m = new THREE.MeshBasicMaterial( { color: 0x0000ff } );
        mesh =  new THREE.Mesh( g, m );
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

        // jump
        var minHeight = 40;
        SkyRoads.vehicle.canJump = SkyRoads.vehicle.position.y === minHeight;
        if (SkyRoads.keyboard.spacebar && SkyRoads.vehicle.canJump) {
            SkyRoads.vehicle.velocity.y = SkyRoads.vehicle.maximumVelocity.y;
        }
        SkyRoads.vehicle.velocity.y -= SkyRoads.world.gravity * SkyRoads.delta;

        if (hasCollisions()) {
            SkyRoads.vehicle.velocity.x = 0;
        }

        SkyRoads.vehicle.position.x += SkyRoads.vehicle.velocity.x * SkyRoads.delta;
        SkyRoads.vehicle.position.y += SkyRoads.vehicle.velocity.y * SkyRoads.delta;
        SkyRoads.vehicle.position.z -= SkyRoads.vehicle.velocity.z * SkyRoads.delta;
        if (SkyRoads.vehicle.position.y < minHeight) {
            SkyRoads.vehicle.position.y = minHeight;
            SkyRoads.vehicle.velocity.y = -SkyRoads.vehicle.velocity.y * SkyRoads.world.bounciness;
        }
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

    function hasCollisions() {
        var originPoint = mesh.position.clone();
        var direction = -SkyRoads.vehicle.velocity.x / Math.abs(SkyRoads.vehicle.velocity.x) || 1;
        originPoint = originPoint.subSelf(new THREE.Vector3(SkyRoads.vehicle.size.x / 2 * direction, SkyRoads.vehicle.size.y / 2, 0));

        var directionVector = new THREE.Vector3(SkyRoads.vehicle.velocity.x, 0, 0);
        var ray = new THREE.Ray(originPoint, directionVector.clone().normalize());
        var collisionResults = ray.intersectObjects(Level.getMeshes());
        if (collisionResults.length > 0 && collisionResults[0].distance < directionVector.length() * SkyRoads.delta) {
            return true;
        }
        return false;
    }

    function update() {
        updateState();
        move();
        scale();

        _.each(Level.getTiles(), function(tile) {
            tile.mesh.material.color.setHex(0xff0000);
        });
        var tile = Level.getTileAt(mesh.position.x, mesh.position.z);
        if (tile) {
            tile.mesh.material.color.setHex(0x00ff00);
        }
    }

    init();

    return {
        update: update,
        mesh: mesh
    };

});