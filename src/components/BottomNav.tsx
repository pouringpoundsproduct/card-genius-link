
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, CreditCard, Heart } from 'lucide-react';

const BottomNav: React.FC = () => {
  const location = useLocation();

  const navItems = [
    { path: '/', icon: Home, label: 'Home' },
    { path: '/cards', icon: CreditCard, label: 'Cards' },
    { path: '/collection', icon: Heart, label: 'Collection' }
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 h-14 md:hidden glass-effect">
      <div className="flex items-center justify-around h-full">
        {navItems.map(({ path, icon: Icon, label }) => {
          const isActive = location.pathname === path;
          return (
            <Link
              key={path}
              to={path}
              className={`flex flex-col items-center justify-center p-2 transition-colors ${
                isActive ? 'text-white' : 'text-white/60'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="text-xs mt-1">{label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNav;
