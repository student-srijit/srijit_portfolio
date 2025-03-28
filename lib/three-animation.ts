import * as THREE from "three"

export function init(canvas: HTMLCanvasElement) {
  // Scene setup
  const scene = new THREE.Scene()

  // Camera setup
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
  camera.position.z = 5

  // Renderer setup
  const renderer = new THREE.WebGLRenderer({
    canvas,
    alpha: true,
    antialias: true,
  })
  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

  // Create particles
  const particlesGeometry = new THREE.BufferGeometry()
  const particlesCount = 3000 // Increased particle count

  const posArray = new Float32Array(particlesCount * 3)
  const scaleArray = new Float32Array(particlesCount)
  const colorArray = new Float32Array(particlesCount * 3)

  for (let i = 0; i < particlesCount * 3; i += 3) {
    // Position
    posArray[i] = (Math.random() - 0.5) * 15
    posArray[i + 1] = (Math.random() - 0.5) * 15
    posArray[i + 2] = (Math.random() - 0.5) * 15

    // Scale
    scaleArray[i / 3] = Math.random()

    // Color - varying shades of purple/blue
    colorArray[i] = 0.3 + Math.random() * 0.2 // R
    colorArray[i + 1] = 0.2 + Math.random() * 0.1 // G
    colorArray[i + 2] = 0.8 + Math.random() * 0.2 // B
  }

  particlesGeometry.setAttribute("position", new THREE.BufferAttribute(posArray, 3))
  particlesGeometry.setAttribute("scale", new THREE.BufferAttribute(scaleArray, 1))
  particlesGeometry.setAttribute("color", new THREE.BufferAttribute(colorArray, 3))

  // Material
  const particlesMaterial = new THREE.PointsMaterial({
    size: 0.05,
    sizeAttenuation: true,
    vertexColors: true,
    transparent: true,
    alphaTest: 0.001,
    opacity: 0.8,
  })

  // Points
  const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial)
  scene.add(particlesMesh)

  // Add a second particle system for depth
  const secondaryGeometry = new THREE.BufferGeometry()
  const secondaryCount = 1000

  const secondaryPosArray = new Float32Array(secondaryCount * 3)

  for (let i = 0; i < secondaryCount * 3; i += 3) {
    secondaryPosArray[i] = (Math.random() - 0.5) * 20
    secondaryPosArray[i + 1] = (Math.random() - 0.5) * 20
    secondaryPosArray[i + 2] = (Math.random() - 0.5) * 20
  }

  secondaryGeometry.setAttribute("position", new THREE.BufferAttribute(secondaryPosArray, 3))

  const secondaryMaterial = new THREE.PointsMaterial({
    size: 0.02,
    sizeAttenuation: true,
    color: new THREE.Color("#4f46e5"),
    transparent: true,
    opacity: 0.4,
  })

  const secondaryMesh = new THREE.Points(secondaryGeometry, secondaryMaterial)
  scene.add(secondaryMesh)

  // Handle resize
  const handleResize = () => {
    // Update sizes
    const width = window.innerWidth
    const height = window.innerHeight

    // Update camera
    camera.aspect = width / height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(width, height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  }

  window.addEventListener("resize", handleResize)

  // Mouse movement effect
  let mouseX = 0
  let mouseY = 0

  const handleMouseMove = (event: MouseEvent) => {
    mouseX = (event.clientX / window.innerWidth) * 2 - 1
    mouseY = -(event.clientY / window.innerHeight) * 2 + 1
  }

  window.addEventListener("mousemove", handleMouseMove)

  // Animation loop
  const clock = new THREE.Clock()

  const animate = () => {
    const elapsedTime = clock.getElapsedTime()

    // Rotate particles
    particlesMesh.rotation.x = elapsedTime * 0.03
    particlesMesh.rotation.y = elapsedTime * 0.02

    secondaryMesh.rotation.x = -elapsedTime * 0.02
    secondaryMesh.rotation.y = -elapsedTime * 0.01

    // Mouse interaction
    particlesMesh.rotation.x += mouseY * 0.02
    particlesMesh.rotation.y += mouseX * 0.02

    secondaryMesh.rotation.x += mouseY * 0.01
    secondaryMesh.rotation.y += mouseX * 0.01

    // Render
    renderer.render(scene, camera)

    // Call animate again on the next frame
    window.requestAnimationFrame(animate)
  }

  animate()

  // Cleanup function
  return () => {
    window.removeEventListener("resize", handleResize)
    window.removeEventListener("mousemove", handleMouseMove)

    // Dispose resources
    particlesGeometry.dispose()
    particlesMaterial.dispose()
    secondaryGeometry.dispose()
    secondaryMaterial.dispose()
    renderer.dispose()
  }
}

