import React from 'react';

interface IBordIkonProps {
  className?: string;
}

const BordIkon: React.FC<IBordIkonProps> = ({ className }) => {
  return (
    <div className={className}>
      <svg width="182px" height="22px" viewBox="0 0 182 22">
        <g
          id="Page-1"
          stroke="none"
          stroke-width="1"
          fill="none"
          fill-rule="evenodd"
        >
          <g id="gjenstander/familie/bord">
            <g id="Group">
              <rect
                id="Rectangle"
                fill="#D87F0A"
                fill-rule="nonzero"
                x="0"
                y="0"
                width="182"
                height="8"
              ></rect>
              <rect
                id="Rectangle-Copy"
                fill="#B26D14"
                fill-rule="nonzero"
                x="13"
                y="8"
                width="156"
                height="14"
              ></rect>
              <rect
                id="Rectangle-Copy-2"
                fill="#D87F0A"
                fill-rule="nonzero"
                x="13"
                y="11"
                width="14"
                height="11"
              ></rect>
              <rect
                id="Rectangle-Copy-3"
                fill="#D87F0A"
                fill-rule="nonzero"
                x="155"
                y="11"
                width="14"
                height="11"
              ></rect>
            </g>
          </g>
        </g>
      </svg>
    </div>
  );
};

export default BordIkon;
