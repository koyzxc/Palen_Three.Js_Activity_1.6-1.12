import * as THREE from 'three'

const canvas = document.querySelector('.webgl')
const scene = new THREE.Scene()

const sphereGeometry = new THREE.SphereGeometry(0.7, 32, 32)
const sphereMaterial = new THREE.MeshStandardMaterial({ color: 0xff8800 })
const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial)
sphere.castShadow = true
sphere.position.y = 0.7
scene.add(sphere)

const planeGeometry = new THREE.PlaneGeometry(5, 5)
const planeMaterial = new THREE.MeshStandardMaterial({ color: 0x222222 })
const plane = new THREE.Mesh(planeGeometry, planeMaterial)
plane.rotation.x = -Math.PI * 0.5
plane.receiveShadow = true
scene.add(plane)

const light = new THREE.DirectionalLight(0xffffff, 1)
light.position.set(2, 4, 3)
light.castShadow = true
light.shadow.mapSize.width = 1024
light.shadow.mapSize.height = 1024
light.shadow.camera.near = 1
light.shadow.camera.far = 10
scene.add(light)

const ambient = new THREE.AmbientLight(0xffffff, 0.3)
scene.add(ambient)

const sizes = { width: window.innerWidth, height: window.innerHeight }

const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.set(3, 2, 5)
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
  sphere.position.x = Math.sin(elapsedTime) * 1.5
  sphere.position.z = Math.cos(elapsedTime) * 1.5
  sphere.position.y = Math.abs(Math.sin(elapsedTime * 2)) * 0.5 + 0.7
  renderer.render(scene, camera)
  window.requestAnimationFrame(tick)
}

tick()
