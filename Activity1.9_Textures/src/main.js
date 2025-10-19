import * as THREE from 'three'

const canvas = document.querySelector('.webgl')
const scene = new THREE.Scene()

const textureLoader = new THREE.TextureLoader()
const texture = textureLoader.load('/src/texture.jpg')

const geometry = new THREE.BoxGeometry(1.5, 1.5, 1.5)
const material = new THREE.MeshStandardMaterial({
  map: texture,
  metalness: 0.4,
  roughness: 0.6
})

const cube = new THREE.Mesh(geometry, material)
cube.castShadow = true
cube.receiveShadow = true
scene.add(cube)

const light = new THREE.DirectionalLight(0xffffff, 2)
light.position.set(2, 2, 3)
light.castShadow = true
scene.add(light)

const ambient = new THREE.AmbientLight(0x111111, 0.4)
scene.add(ambient)

const sizes = { width: window.innerWidth, height: window.innerHeight }

const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.z = 3
scene.add(camera)

const renderer = new THREE.WebGLRenderer({ canvas })
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
renderer.setClearColor(0x000000)
renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFSoftShadowMap

window.addEventListener('resize', () => {
  sizes.width = window.innerWidth
  sizes.height = window.innerHeight
  camera.aspect = sizes.width / sizes.height
  camera.updateProjectionMatrix()
  renderer.setSize(sizes.width, sizes.height)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

const clock = new THREE.Clock()

const tick = () => {
  const elapsedTime = clock.getElapsedTime()
  cube.rotation.y = elapsedTime * 0.5
  cube.rotation.x = elapsedTime * 0.3
  renderer.render(scene, camera)
  window.requestAnimationFrame(tick)
}

tick()
