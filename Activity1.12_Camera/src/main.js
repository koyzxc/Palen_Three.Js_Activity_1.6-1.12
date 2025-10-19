import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

const canvas = document.querySelector('.webgl')
const scene = new THREE.Scene()

const geometry = new THREE.TorusKnotGeometry(1, 0.4, 100, 16)
const material = new THREE.MeshStandardMaterial({
  color: 0x00aaff,
  metalness: 0.7,
  roughness: 0.2
})
const torusKnot = new THREE.Mesh(geometry, material)
scene.add(torusKnot)

const light = new THREE.PointLight(0xffffff, 1.5)
light.position.set(3, 3, 3)
scene.add(light)

const ambient = new THREE.AmbientLight(0xffffff, 0.3)
scene.add(ambient)

const sizes = { width: window.innerWidth, height: window.innerHeight }

const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.set(3, 2, 3)
scene.add(camera)

const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true
controls.enablePan = true
controls.enableZoom = true
controls.autoRotate = true
controls.autoRotateSpeed = 1.5

const renderer = new THREE.WebGLRenderer({ canvas })
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
renderer.setClearColor(0x000000)

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
  torusKnot.rotation.y = elapsedTime * 0.3
  controls.update()
  renderer.render(scene, camera)
  window.requestAnimationFrame(tick)
}

tick()
