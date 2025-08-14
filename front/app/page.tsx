'use client';

import React from "react";
import { useGridArray } from '@/app/hooks/useGridArray';
import { GridForm } from '@/app/components/GridForm';
import { GridDisplay } from '@/app/components/GridDisplay';
import '@/app/globals.css';

export default function Home() {
  const {
    inputSize,
    size,
    isError,
    errorMessage,
    array,
    handleChangeInputSize,
    handleSizeSubmitButton,
  } = useGridArray();

  return (
    <div className="flex flex-col justify-center items-center bg-gray-100">
      <GridForm
        inputSize={inputSize}
        isError={isError}
        errorMessage={errorMessage}
        onChangeInputSize={handleChangeInputSize}
        onSubmit={handleSizeSubmitButton}
      />
      <GridDisplay array={array} size={size} />
    </div>
  );
}
