import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ColorPickerInput from '@/components/ColorPickerInput';

const LeftSidebar: React.FC = () => {
  console.log('LeftSidebar loaded');

  // Local state for demonstrating control interactivity
  const [colors, setColors] = useState({
    primary: '#6d28d9',
    background: '#ffffff',
    foreground: '#020617',
    card: '#f8fafc',
    accent: '#8b5cf6',
  });
  const [borderRadius, setBorderRadius] = useState([0.75]);
  const [borderWidth, setBorderWidth] = useState([1]);
  const [spacing, setSpacing] = useState([1]);

  const handleColorChange = (colorName: keyof typeof colors, value: string) => {
    setColors(prev => ({ ...prev, [colorName]: value }));
  };

  return (
    <aside className="fixed left-0 top-16 z-30 h-[calc(100vh-4rem)] w-80 border-r bg-background">
      <ScrollArea className="h-full p-4">
        <div className="space-y-6">
          {/* Colors Section */}
          <Card>
            <CardHeader>
              <CardTitle>Colors</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Primary</Label>
                <ColorPickerInput
                  value={colors.primary}
                  onChange={(val) => handleColorChange('primary', val)}
                />
              </div>
              <div className="space-y-2">
                <Label>Background</Label>
                <ColorPickerInput
                  value={colors.background}
                  onChange={(val) => handleColorChange('background', val)}
                />
              </div>
              <div className="space-y-2">
                <Label>Foreground</Label>
                <ColorPickerInput
                  value={colors.foreground}
                  onChange={(val) => handleColorChange('foreground', val)}
                />
              </div>
              <div className="space-y-2">
                <Label>Card</Label>
                <ColorPickerInput
                  value={colors.card}
                  onChange={(val) => handleColorChange('card', val)}
                />
              </div>
              <div className="space-y-2">
                <Label>Accent</Label>
                <ColorPickerInput
                  value={colors.accent}
                  onChange={(val) => handleColorChange('accent', val)}
                />
              </div>
            </CardContent>
          </Card>

          {/* Borders & Radius Section */}
          <Card>
            <CardHeader>
              <CardTitle>Borders & Radius</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 pt-2">
              <div className="space-y-3">
                <Label>Border Radius ({borderRadius[0]}rem)</Label>
                <Slider
                  value={borderRadius}
                  onValueChange={setBorderRadius}
                  max={2}
                  step={0.05}
                />
              </div>
              <div className="space-y-3">
                <Label>Border Width ({borderWidth[0]}px)</Label>
                <Slider
                  value={borderWidth}
                  onValueChange={setBorderWidth}
                  max={5}
                  step={1}
                />
              </div>
            </CardContent>
          </Card>

          {/* Spacing Section */}
          <Card>
            <CardHeader>
              <CardTitle>Spacing</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 pt-2">
              <div className="space-y-3">
                <Label>Padding Scale ({spacing[0]}x)</Label>
                <Slider
                  value={spacing}
                  onValueChange={setSpacing}
                  max={2}
                  step={0.1}
                />
              </div>
            </CardContent>
          </Card>
          
          {/* Typography Section */}
          <Card>
            <CardHeader>
              <CardTitle>Typography</CardTitle>
            </CardHeader>
            <CardContent>
              <Label>Font Family</Label>
              <Select defaultValue="inter">
                <SelectTrigger>
                  <SelectValue placeholder="Select a font" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="inter">Inter</SelectItem>
                  <SelectItem value="system">System UI</SelectItem>
                  <SelectItem value="roboto">Roboto</SelectItem>
                  <SelectItem value="source-sans">Source Sans Pro</SelectItem>
                </SelectContent>
              </Select>
            </CardContent>
          </Card>
        </div>
      </ScrollArea>
    </aside>
  );
};

export default LeftSidebar;