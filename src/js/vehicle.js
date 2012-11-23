var Vehicle = (function () {
    var mesh;

    function init() {
        var g = new THREE.CubeGeometry( 1, 1, 1 );
        var m = new THREE.MeshBasicMaterial( { color: 0x0000ff } );
        var previousTile;
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
        SkyRoads.vehicle.canJump = SkyRoads.vehicle.position.y === getMinHeight();
        if (SkyRoads.keyboard.spacebar && SkyRoads.vehicle.canJump) {
            SkyRoads.vehicle.velocity.y = SkyRoads.vehicle.maximumVelocity.y;
        }

        // gravity
        SkyRoads.vehicle.velocity.y -= SkyRoads.world.gravity * SkyRoads.delta;
        
        var collisions = hasCollision();
        if (collisions) {
            console.log("HIT", collisions);
            // two cases:
            _.each(collisions, function(collision) {
                // we hit an edge head on - explode
                if (collision.object.position.z < previousTile.mesh.position.z) {
                    console.log("EXPLODE!");
                }
                // - we reach an edge between blocks - constrain the movement.
                else {
                    var offset = SkyRoads.vehicle.velocity.x / Math.abs(SkyRoads.vehicle.velocity.x);
                    console.log(SkyRoads.vehicle.position.x - collision.point.x);
            /*
                    // Constrain the  movement to the edge of the collision object
                    SkyRoads.vehicle.velocity.x = SkyRoads.vehicle.position.x - collision.point.x + offset;
            */
                }
            });
        }
    }

    function getMinHeight() {
        var tile = Level.getTileAt(mesh.position.x, mesh.position.z);
        var isOnTile = !!tile;
        return (isOnTile ? tile.height + (SkyRoads.vehicle.size.y / 2) + 1 : -1000);
    }

    function hasCollision() {
        for (var vertexIndex = 0; vertexIndex < mesh.geometry.vertices.length; vertexIndex++)
        {
            var localVertex = mesh.geometry.vertices[vertexIndex].clone();
            var globalVertex = mesh.matrix.multiplyVector3(localVertex);
            var directionVector = globalVertex.subSelf( mesh.position );

            var ray = new THREE.Ray( mesh.position, directionVector.clone().normalize() );
            var collisionResults = ray.intersectObjects( Level.getMeshes() );
            if (collisionResults.length > 0 && collisionResults[0].distance < directionVector.length())
            {
                return collisionResults;
            }
        }
        return false;
    }

    function move() {
        SkyRoads.vehicle.position.x += SkyRoads.vehicle.velocity.x * SkyRoads.delta;

        SkyRoads.vehicle.position.y += SkyRoads.vehicle.velocity.y * SkyRoads.delta;
        if (SkyRoads.vehicle.position.y < getMinHeight()) {
            SkyRoads.vehicle.position.y = getMinHeight();
            SkyRoads.vehicle.velocity.y = 0;
        }
        
        SkyRoads.vehicle.position.z -= SkyRoads.vehicle.velocity.z * SkyRoads.delta;
        
        mesh.position.x = SkyRoads.vehicle.position.x;
        mesh.position.y = SkyRoads.vehicle.position.y;
        mesh.position.z = SkyRoads.vehicle.position.z;
    }

    function scale() {
        mesh.scale.x = SkyRoads.vehicle.size.x;
        mesh.scale.y = SkyRoads.vehicle.size.y;
        mesh.scale.z = SkyRoads.vehicle.size.z;
    }

    function colorCurrentTile() {
        _.each(Level.tiles, function(tile) {
            tile.mesh.material.color.setHex(0xff0000);
        });
        
        var tile = Level.getTileAt(mesh.position.x, mesh.position.z);
        if (tile) {
            tile.mesh.material.color.setHex(0x00ff00);
            previousTile = tile;
        }
    }

    function update() {
        updateState();
        move();
        scale();
        colorCurrentTile();
    }

    init();

    return {
        update: update,
        mesh: mesh
    };

});