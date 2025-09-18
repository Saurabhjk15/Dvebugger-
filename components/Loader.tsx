
import React from 'react';

const Loader: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center mt-10">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-500"></div>
      <p className="mt-4 text-cyan-400">AI is thinking...</p>
    </div>
  );
};

export default Loader;
