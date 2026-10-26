'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, Environment } from '@react-three/drei';
import * as THREE from 'three';

// ─── Brand Colours ────────────────────────────────────────────────────────────
const C = {
  carbon:     new THREE.Color('#171614'),
  ivory:      new THREE.Color('#F4EFE6'),
  terracotta: new THREE.Color('#B84A2B'),
  clay:       new THREE.Color('#DA6A43'),
  teal:       new THREE.Color('#1E5A63'),
  sand:       new THREE.Color('#DDD4C5'),
  tealLight:  new THREE.Color('#2a7a88'),
};

// ─── Mouse Parallax ───────────────────────────────────────────────────────────
function MouseParallax({ mouse }: { mouse: React.MutableRefObject<[number, number]> }) {
  const { camera } = useThree();
  useFrame(() => {
    const [mx, my] = mouse.current;
    camera.position.x += (mx * 0.7 - camera.position.x) * 0.03;
    camera.position.y += (my * 0.4 - camera.position.y) * 0.03;
    camera.lookAt(0, 0.2, 0);
  });
  return null;
}

// ─── Infrastructure Foundation ─────────────────────────────────────────────────
function InfrastructureFoundation() {
  const groupRef = useRef<THREE.Group>(null);
  useFrame((_, delta) => { if (groupRef.current) groupRef.current.rotation.y += delta * 0.03; });
  return (
    <group ref={groupRef} position={[0, -0.5, 0]}>
      {/* Base slab */}
      <mesh position={[0, -1.5, 0]} receiveShadow>
        <boxGeometry args={[3.8, 0.14, 3.8]} />
        <meshStandardMaterial color={C.carbon} metalness={0.9} roughness={0.15} />
      </mesh>

      {/* Corner pillars */}
      {([-1.4, 1.4] as const).flatMap((x) =>
        ([-1.4, 1.4] as const).map((z) => (
          <mesh key={`${x}-${z}`} position={[x, -0.65, z]} castShadow>
            <boxGeometry args={[0.18, 1.73, 0.18]} />
            <meshStandardMaterial color={C.carbon} metalness={0.8} roughness={0.25} />
          </mesh>
        ))
      )}

      {/* Terracotta accent cross-beams */}
      {[[-0.7, 0.7], [0.7, -0.7]].map(([x, z], i) => (
        <mesh key={`beam-${i}`} position={[x, -1.0, z]} rotation={[0, i * 0.8, 0.3]}>
          <cylinderGeometry args={[0.015, 0.015, 2.0, 4]} />
          <meshStandardMaterial color={C.terracotta} emissive={C.terracotta} emissiveIntensity={0.5} />
        </mesh>
      ))}

      {/* Top horizontal ring */}
      <mesh position={[0, -0.05, 0]}>
        <torusGeometry args={[1.5, 0.018, 4, 40]} />
        <meshStandardMaterial color={C.terracotta} emissive={C.terracotta} emissiveIntensity={0.35} transparent opacity={0.8} />
      </mesh>
    </group>
  );
}

// ─── Cloud Forms — translucent wireframe icosahedra ────────────────────────────
function CloudForms() {
  const forms = useMemo(() => [
    { pos: [-1.6, 1.0, -0.3] as [number,number,number], scale: 0.7, speed: 0.5 },
    { pos: [1.5, 1.5, 0.1] as [number,number,number], scale: 0.55, speed: 0.7 },
    { pos: [0.1, 2.0, -0.6] as [number,number,number], scale: 0.42, speed: 0.9 },
  ], []);

  return (
    <group>
      {forms.map((f, i) => (
        <Float key={i} speed={f.speed} rotationIntensity={0.35} floatIntensity={0.5} floatingRange={[-0.1, 0.1]}>
          <group position={f.pos}>
            {/* Solid inner */}
            <mesh castShadow>
              <icosahedronGeometry args={[f.scale * 0.6, 1]} />
              <meshStandardMaterial
                color={C.teal}
                transparent
                opacity={0.18}
                metalness={0.2}
                roughness={0.1}
                side={THREE.DoubleSide}
              />
            </mesh>
            {/* Wireframe outer */}
            <mesh>
              <icosahedronGeometry args={[f.scale * 0.65, 1]} />
              <meshStandardMaterial
                color={C.tealLight}
                transparent
                opacity={0.55}
                metalness={0.5}
                roughness={0.1}
                wireframe
              />
            </mesh>
          </group>
        </Float>
      ))}
    </group>
  );
}

