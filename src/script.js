import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { GUI } from 'three/examples/jsm/libs/dat.gui.module'
import Stats from 'three/examples/jsm/libs/stats.module'
import vShader from '/src/shaders/vertex.glsl'
import fShader from '/src/shaders/fragment.glsl'
import gsap from 'gsap'

// Global Variables
let scene, camera, renderer, clock, gui, stats, controls
let canvas, sizes, elapsedTime
let geometry, material, plane
let pointLight, ambientLight

// initializing the third party libraries
canvas = document.querySelector('.canvas')
clock = new THREE.Clock()
gui = new GUI({ width: 400 })
stats = new Stats()
document.body.appendChild(stats.dom)
sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

function createScene() {
    scene = new THREE.Scene()
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    camera.position.z = 5
    renderer = new THREE.WebGLRenderer({
        canvas,
        antialias: true
    })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    // Controls for mouse movements
    controls = new OrbitControls(camera, canvas)
    controls.enableDamping = true
}

function createObjects() {
    geometry = new THREE.PlaneBufferGeometry(5, 5, 50, 50)
    material = new THREE.ShaderMaterial({
        side: THREE.DoubleSide,
        vertexShader: vShader,
        fragmentShader: fShader,
        uniforms: {
        }
    })
    plane = new THREE.Mesh(geometry, material)
    scene.add(plane)
}

function createLights() {
    // lights for display of objects 
    pointLight = new THREE.DirectionalLight(0xffffff, 1)
    pointLight.position.set(0, 3, 5)

    ambientLight = new THREE.AmbientLight(0xffffff, 0.4)

    scene.add(pointLight, ambientLight)
}

function animate() {
     elapsedTime = clock.getElapsedTime()
    // Update controls
    controls.update()
    stats.update()
    // Render
    renderer.render(scene, camera)
    // Call tick again on the next frame
    window.requestAnimationFrame(animate)
}

function init() {
    createScene()
    createObjects()
    createLights()
    animate()
}
init()

// resizing the window
window.addEventListener('resize', () => {
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})
