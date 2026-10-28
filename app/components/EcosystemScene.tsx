'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';

interface TechSatellite {
  id: string;
  name: string;
  logo: string;
  width: number;
  height: number;
}

interface CategoryTrio {
  tile1: TechSatellite;
  tile2: TechSatellite;
  tile3: TechSatellite;
}

const categorySceneData: Record<number, CategoryTrio> = {
  0: {
    tile1: {
      id: 'aws',
      name: 'Amazon Web Services',
      logo: '/images/ecosystem/aws_official.svg',
      width: 72,
      height: 44,
    },
    tile2: {
      id: 'azure',
      name: 'Microsoft Azure',
      logo: '/images/ecosystem/azure.svg',
      width: 54,
      height: 54,
    },
    tile3: {
      id: 'gcp',
      name: 'Google Cloud Platform',
      logo: '/images/ecosystem/gcp_cloud.svg',
      width: 58,
      height: 50,
    },
  },
  1: {
    tile1: {
      id: 'kubernetes',
      name: 'Kubernetes',
      logo: '/images/ecosystem/kubernetes.svg',
      width: 54,
      height: 54,
    },
    tile2: {
      id: 'openshift',
      name: 'Red Hat OpenShift',
      logo: '/images/ecosystem/openshift.svg',
      width: 54,
      height: 54,
    },
    tile3: {
      id: 'rancher',
      name: 'SUSE Rancher',
      logo: '/images/ecosystem/rancher.svg',
      width: 54,
      height: 54,
    },
  },
  2: {
    tile1: {
      id: 'terraform',
      name: 'HashiCorp Terraform',
      logo: '/images/ecosystem/terraform.svg',
      width: 54,
      height: 54,
    },
    tile2: {
      id: 'ansible',
      name: 'Red Hat Ansible',
      logo: '/images/ecosystem/ansible.svg',
      width: 54,
      height: 54,
    },
    tile3: {
      id: 'gitlab',
      name: 'GitLab CI / CD',
      logo: '/images/ecosystem/gitlab.svg',
      width: 54,
      height: 54,
    },
  },
  3: {
    tile1: {
      id: 'prometheus',
      name: 'Prometheus & Grafana',
      logo: '/images/ecosystem/prometheus.svg',
      width: 54,
      height: 54,
    },
    tile2: {
      id: 'vault',
      name: 'HashiCorp Vault',
      logo: '/images/ecosystem/vault.svg',
      width: 54,
      height: 54,
    },
    tile3: {
      id: 'neuvector',
      name: 'NeuVector & Aqua',
      logo: '/images/ecosystem/neuvector.svg',
      width: 54,
      height: 54,
    },
  },
};

interface EcosystemSceneProps {
  activeCategory?: number;
}

