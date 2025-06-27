import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Copy, Check } from 'lucide-react';

interface CodeOutputBlockProps {
  codeString: string;
  className?: string;
}

const CodeOutputBlock: React.FC<CodeOutputBlockProps> = ({ codeString, className }) => {
  const [isCopied, setIsCopied] = useState(false);
  console.log('CodeOutputBlock loaded');

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(codeString);
      setIsCopied(true);
      toast.success('Code copied to clipboard!');
      setTimeout(() => setIsCopied(false), 2000); // Reset after 2 seconds
    } catch (err) {
      toast.error('Failed to copy code.');
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <div className={`relative group bg-gray-900 rounded-lg ${className}`}>
      <div className="absolute top-2 right-2">
        <Button
          size="icon"
          variant="ghost"
          className="h-8 w-8 text-gray-400 hover:text-white hover:bg-gray-700"
          onClick={handleCopy}
          aria-label="Copy code to clipboard"
        >
          {isCopied ? (
            <Check className="h-4 w-4 text-green-400" />
          ) : (
            <Copy className="h-4 w-4" />
          )}
        </Button>
      </div>
      <pre className="p-4 overflow-x-auto text-sm text-white rounded-lg">
        <code className="font-mono">{codeString}</code>
      </pre>
    </div>
  );
};

export default CodeOutputBlock;