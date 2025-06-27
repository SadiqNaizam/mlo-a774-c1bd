import React, { useMemo } from 'react';
import { Palette, Download, Github } from 'lucide-react';

// Custom Components
import ColorPickerInput from '@/components/ColorPickerInput';
import ComponentPreviewCanvas from '@/components/ComponentPreviewCanvas';
import CodeOutputBlock from '@/components/CodeOutputBlock';
import { useTheme, ThemeState } from '@/contexts/ThemeContext';
import { hslToHex, hexToHsl } from '@/lib/colors';

// Shadcn UI Components
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogClose } from '@/components/ui/dialog';

const ThemeCustomizer = () => {
  console.log('ThemeCustomizer page loaded');

  const { theme, setTheme } = useTheme();

  const handleThemeChange = <K extends keyof ThemeState>(key: K, value: ThemeState[K]) => {
    setTheme(key, value);
  };
  
  const generatedCssString = useMemo(() => {
    const themeStyles = {
      '--background': theme.background,
      '--foreground': theme.foreground,
      '--card': theme.card,
      '--card-foreground': theme.foreground,
      '--popover': theme.card,
      '--popover-foreground': theme.foreground,
      '--primary': theme.primary,
      '--primary-foreground': '210 40% 98%',
      '--secondary': theme.secondary,
      '--secondary-foreground': theme.primary,
      '--muted': theme.secondary,
      '--muted-foreground': '215.4 16.3% 46.9%',
      '--accent': theme.secondary,
      '--accent-foreground': theme.primary,
      '--destructive': theme.destructive,
      '--destructive-foreground': '210 40% 98%',
      '--border': theme.border,
      '--input': theme.border,
      '--ring': theme.primary,
      '--radius': `${theme.radius}rem`,
    };
    return `:root {\\n${Object.entries(themeStyles).map(([key, value]) => `  ${key}: ${value};`).join('\\n')}\\n}`;
  }, [theme]);

  return (
    <div className="bg-background text-foreground">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-40 flex h-16 items-center justify-between border-b bg-background/95 px-6 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex items-center gap-3">
          <Palette className="h-6 w-6 text-primary" />
          <h1 className="text-xl font-bold tracking-tight">Theme Enhancer</h1>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
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
                    onChange={(hex) => handleThemeChange('primary', hexToHsl(hex))}
                  />
                  <ColorPickerInput
                    label="Background"
                    value={hslToHex(theme.background)}
                    onChange={(hex) => handleThemeChange('background', hexToHsl(hex))}
                  />
                   <ColorPickerInput
                    label="Foreground"
                    value={hslToHex(theme.foreground)}
                    onChange={(hex) => handleThemeChange('foreground', hexToHsl(hex))}
                  />
                   <ColorPickerInput
                    label="Card"
                    value={hslToHex(theme.card)}
                    onChange={(hex) => handleThemeChange('card', hexToHsl(hex))}
                  />
                   <ColorPickerInput
                    label="Secondary"
                    value={hslToHex(theme.secondary)}
                    onChange={(hex) => handleThemeChange('secondary', hexToHsl(hex))}
                  />
                   <ColorPickerInput
                    label="Destructive"
                    value={hslToHex(theme.destructive)}
                    onChange={(hex) => handleThemeChange('destructive', hexToHsl(hex))}
                  />
                   <ColorPickerInput
                    label="Border"
                    value={hslToHex(theme.border)}
                    onChange={(hex) => handleThemeChange('border', hexToHsl(hex))}
                  />
                </CardContent>
              </Card>

              <Card>
                <CardHeader><CardTitle>Layout</CardTitle></CardHeader>
                <CardContent className="space-y-6 pt-2">
                  <div className="space-y-3">
                    <Label>Border Radius ({theme.radius.toFixed(2)}rem)</Label>
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
            <ComponentPreviewCanvas />
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