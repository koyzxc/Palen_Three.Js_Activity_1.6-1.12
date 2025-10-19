import * as THREE from 'three'

const canvas = document.querySelector('.webgl')
const scene = new THREE.Scene()

const geometries = new THREE.SphereGeometry(0.7, 32, 32)

const materials = [
  new THREE.MeshBasicMaterial({ color: 0xff4444 }),
  new THREE.MeshLambertMaterial({ color: 0x44ff44 }),
  new THREE.MeshPhongMaterial({ color: 0x4444ff, shininess: 100 }),
  new THREE.MeshStandardMaterial({ color: 0xffaa00, metalness: 0.6, roughness: 0.4 })
]

const spheres = materials.map((mat, i) => {
  const sphere = new THREE.Mesh(geometries, mat)
  sphere.position.x = (i - 1.5) * 2
  scene.add(sphere)
  return sphere
})

const light = new THREE.PointLight(0xffffff, 1.5)
light.position.set(2, 3, 4)
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
  spheres.forEach((s, i) => {
    s.rotation.y = elapsedTime * 0.5 + i
    s.rotation.x = elapsedTime * 0.3
  })
  renderer.render(scene, camera)
  window.requestAnimationFrame(tick)
}

tick()
