import React from 'react';
import { Compass } from 'lucide-react';
import EmptyState from '../components/common/EmptyState';
import Breadcrumb from '../components/common/Breadcrumb';

export const NotFound = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-20 text-center">
      <EmptyState
        icon={Compass}
        title="Page not found (404)"
        description="The editorial story, product, or destination you requested cannot be located."
        actionLabel="Return to LEOVERSE Home"
        actionTo="/"
      />
    </div>
  );
};

export default NotFound;
