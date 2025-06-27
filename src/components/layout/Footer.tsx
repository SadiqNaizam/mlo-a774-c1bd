import React from 'react';
import { Github } from 'lucide-react';

const Footer: React.FC = () => {
  console.log('Footer loaded');
  const currentYear = new Date().getFullYear();

  return (
    <footer className="fixed bottom-0 left-0 right-0 z-40 flex h-8 items-center justify-center border-t bg-background/95 text-xs text-muted-foreground">
      <div className="container flex items-center justify-between px-6">
        <span>&copy; {currentYear} Theme Enhancer. All rights reserved.</span>
        <a
          href="https://github.com/your-username"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 hover:text-foreground transition-colors"
        >
          <Github className="h-3 w-3" />
          <span>View on GitHub</span>
        </a>
      </div>
    </footer>
  );
};

export default Footer;