import React, { useState, useMemo } from 'react';
import { Palette, Download, Github, Copy, Check } from 'lucide-react';
import { toast } from 'sonner';

// Custom Components
import ColorPickerInput from '@/components/ColorPickerInput';
import ComponentPreviewCanvas from '@/components/ComponentPreviewCanvas';
import CodeOutputBlock from '@/components/CodeOutputBlock';
// Note: Header, Footer, and LeftSidebar JSX are integrated directly into this page 
// to allow for state management, as the provided components were self-contained.
// This is necessary to fulfill the interactive user journey.

// Shadcn UI Components
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogClose } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from '@/components/ui/separator';

interface ThemeState {
  background: string;
  foreground: string;
  primary: string;
  secondary: string;
  destructive: string;
  card: string;
  border: string;
  radius: number; // in rem
}

// Helper function to convert HSL string to hex, if needed (simplified for this example)
// A full implementation would be more robust.
const hslToHex = (hsl: string): string => {
  // This is a placeholder. A real app would need a proper conversion library.
  const mapping: { [key: string]: string } = {
    '0 0% 100%': '#ffffff',
    '222.2 84% 4.9%': '#09090b',
    '222.2 47.4% 11.2%': '#18181b',
    '210 40% 98%': '#f8fafc',
    '210 40% 96.1%': '#f1f5f9',
    '215.4 16.3% 46.9%': '#64748b',
    '0 84.2% 60.2%': '#ef4444',
    '214.3 31.8% 91.4%': '#e2e8f0',
  };
  const key = hsl.replace(/hsl\(|\)/g, '').trim();
  return mapping[key] || '#000000';
};

const ThemeCustomizer = () => {
  console.log('ThemeCustomizer page loaded');

  const [theme, setTheme] = useState<ThemeState>({
    background: 'hsl(0 0% 100%)', // white
    foreground: 'hsl(222.2 84% 4.9%)', // near black
    primary: 'hsl(222.2 47.4% 11.2%)', // dark blue/black
    secondary: 'hsl(210 40% 96.1%)', // light gray
    destructive: 'hsl(0 84.2% 60.2%)', // red
    card: 'hsl(0 0% 100%)', // white
    border: 'hsl(214.3 31.8% 91.4%)', // light gray
    radius: 0.5,
  });

  const handleThemeChange = <K extends keyof ThemeState>(key: K, value: ThemeState[K]) => {
    setTheme(prev => ({ ...prev, [key]: value }));
  };

  const previewStyles = useMemo(() => ({
    '--background': theme.background,
    '--foreground': theme.foreground,
    '--card': theme.card,
    '--card-foreground': theme.foreground,
    '--popover': theme.card,
    '--popover-foreground': theme.foreground,
    '--primary': theme.primary,
    '--primary-foreground': 'hsl(210 40% 98%)', // Assuming this is constant for contrast
    '--secondary': theme.secondary,
    '--secondary-foreground': theme.primary,
    '--muted': theme.secondary,
    '--muted-foreground': 'hsl(215.4 16.3% 46.9%)', // Assuming constant
    '--accent': theme.secondary,
    '--accent-foreground': theme.primary,
    '--destructive': theme.destructive,
    '--destructive-foreground': 'hsl(210 40% 98%)', // Assuming constant
    '--border': theme.border,
    '--input': theme.border,
    '--ring': theme.primary,
    '--radius': `${theme.radius}rem`,
  } as React.CSSProperties), [theme]);

  const generatedCssString = useMemo(() => {
    return `:root {\n${Object.entries(previewStyles).map(([key, value]) => `  ${key}: ${value};`).join('\n')}\n}`;
  }, [previewStyles]);

  return (
    <div className="bg-background text-foreground">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-40 flex h-16 items-center justify-between border-b bg-background/95 px-6 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex items-center gap-3">
          <Palette className="h-6 w-6 text-primary" style={{ color: `hsl(${theme.primary})` }}/>
          <h1 className="text-xl font-bold tracking-tight">Theme Enhancer</h1>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button style={{ backgroundColor: `hsl(${theme.primary})`}}>
              <Download className="mr-2 h-4 w-4" />
              Export Theme
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-2xl">
            <DialogHeader>
              <DialogTitle>Export Theme</DialogTitle>
              <DialogDescription>
                Copy the CSS variables below and paste them into your project's main stylesheet.
              </DialogDescription>
            </DialogHeader>
            <CodeOutputBlock codeString={generatedCssString} />
            <DialogFooter>
              <DialogClose asChild>
                <Button type="button" variant="secondary">Close</Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </header>
      
      <main className="flex">
        {/* Left Sidebar */}
        <aside className="fixed left-0 top-16 z-30 h-[calc(100vh-6rem)] w-80 border-r bg-background">
          <ScrollArea className="h-full p-4">
            <div className="space-y-6">
              <Card>
                <CardHeader><CardTitle>Colors</CardTitle></CardHeader>
                <CardContent className="space-y-4">
                   <ColorPickerInput
                    label="Primary"
                    value={hslToHex(theme.primary)}
                    onChange={(hex) => handleThemeChange('primary', `hsl(${hex})`)} // Simplified conversion
                  />
                  <ColorPickerInput
                    label="Background"
                    value={hslToHex(theme.background)}
                    onChange={(hex) => handleThemeChange('background', `hsl(${hex})`)}
                  />
                </CardContent>
              </Card>

              <Card>
                <CardHeader><CardTitle>Layout</CardTitle></CardHeader>
                <CardContent className="space-y-6 pt-2">
                  <div className="space-y-3">
                    <Label>Border Radius ({theme.radius}rem)</Label>
                    <Slider
                      value={[theme.radius]}
                      onValueChange={(val) => handleThemeChange('radius', val[0])}
                      max={2}
                      step={0.05}
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          </ScrollArea>
        </aside>

        {/* Main Content */}
        <div className="flex-1 pl-80 pt-16 pb-8">
            <ComponentPreviewCanvas style={previewStyles} />
        </div>
      </main>

      {/* Footer */}
      <footer className="fixed bottom-0 left-0 right-0 z-40 flex h-8 items-center justify-center border-t bg-background/95 text-xs text-muted-foreground">
        <div className="container flex items-center justify-between px-6">
          <span>&copy; {new Date().getFullYear()} Theme Enhancer.</span>
          <a
            href="https://github.com/mlo-ai"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 hover:text-foreground transition-colors"
          >
            <Github className="h-3 w-3" />
            <span>View on GitHub</span>
          </a>
        </div>
      </footer>
    </div>
  );
};

export default ThemeCustomizer;