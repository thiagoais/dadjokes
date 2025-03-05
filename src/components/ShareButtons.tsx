import React from "react";
import { Button } from "@/components/ui/button";
import { Twitter, Facebook, Linkedin, Copy, Check } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useToast } from "@/components/ui/use-toast";

interface ShareButtonsProps {
  joke: string;
  className?: string;
}

const ShareButtons = ({ joke, className = "" }: ShareButtonsProps) => {
  const [copied, setCopied] = React.useState(false);
  const { toast } = useToast();

  const encodedJoke = encodeURIComponent(`"${joke}" - Dad Jokes Generator`);
  const url = encodeURIComponent(window.location.href);

  const shareLinks = {
    twitter: `https://twitter.com/intent/tweet?text=${encodedJoke}&url=${url}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}&quote=${encodedJoke}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(joke);
      setCopied(true);
      toast({
        title: "Copied to clipboard",
        description: "The joke has been copied to your clipboard.",
        duration: 2000,
      });
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("Failed to copy:", error);
      toast({
        title: "Copy failed",
        description: "Could not copy to clipboard. Try again.",
        variant: "destructive",
        duration: 3000,
      });
    }
  };

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <p className="text-sm text-muted-foreground mr-1">Share:</p>

      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8 rounded-full bg-[#1DA1F2] hover:bg-[#1a94e0] text-white"
              onClick={() => window.open(shareLinks.twitter, "_blank")}
            >
              <Twitter className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Share on Twitter</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8 rounded-full bg-[#4267B2] hover:bg-[#365899] text-white"
              onClick={() => window.open(shareLinks.facebook, "_blank")}
            >
              <Facebook className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Share on Facebook</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8 rounded-full bg-[#0077B5] hover:bg-[#006699] text-white"
              onClick={() => window.open(shareLinks.linkedin, "_blank")}
            >
              <Linkedin className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Share on LinkedIn</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8 rounded-full"
              onClick={copyToClipboard}
            >
              {copied ? (
                <Check className="h-4 w-4" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>{copied ? "Copied!" : "Copy to clipboard"}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};

export default ShareButtons;