export default function EcosystemScene({ activeCategory = 0 }: EcosystemSceneProps) {
  const currentData = categorySceneData[activeCategory] || categorySceneData[0];
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [activeTile, setActiveTile] = useState<string | null>(null);

  // Mouse parallax motion values (normalized from -0.5 to 0.5)
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 28, stiffness: 140, mass: 0.8 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  // 3D stage rotational tilt based on mouse position
  // Base perspective matches the isometric angle in reference image (~56deg X, -14deg Z)
  const stageRotateX = useTransform(smoothMouseY, [-0.5, 0.5], [60, 52]);
  const stageRotateZ = useTransform(smoothMouseX, [-0.5, 0.5], [-18, -10]);
  const stageRotateY = useTransform(smoothMouseX, [-0.5, 0.5], [-5, 5]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    setIsHovered(false);
    setActiveTile(null);
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className="relative w-full h-[360px] sm:h-[480px] lg:h-[520px] flex items-center justify-center select-none overflow-hidden sm:overflow-visible"
      style={{ perspective: 1200 }}
      aria-label="Interactive 3D Connected Technology Ecosystem"
    >
      {/* 3D Isometric Perspective Stage */}
      <motion.div
        className="relative w-[520px] h-[520px] sm:w-[560px] sm:h-[560px] flex items-center justify-center pointer-events-auto scale-[0.65] sm:scale-100 origin-center"
        style={{
          transformStyle: 'preserve-3d',
          rotateX: stageRotateX,
          rotateZ: stageRotateZ,
          rotateY: stageRotateY,
        }}
      >
        {/* ─── Ground Plane & Concentric Orbit Rings ────────────────────────── */}
        <div
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
          style={{ transform: 'translateZ(0px)' }}
        >
          {/* Outer Orbit Ring */}
          <div className="absolute w-[520px] h-[520px] rounded-full border border-[#171614]/[0.08]" />

          {/* Middle Orbit Ring */}
          <div className="absolute w-[390px] h-[390px] rounded-full border border-[#171614]/[0.10]" />

          {/* Inner Orbit Ring */}
          <div className="absolute w-[260px] h-[260px] rounded-full border border-[#171614]/[0.12]" />

          {/* ─── Orbit Labels ────────────────────────────────────────────── */}
          {/* Top: SCALABLE */}
          <span
            className="absolute top-[28px] left-1/2 -translate-x-1/2 font-mono text-[9.5px] uppercase tracking-[0.24em] font-semibold text-[#171614]/45"
            style={{ transform: 'translateX(-50%)' }}
          >
            SCALABLE
          </span>

          {/* Right: OPEN */}
          <span
            className="absolute right-[32px] top-[48%] -translate-y-1/2 font-mono text-[9.5px] uppercase tracking-[0.24em] font-semibold text-[#171614]/45"
            style={{ transform: 'translateY(-50%)' }}
          >
            OPEN
          </span>

          {/* Bottom: VENDOR NEUTRAL */}
          <span
            className="absolute bottom-[36px] left-1/2 -translate-x-1/2 font-mono text-[9.5px] uppercase tracking-[0.24em] font-semibold text-[#171614]/45 text-center leading-tight"
            style={{ transform: 'translateX(-50%)' }}
          >
            VENDOR<br />NEUTRAL
          </span>

          {/* Left: SECURE */}
          <span
            className="absolute left-[40px] top-[54%] -translate-y-1/2 font-mono text-[9.5px] uppercase tracking-[0.24em] font-semibold text-[#171614]/45"
            style={{ transform: 'translateY(-50%)' }}
          >
            SECURE
          </span>

          {/* ─── Glossy Pearl Spheres on Orbit Rings ───────────────────────── */}
          {/* Pearl 1 (Top Outer Ring near SCALABLE) */}
          <motion.div
            className="absolute top-[32px] left-[58%] w-3.5 h-3.5 rounded-full"
            style={{
              background: 'radial-gradient(circle at 35% 30%, #ffffff 0%, #F5EFE6 45%, #D4C9BC 85%, #9E9385 100%)',
              boxShadow: '0 6px 12px rgba(23, 22, 20, 0.22)',
            }}
            animate={{ y: [-1.5, 1.5, -1.5] }}
            transition={{ repeat: Infinity, duration: 4.5, ease: 'easeInOut' }}
          />

          {/* Pearl 2 (Right Middle Ring near OPEN) */}
          <motion.div
            className="absolute right-[78px] top-[39%] w-3 h-3 rounded-full"
            style={{
              background: 'radial-gradient(circle at 35% 30%, #ffffff 0%, #F5EFE6 45%, #D4C9BC 85%, #9E9385 100%)',
              boxShadow: '0 5px 10px rgba(23, 22, 20, 0.20)',
            }}
            animate={{ y: [1.5, -1.5, 1.5] }}
            transition={{ repeat: Infinity, duration: 5, ease: 'easeInOut' }}
          />

          {/* Pearl 3 (Left Middle Ring near SECURE) */}
          <motion.div
            className="absolute left-[70px] top-[66%] w-3 h-3 rounded-full"
            style={{
              background: 'radial-gradient(circle at 35% 30%, #ffffff 0%, #F5EFE6 45%, #D4C9BC 85%, #9E9385 100%)',
              boxShadow: '0 5px 10px rgba(23, 22, 20, 0.20)',
            }}
            animate={{ y: [-1, 1, -1] }}
            transition={{ repeat: Infinity, duration: 4.2, ease: 'easeInOut' }}
          />
        </div>

        {/* ─── Central Nuberu Frosted Glass Stack ────────────────────────────── */}
        <div
          className="absolute z-20 flex items-center justify-center pointer-events-auto"
          style={{ transformStyle: 'preserve-3d' }}
        >
          {/* Ground Soft Shadow for Center Stack */}
          <motion.div
            className="absolute w-44 h-44 rounded-[36px] bg-[#171614]/15 filter blur-xl pointer-events-none"
            style={{ transform: 'translateZ(2px)' }}
            animate={{
              scale: isHovered ? 1.08 : [1, 1.04, 1],
              opacity: isHovered ? 0.35 : [0.28, 0.22, 0.28],
            }}
            transition={{ repeat: Infinity, duration: 5, ease: 'easeInOut' }}
          />

          {/* Layer 1: Bottom Base Glass Slab */}
          <motion.div
            className="absolute w-48 h-48 rounded-[34px] bg-white/35 border border-white/60 pointer-events-none"
            style={{
              transform: 'translateZ(6px)',
              boxShadow: '0 20px 50px -10px rgba(23, 22, 20, 0.12)',
            }}
            animate={{ z: isHovered ? 8 : [6, 9, 6] }}
            transition={{ repeat: Infinity, duration: 5, ease: 'easeInOut' }}
          />

          {/* Layer 2: Middle Translucent Glass Slab */}
          <motion.div
            className="absolute w-44 h-44 rounded-[30px] bg-white/50 backdrop-blur-md border border-white/75 pointer-events-none"
            style={{
              transform: 'translateZ(16px)',
              boxShadow: '0 15px 35px -8px rgba(23, 22, 20, 0.10)',
            }}
            animate={{ z: isHovered ? 20 : [16, 21, 16] }}
            transition={{ repeat: Infinity, duration: 5, ease: 'easeInOut' }}
          />

          {/* Layer 3: Top Frosted Acrylic Glass Tile with Nuberu Logo */}
          <motion.div
            className="relative w-40 h-40 rounded-[28px] flex flex-col items-center justify-center p-6 cursor-pointer group/nuberu"
            style={{
              transformStyle: 'preserve-3d',
              background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.88) 0%, rgba(244, 239, 230, 0.72) 100%)',
              backdropFilter: 'blur(22px)',
              WebkitBackdropFilter: 'blur(22px)',
              border: '1.5px solid rgba(255, 255, 255, 0.95)',
              boxShadow:
                'inset 0 2px 4px rgba(255, 255, 255, 0.9), inset 0 -2px 4px rgba(0, 0, 0, 0.04), 0 24px 50px -10px rgba(23, 22, 20, 0.16)',
            }}
            animate={{
              z: isHovered ? 34 : [28, 36, 28],
            }}
            transition={{ repeat: Infinity, duration: 5, ease: 'easeInOut' }}
            whileHover={{ scale: 1.04 }}
          >
            {/* Nuberu Logo Mark (Two waving ribbons) */}
            <div className="w-12 h-10 text-[#171614] mb-1.5 transition-transform duration-300 group-hover/nuberu:scale-105">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 42.0 33.5" fill="currentColor" className="w-full h-full">
                <path d="M 30.562 9.974 L 24.895 14.104 C 23.730 14.956, 22.219 15.174, 20.857 14.687 L 12.353 11.635 C 10.798 11.082, 9.163 12.232, 9.163 13.878 L 9.163 22.651 C 9.163 24.495, 8.283 26.228, 6.794 27.312 L 3.011 30.074 C 1.755 30.989, 0.000 30.094, 0.000 28.542 L 0.000 8.873 C 0.000 7.052, 0.872 5.340, 2.340 4.267 L 5.805 1.743 C 7.348 0.619, 9.361 0.338, 11.157 1.006 L 30.321 8.153 C 31.098 8.446, 31.242 9.481, 30.571 9.974 L 30.562 9.974 Z" />
                <path d="M 11.137 23.310 L 16.804 19.180 C 17.971 18.328, 19.480 18.110, 20.842 18.598 L 29.346 21.649 C 30.903 22.203, 32.535 21.053, 32.535 19.406 L 32.535 10.633 C 32.535 8.789, 33.416 7.059, 34.907 5.972 L 38.687 3.213 C 39.944 2.295, 41.699 3.193, 41.699 4.742 L 41.699 24.414 C 41.699 26.232, 40.830 27.945, 39.359 29.017 L 35.894 31.541 C 34.351 32.665, 32.338 32.949, 30.542 32.278 L 11.378 25.131 C 10.600 24.841, 10.457 23.803, 11.128 23.310 L 11.137 23.310 Z" />
              </svg>
            </div>

            {/* Wordmark "Nuberu" */}
            <span className="font-extrabold text-[1.45rem] tracking-tight text-[#171614] leading-none">
              Nuberu
            </span>
          </motion.div>
        </div>

        {/* ─── Floating Satellite Tile 1 (Top Left) ────────────────────── */}
        <div
          className="absolute left-[38px] top-[110px] sm:left-[45px] sm:top-[115px] pointer-events-auto"
          style={{ transformStyle: 'preserve-3d' }}
          onMouseEnter={() => setActiveTile('tile1')}
          onMouseLeave={() => setActiveTile(null)}
        >
          {/* Cast Contact Shadow on Orbit Floor */}
          <motion.div
            className="absolute -inset-2 rounded-[26px] bg-[#171614]/15 filter blur-lg pointer-events-none"
            style={{ transform: 'translateZ(2px)' }}
            animate={{
              scale: activeTile === 'tile1' ? 1.15 : [1, 1.08, 1],
              opacity: activeTile === 'tile1' ? 0.35 : [0.25, 0.16, 0.25],
            }}
            transition={{ repeat: Infinity, duration: 4.2, ease: 'easeInOut' }}
          />

          {/* Elevated 3D Floating White/Frosted Tile */}
          <motion.div
            className="relative w-28 h-28 sm:w-30 sm:h-30 rounded-[22px] sm:rounded-[24px] flex items-center justify-center p-5 cursor-pointer"
            style={{
              transformStyle: 'preserve-3d',
              background: 'linear-gradient(145deg, #FFFFFF 0%, #F9F6F0 100%)',
              border: '1.5px solid rgba(255, 255, 255, 0.95)',
              boxShadow:
                '0 20px 42px -10px rgba(23, 22, 20, 0.16), 0 8px 18px -4px rgba(23, 22, 20, 0.08), inset 0 2px 3px rgba(255, 255, 255, 0.95)',
            }}
            animate={{
              z: activeTile === 'tile1' ? 68 : [50, 64, 50],
              rotateZ: [-0.8, 1.2, -0.8],
            }}
            transition={{ repeat: Infinity, duration: 4.2, ease: 'easeInOut' }}
            whileHover={{ scale: 1.08 }}
            title={currentData.tile1.name}
            aria-label={currentData.tile1.name}
          >
            {/* Satellite Tile 1 Dynamic Logo */}
            <div className="relative w-18 h-12 flex items-center justify-center overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentData.tile1.id}
                  initial={{ opacity: 0, scale: 0.72, rotate: -6 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  exit={{ opacity: 0, scale: 0.72, rotate: 6 }}
                  transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                  className="w-full h-full flex items-center justify-center"
                >
                  <Image
                    src={currentData.tile1.logo}
                    alt={currentData.tile1.name}
                    width={currentData.tile1.width}
                    height={currentData.tile1.height}
                    className="object-contain max-h-11 max-w-[68px] select-none pointer-events-none drop-shadow-sm"
                    priority
                  />
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        </div>

        {/* ─── Floating Satellite Tile 2 (Top Right) ─────────────────── */}
        <div
          className="absolute right-[48px] top-[40px] sm:right-[60px] sm:top-[42px] pointer-events-auto"
          style={{ transformStyle: 'preserve-3d' }}
          onMouseEnter={() => setActiveTile('tile2')}
          onMouseLeave={() => setActiveTile(null)}
        >
          {/* Cast Contact Shadow on Orbit Floor */}
          <motion.div
            className="absolute -inset-2 rounded-[26px] bg-[#171614]/15 filter blur-lg pointer-events-none"
            style={{ transform: 'translateZ(2px)' }}
            animate={{
              scale: activeTile === 'tile2' ? 1.15 : [1, 1.08, 1],
              opacity: activeTile === 'tile2' ? 0.35 : [0.24, 0.15, 0.24],
            }}
            transition={{ repeat: Infinity, duration: 4.8, ease: 'easeInOut' }}
          />

          {/* Elevated 3D Floating White/Frosted Tile */}
          <motion.div
            className="relative w-28 h-28 sm:w-30 sm:h-30 rounded-[22px] sm:rounded-[24px] flex items-center justify-center p-5 cursor-pointer"
            style={{
              transformStyle: 'preserve-3d',
              background: 'linear-gradient(145deg, #FFFFFF 0%, #F9F6F0 100%)',
              border: '1.5px solid rgba(255, 255, 255, 0.95)',
              boxShadow:
                '0 22px 45px -10px rgba(23, 22, 20, 0.18), 0 8px 18px -4px rgba(23, 22, 20, 0.08), inset 0 2px 3px rgba(255, 255, 255, 0.95)',
            }}
            animate={{
              z: activeTile === 'tile2' ? 88 : [70, 84, 70],
              rotateZ: [1.2, -0.8, 1.2],
            }}
            transition={{ repeat: Infinity, duration: 4.8, ease: 'easeInOut' }}
            whileHover={{ scale: 1.08 }}
            title={currentData.tile2.name}
            aria-label={currentData.tile2.name}
          >
            {/* Satellite Tile 2 Dynamic Logo */}
            <div className="relative w-14 h-14 flex items-center justify-center overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentData.tile2.id}
                  initial={{ opacity: 0, scale: 0.72, rotate: 6 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  exit={{ opacity: 0, scale: 0.72, rotate: -6 }}
                  transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                  className="w-full h-full flex items-center justify-center"
                >
                  <Image
                    src={currentData.tile2.logo}
                    alt={currentData.tile2.name}
                    width={currentData.tile2.width}
                    height={currentData.tile2.height}
                    className="object-contain max-h-12 max-w-14 select-none pointer-events-none drop-shadow-sm"
                    priority
                  />
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        </div>

        {/* ─── Floating Satellite Tile 3 (Bottom Right) ───────── */}
        <div
          className="absolute right-[42px] bottom-[90px] sm:right-[52px] sm:bottom-[96px] pointer-events-auto"
          style={{ transformStyle: 'preserve-3d' }}
          onMouseEnter={() => setActiveTile('tile3')}
          onMouseLeave={() => setActiveTile(null)}
        >
          {/* Cast Contact Shadow on Orbit Floor */}
          <motion.div
            className="absolute -inset-2 rounded-[26px] bg-[#171614]/15 filter blur-lg pointer-events-none"
            style={{ transform: 'translateZ(2px)' }}
            animate={{
              scale: activeTile === 'tile3' ? 1.15 : [1, 1.08, 1],
              opacity: activeTile === 'tile3' ? 0.35 : [0.26, 0.17, 0.26],
            }}
            transition={{ repeat: Infinity, duration: 4.4, ease: 'easeInOut' }}
          />

          {/* Elevated 3D Floating White/Frosted Tile */}
          <motion.div
            className="relative w-28 h-28 sm:w-30 sm:h-30 rounded-[22px] sm:rounded-[24px] flex items-center justify-center p-5 cursor-pointer"
            style={{
              transformStyle: 'preserve-3d',
              background: 'linear-gradient(145deg, #FFFFFF 0%, #F9F6F0 100%)',
              border: '1.5px solid rgba(255, 255, 255, 0.95)',
              boxShadow:
                '0 20px 42px -10px rgba(23, 22, 20, 0.16), 0 8px 18px -4px rgba(23, 22, 20, 0.08), inset 0 2px 3px rgba(255, 255, 255, 0.95)',
            }}
            animate={{
              z: activeTile === 'tile3' ? 56 : [40, 54, 40],
              rotateZ: [-1, 1, -1],
            }}
            transition={{ repeat: Infinity, duration: 4.4, ease: 'easeInOut' }}
            whileHover={{ scale: 1.08 }}
            title={currentData.tile3.name}
            aria-label={currentData.tile3.name}
          >
            {/* Satellite Tile 3 Dynamic Logo */}
            <div className="relative w-15 h-13 flex items-center justify-center overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentData.tile3.id}
                  initial={{ opacity: 0, scale: 0.72, rotate: -6 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  exit={{ opacity: 0, scale: 0.72, rotate: 6 }}
                  transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                  className="w-full h-full flex items-center justify-center"
                >
                  <Image
                    src={currentData.tile3.logo}
                    alt={currentData.tile3.name}
                    width={currentData.tile3.width}
                    height={currentData.tile3.height}
                    className="object-contain max-h-12 max-w-15 select-none pointer-events-none drop-shadow-sm"
                    priority
                  />
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
