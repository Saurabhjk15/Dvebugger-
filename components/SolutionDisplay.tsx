
import React from 'react';
import type { Solution } from '../types';
import { SaveIcon, CheckCircleIcon, CodeIcon, QuestionIcon, WrenchIcon } from './Icons';

interface SolutionDisplayProps {
  solution: Solution;
  onSave: () => void;
  isSaved: boolean;
}

const SolutionDisplay: React.FC<SolutionDisplayProps> = ({ solution, onSave, isSaved }) => {
  const { errorSummary, cause, stepsToResolve, codeExample } = solution;

  return (
    <div className="mt-6 bg-gray-800/50 border border-gray-700 rounded-lg shadow-lg animate-fade-in">
        <div className="p-5 sm:p-6 border-b border-gray-700 flex justify-between items-center">
            <h2 className="text-xl font-bold text-white">Analysis & Solution</h2>
            <button
                type="button"
                onClick={onSave}
                disabled={isSaved}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-cyan-600 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 focus:ring-offset-gray-900 disabled:bg-gray-600 disabled:cursor-not-allowed"
            >
                {isSaved ? <CheckCircleIcon className="h-5 w-5 mr-2"/> : <SaveIcon className="h-5 w-5 mr-2" />}
                {isSaved ? 'Saved' : 'Save Solution'}
            </button>
        </div>

        <div className="p-5 sm:p-6 space-y-6">
            <section>
                <h3 className="flex items-center text-lg font-semibold text-cyan-400 mb-2">
                    <QuestionIcon className="h-6 w-6 mr-2" />
                    Error Summary
                </h3>
                <p className="text-gray-300">{errorSummary}</p>
            </section>

            <section>
                <h3 className="flex items-center text-lg font-semibold text-cyan-400 mb-2">
                    <QuestionIcon className="h-6 w-6 mr-2" />
                    Probable Cause
                </h3>
                <p className="text-gray-300">{cause}</p>
            </section>

            <section>
                <h3 className="flex items-center text-lg font-semibold text-cyan-400 mb-2">
                    <WrenchIcon className="h-6 w-6 mr-2" />
                    Steps to Resolve
                </h3>
                <ol className="list-decimal list-inside space-y-2 text-gray-300 pl-2">
                    {stepsToResolve.map((step, index) => (
                        <li key={index}>{step}</li>
                    ))}
                </ol>
            </section>

            {codeExample && codeExample.trim() !== "N/A" && (
                <section>
                    <h3 className="flex items-center text-lg font-semibold text-cyan-400 mb-2">
                       <CodeIcon className="h-6 w-6 mr-2" />
                        Corrected Code Example
                    </h3>
                    <pre className="bg-gray-900 rounded-md p-4 text-sm text-cyan-300 overflow-x-auto">
                        <code>{codeExample}</code>
                    </pre>
                </section>
            )}
        </div>
    </div>
  );
};

export default SolutionDisplay;
