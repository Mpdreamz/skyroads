var Explosion = (function () {
    var particleSystem, particles, particleCount = 1800, origin;

    function init() {
        var pMaterial = new THREE.ParticleBasicMaterial({
            color: SkyRoads.explosion.color,
            size: SkyRoads.explosion.size,
            map: THREE.ImageUtils.loadTexture("img/particle2.png"),
            blending: THREE.AdditiveBlending,
            transparent: true
        });

        origin = new THREE.Vector3(SkyRoads.vehicle.position.x, SkyRoads.vehicle.position.y, SkyRoads.vehicle.position.z);
        particles = new THREE.Geometry();
        for(var p = 0; p < particleCount; p++) {
            // create a particle with random
            // position values, -250 -> 250
            var pX = (Math.random() * SkyRoads.vehicle.size.x) - (SkyRoads.vehicle.size.x / 2),
                pY = (Math.random() * SkyRoads.vehicle.size.y) - (SkyRoads.vehicle.size.y / 2),
                pZ = (Math.random() * SkyRoads.vehicle.size.z) - (SkyRoads.vehicle.size.z / 2),
                particle = new THREE.Vector3(pX, pY, pZ);

            // create a velocity vector
            particle.velocity = particle.clone();
            particle.addSelf(origin);

            // add it to the geometry
            particles.vertices.push(particle);
        }

        // create the particle system
        particleSystem = new THREE.ParticleSystem(particles, pMaterial);
        particleSystem.sortParticles = true;
    }

    function update() {
        var pCount = particleCount;
        while(pCount--) {
            // get the particle
            var particle = particles.vertices[pCount];

            // update the velocity with
            // a splat of randomnize
            particle.velocity = particle.velocity.multiplyScalar(1 + (Math.random() * SkyRoads.delta * SkyRoads.explosion.speed));
            particle.set(particle.velocity.x, particle.velocity.y, particle.velocity.z);
            particle.addSelf(origin);
        }

        // flag to the particle system
        // that we've changed its vertices.
        particleSystem.geometry.__dirtyVertices = true;
    }

    init();

    return {
        particleSystem: particleSystem,
        update: update
    };
});