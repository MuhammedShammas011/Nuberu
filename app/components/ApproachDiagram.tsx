'use client';

import { motion } from 'framer-motion';

export default function ApproachDiagram() {
  return (
    <div className="relative w-full max-w-[420px] aspect-[4/3] flex items-center justify-center select-none">
      <svg
        viewBox="0 0 380 280"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full overflow-visible"
      >
        {/* Soft Ambient Nodes & Halos */}
        {/* Bottom Progress Soft Halo Disc */}
        <circle cx="205" cy="225" r="26" fill="#E8DFD3" fillOpacity="0.85" />

        {/* Network Connector Paths */}
        {/* Curved connection from left terracotta node through center to bottom */}
        <path
          d="M72 165 C108 165 125 140 165 140 C185 140 195 160 195 190 C195 212 200 225 205 225"
          stroke="#171614"
          strokeOpacity="0.18"
          strokeWidth="1.2"
          fill="none"
        />

        {/* Vertical bezier curve connecting Top (People) to Center (Technology) */}
        <path
          d="M165 55 V140"
          stroke="#171614"
          strokeOpacity="0.18"
          strokeWidth="1.2"
          fill="none"
        />

        {/* Lower loop connecting left auxiliary node */}
        <path
          d="M72 165 C72 205 92 215 115 215 C145 215 175 225 205 225"
          stroke="#171614"
          strokeOpacity="0.14"
          strokeWidth="1"
          fill="none"
        />

        {/* Horizontal Tier Branch Lines */}
        {/* Tier 1: People */}
        <line
          x1="165"
          y1="55"
          x2="280"
          y2="55"
          stroke="#171614"
          strokeOpacity="0.22"
          strokeWidth="1.2"
        />
        {/* Tier 2: Technology */}
        <line
          x1="165"
          y1="140"
          x2="280"
          y2="140"
          stroke="#171614"
          strokeOpacity="0.22"
          strokeWidth="1.2"
        />
        {/* Tier 3: Progress */}
        <line
          x1="205"
          y1="225"
          x2="280"
          y2="225"
          stroke="#171614"
          strokeOpacity="0.22"
          strokeWidth="1.2"
        />

        {/* Node Indicators on Branch Lines */}
        <circle cx="280" cy="55" r="3" fill="#171614" fillOpacity="0.45" />
        <circle cx="280" cy="140" r="3" fill="#171614" fillOpacity="0.45" />
        <circle cx="280" cy="225" r="3" fill="#171614" fillOpacity="0.45" />

        {/* Network Nodes */}
        {/* Top Node (People junction) */}
        <circle cx="165" cy="55" r="4.5" fill="#D1C7BA" stroke="#171614" strokeOpacity="0.3" strokeWidth="1" />

        {/* Left Terracotta Accent Node */}
        <circle cx="72" cy="165" r="4.5" fill="#B84A2B" />

        {/* Lower Auxiliary Node */}
        <circle cx="115" cy="215" r="4" fill="#D1C7BA" />

        {/* Bottom Progress Node */}
        <circle cx="205" cy="225" r="4.5" fill="#C5BBAE" />

        {/* Central Active Target Node (Technology junction) */}
        {/* Outer Animated Target Pulse Ring */}
        <motion.circle
          cx="165"
          cy="140"
          r="10"
          stroke="#B84A2B"
          strokeWidth="1.5"
          fill="none"
          animate={{
            scale: [1, 1.18, 1],
            opacity: [0.9, 0.45, 0.9],
          }}
          transition={{
            repeat: Infinity,
            duration: 3.2,
            ease: 'easeInOut',
          }}
        />
        {/* Solid Center Dot */}
        <circle cx="165" cy="140" r="4.5" fill="#B84A2B" />

        {/* Text Labels on Right */}
        <text
          x="302"
          y="58"
          fill="#68635B"
          fontFamily="monospace"
          fontSize="9.5"
          fontWeight="600"
          letterSpacing="0.24em"
        >
          PEOPLE
        </text>

        <text
          x="302"
          y="143"
          fill="#68635B"
          fontFamily="monospace"
          fontSize="9.5"
          fontWeight="600"
          letterSpacing="0.24em"
        >
          TECHNOLOGY
        </text>

        <text
          x="302"
          y="228"
          fill="#68635B"
          fontFamily="monospace"
          fontSize="9.5"
          fontWeight="600"
          letterSpacing="0.24em"
        >
          PROGRESS
        </text>
      </svg>
    </div>
  );
}