// ─── Container Modules ─────────────────────────────────────────────────────────
function ContainerModules() {
  const groupRef = useRef<THREE.Group>(null);
  const modules = useMemo(() => [
    { pos: [-1.0, 0.15, 0.5] as [number,number,number], color: C.terracotta, rx: 0.25,  ry: 0.3  },
    { pos: [0.3, -0.35, 1.0] as [number,number,number], color: C.clay,       rx: -0.15, ry: -0.4 },
    { pos: [1.1, 0.25, 0.3] as [number,number,number],  color: C.sand,       rx: 0.1,   ry: 0.5  },
    { pos: [-0.15, 0.7, -0.1] as [number,number,number], color: C.carbon,     rx: -0.2,  ry: 0.2  },
  ], []);
  useFrame((state) => {
    if (groupRef.current) groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.1) * 0.12;
  });
  return (
    <group ref={groupRef}>
      {modules.map((m, i) => (
        <mesh key={i} position={m.pos} rotation={[m.rx, m.ry, 0]} castShadow>
          <boxGeometry args={[0.44, 0.44, 0.44]} />
          <meshStandardMaterial color={m.color} metalness={0.35} roughness={0.6} />
        </mesh>
      ))}
    </group>
  );
}

// ─── Connecting Lines ─────────────────────────────────────────────────────────
function ConnectionMesh() {
  const lineRef = useRef<THREE.LineSegments>(null);
  const geometry = useMemo(() => {
    const nodes = [
      new THREE.Vector3(0, -0.5 - 1.5, 0),   // Foundation
      new THREE.Vector3(-1.0, 0.15, 0.5),      // Module 1
      new THREE.Vector3(0.3, -0.35, 1.0),      // Module 2
      new THREE.Vector3(1.1, 0.25, 0.3),       // Module 3
      new THREE.Vector3(-0.15, 0.7, -0.1),     // Module 4
      new THREE.Vector3(-1.6, 1.0, -0.3),      // Cloud 1
      new THREE.Vector3(1.5, 1.5, 0.1),        // Cloud 2
      new THREE.Vector3(0.1, 2.0, -0.6),       // Cloud 3
    ];
    const edges = [
      [0,1],[0,2],[0,3],[0,4],
      [1,5],[3,6],[4,7],
      [5,6],[6,7],[5,7],
      [1,2],[2,3],[3,4],[4,1],
    ];
    const pos: number[] = [];
    edges.forEach(([a,b]) => {
      pos.push(nodes[a].x,nodes[a].y,nodes[a].z, nodes[b].x,nodes[b].y,nodes[b].z);
    });
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
    return geo;
  }, []);
  useFrame((state) => {
    if (lineRef.current?.material) {
      (lineRef.current.material as THREE.LineBasicMaterial).opacity =
        0.28 + Math.sin(state.clock.elapsedTime * 0.7) * 0.12;
    }
  });
  return (
    <lineSegments ref={lineRef} geometry={geometry}>
      <lineBasicMaterial color={C.terracotta} transparent opacity={0.35} />
    </lineSegments>
  );
}

