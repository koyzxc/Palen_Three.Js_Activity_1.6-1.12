import * as THREE from 'three'

const canvas = document.querySelector('.webgl')
const scene = new THREE.Scene()

// Geometry: Pyramid (4 faces)
const geometry = new THREE.ConeGeometry(1, 1.5, 4) // base radius, height, number of faces
const material = new THREE.MeshStandardMaterial({
  color: 0xff6600,
  metalness: 0.6,
  roughness: 0.4
})

const pyramid = new THREE.Mesh(geometry, material)
scene.add(pyramid)

// Lights
const pointLight = new THREE.PointLight(0xffffff, 1.5)
pointLight.position.set(2, 3, 3)
scene.add(pointLight)

const ambient = new THREE.AmbientLight(0xffffff, 0.3)
scene.add(ambient)

// Sizes
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight
}

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.z = 3
scene.add(camera)

// Renderer
const renderer = new THREE.WebGLRenderer({ canvas })
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
renderer.setClearColor(0x000000)

// Handle resize
window.addEventListener('resize', () => {
  sizes.width = window.innerWidth
  sizes.height = window.innerHeight
  camera.aspect = sizes.width / sizes.height
  camera.updateProjectionMatrix()
  renderer.setSize(sizes.width, sizes.height)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

// Fullscreen toggle (double-click)
window.addEventListener('dblclick', () => {
  const fullscreenElement = document.fullscreenElement || document.webkitFullscreenElement
  if (!fullscreenElement) {
    canvas.requestFullscreen ? canvas.requestFullscreen() : canvas.webkitRequestFullscreen()
  } else {
    document.exitFullscreen ? document.exitFullscreen() : document.webkitExitFullscreen()
  }
})

// Animation
const clock = new THREE.Clock()
const tick = () => {
  const elapsedTime = clock.getElapsedTime()
  pyramid.rotation.y = elapsedTime * 0.6
  pyramid.rotation.x = elapsedTime * 0.3
  renderer.render(scene, camera)
  window.requestAnimationFrame(tick)
}
tick()
