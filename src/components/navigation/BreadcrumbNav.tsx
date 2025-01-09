import React from 'react';
import { Link, useLocation, matchPath } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';
import { cn } from '../../lib/utils';

interface RouteConfig {
  path: string;
  label: string;
  parent?: string;
}

const routes: RouteConfig[] = [
  { path: '/home', label: 'Início' },
  { path: '/calculators', label: 'Calculadoras', parent: '/home' },
  { path: '/emergency', label: 'Emergência', parent: '/home' },
  { path: '/pharmacy', label: 'Farmácia', parent: '/home' },
  { path: '/physical-exam', label: 'Exame Físico', parent: '/home' },
  { path: '/chat/:specialtyId', label: 'Chat', parent: '/home' }
];

interface BreadcrumbNavProps {
  className?: string;
}

interface BreadcrumbItem {
  path: string;
  label: string;
}

interface BreadcrumbItem {
  path: string;
  label: string;
}

export const BreadcrumbNav: React.FC<BreadcrumbNavProps> = ({ className }) => {
  const location = useLocation();
  
  const getBreadcrumbs = (): BreadcrumbItem[] => {
    const breadcrumbs: BreadcrumbItem[] = [];
    
    // Find matching route
    const matchedRoute = routes.find(route => 
      matchPath(route.path, location.pathname)
    );
    
    if (matchedRoute) {
      // Add parent routes first
      let currentRoute = matchedRoute;
      while (currentRoute.parent) {
        const parentRoute = routes.find(r => r.path === currentRoute.parent);
        if (parentRoute) {
          breadcrumbs.unshift({
            path: parentRoute.path,
            label: parentRoute.label
          });
          currentRoute = parentRoute;
        }
      }
      
      // Add current route
      breadcrumbs.push({
        path: location.pathname,
        label: matchedRoute.label
      });
    }
    
    return breadcrumbs;
  };

  const breadcrumbs = getBreadcrumbs();
  
  // Don't show breadcrumbs on login/register pages
  if (location.pathname === '/login' || location.pathname === '/register') {
    return null;
  }
  
  if (breadcrumbs.length <= 1) return null;

  return (
    <nav
      aria-label="Breadcrumb"
      className={cn(
        "flex items-center space-x-2 text-sm text-muted-foreground",
        className
      )}
    >
      <Link
        to="/"
        className="flex items-center hover:text-foreground transition-colors"
        aria-label="Home"
      >
        <Home className="w-4 h-4" />
      </Link>

      {breadcrumbs.map((item, index) => (
        <React.Fragment key={item.path}>
          <ChevronRight className="w-4 h-4 text-muted-foreground/60" />
          {index === breadcrumbs.length - 1 ? (
            <span className="text-foreground font-medium">
              {item.label}
            </span>
          ) : (
            <Link
              to={item.path}
              className="hover:text-foreground transition-colors"
            >
              {item.label}
            </Link>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
};