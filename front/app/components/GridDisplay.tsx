import React from 'react';

interface GridDisplayProps {
  array: number[];
  size: { row: number; col: number };
}

export const GridDisplay: React.FC<GridDisplayProps> = ({ array, size }) => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div
        className={`grid grid-cols-[repeat(var(--cols),minmax(0,1fr))] gap-0`}
        style={{ width: 'fit-content', '--cols': size.row } as React.CSSProperties}
      >
        {array.map((value: number, index: number) => (
          <div
            key={`${value}_${index}`}
            className="w-16 h-16 bg-white border border-gray-300 hover:bg-gray-200"
          />
        ))}
      </div>
    </div>
  );
};