// ─── Pulsing Nodes ────────────────────────────────────────────────────────────
function NetworkNodes() {
  const nodePositions: [number,number,number][] = [
    [0,-2.0,0],
    [-1.0,0.15,0.5],[0.3,-0.35,1.0],[1.1,0.25,0.3],[-0.15,0.7,-0.1],
    [-1.6,1.0,-0.3],[1.5,1.5,0.1],[0.1,2.0,-0.6],
  ];
  const pMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: C.terracotta, emissive: C.terracotta, emissiveIntensity: 1.4, roughness: 0, metalness: 0,
  }), []);
  const tMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: C.tealLight, emissive: C.tealLight, emissiveIntensity: 1.0, roughness: 0, metalness: 0,
  }), []);
  const refs = useRef<(THREE.Mesh|null)[]>([]);
  useFrame((state) => {
    refs.current.forEach((m, i) => {
      if (m) m.scale.setScalar(1 + Math.sin(state.clock.elapsedTime * 1.3 + i * 0.85) * 0.3);
    });
  });
  return (
    <group>
      {nodePositions.map((pos, i) => (
        <mesh key={i} position={pos} ref={(el) => { refs.current[i] = el; }}>
          <sphereGeometry args={[0.05, 8, 8]} />
          <primitive object={i < 5 ? pMat : tMat} />
        </mesh>
      ))}
    </group>
  );
}

// ─── Automation Ring with orbiting dots ───────────────────────────────────────
function AutomationRing() {
  const ringRef = useRef<THREE.Mesh>(null);
  const dotGroupRef = useRef<THREE.Group>(null);
  const dotMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: C.teal, emissive: C.teal, emissiveIntensity: 0.8,
  }), []);
  const dots = useMemo(() => Array.from({length: 6}, (_, i) => {
    const a = (i / 6) * Math.PI * 2;
    return { pos: [Math.cos(a) * 2.2, Math.sin(a) * 2.2, 0] as [number,number,number] };
  }), []);
  useFrame((state, delta) => {
    if (ringRef.current) {
      ringRef.current.rotation.z += delta * 0.22;
      ringRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.15) * 0.08;
    }
    if (dotGroupRef.current) dotGroupRef.current.rotation.z -= delta * 0.44;
  });
  return (
    <group position={[0, 0.15, 0]}>
      <mesh ref={ringRef}>
        <torusGeometry args={[2.2, 0.022, 6, 80]} />
        <meshStandardMaterial color={C.teal} emissive={C.teal} emissiveIntensity={0.3} transparent opacity={0.5} />
      </mesh>
      <group ref={dotGroupRef}>
        {dots.map((d, i) => (
          <mesh key={i} position={d.pos}>
            <sphereGeometry args={[0.055, 6, 6]} />
            <primitive object={dotMat} />
          </mesh>
        ))}
      </group>
    </group>
  );
}

// ─── Outer Orbital Rings ──────────────────────────────────────────────────────
function OrbitalRings() {
  const r1 = useRef<THREE.Mesh>(null);
  const r2 = useRef<THREE.Mesh>(null);
  useFrame((_, delta) => {
    if (r1.current) r1.current.rotation.z += delta * 0.05;
    if (r2.current) r2.current.rotation.x += delta * 0.07;
  });
  return (
    <group>
      <mesh ref={r1} rotation={[Math.PI / 2.6, 0.25, 0]}>
        <torusGeometry args={[2.9, 0.01, 4, 120]} />
        <meshStandardMaterial color={C.sand} transparent opacity={0.22} />
      </mesh>
      <mesh ref={r2} rotation={[0.3, Math.PI / 3, 0]}>
        <torusGeometry args={[3.4, 0.007, 4, 140]} />
        <meshStandardMaterial color={C.terracotta} transparent opacity={0.14} />
      </mesh>
    </group>
  );
}

// ─── Whole ecosystem slow rotation ───────────────────────────────────────────
function SlowRotation({ children }: { children: React.ReactNode }) {
  const ref = useRef<THREE.Group>(null);
  useFrame((_, delta) => { if (ref.current) ref.current.rotation.y += delta * 0.045; });
  return <group ref={ref}>{children}</group>;
}

// ─── Scene Root ───────────────────────────────────────────────────────────────
function SceneContent({ mouse }: { mouse: React.MutableRefObject<[number, number]> }) {
  return (
    <>
      <MouseParallax mouse={mouse} />
      <color attach="background" args={['#F4EFE6']} />

      <ambientLight intensity={0.7} color={'#F8F4EC'} />
      <directionalLight position={[5, 7, 4]} intensity={1.6} color={'#FFF8F0'} castShadow shadow-mapSize={[512,512]} />
      <directionalLight position={[-4, 2, -3]} intensity={0.5} color={'#F4EFE6'} />
      <pointLight position={[-2, 3, 2]} intensity={1.4} color={'#B84A2B'} distance={8} decay={2} />
      <pointLight position={[2, 4, -2]} intensity={0.9} color={'#1E5A63'} distance={8} decay={2} />

      <Environment preset="apartment" />

      <SlowRotation>
        <InfrastructureFoundation />
        <ContainerModules />
        <CloudForms />
        <ConnectionMesh />
        <NetworkNodes />
        <AutomationRing />
      </SlowRotation>

      <OrbitalRings />
    </>
  );
}

