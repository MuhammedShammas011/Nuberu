'use client';

import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

export default function AboutHero3D() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    // Scene & Camera
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
      36,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    camera.position.set(2.8, 1.8, 5.2);

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.18;

    // Main Group for interactive mouse parallax
    const mainGroup = new THREE.Group();
    scene.add(mainGroup);

    // ─── Studio Lighting Setup ───────────────────────────────────────────────
    const ambientLight = new THREE.AmbientLight(0xfffbf5, 1.6);
    scene.add(ambientLight);

    // Key directional light casting soft shadows
    const keyLight = new THREE.DirectionalLight(0xffffff, 2.6);
    keyLight.position.set(4.5, 7.5, 4.5);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 2048;
    keyLight.shadow.mapSize.height = 2048;
    keyLight.shadow.camera.near = 0.5;
    keyLight.shadow.camera.far = 20;
    keyLight.shadow.camera.left = -3;
    keyLight.shadow.camera.right = 3;
    keyLight.shadow.camera.top = 3;
    keyLight.shadow.camera.bottom = -3;
    keyLight.shadow.bias = -0.0006;
    keyLight.shadow.radius = 2.5;
    scene.add(keyLight);

    // Fill light from left
    const fillLight = new THREE.DirectionalLight(0xf4efe6, 1.2);
    fillLight.position.set(-4, 3, 1);
    scene.add(fillLight);

    // Warm terracotta point light accent
    const accentLight = new THREE.PointLight(0xb84a2b, 1.8, 4);
    accentLight.position.set(0.6, 0.6, 1.2);
    scene.add(accentLight);

    // ─── Materials ───────────────────────────────────────────────────────────
    // Travertine stone material
    const travertineMaterial = new THREE.MeshStandardMaterial({
      color: 0xe5dfd5,
      roughness: 0.88,
      metalness: 0.04,
    });

    // Dark charcoal monolithic stone material
    const charcoalMaterial = new THREE.MeshStandardMaterial({
      color: 0x181716,
      roughness: 0.42,
      metalness: 0.12,
    });

    // Terracotta metallic coin/disc material
    const terracottaMaterial = new THREE.MeshStandardMaterial({
      color: 0xb84a2b,
      roughness: 0.28,
      metalness: 0.45,
    });

    // Polished gold/brass ring material
    const goldMaterial = new THREE.MeshStandardMaterial({
      color: 0xd4a559,
      roughness: 0.15,
      metalness: 0.88,
    });

    // Refractive frosted glass material
    const glassMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      transmission: 0.92,
      opacity: 1,
      transparent: true,
      roughness: 0.08,
      ior: 1.52,
      thickness: 0.6,
      specularIntensity: 1,
      clearcoat: 1,
      clearcoatRoughness: 0.1,
    });

    // ─── Architectural Sculpture Elements ────────────────────────────────────

    // 1. Lower Plinth Base Slab
    const basePlinth = new THREE.Mesh(
      new THREE.BoxGeometry(2.9, 0.24, 2.2),
      travertineMaterial
    );
    basePlinth.position.set(0.2, -0.42, 0);
    basePlinth.receiveShadow = true;
    basePlinth.castShadow = true;
    mainGroup.add(basePlinth);

    // 2. Stepped Second Plinth (Right)
    const stepPlinth = new THREE.Mesh(
      new THREE.BoxGeometry(1.65, 0.32, 1.45),
      travertineMaterial
    );
    stepPlinth.position.set(0.85, -0.16, 0.2);
    stepPlinth.receiveShadow = true;
    stepPlinth.castShadow = true;
    mainGroup.add(stepPlinth);

    // 3. Large C-Shaped Stone Arch
    const archShape = new THREE.Shape();
    const outerR = 1.22;
    const innerR = 0.76;
    const startAngle = -0.4;
    const endAngle = Math.PI * 1.45;

    archShape.absarc(0, 0, outerR, startAngle, endAngle, false);
    archShape.lineTo(
      Math.cos(endAngle) * innerR,
      Math.sin(endAngle) * innerR
    );
    archShape.absarc(0, 0, innerR, endAngle, startAngle, true);
    archShape.closePath();

    const archExtrudeSettings = {
      depth: 0.38,
      bevelEnabled: true,
      bevelSegments: 4,
      steps: 1,
      bevelSize: 0.02,
      bevelThickness: 0.02,
      curveSegments: 48,
    };

    const archGeometry = new THREE.ExtrudeGeometry(archShape, archExtrudeSettings);
    const archMesh = new THREE.Mesh(archGeometry, travertineMaterial);
    archMesh.position.set(0.25, 0.75, -0.2);
    archMesh.rotation.y = 0.12;
    archMesh.castShadow = true;
    archMesh.receiveShadow = true;
    mainGroup.add(archMesh);

    // 4. Tall Black Monolith Pillar
    const tallPillar = new THREE.Mesh(
      new THREE.BoxGeometry(0.55, 2.05, 0.42),
      charcoalMaterial
    );
    tallPillar.position.set(0.9, 1.15, -0.35);
    tallPillar.rotation.y = -0.08;
    tallPillar.castShadow = true;
    tallPillar.receiveShadow = true;
    mainGroup.add(tallPillar);

    // 5. Charcoal Front Monolith Block (with Nuberu Ribbon Mark)
    const frontMonolith = new THREE.Mesh(
      new THREE.BoxGeometry(0.72, 0.98, 0.38),
      charcoalMaterial
    );
    frontMonolith.position.set(-0.45, 0.36, 0.45);
    frontMonolith.rotation.y = 0.14;
    frontMonolith.castShadow = true;
    frontMonolith.receiveShadow = true;
    mainGroup.add(frontMonolith);

    // Embossed Nuberu Ribbon on Front Monolith
    const logoCanvas = document.createElement('canvas');
    logoCanvas.width = 512;
    logoCanvas.height = 512;
    const ctx = logoCanvas.getContext('2d');
    if (ctx) {
      ctx.fillStyle = '#181716';
      ctx.fillRect(0, 0, 512, 512);

      // Draw stylized ribbon mark in metallic warm tone
      ctx.strokeStyle = '#998f82';
      ctx.lineWidth = 28;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';

      ctx.beginPath();
      ctx.moveTo(140, 320);
      ctx.lineTo(210, 220);
      ctx.lineTo(290, 290);
      ctx.lineTo(370, 190);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(170, 360);
      ctx.lineTo(240, 260);
      ctx.lineTo(320, 330);
      ctx.lineTo(390, 230);
      ctx.stroke();
    }
    const logoTexture = new THREE.CanvasTexture(logoCanvas);
    const logoFaceMaterial = new THREE.MeshStandardMaterial({
      map: logoTexture,
      roughness: 0.45,
      metalness: 0.25,
    });
    const logoPlate = new THREE.Mesh(
      new THREE.PlaneGeometry(0.56, 0.56),
      logoFaceMaterial
    );
    logoPlate.position.set(-0.45, 0.36, 0.645);
    logoPlate.rotation.y = 0.14;
    mainGroup.add(logoPlate);

    // 6. Terracotta Metallic Coin/Disc
    const terracottaDisc = new THREE.Mesh(
      new THREE.CylinderGeometry(0.54, 0.54, 0.16, 64),
      terracottaMaterial
    );
    terracottaDisc.position.set(0.68, 0.46, 0.62);
    terracottaDisc.rotation.x = Math.PI / 2;
    terracottaDisc.rotation.z = -0.15;
    terracottaDisc.castShadow = true;
    terracottaDisc.receiveShadow = true;
    mainGroup.add(terracottaDisc);

    // 7. Small Charcoal Accent Cube near bottom
    const accentCube = new THREE.Mesh(
      new THREE.BoxGeometry(0.42, 0.42, 0.42),
      charcoalMaterial
    );
    accentCube.position.set(0.98, 0.22, 0.72);
    accentCube.rotation.y = 0.2;
    accentCube.castShadow = true;
    accentCube.receiveShadow = true;
    mainGroup.add(accentCube);

    // 8. Golden Arch Ring 1 (Looping through center)
    const goldRing1 = new THREE.Mesh(
      new THREE.TorusGeometry(0.85, 0.02, 32, 100, Math.PI * 1.4),
      goldMaterial
    );
    goldRing1.position.set(0.52, 0.68, 0.1);
    goldRing1.rotation.x = 0.4;
    goldRing1.rotation.y = 0.3;
    goldRing1.castShadow = true;
    mainGroup.add(goldRing1);

    // 9. Golden Arc 2 (Sweeping to the floor)
    const goldRing2 = new THREE.Mesh(
      new THREE.TorusGeometry(0.95, 0.016, 32, 100, Math.PI * 0.9),
      goldMaterial
    );
    goldRing2.position.set(1.15, 0.35, 0.4);
    goldRing2.rotation.x = -0.3;
    goldRing2.rotation.y = -0.8;
    goldRing2.castShadow = true;
    mainGroup.add(goldRing2);

    // 10. Refractive Glass Sphere with floating physics
    const glassSphere = new THREE.Mesh(
      new THREE.SphereGeometry(0.24, 64, 64),
      glassMaterial
    );
    glassSphere.position.set(1.22, 0.24, 0.88);
    glassSphere.castShadow = true;
    mainGroup.add(glassSphere);

    // Ground Contact Shadow Receiver
    const shadowPlane = new THREE.Mesh(
      new THREE.PlaneGeometry(12, 12),
      new THREE.ShadowMaterial({ opacity: 0.16 })
    );
    shadowPlane.rotation.x = -Math.PI / 2;
    shadowPlane.position.y = -0.54;
    shadowPlane.receiveShadow = true;
    scene.add(shadowPlane);

    camera.lookAt(0.35, 0.45, 0);

    // ─── Mouse Interactive Parallax ──────────────────────────────────────────
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      targetX = x * 0.22;
      targetY = y * 0.16;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // ─── Animation Loop ──────────────────────────────────────────────────────
    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const elapsed = clock.getElapsedTime();

      // Smooth camera/sculpture tilt interpolation
      mouseX += (targetX - mouseX) * 0.045;
      mouseY += (targetY - mouseY) * 0.045;

      mainGroup.rotation.y = mouseX;
      mainGroup.rotation.x = -mouseY;

      // Subtle breathing float on glass sphere
      glassSphere.position.y = 0.24 + Math.sin(elapsed * 1.8) * 0.035;

      // Shimmer rotation on golden rings
      goldRing1.rotation.z = Math.sin(elapsed * 0.8) * 0.05;

      // Subtle pulse on terracotta disc
      terracottaDisc.position.y = 0.46 + Math.cos(elapsed * 1.2) * 0.012;

      renderer.render(scene, camera);
    };

    animate();
    setIsLoaded(true);

    // Resize handler
    const handleResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);

      // Clean up geometries and materials
      renderer.dispose();
      archGeometry.dispose();
      travertineMaterial.dispose();
      charcoalMaterial.dispose();
      terracottaMaterial.dispose();
      goldMaterial.dispose();
      glassMaterial.dispose();
      shadowPlane.geometry.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[440px] sm:h-[540px] lg:h-[620px] select-none flex items-center justify-center overflow-visible"
    >
      <canvas
        ref={canvasRef}
        className={`w-full h-full block transition-opacity duration-700 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
      />

      {/* ─── Pointer Annotation Labels matching Reference Image ──────────────── */}

      {/* 1. Cloud Infrastructure Pointer (Top) */}
      <div className="absolute top-[8%] left-[44%] sm:left-[48%] -translate-x-1/2 pointer-events-none flex flex-col items-center">
        <span className="font-mono text-[9px] sm:text-[10px] font-semibold tracking-[0.22em] text-[#68635B] uppercase text-center whitespace-nowrap mb-1">
          CLOUD<br />INFRASTRUCTURE
        </span>
        <div className="w-[1px] h-9 sm:h-12 bg-[#171614]/30" />
        <span className="w-1.5 h-1.5 rounded-full bg-[#171614]/70 -mt-0.5" />
      </div>

      {/* 2. Automation & Operations Pointer (Top-Right) */}
      <div className="absolute top-[16%] right-[2%] sm:right-[4%] pointer-events-none flex items-center gap-2">
        <div className="flex items-center">
          <span className="w-1.5 h-1.5 rounded-full bg-[#171614]/70" />
          <div className="w-8 sm:w-16 h-[1px] bg-[#171614]/30" />
        </div>
        <span className="font-mono text-[9px] sm:text-[10px] font-semibold tracking-[0.22em] text-[#68635B] uppercase text-left whitespace-nowrap">
          AUTOMATION<br />& OPERATIONS
        </span>
      </div>

      {/* 3. Modern Applications Pointer (Bottom-Right) */}
      <div className="absolute top-[48%] sm:top-[50%] right-[0%] sm:right-[2%] pointer-events-none flex items-center gap-2">
        <div className="flex items-center">
          <span className="w-1.5 h-1.5 rounded-full bg-[#171614]/70" />
          <div className="w-8 sm:w-14 h-[1px] bg-[#171614]/30" />
        </div>
        <span className="font-mono text-[9px] sm:text-[10px] font-semibold tracking-[0.22em] text-[#68635B] uppercase text-left whitespace-nowrap">
          MODERN<br />APPLICATIONS
        </span>
      </div>
    </div>
  );
}
