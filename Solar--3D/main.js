import * as THREE from "https://cdn.skypack.dev/three@0.129.0";
import { OrbitControls } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/controls/OrbitControls.js";

let scene, camera, renderar, comtrols, skybox;
let planet_sun, planet_mercury, planet_venus, planet_earth, planet_mars, planet_jupiter, planet_saturn, planet_uranus, planet_neptune;



// now lets set the radius of the planets from the sun....planet ketla door chhe suraj thi..


let mercury_orbit_radius = 50;
let venus_orbit_radius = 60;
let earth_orbit_radius = 70;
let mars_orbit_radius = 80;
let jupiter_orbit_radius = 100;
let saturn_orbit_radius = 120;
let uranus_orbit_radius = 140;
let neptune_orbit_radius = 160;


// now lest set the speed of the planets..........

let mercury_revolution_speed = 2;
let venus_revolution_speed = 1.5;
let earth_revolution_speed = 1;
let mars_revolution_speed = 0.8;
let jupiter_revolution_speed = 0.7;
let saturn_revolution_speed = 0.6;
let uranus_revolution_speed = 0.5;
let neptune_revolution_speed = 0.4;

//creating mattrix array for each array....
function createMatrixArray() {
    const skyboxImagespath = [
        './assets/skybox/space_bk.png',
        './assets/skybox/space_dn.png',
        './assets/skybox/space_ft.png',
        './assets/skybox/space_lf.png',
        './assets/skybox/space_rt.png',
        './assets/skybox/space_up.png',
    ]

    // creating an arrya for each pahse...in 3js
    const materialArray = skyboxImagespath.map((Image) => {
        let texture = new THREE.TextureLoader().load(Image);
        return new THREE.MeshBasicMaterial({ map: texture, side: THREE.BackSide });
    })

    return materialArray
}

//for joining all 6 texture...
function setSkyBox() {

    const materialArray = createMatrixArray();
    let skyboxGeo = new THREE.BoxGeometry(1000, 1000, 1000);
    skybox = new THREE.Mesh(skyboxGeo, materialArray);
    scene.add(skybox);

}

//genrating orbit-Ring for each planet
function createOrbitRing(outerRadius) {
    let innerRadius = outerRadius - 0.1;
    let thetaSegment = 64;
    const geometry = new THREE.RingGeometry(innerRadius, outerRadius, thetaSegment);
    const material = new THREE.MeshBasicMaterial({
        color: 'grey',
        side: THREE.DoubleSide
    })
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);
    //rotatig the orbit-ring by 90 degree......

    mesh.rotation.x = Math.PI / 2;
    return mesh;
}

// creating the planets and adding to the scene


function loadPlanetTextures(texture, radius, widthSegment, heightSegment, meshType) {
    const geometry = new THREE.SphereGeometry(radius, widthSegment, heightSegment);
    const loader = new THREE.TextureLoader();
    const planetTexture = loader.load(texture);
    // const material = new THREE.MeshBasicMaterial({
    //     map: planetTexture
    // })

    const material = meshType == 'standard' ? new THREE.MeshStandardMaterial({ map: planetTexture }) : new THREE.MeshBasicMaterial({ map: planetTexture });

    const planet = new THREE.Mesh(geometry, material);
    return planet;
}

//making the revolution of the planets