// ─── Static Fallback SVG ──────────────────────────────────────────────────────
function StaticFallback() {
  return (
    <div className="w-full h-full flex items-center justify-center" aria-hidden="true">
      <svg viewBox="0 0 400 420" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-72 h-72 opacity-85">
        {/* Foundation base */}
        <rect x="130" y="348" width="140" height="12" rx="2" fill="#171614" />
        {/* Corner pillars */}
        {[[145,240],[175,240],[225,240],[255,240]].map(([x,y],i) => (
          <rect key={i} x={x} y={y} width="12" height="108" rx="2" fill="#171614" />
        ))}
        {/* Connecting horizontal */}
        <line x1="145" y1="270" x2="267" y2="270" stroke="#B84A2B" strokeWidth="1.5" strokeOpacity="0.5"/>
        {/* Container modules */}
        {[[118,205],[176,195],[234,202],[176,248]].map(([x,y],i) => (
          <rect key={i} x={x} y={y} width="42" height="42" rx="4"
            fill={['#B84A2B','#DA6A43','#DDD4C5','#171614'][i]} opacity="0.88" />
        ))}
        {/* Cloud wireframe icosahedra */}
        {[[115,148,20],[200,95,17],[278,135,14]].map(([cx,cy,r],i) => (
          <g key={i}>
            <polygon
              points={Array.from({length:6},(_,k)=>{const a=(k/6)*Math.PI*2;return `${cx+Math.cos(a)*r},${cy+Math.sin(a)*r}`;}).join(' ')}
              stroke="#1E5A63" strokeWidth="1.2" fill="#1E5A63" fillOpacity="0.12" strokeOpacity="0.6"
            />
          </g>
        ))}
        {/* Connection lines */}
        {[
          [200,348,139,247],[200,348,200,237],[200,348,261,244],
          [139,247,115,168],[261,244,278,149],[200,237,200,112],
          [115,168,115,148],[278,149,278,135],
        ].map(([x1,y1,x2,y2],i) => (
          <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#B84A2B" strokeWidth="1.5" strokeOpacity="0.38" />
        ))}
        {/* Automation ring */}
        <circle cx="200" cy="210" r="132" stroke="#1E5A63" strokeWidth="1" strokeOpacity="0.2" fill="none" strokeDasharray="5 9" />
        {/* Outer ring */}
        <circle cx="200" cy="210" r="165" stroke="#DDD4C5" strokeWidth="0.8" strokeOpacity="0.25" fill="none" />
        {/* Nodes */}
        {[[200,348],[139,247],[200,237],[261,244],[115,148],[200,112],[278,135]].map(([cx,cy],i) => (
          <circle key={i} cx={cx} cy={cy} r="5" fill={i>3?'#2a7a88':'#B84A2B'} />
        ))}
      </svg>
    </div>
  );
}

// ─── Exported Component ───────────────────────────────────────────────────────
interface EcosystemSceneProps {
  mouse: React.MutableRefObject<[number, number]>;
  scrollY: React.MutableRefObject<number>;
  reducedMotion: boolean;
  isMobile: boolean;
}

export default function EcosystemScene({ mouse, reducedMotion, isMobile }: EcosystemSceneProps) {
  if (reducedMotion || isMobile) return <StaticFallback />;
  return (
    <Canvas
      camera={{ position: [0, 0.5, 6.5], fov: 46 }}
      dpr={[1, 1.5]}
      shadows
      gl={{ antialias: true, alpha: false, powerPreference: 'high-performance' }}
    >
      <SceneContent mouse={mouse} />
    </Canvas>
  );
}
