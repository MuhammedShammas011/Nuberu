'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, MeshTransmissionMaterial, Environment } from '@react-three/drei';
import * as THREE from 'three';

const COLOURS = {
  carbon:     new THREE.Color('#171614'),
  ivory:      new THREE.Color('#F4EFE6'),
  terracotta: new THREE.Color('#B84A2B'),
  clay:       new THREE.Color('#DA6A43'),
  teal:       new THREE.Color('#1E5A63'),
  sand:       new THREE.Color('#DDD4C5'),
};

function MouseParallax({ mouse }: { mouse: React.MutableRefObject<[number, number]> }) {
  const { camera } = useThree();
  useFrame(() => {
    const [mx, my] = mouse.current;
    camera.position.x += (mx * 0.8 - camera.position.x) * 0.04;
    camera.position.y += (my * 0.5 - camera.position.y) * 0.04;
    camera.lookAt(0, 0, 0);
  });
  return null;
}

function InfrastructureFoundation() {
  const groupRef = useRef<THREE.Group>(null);
  const mat = useMemo(() => new THREE.MeshStandardMaterial({
    color: COLOURS.carbon, metalness: 0.7, roughness: 0.3,
  }), []);
  const bars = useMemo(() => {
    const out: [number, number, number, number, number, number][] = [];
    for (let i = 0; i < 8; i++) {
      const angle = (i / 8) * Math.PI * 2;
      out.push([Math.cos(angle) * 1.8, -1.6, Math.sin(angle) * 1.8, Math.cos(angle) * 1.4, -0.6, Math.sin(angle) * 1.4]);
    }
    return out;
  }, []);
  useFrame((_, delta) => { if (groupRef.current) groupRef.current.rotation.y += delta * 0.04; });
  return (
    <group ref={groupRef}>
      <mesh position={[0, -2.0, 0]} receiveShadow castShadow>
        <boxGeometry args={[4.2, 0.18, 4.2]} />
        <meshStandardMaterial color={COLOURS.carbon} metalness={0.85} roughness={0.2} />
      </mesh>
      {([-1.6, 1.6] as const).flatMap((x) =>
        ([-1.6, 1.6] as const).map((z, j) => (
          <mesh key={`${x}-${z}`} position={[x, -1.0, z]} castShadow>
            <boxGeometry args={[0.22, 2.1, 0.22]} />
            <primitive object={mat} />
          </mesh>
        ))
      )}
      {bars.map(([x1,y1,z1,x2,y2,z2], i) => {
        const s = new THREE.Vector3(x1,y1,z1), e = new THREE.Vector3(x2,y2,z2);
        const mid = s.clone().add(e).multiplyScalar(0.5);
        const dir = e.clone().sub(s);
        const len = dir.length();
        const q = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0,1,0), dir.normalize());
        return (
          <mesh key={`bar-${i}`} position={mid} quaternion={q}>
            <cylinderGeometry args={[0.02, 0.02, len, 4]} />
            <meshStandardMaterial color={COLOURS.terracotta} emissive={COLOURS.terracotta} emissiveIntensity={0.3} />
          </mesh>
        );
      })}
    </group>
  );
}

function CloudForms() {
  const forms = useMemo(() => [
    { pos: [-1.8, 1.2, -0.4] as [number,number,number], scale: 0.9, speed: 0.6 },
    { pos: [1.4, 1.8, 0.2] as [number,number,number], scale: 0.7, speed: 0.8 },
    { pos: [0.2, 2.2, -0.8] as [number,number,number], scale: 0.5, speed: 1.0 },
  ], []);
  return (
    <group>
      {forms.map((f, i) => (
        <Float key={i} speed={f.speed} rotationIntensity={0.4} floatIntensity={0.6} floatingRange={[-0.12, 0.12]}>
          <mesh position={f.pos} castShadow>
            <icosahedronGeometry args={[f.scale * 0.65, 1]} />
            <MeshTransmissionMaterial backside samples={4} thickness={0.3} roughness={0.05}
              chromaticAberration={0.06} color={COLOURS.teal} attenuationColor={COLOURS.teal} attenuationDistance={0.8} />
          </mesh>
        </Float>
      ))}
    </group>
  );
}

