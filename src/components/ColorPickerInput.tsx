import React, { useState, useEffect, useRef } from 'react';
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

interface ColorPickerInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

const ColorPickerInput: React.FC<ColorPickerInputProps> = ({ label, value, onChange, className }) => {
  const [inputValue, setInputValue] = useState(value);
  const colorPickerRef = useRef<HTMLInputElement>(null);

  console.log('ColorPickerInput loaded for:', label);

  // Sync internal state if the external prop 'value' changes
  useEffect(() => {
    if (value !== inputValue) {
      setInputValue(value);
    }
  }, [value]);

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newColor = e.target.value;
    setInputValue(newColor);
    // Basic validation for hex color codes
    if (/^#([0-9a-f]{3}){1,2}$/i.test(newColor)) {
      onChange(newColor);
    }
  };

  const handleColorPickerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newColor = e.target.value;
    setInputValue(newColor); // Keep text input in sync
    onChange(newColor);
  };
  
  const handleSwatchClick = () => {
    // Programmatically click the hidden native color picker
    // to open the browser's color selection UI.
    // This is a common pattern to customize the trigger's appearance.
    // However, Popover is a better UI pattern here.
    // The ref approach is an alternative, but we'll stick to popover.
  };

  return (
    <div className={`space-y-2 ${className}`}>
      <Label htmlFor={label} className="text-sm font-medium">
        {label}
      </Label>
      <div className="flex items-center gap-2">
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="w-10 h-10 p-0 border-2 border-gray-200"
              aria-label={`Open color picker for ${label}`}
              style={{ backgroundColor: value }}
            />
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0 border-none">
            {/* A simple implementation using the native color input */}
            <input
              ref={colorPickerRef}
              type="color"
              value={value}
              onChange={handleColorPickerChange}
              className="w-56 h-32 cursor-pointer"
            />
          </PopoverContent>
        </Popover>
        <Input
          id={label}
          value={inputValue}
          onChange={handleTextChange}
          onBlur={() => setInputValue(value)} // Reset to valid color on blur if input is invalid
          placeholder="#RRGGBB"
          className="flex-1 font-mono text-sm"
        />
      </div>
    </div>
  );
};

export default ColorPickerInput;