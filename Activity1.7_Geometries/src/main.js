import * as THREE from 'three'

const canvas = document.querySelector('.webgl')
const scene = new THREE.Scene()

const materials = [
  new THREE.MeshStandardMaterial({ color: 0xff6666, metalness: 0.4, roughness: 0.4 }),
  new THREE.MeshStandardMaterial({ color: 0x66ff66, metalness: 0.4, roughness: 0.4 }),
  new THREE.MeshStandardMaterial({ color: 0x6699ff, metalness: 0.4, roughness: 0.4 })
]

const box = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), materials[0])
box.position.x = -2
scene.add(box)

const torus = new THREE.Mesh(new THREE.TorusGeometry(0.7, 0.3, 16, 100), materials[1])
scene.add(torus)

const cone = new THREE.Mesh(new THREE.ConeGeometry(0.8, 1.5, 32), materials[2])
cone.position.x = 2
scene.add(cone)

const light = new THREE.PointLight(0xffffff, 1.2)
light.position.set(3, 3, 3)
scene.add(light)

const ambient = new THREE.AmbientLight(0xffffff, 0.3)
scene.add(ambient)

const sizes = { width: window.innerWidth, height: window.innerHeight }

const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.z = 5
scene.add(camera)

const renderer = new THREE.WebGLRenderer({ canvas })
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
renderer.setClearColor(0x111111)

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

  box.rotation.y = elapsedTime * 0.8
  torus.rotation.x = elapsedTime * 0.6
  cone.rotation.z = elapsedTime * 0.7

  renderer.render(scene, camera)
  window.requestAnimationFrame(tick)
}

tick()
