'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

export default function AboutHeroVisual() {
  return (
    <div className="relative w-full flex items-center justify-center lg:justify-end select-none">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-full max-w-[530px] aspect-[530/345] flex items-center justify-center"
      >
        {/* Soft Ambient Glow */}
        <div className="absolute inset-0 bg-radial from-white/40 via-transparent to-transparent pointer-events-none blur-xl" />

        {/* 3D Architectural Sculpture Image */}
        <motion.div
          animate={{ y: [-3, 3, -3] }}
          transition={{ repeat: Infinity, duration: 6, ease: 'easeInOut' }}
          className="relative w-full h-full flex items-center justify-center"
        >
          <Image
            src="/images/about/hero-sculpture.png"
            alt="Engineering the Next Stage of Enterprise Technology"
            width={530}
            height={345}
            priority
            className="w-full h-auto object-contain select-none pointer-events-none drop-shadow-[0_20px_40px_rgba(23,22,20,0.08)]"
          />
        </motion.div>

        {/* Annotation 1: CLOUD (Top Right) */}
        <div className="absolute top-[16%] right-[1%] sm:right-[4%] flex items-center gap-2 pointer-events-none">
          <span className="w-8 sm:w-12 border-b border-dashed border-[#B84A2B]/45" />
          <span className="font-mono text-[9px] sm:text-[10px] font-semibold uppercase tracking-[0.22em] text-[#68635B]">
            CLOUD
          </span>
        </div>

        {/* Annotation 2: INFRASTRUCTURE (Middle Left) */}
        <div className="absolute top-[35%] left-[0%] sm:left-[2%] flex items-center gap-2 pointer-events-none">
          <span className="font-mono text-[9px] sm:text-[10px] font-semibold uppercase tracking-[0.22em] text-[#68635B]">
            INFRASTRUCTURE
          </span>
          <span className="w-8 sm:w-12 border-b border-dashed border-[#B84A2B]/45" />
        </div>

        {/* Annotation 3: AUTOMATION (Middle Right) */}
        <div className="absolute top-[52%] right-[0%] sm:right-[1%] flex items-center gap-2 pointer-events-none">
          <span className="w-8 sm:w-12 border-b border-dashed border-[#B84A2B]/45" />
          <span className="font-mono text-[9px] sm:text-[10px] font-semibold uppercase tracking-[0.22em] text-[#68635B]">
            AUTOMATION
          </span>
        </div>

        {/* Annotation 4: APPLICATIONS (Bottom Left) */}
        <div className="absolute bottom-[23%] left-[4%] sm:left-[8%] flex items-center gap-2 pointer-events-none">
          <span className="font-mono text-[9px] sm:text-[10px] font-semibold uppercase tracking-[0.22em] text-[#68635B]">
            APPLICATIONS
          </span>
          <span className="w-8 sm:w-12 border-b border-dashed border-[#B84A2B]/45" />
        </div>
      </motion.div>
    </div>
  );
}
