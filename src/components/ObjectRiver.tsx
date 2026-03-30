"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

const OBJECT_COUNT = 150;
const COLORS = ["#141414", "#3d3d3d", "#7d7a6f", "#c9c3b4", "#4a4a4a", "#1a1a1a", "#a09a8c"];

interface FloatingObject {
  position: THREE.Vector3;
  flowPosition: THREE.Vector3;
  displacement: THREE.Vector3;
  rotation: THREE.Euler;
  speed: number;
  rotSpeed: THREE.Vector3;
  scale: number;
  shape: number;
  color: string;
  offset: number;
}

function RiverObjects() {
  const groupRef = useRef<THREE.Group>(null);
  const mouse = useRef(new THREE.Vector2(0, 0));
  const mouseWorld = useRef(new THREE.Vector3(0, 0, 0));
  const { viewport } = useThree();

  const objects = useMemo<FloatingObject[]>(() => {
    return Array.from({ length: OBJECT_COUNT }, (_, i) => {
      const t = i / OBJECT_COUNT;
      const spread = 3;
      const pos = new THREE.Vector3(
        6 - t * 14 + (Math.random() - 0.5) * spread,
        5 - t * 12 + (Math.random() - 0.5) * spread,
        -1 + (Math.random() - 0.5) * 3
      );
      return {
        position: pos.clone(),
        flowPosition: pos.clone(),
        displacement: new THREE.Vector3(0, 0, 0),
        rotation: new THREE.Euler(
          Math.random() * Math.PI * 2,
          Math.random() * Math.PI * 2,
          Math.random() * Math.PI * 2
        ),
        speed: 0.4 + Math.random() * 0.6,
        rotSpeed: new THREE.Vector3(
          (Math.random() - 0.5) * 0.025,
          (Math.random() - 0.5) * 0.025,
          (Math.random() - 0.5) * 0.02
        ),
        scale: 0.15 + Math.random() * 0.45,
        shape: Math.floor(Math.random() * 6),
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        offset: Math.random() * Math.PI * 2,
      };
    });
  }, []);

  useFrame((state) => {
    const time = state.clock.elapsedTime;
    const pointer = state.pointer;

    // Convert pointer to world coordinates
    mouse.current.set(pointer.x, pointer.y);
    mouseWorld.current.set(
      pointer.x * viewport.width * 0.5,
      pointer.y * viewport.height * 0.5,
      0
    );

    objects.forEach((obj) => {
      // Update flow position — strong diagonal top-right to bottom-left
      obj.flowPosition.x -= obj.speed * 0.025;
      obj.flowPosition.y -= obj.speed * 0.018;

      // Swirl on flow path
      obj.flowPosition.x += Math.sin(time * 0.35 + obj.offset) * 0.004;
      obj.flowPosition.y += Math.cos(time * 0.3 + obj.offset) * 0.003;
      obj.flowPosition.z += Math.sin(time * 0.2 + obj.offset * 2) * 0.002;

      // Mouse repulsion — push displacement, not position
      const dx = (obj.flowPosition.x + obj.displacement.x) - mouseWorld.current.x;
      const dy = (obj.flowPosition.y + obj.displacement.y) - mouseWorld.current.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const repelRadius = 2.5;

      if (dist < repelRadius) {
        const force = (1 - dist / repelRadius) * 0.2;
        const angle = Math.atan2(dy, dx);
        obj.displacement.x += Math.cos(angle) * force;
        obj.displacement.y += Math.sin(angle) * force;
        obj.displacement.z += (Math.random() - 0.5) * force * 0.3;

        // Faster rotation near cursor
        obj.rotation.x += obj.rotSpeed.x * 3;
        obj.rotation.y += obj.rotSpeed.y * 3;
        obj.rotation.z += obj.rotSpeed.z * 3;
      } else {
        obj.rotation.x += obj.rotSpeed.x;
        obj.rotation.y += obj.rotSpeed.y;
        obj.rotation.z += obj.rotSpeed.z;
      }

      // Displacement lerps back to zero (spring return)
      obj.displacement.x *= 0.94;
      obj.displacement.y *= 0.94;
      obj.displacement.z *= 0.94;

      // Final position = flow + displacement
      obj.position.x = obj.flowPosition.x + obj.displacement.x;
      obj.position.y = obj.flowPosition.y + obj.displacement.y;
      obj.position.z = obj.flowPosition.z + obj.displacement.z;

      // Respawn when off screen
      if (obj.flowPosition.x < -8 || obj.flowPosition.y < -7) {
        obj.flowPosition.x = 8 + Math.random() * 4;
        obj.flowPosition.y = 6 + Math.random() * 4;
        obj.flowPosition.z = -1 + (Math.random() - 0.5) * 3;
        obj.displacement.set(0, 0, 0);
      }
    });

    if (groupRef.current) {
      const children = groupRef.current.children;
      for (let i = 0; i < children.length; i++) {
        const obj = objects[i];
        if (obj) {
          children[i].position.copy(obj.position);
          children[i].rotation.copy(obj.rotation);
        }
      }
    }
  });

  const geometries = useMemo(
    () => [
      new THREE.BoxGeometry(1, 1, 1),
      new THREE.OctahedronGeometry(0.6),
      new THREE.TetrahedronGeometry(0.7),
      new THREE.TorusGeometry(0.4, 0.15, 8, 16),
      new THREE.CylinderGeometry(0.3, 0.3, 1, 6),
      new THREE.IcosahedronGeometry(0.5),
    ],
    []
  );

  return (
    <group ref={groupRef}>
      {objects.map((obj, i) => (
        <mesh
          key={i}
          position={obj.position}
          rotation={obj.rotation}
          scale={obj.scale}
          geometry={geometries[obj.shape]}
        >
          <meshStandardMaterial
            color={obj.color}
            roughness={0.85}
            metalness={0.05}
            transparent
            opacity={0.5 + obj.scale * 1.2}
          />
        </mesh>
      ))}
    </group>
  );
}

export default function ObjectRiver() {
  return (
    <div className="w-full h-full overflow-hidden" style={{ background: "var(--paper-edge)", position: "absolute", inset: 0 }}>
      <Canvas
        camera={{ position: [0, 0, 4.5], fov: 55 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
        dpr={[1, 1.5]}
      >
        <color attach="background" args={["#e8e2d4"]} />
        <fog attach="fog" args={["#e8e2d4", 3, 10]} />

        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 3]} intensity={0.9} color="#f5f0e8" />
        <directionalLight position={[-3, -2, 2]} intensity={0.3} color="#c9c3b4" />
        <pointLight position={[0, 0, 4]} intensity={0.2} color="#f4efe4" />

        <RiverObjects />
      </Canvas>
    </div>
  );
}
