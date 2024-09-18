import { h, JSX } from 'preact';
import { useEffect, useRef, useState } from 'preact/hooks';
import { addInlineCss } from '../../../../../../utilities/elem.js';

export const BigPlayButtonLoadingAnim = (): JSX.Element => {
  const svgEl = useRef(null);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    addInlineCss(
      svgEl.current,
      `
        @keyframes w-loading-pulse {
          from {
            stroke-dashoffset: 55;
          }
          to {
            stroke-dashoffset: -175;
          }
        }
        .w-big-play-button-loading-anim {
          stroke-dasharray: 50 260;
          stroke-dashoffset: 55;
          animation: w-loading-pulse 1.2s infinite cubic-bezier(0.65, 0, 0, 1);
        }
      `,
    );

    setIsAnimating(true);
  }, []);

  return (
    <line
      ref={svgEl}
      class="w-big-play-button-loading-anim"
      x1="0"
      y1="78"
      x2="125"
      y2="78"
      style={{
        stroke: '#FFFFFF',
        strokeWidth: 4,
        strokeLinecap: 'round',
        opacity: isAnimating ? 1 : 0,
      }}
    />
  );
};
