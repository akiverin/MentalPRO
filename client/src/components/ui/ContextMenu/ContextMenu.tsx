import React, { useState, useRef, useEffect } from 'react';
import './ContextMenu.scss';

interface ContextMenuItem {
  title: string;
  icon?: React.ReactNode;
  action: () => void;
  active?: boolean;
}

interface ContextMenuProps {
  items: ContextMenuItem[];
  triggerContent: React.ReactNode;
  className?: string;
}

const ContextMenu: React.FC<ContextMenuProps> = ({ items, triggerContent, className = '' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState<{
    vertical: 'top' | 'bottom';
    horizontal: 'left' | 'right';
  }>({ vertical: 'bottom', horizontal: 'left' });
  const triggerRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const calculatePosition = () => {
    if (!triggerRef.current || !menuRef.current) return;

    const triggerRect = triggerRef.current.getBoundingClientRect();
    const menuHeight = menuRef.current.offsetHeight;
    const menuWidth = menuRef.current.offsetWidth;
    const viewportHeight = window.innerHeight;
    const viewportWidth = window.innerWidth;

    // Определяем вертикальную позицию
    const spaceBelow = viewportHeight - triggerRect.bottom;
    const spaceAbove = triggerRect.top;
    const vertical = spaceBelow >= menuHeight || spaceBelow >= spaceAbove ? 'bottom' : 'top';

    // Определяем горизонтальную позицию
    const spaceRight = viewportWidth - triggerRect.left;
    const spaceLeft = triggerRect.right;
    const horizontal = spaceRight >= menuWidth || spaceRight >= spaceLeft ? 'left' : 'right';

    setPosition({ vertical, horizontal });
  };

  const toggleMenu = () => {
    setIsOpen((prev) => {
      if (!prev) {
        setTimeout(calculatePosition, 0);
      }
      return !prev;
    });
  };

  const handleItemClick = (action: () => void) => {
    action();
    setIsOpen(false);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      menuRef.current &&
      !menuRef.current.contains(event.target as Node) &&
      triggerRef.current &&
      !triggerRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);
      window.addEventListener('resize', calculatePosition);
      window.addEventListener('scroll', calculatePosition);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('resize', calculatePosition);
      window.removeEventListener('scroll', calculatePosition);
    };
  }, [isOpen]);

  return (
    <div className={`context-menu ${className}`}>
      <button
        ref={triggerRef}
        className="context-menu__trigger"
        onClick={toggleMenu}
        aria-expanded={isOpen}
        aria-haspopup="true"
        type="button"
      >
        {triggerContent}
      </button>

      {isOpen && (
        <div
          ref={menuRef}
          className={`context-menu__dropdown context-menu__dropdown--${position.vertical} context-menu__dropdown--${position.horizontal}`}
          role="menu"
          aria-label="Context menu"
        >
          <ul className="context-menu__list">
            {items.map((item, index) => (
              <li key={index} className="context-menu__item">
                <button
                  disabled={item.active === false}
                  className="context-menu__button"
                  onClick={() => handleItemClick(item.action)}
                  role="menuitem"
                  type="button"
                >
                  {item.icon && <span className="context-menu__icon">{item.icon}</span>}
                  <span className="context-menu__title">{item.title}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ContextMenu;
