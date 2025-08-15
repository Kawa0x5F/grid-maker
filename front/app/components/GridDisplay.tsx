import React from 'react';

interface GridDisplayProps {
  array: number[];
  size: { row: number; col: number };
  onCellClick: (index: number) => void;
}

export const GridDisplay: React.FC<GridDisplayProps> = ({ array, size, onCellClick }) => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div
        className={`grid grid-cols-[repeat(var(--cols),minmax(0,1fr))] gap-0`}
        style={{ width: 'fit-content', '--cols': size.row } as React.CSSProperties}
      >
        {array.map((value: number, index: number) => (
          <div
            key={`${value}_${index}`}
            className={`w-16 h-16 border border-gray-300 hover:border-black cursor-pointer ${value === 1 ? 'bg-orange-500' : 'bg-white'}`}
            onClick={() => onCellClick(index)}
          />
        ))}
      </div>
    </div>
  );
};
