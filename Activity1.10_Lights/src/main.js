import * as THREE from 'three'

const canvas = document.querySelector('.webgl')
const scene = new THREE.Scene()

const geometry = new THREE.SphereGeometry(1, 64, 64)
const material = new THREE.MeshStandardMaterial({
  color: 0xffffff,
  metalness: 1,
  roughness: 0.3
})
const sphere = new THREE.Mesh(geometry, material)
sphere.castShadow = true
sphere.receiveShadow = true
scene.add(sphere)

const ambientLight = new THREE.AmbientLight(0xffffff, 0.2)
scene.add(ambientLight)

const whiteLight = new THREE.PointLight(0xffffff, 1)
whiteLight.position.set(2, 2, 2)
whiteLight.castShadow = true
scene.add(whiteLight)

const redLight = new THREE.PointLight(0xff0000, 1)
redLight.position.set(-2, -2, 2)
scene.add(redLight)

const blueLight = new THREE.PointLight(0x0000ff, 1)
blueLight.position.set(2, -2, -2)
scene.add(blueLight)

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
  const t = clock.getElapsedTime()

  redLight.position.x = Math.sin(t * 0.8) * 3
  redLight.position.z = Math.cos(t * 0.8) * 3

  blueLight.position.x = Math.cos(t * 0.6) * 3
  blueLight.position.y = Math.sin(t * 0.6) * 3

  whiteLight.position.y = Math.sin(t) * 2 + 1

  sphere.rotation.y = t * 0.3

  renderer.render(scene, camera)
  window.requestAnimationFrame(tick)
}

tick()
