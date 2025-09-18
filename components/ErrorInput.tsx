
import React from 'react';
import { PlayIcon, XCircleIcon } from './Icons';

interface ErrorInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onSubmit: () => void;
  onClear: () => void;
  isLoading: boolean;
}

const ErrorInput: React.FC<ErrorInputProps> = ({ value, onChange, onSubmit, onClear, isLoading }) => {
  return (
    <div className="bg-gray-800 rounded-lg shadow-lg p-1">
        <div className="bg-gray-900 p-4 rounded-lg">
            <label htmlFor="error-log" className="block text-sm font-medium text-gray-400 mb-2">
            Paste your full terminal error output here:
            </label>
            <textarea
                id="error-log"
                rows={10}
                className="block w-full bg-gray-900 border border-gray-700 rounded-md shadow-sm focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm text-gray-200 p-3 font-mono"
                placeholder="TypeError: Cannot read properties of undefined..."
                value={value}
                onChange={onChange}
                disabled={isLoading}
            />
            <div className="mt-4 flex justify-end space-x-3">
                <button
                    type="button"
                    onClick={onClear}
                    disabled={isLoading || !value}
                    className="inline-flex items-center px-4 py-2 border border-gray-600 text-sm font-medium rounded-md text-gray-300 bg-gray-700 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 focus:ring-offset-gray-900 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <XCircleIcon className="h-5 w-5 mr-2" />
                    Clear
                </button>
                <button
                    type="button"
                    onClick={onSubmit}
                    disabled={isLoading || !value}
                    className="inline-flex items-center justify-center px-6 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-cyan-600 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 focus:ring-offset-gray-900 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <PlayIcon className="h-5 w-5 mr-2" />
                    {isLoading ? 'Resolving...' : 'Resolve'}
                </button>
            </div>
        </div>
    </div>
  );
};

export default ErrorInput;