function ContainerModules() {
  const groupRef = useRef<THREE.Group>(null);
  const modules = useMemo(() => [
    { pos: [-1.1, 0.0, 0.6] as [number,number,number], color: COLOURS.terracotta, rx: 0.3 },
    { pos: [0.2, -0.4, 1.1] as [number,number,number], color: COLOURS.clay, rx: -0.2 },
    { pos: [1.2, 0.3, 0.4] as [number,number,number], color: COLOURS.sand, rx: 0.1 },
    { pos: [-0.2, 0.6, -0.2] as [number,number,number], color: COLOURS.carbon, rx: -0.15 },
  ], []);
  useFrame((state) => { if (groupRef.current) groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.12) * 0.15; });
  return (
    <group ref={groupRef}>
      {modules.map((m, i) => (
        <mesh key={i} position={m.pos} rotation={[m.rx, 0, 0]} castShadow>
          <boxGeometry args={[0.48, 0.48, 0.48]} />
          <meshStandardMaterial color={m.color} metalness={0.4} roughness={0.55} />
        </mesh>
      ))}
    </group>
  );
}

function ConnectionMesh() {
  const lineRef = useRef<THREE.LineSegments>(null);
  const geometry = useMemo(() => {
    const nodes = [
      new THREE.Vector3(0,-1.9,0), new THREE.Vector3(-1.1,0.0,0.6),
      new THREE.Vector3(0.2,-0.4,1.1), new THREE.Vector3(1.2,0.3,0.4),
      new THREE.Vector3(-0.2,0.6,-0.2), new THREE.Vector3(-1.8,1.2,-0.4),
      new THREE.Vector3(1.4,1.8,0.2), new THREE.Vector3(0.2,2.2,-0.8),
    ];
    const edges = [[0,1],[0,2],[0,3],[0,4],[1,5],[2,4],[3,6],[4,7],[5,6],[6,7],[5,7],[1,2],[2,3],[3,4]];
    const pos: number[] = [];
    edges.forEach(([a,b]) => { pos.push(nodes[a].x,nodes[a].y,nodes[a].z,nodes[b].x,nodes[b].y,nodes[b].z); });
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
    return geo;
  }, []);
  useFrame((state) => {
    if (lineRef.current?.material) {
      (lineRef.current.material as THREE.LineBasicMaterial).opacity = 0.35 + Math.sin(state.clock.elapsedTime * 0.8) * 0.15;
    }
  });
  return (
    <lineSegments ref={lineRef} geometry={geometry}>
      <lineBasicMaterial color={COLOURS.terracotta} transparent opacity={0.4} />
    </lineSegments>
  );
}

function NetworkNodes() {
  const positions: [number,number,number][] = [
    [0,-1.9,0],[-1.1,0.0,0.6],[0.2,-0.4,1.1],[1.2,0.3,0.4],
    [-0.2,0.6,-0.2],[-1.8,1.2,-0.4],[1.4,1.8,0.2],[0.2,2.2,-0.8],
  ];
  const pMat = useMemo(() => new THREE.MeshStandardMaterial({ color: COLOURS.terracotta, emissive: COLOURS.terracotta, emissiveIntensity: 1.2 }), []);
  const tMat = useMemo(() => new THREE.MeshStandardMaterial({ color: COLOURS.teal, emissive: COLOURS.teal, emissiveIntensity: 0.8 }), []);
  const refs = useRef<(THREE.Mesh|null)[]>([]);
  useFrame((state) => {
    refs.current.forEach((m, i) => { if (m) { m.scale.setScalar(1 + Math.sin(state.clock.elapsedTime * 1.4 + i * 0.9) * 0.22); } });
  });
  return (
    <group>
      {positions.map((pos, i) => (
        <mesh key={i} position={pos} ref={(el) => { refs.current[i] = el; }} castShadow>
          <sphereGeometry args={[0.055, 8, 8]} />
          <primitive object={i < 5 ? pMat : tMat} />
        </mesh>
      ))}
    </group>
  );
}

function AutomationRing() {
  const ringRef = useRef<THREE.Mesh>(null);
  const dotGroupRef = useRef<THREE.Group>(null);
  const dotMat = useMemo(() => new THREE.MeshStandardMaterial({ color: COLOURS.teal, emissive: COLOURS.teal, emissiveIntensity: 0.6 }), []);
  const dots = useMemo(() => Array.from({length:8},(_,i) => {
    const a = (i/8)*Math.PI*2;
    return { pos: [Math.cos(a)*2.4, Math.sin(a)*2.4, 0] as [number,number,number] };
  }), []);
  useFrame((state, delta) => {
    if (ringRef.current) { ringRef.current.rotation.z += delta * 0.3; ringRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.1; }
    if (dotGroupRef.current) dotGroupRef.current.rotation.z -= delta * 0.55;
  });
  return (
    <group position={[0, 0.2, 0]}>
      <mesh ref={ringRef}>
        <torusGeometry args={[2.4, 0.025, 6, 80]} />
        <meshStandardMaterial color={COLOURS.teal} emissive={COLOURS.teal} emissiveIntensity={0.4} transparent opacity={0.55} />
      </mesh>
      <group ref={dotGroupRef}>
        {dots.map((d, i) => (
          <mesh key={i} position={d.pos}>
            <sphereGeometry args={[0.06, 6, 6]} />
            <primitive object={dotMat} />
          </mesh>
        ))}
      </group>
    </group>
  );
}

