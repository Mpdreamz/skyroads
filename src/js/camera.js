var Camera = (function () {
    var camera, target;

    var init = function() {
        camera = new THREE.PerspectiveCamera( SkyRoads.camera.fov, window.innerWidth / window.innerHeight, 1, 10000 );
        target = new THREE.Mesh( new THREE.CubeGeometry( 1, 1, 1 ), new THREE.MeshBasicMaterial( { } ) );

        update();
    };

    var update = function() {
        SkyRoads.camera.position.x = SkyRoads.camera.offsetPosition.x;
        SkyRoads.camera.position.y = SkyRoads.camera.offsetPosition.y;
        SkyRoads.camera.position.z = SkyRoads.vehicle.position.z + SkyRoads.camera.offsetPosition.z;

        camera.position.x = SkyRoads.camera.position.x;
        camera.position.y = SkyRoads.camera.position.y;
        camera.position.z = SkyRoads.camera.position.z;

        target.position.z = SkyRoads.vehicle.position.z - SkyRoads.camera.targetOffset;
        camera.lookAt(target.position);
    };

    init();

    return {
        mesh: camera,
        update: update
    };
});