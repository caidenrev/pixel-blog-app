"use client";

import React from 'react';

interface Heading {
  level: number;
  id: string;
  text: string;
}

interface MobileTableOfContentsProps {
  tableOfContents: Heading[];
}

const MobileTableOfContents: React.FC<MobileTableOfContentsProps> = ({ tableOfContents }) => {
  const handleClick = () => {
    const details = document.querySelector('details[open]') as HTMLDetailsElement;
    if (details) details.open = false;
  };

  return (
    <div className='lg:hidden mt-8 border-t border-gray-200 dark:border-gray-700 pt-8'>
      <details className='group bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden'>
        <summary className='flex items-center justify-between cursor-pointer p-4 hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-colors'>
          <span className='text-lg font-semibold text-gray-900 dark:text-white'>
            Daftar Isi
          </span>
          <svg className='w-5 h-5 text-gray-500 dark:text-gray-400 transition-transform group-open:rotate-180' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M19 9l-7 7-7-7' />
          </svg>
        </summary>
        <div className='px-4 pb-4 bg-white dark:bg-gray-800/80 border-t border-gray-200 dark:border-gray-700'>
          <div className='pt-4'>
            {tableOfContents.length > 0 ? (
              <nav className="space-y-2">
                {tableOfContents.map((heading, index) => (
                  <a
                    key={index}
                    href={`#${heading.id}`}
                    className={`block text-sm hover:text-blue-600 dark:hover:text-blue-400 transition-colors ${
                      heading.level === 1 ? 'font-semibold text-gray-900 dark:text-white' :
                      heading.level === 2 ? 'pl-3 text-gray-700 dark:text-gray-300' :
                      heading.level === 3 ? 'pl-6 text-gray-600 dark:text-gray-400' :
                      'pl-9 text-gray-500 dark:text-gray-500'
                    }`}
                    onClick={handleClick}
                  >
                    {heading.text}
                  </a>
                ))}
              </nav>
            ) : (
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Tidak ada heading yang ditemukan
              </p>
            )}
          </div>
        </div>
      </details>
    </div>
  );
};

export default MobileTableOfContents;