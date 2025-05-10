'use client';
import React from 'react';
import {
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  EmailShareButton,
  FacebookIcon,
  LinkedinIcon,
  TwitterIcon,
  WhatsappIcon,
  EmailIcon,
} from 'react-share';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

const ShareButtons = ({ shareUrl, title }) => {
  const handleCopy = async () => {
    await navigator.clipboard.writeText(shareUrl);
    toast.success('Link copied to clipboard!');
  };

  return (
    <div className="flex flex-wrap gap-3">
      <FacebookShareButton url={shareUrl} quote={title}>
        <FacebookIcon size={40} round />
      </FacebookShareButton>

      <TwitterShareButton url={shareUrl} title={title}>
        <TwitterIcon size={40} round />
      </TwitterShareButton>

      <LinkedinShareButton url={shareUrl} title={title}>
        <LinkedinIcon size={40} round />
      </LinkedinShareButton>

      <WhatsappShareButton url={shareUrl} title={title}>
        <WhatsappIcon size={40} round />
      </WhatsappShareButton>

      <EmailShareButton url={shareUrl} subject={title} body={title}>
        <EmailIcon size={40} round />
      </EmailShareButton>

      <Button variant="outline" size="sm" onClick={handleCopy}>
        Copy Link
      </Button>
    </div>
  );
};

export default ShareButtons;
