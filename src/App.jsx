import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Suspense, useRef, useState } from 'react'
import { useGLTF, Environment } from '@react-three/drei'
import { EffectComposer, DepthOfField } from '@react-three/postprocessing'
import * as THREE from 'three'

// function Banana({ z }) {
//   const ref = useRef()
//   const { nodes, materials } = useGLTF('/banana-v1-transformed.glb')
//   const { viewport, camera } = useThree()
//   const { width, height } = viewport.getCurrentViewport(camera, [0, 0, z])

//   const [data] = useState({
//     x: THREE.MathUtils.randFloatSpread(2),
//     y: THREE.MathUtils.randFloatSpread(height),
//     rX: Math.random() * Math.PI,
//     rY: Math.random() * Math.PI,
//     rZ: Math.random() * Math.PI,
//   })

//   useFrame((state) => {
//     ref.current.rotation.set(
//       (data.rX += 0.001),
//       (data.rY += 0.001),
//       (data.rZ += 0.001)
//     )

//     ref.current.position.set(data.x * width, (data.y += 0.025), z)

//     if (data.y > height) data.y = -height
//   })

//   return (
//     <mesh
//       ref={ref}
//       geometry={nodes.bananas.geometry}
//       material={materials.skin}
//       material-emissive='orange'
//     />
//   )
// }

function Pokeball({ z }) {
  const ref = useRef()
  const { nodes, materials } = useGLTF('/pokeball-v2-transformed.glb')
  const { viewport, camera } = useThree()
  const { width, height } = viewport.getCurrentViewport(camera, [0, 0, z])

  const [data] = useState({
    x: THREE.MathUtils.randFloatSpread(2),
    y: THREE.MathUtils.randFloatSpread(height),
    rX: Math.random() * Math.PI,
    rY: Math.random() * Math.PI,
    rZ: Math.random() * Math.PI,
  })

  useFrame((state) => {
    ref.current.rotation.set(
      (data.rX += 0.001),
      (data.rY += 0.001),
      (data.rZ += 0.005)
    )

    ref.current.position.set(data.x * width, (data.y += 0.025), z)

    if (data.y > height) data.y = -height
  })

  return (
    <mesh
      ref={ref}
      scale={0.016}
      geometry={nodes.PokeBall__0.geometry}
      material={materials['Scene_-_Root']}
      material-emissive='darkblue'
    />
  )
}

export default function App({ count = 70, depth = 70 }) {
  return (
    <Canvas
      gl={{ alpha: false, antialias: true }}
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 10], fov: 20, near: 0.01, far: depth + 20 }}
    >
      <color attach='background' args={['#2a75bb']} />

      <ambientLight intensity={0.2} />
      <spotLight
        position={[10, 20, 10]}
        penumbra={1}
        intensity={3.5}
        color='white'
      />

      <Suspense fallback={null}>
        <Environment preset='sunset' />

        {Array.from({ length: count }, (_, i) => (
          <Pokeball key={i} z={-(i / count) * depth - 25} />
        ))}

        <EffectComposer multisampling={0}>
          <DepthOfField
            target={[0, 0, 56]}
            focalLength={0.8}
            bokehScale={10}
            height={700}
          />
        </EffectComposer>
      </Suspense>
    </Canvas>
  )
}
