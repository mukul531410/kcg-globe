let scene;
let camera;
let renderer;

function main(){
    var host = window.location.protocol+'//'+window.location.hostname+'/kcgGlobe/assets/';
    const canvas = document.querySelector('#kcg-spinning-globe');

    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 2;
    scene.add(camera);

    renderer = new THREE.WebGLRenderer({canvas: canvas, antialias: true,});
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);

    renderer.autoClear = false;
    renderer.setClearColor(0x00000, 0.0);

console.log(host);
    // create earthgeometry
    const earthgeometry = new THREE.SphereGeometry(0.6,32,32);
    const eatrhmaterial = new THREE.MeshPhongMaterial({
        roughness : 1,
        metalness:0,
        map: THREE.ImageUtils.loadTexture(host+'textures/earth-texture.png'),
        bumpMap: THREE.ImageUtils.loadTexture(host+'textures/earthbump.jpg'),
        bumpScale: 0.3,
    });

    const earthmesh = new THREE.Mesh(earthgeometry,eatrhmaterial);
    scene.add(earthmesh);

    // set ambientlight
    const ambientlight = new THREE.AmbientLight(0xffffff, 0.2);
    scene.add(ambientlight);

    // set point light
    const pointerlight =  new THREE.PointLight(0xffffff,0.9);

    // set light position
    pointerlight.position.set(5,3,5);
    scene.add(pointerlight);

    const animate = () =>{
        requestAnimationFrame(animate);
        earthmesh.rotation.y -= 0.0015;

        render();
    }

    const render = () => {
        renderer.render(scene,camera);
    }

    animate();
}

window.onload = main;