var Camera = (function () {
    var mesh, target;

    var init = function() {
        mesh = new THREE.PerspectiveCamera( SkyRoads.camera.fov, window.innerWidth / window.innerHeight, 1, 10000 );
        target = new GhostCameraTarget();
        mesh.lookAt(target.mesh.position);

        update();
    };

    var update = function() {
        SkyRoads.camera.position.x = SkyRoads.camera.offsetPosition.x;
        SkyRoads.camera.position.y = SkyRoads.vehicle.position.y + SkyRoads.camera.offsetPosition.y;
        SkyRoads.camera.position.z = SkyRoads.vehicle.position.z + SkyRoads.camera.offsetPosition.z;

        mesh.position.x = SkyRoads.camera.position.x;
        mesh.position.y = SkyRoads.camera.position.y;
        mesh.position.z = SkyRoads.camera.position.z;

        target.update();
    };

    init();

    return {
        mesh: mesh,
        update: update
    };
});