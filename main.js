function init() {

    scene = new THREE.Scene()
    scene.background = new THREE.Color(0xdddddd)

    camera = new THREE.PerspectiveCamera(40, window.innerWidth/window.innerHeight,1,5000)
    camera.rotation.y = 45/180*Math.PI
    camera.position.x = 0
    camera.position.y = 40
    camera.position.z = 40

    hemiLight = new THREE.HemisphereLight(0xffeeb1, 0x080820, 4);
    scene.add(hemiLight);

    spotLight = new THREE.SpotLight(0xffa95c, 4);
    spotLight.castShadow = true;
    spotLight.shadow.bias = -0.0001;
    spotLight.shadow.mapSize.width = 1024*4;
    spotLight.shadow.mapSize.height = 1024*4;
    scene.add(spotLight);

    renderer = new THREE.WebGLRenderer({antialias: true});
    renderer.toneMapping = THREE.ReinhardToneMapping;
    renderer.toneMappingExposure = 2.3;
    renderer.shadowMap.enabled = true;
    renderer.setSize(window.innerWidth, window.innerHeight);
    
    controls = new THREE.OrbitControls(camera, renderer.domElement);
    document.body.appendChild(renderer.domElement)


    let loader = new THREE.GLTFLoader()
    loader.load('scene.gltf', function(gltf){
        model = gltf.scene.children[0]
        model.traverse(n => {
            if(n.isMesh) {
                n.castShadow = true;
                n.receiveShadow = true;
                if(n.material.map) {
                    n.material.map.anisotropy = 16;
                }
            }
        });
        scene.add(gltf.scene);
        animate();

    })
}

function animate() {
    renderer.render(scene,camera);
    spotLight.position.set(
        camera.position.x + 10,
        camera.position.y + 10,
        camera.position.z + 10
    );
    requestAnimationFrame(animate);
  }
init()