import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

export const Breadcrumb = ({ items = [] }) => {
  return (
    <nav aria-label="Breadcrumb" className="py-4">
      <ol className="flex items-center flex-wrap gap-1.5 text-xs tracking-wider text-[#77746E]">
        <li>
          <Link to="/" className="hover:text-[#242321] transition-colors">
            Home
          </Link>
        </li>
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <React.Fragment key={index}>
              <li className="flex items-center">
                <ChevronRight className="w-3.5 h-3.5 text-[#D8D2C8] mx-1" />
              </li>
              <li>
                {isLast || !item.to ? (
                  <span className="text-[#242321] font-medium" aria-current={isLast ? 'page' : undefined}>
                    {item.label}
                  </span>
                ) : (
                  <Link to={item.to} className="hover:text-[#242321] transition-colors">
                    {item.label}
                  </Link>
                )}
              </li>
            </React.Fragment>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
