
import React from 'react';
import { LogoIcon } from './Icons';

const Header: React.FC = () => {
  return (
    <header className="mb-6 flex items-center">
        <LogoIcon className="h-10 w-10 text-cyan-500 mr-3" />
        <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">DevErrorLog</h1>
            <p className="text-gray-400 text-sm sm:text-base">Your Intelligent Error Resolver</p>
        </div>
    </header>
  );
};

export default Header;