function OrbitalRings() {
  const r1 = useRef<THREE.Mesh>(null), r2 = useRef<THREE.Mesh>(null);
  useFrame((_, delta) => {
    if (r1.current) r1.current.rotation.z += delta * 0.06;
    if (r2.current) r2.current.rotation.x += delta * 0.09;
  });
  return (
    <group>
      <mesh ref={r1} rotation={[Math.PI/2.8, 0.2, 0]}>
        <torusGeometry args={[3.1, 0.012, 4, 120]} />
        <meshStandardMaterial color={COLOURS.sand} transparent opacity={0.18} />
      </mesh>
      <mesh ref={r2} rotation={[0.3, Math.PI/3, 0]}>
        <torusGeometry args={[3.6, 0.008, 4, 140]} />
        <meshStandardMaterial color={COLOURS.terracotta} transparent opacity={0.12} />
      </mesh>
    </group>
  );
}

function SlowRotation({ children }: { children: React.ReactNode }) {
  const ref = useRef<THREE.Group>(null);
  useFrame((_, delta) => { if (ref.current) ref.current.rotation.y += delta * 0.05; });
  return <group ref={ref}>{children}</group>;
}

function SceneContent({ mouse }: { mouse: React.MutableRefObject<[number, number]> }) {
  return (
    <>
      <MouseParallax mouse={mouse} />
      <ambientLight intensity={0.55} color={COLOURS.ivory} />
      <directionalLight position={[4,6,3]} intensity={1.2} color={COLOURS.ivory} castShadow shadow-mapSize={[512,512]} />
      <pointLight position={[-3,2,-2]} intensity={0.8} color={COLOURS.terracotta} />
      <pointLight position={[2,3,2]} intensity={0.5} color={COLOURS.teal} />
      <Environment preset="studio" />
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

function StaticFallback() {
  return (
    <div className="w-full h-full flex items-center justify-center" aria-hidden="true">
      <svg viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-64 h-64 opacity-80">
        <rect x="140" y="330" width="120" height="14" rx="2" fill="#171614" />
        {[160,200,240].map((x,i) => <rect key={i} x={x-5} y="220" width="10" height="110" rx="2" fill="#171614" />)}
        {[[120,200],[180,190],[240,200],[180,240]].map(([x,y],i) => (
          <rect key={i} x={x} y={y} width="40" height="40" rx="4"
            fill={['#B84A2B','#DA6A43','#DDD4C5','#171614'][i]} opacity="0.85" />
        ))}
        {[[120,140],[200,100],[270,130]].map(([cx,cy],i) => (
          <circle key={i} cx={cx} cy={cy} r={22-i*4} fill="#1E5A63" opacity={0.35+i*0.1} />
        ))}
        {[[200,330,140,220],[200,330,200,220],[200,330,260,220],[140,220,120,160],[260,220,270,152],[120,160,120,140],[200,220,200,122],[270,150,270,130]].map(([x1,y1,x2,y2],i) => (
          <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#B84A2B" strokeWidth="1.5" strokeOpacity="0.4" />
        ))}
        <circle cx="200" cy="200" r="145" stroke="#1E5A63" strokeWidth="1" strokeOpacity="0.22" fill="none" strokeDasharray="4 8" />
        <circle cx="200" cy="200" r="170" stroke="#DDD4C5" strokeWidth="0.8" strokeOpacity="0.18" fill="none" />
        {[[200,330],[140,220],[200,220],[260,220],[120,140],[200,122],[270,130]].map(([cx,cy],i) => (
          <circle key={i} cx={cx} cy={cy} r="5" fill={i>3?'#1E5A63':'#B84A2B'} />
        ))}
      </svg>
    </div>
  );
}

interface EcosystemSceneProps {
  mouse: React.MutableRefObject<[number, number]>;
  scrollY: React.MutableRefObject<number>;
  reducedMotion: boolean;
  isMobile: boolean;
}

export default function EcosystemScene({ mouse, reducedMotion, isMobile }: EcosystemSceneProps) {
  if (reducedMotion || isMobile) return <StaticFallback />;
  return (
    <Canvas camera={{ position: [0, 0.5, 7], fov: 42 }} dpr={[1, 1.5]} shadows
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      style={{ background: 'transparent' }}>
      <SceneContent mouse={mouse} />
    </Canvas>
  );
}