function init() {
    scene = new THREE.Scene()
    camera = new THREE.PerspectiveCamera(85,
        window.innerWidth / window.innerHeight,
        0.1, 1000)

    setSkyBox();

    planet_sun = loadPlanetTextures('./assets/sun_hd.jpg', 20, 100, 100, 'basic');
    planet_earth = loadPlanetTextures('./assets/earth_hd.jpg', 4, 100, 100, 'standard');
    planet_jupiter = loadPlanetTextures('./assets/jupiter_hd.jpg', 10, 100, 100, 'standard');
    planet_mars = loadPlanetTextures('./assets/mars_hd.jpg', 3.5, 100, 100, 'standard');
    planet_mercury = loadPlanetTextures('./assets/mercury_hd.jpg', 2, 100, 100, 'standard');
    planet_neptune = loadPlanetTextures('./assets/neptune_hd.jpg', 5, 100, 100, 'standard');
    planet_saturn = loadPlanetTextures('./assets/saturn_hd.jpg', 8, 100, 100, 'standard');
    planet_uranus = loadPlanetTextures('./assets/uranus_hd.jpg', 6, 100, 100, 'standard');
    planet_venus = loadPlanetTextures('./assets/venus_hd.jpg', 5, 100, 100, 'standard');

    //adding all the planets............
    scene.add(planet_sun);
    scene.add(planet_earth);
    scene.add(planet_jupiter);
    scene.add(planet_mars);
    scene.add(planet_mercury);
    scene.add(planet_neptune);
    scene.add(planet_saturn);
    scene.add(planet_uranus);
    scene.add(planet_venus);


    const sunLight = new THREE.PointLight(0xffffff, 1, 0); // White light, intensity 1, no distance attenuation
    sunLight.position.copy(planet_sun.position); // Position the light at the Sun's position
    scene.add(sunLight);
    // calling ring...

    createOrbitRing(earth_orbit_radius);
    createOrbitRing(venus_orbit_radius);
    createOrbitRing(mars_orbit_radius);
    createOrbitRing(jupiter_orbit_radius);
    createOrbitRing(saturn_orbit_radius);
    createOrbitRing(uranus_orbit_radius);
    createOrbitRing(neptune_orbit_radius);



    renderar = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true
    })
    renderar.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderar.domElement);
    renderar.domElement.id = "c";

    renderar.render(scene, camera);

    // defining the controlls,,,,,,,,,,,,


    comtrols = new OrbitControls(camera, renderar.domElement);
    comtrols.minDistance = 12;
    comtrols.maxDistance = 1000;
    camera.position.z = 100;

    //revolution

    planet_earth.position.x = planet_sun.position.x + earth_orbit_radius



}

function planetRevolution(time, speed, planet, orbitRadius, planetName) {
    let orbitSpeedMultiplier = 0.001;
    const planetAngle = time * orbitSpeedMultiplier * speed;
    planet.position.x = planet_sun.position.x + orbitRadius * Math.cos(planetAngle);
    planet.position.z = planet_sun.position.z + orbitRadius * Math.sin(planetAngle);
}

// rotate 3d
function animate(time) {

    const rotationSpeed = 0.005;
    planet_sun.rotation.y += rotationSpeed;
    planet_earth.rotation.y += rotationSpeed;
    planet_jupiter.rotation.y += rotationSpeed;
    planet_mars.rotation.y += rotationSpeed;
    planet_mercury.rotation.y += rotationSpeed;
    planet_neptune.rotation.y += rotationSpeed;
    planet_saturn.rotation.y += rotationSpeed;
    planet_uranus.rotation.y += rotationSpeed;
    planet_venus.rotation.y += rotationSpeed;







    // revolution--
    // const orbitSpeedMultiplier = 0.001;
    // const earthOrbitAngle = time * orbitSpeedMultiplier;
    // planet_earth.position.x = planet_sun.position.x + earth_orbit_radius * Math.cos(earthOrbitAngle);
    // planet_earth.position.z = planet_sun.position.z + earth_orbit_radius * Math.sin(earthOrbitAngle);

    planetRevolution(time, mercury_revolution_speed, planet_mercury, mercury_orbit_radius, 'mercury');
    planetRevolution(time, venus_revolution_speed, planet_venus, venus_orbit_radius, 'venus');
    planetRevolution(time, earth_revolution_speed, planet_earth, earth_orbit_radius, 'earth');
    planetRevolution(time, mars_revolution_speed, planet_mars, mars_orbit_radius, 'mars');
    planetRevolution(time, jupiter_revolution_speed, planet_jupiter, jupiter_orbit_radius, 'jupiter');
    planetRevolution(time, saturn_revolution_speed, planet_saturn, saturn_orbit_radius, 'saturn');
    planetRevolution(time, uranus_revolution_speed, planet_uranus, uranus_orbit_radius, 'uranus');
    planetRevolution(time, neptune_revolution_speed, planet_neptune, neptune_orbit_radius, 'neptune');

    comtrols.update();
    requestAnimationFrame(animate);//animation varamvaar clya j kare chhe..

    renderar.render(scene, camera);
}

//resizing the camera and canvass properties......
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderar.setSize(window.innerWidth, window.innerHeight)
}

window.addEventListener('resize', onWindowResize, false)
init()
animate(0)