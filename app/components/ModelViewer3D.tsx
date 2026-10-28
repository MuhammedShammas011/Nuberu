'use client';

import Script from 'next/script';

interface ModelViewer3DProps {
  /** Path to the GLB / GLTF file inside /public (e.g. "/assets/model.glb") */
  src: string;
  alt?: string;
  className?: string;
  cameraOrbit?: string;
  cameraTarget?: string;
  fieldOfView?: string;
  rotationPerSecond?: string;
  autoRotateDelay?: string;
  shadowIntensity?: string;
  shadowSoftness?: string;
  exposure?: string;
  style?: React.CSSProperties;
}

export default function ModelViewer3D({
  src,
  alt = 'Interactive 3D model',
  className = '',
  cameraOrbit = '0deg 75deg auto',
  cameraTarget,
  fieldOfView,
  rotationPerSecond = '10deg',
  autoRotateDelay = '1200',
  shadowIntensity = '0.7',
  shadowSoftness = '0.7',
  exposure = '1.08',
  style,
}: ModelViewer3DProps) {
  return (
    <>
      {/* Load @google/model-viewer module */}
      <Script
        src="https://unpkg.com/@google/model-viewer/dist/model-viewer.min.js"
        type="module"
        strategy="lazyOnload"
      />

      {/* @ts-ignore – model-viewer custom element */}
      <model-viewer
        src={src}
        alt={alt}
        camera-controls="true"
        touch-action="pan-y"
        auto-rotate="true"
        auto-rotate-delay={autoRotateDelay}
        rotation-per-second={rotationPerSecond}
        shadow-intensity={shadowIntensity}
        shadow-softness={shadowSoftness}
        exposure={exposure}
        environment-image="neutral"
        camera-orbit={cameraOrbit}
        camera-target={cameraTarget}
        field-of-view={fieldOfView}
        interaction-prompt="auto"
        class={`w-full h-full block ${className}`}
        style={{
          background: 'transparent',
          '--poster-color': 'transparent',
          ...style,
        }}
      />
    </>
  );
}
