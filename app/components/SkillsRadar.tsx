"use client";

import { motion } from "framer-motion";

export type SkillCategory = {
  key: string;
  label: string;
  icon: string;
  value: number; // 0 to 100 for radar geometry
  badge?: string;
  context?: string;
  items: string[];
};

interface RadarProps {
  categories: SkillCategory[];
  activeCategory: string | null;
  onSelectCategory: (key: string | null) => void;
}

export default function SkillsRadar({
  categories,
  activeCategory,
  onSelectCategory,
}: RadarProps) {
  const size = 340;
  const center = size / 2;
  const radius = 120;
  const total = categories.length;

  const getCoordinates = (index: number, fraction: number) => {
    const angle = (Math.PI * 2 * index) / total - Math.PI / 2;
    const x = center + radius * fraction * Math.cos(angle);
    const y = center + radius * fraction * Math.sin(angle);
    return { x, y };
  };

  const rings = [0.25, 0.5, 0.75, 1.0];

  const ringPolygons = rings.map((fraction) => {
    return categories
      .map((_, i) => {
        const { x, y } = getCoordinates(i, fraction);
        return `${x},${y}`;
      })
      .join(" ");
  });

  const valuePolygon = categories
    .map((cat, i) => {
      const fraction = cat.value / 100;
      const { x, y } = getCoordinates(i, fraction);
      return `${x},${y}`;
    })
    .join(" ");

  return (
    <div className="relative flex flex-col items-center justify-center p-4 rounded-xl border border-trace bg-ink-raised">
      <h4 className="font-mono text-xs uppercase tracking-widest text-slate mb-1">
        {"// Domain & Systems Mesh"}
      </h4>

      <div className="relative w-full max-w-[340px] aspect-square flex items-center justify-center">
        <svg viewBox={`0 0 ${size} ${size}`} className="w-full h-full overflow-visible select-none">
          <defs>
            <radialGradient id="spiderGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#b8763e" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#b8763e" stopOpacity="0.02" />
            </radialGradient>
          </defs>

          {/* Web Rings */}
          {ringPolygons.map((points, idx) => (
            <polygon
              key={idx}
              points={points}
              className="fill-none stroke-trace/50"
              strokeDasharray={idx === 3 ? "none" : "2,2"}
              strokeWidth="1"
            />
          ))}

          {/* Web Spokes */}
          {categories.map((cat, i) => {
            const { x, y } = getCoordinates(i, 1.0);
            const isActive = activeCategory === cat.key;
            return (
              <line
                key={cat.key}
                x1={center}
                y1={center}
                x2={x}
                y2={y}
                className={`transition-colors duration-300 ${
                  isActive ? "stroke-copper-bright stroke-2" : "stroke-trace/60"
                }`}
              />
            );
          })}

          {/* Skill Polygon */}
          <motion.polygon
            initial={{ opacity: 0, scale: 0.3 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            points={valuePolygon}
            fill="url(#spiderGlow)"
            className="stroke-copper-bright stroke-1.5 transition-all duration-300"
          />

          {/* Node Markers */}
          {categories.map((cat, i) => {
            const fraction = cat.value / 100;
            const nodeCoord = getCoordinates(i, fraction);
            const labelCoord = getCoordinates(i, 1.2);
            const isActive = activeCategory === cat.key;

            return (
              <g
                key={cat.key}
                className="cursor-pointer group"
                onClick={() => onSelectCategory(isActive ? null : cat.key)}
                onMouseEnter={() => onSelectCategory(cat.key)}
              >
                <circle
                  cx={nodeCoord.x}
                  cy={nodeCoord.y}
                  r={isActive ? 5 : 3.5}
                  className={`transition-all duration-300 ${
                    isActive
                      ? "fill-copper-bright stroke-paper stroke-1.5"
                      : "fill-copper group-hover:fill-copper-bright"
                  }`}
                />

                <text
                  x={labelCoord.x}
                  y={labelCoord.y}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  className={`font-mono text-[10px] transition-colors duration-300 ${
                    isActive ? "fill-copper-bright font-semibold" : "fill-slate group-hover:fill-paper"
                  }`}
                >
                  {cat.label}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
    </div>
  );
}

