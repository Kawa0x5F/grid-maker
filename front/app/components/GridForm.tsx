import React from 'react';

interface GridFormProps {
  inputSize: { row: string; col: string };
  isError: boolean;
  errorMessage: string;
  onChangeInputSize: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

export const GridForm: React.FC<GridFormProps> = ({
  inputSize,
  isError,
  errorMessage,
  onChangeInputSize,
  onSubmit,
}) => {
  return (
    <form
      onSubmit={onSubmit}
      className="flex flex-col items-center justify-center space-y-3 w-full"
    >
      <input
        name="row"
        type="text"
        id="only-number"
        value={inputSize.row}
        onChange={onChangeInputSize}
        inputMode="numeric"
        className="border rounded px-4 py-2 w-48 text-center shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      <input
        name="col"
        type="text"
        id="only-number"
        value={inputSize.col}
        onChange={onChangeInputSize}
        inputMode="numeric"
        className="border rounded px-4 py-2 w-48 text-center shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      <button
        type="submit"
        className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded shadow-md"
      >
        決定
      </button>
      {isError && <p className="text-red">{errorMessage}</p>}
    </form>
  );
};
