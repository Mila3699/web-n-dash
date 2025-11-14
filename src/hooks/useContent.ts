import { useState, useEffect } from 'react';
import { loadSiteContent, PageContent } from '@/data/siteContent';

export const useContent = (pageId: string) => {
  const [content, setContent] = useState<PageContent | null>(null);

  useEffect(() => {
    const allContent = loadSiteContent();
    const pageContent = allContent.find(p => p.pageId === pageId);
    setContent(pageContent || null);
  }, [pageId]);

  const getBlock = (blockId: string) => {
    return content?.blocks.find(b => b.id === blockId);
  };

  const getBlockContent = (blockId: string): string => {
    return getBlock(blockId)?.content || '';
  };

  const getBlockTitle = (blockId: string): string => {
    return getBlock(blockId)?.title || '';
  };

  const getBlockButton = (blockId: string) => {
    const block = getBlock(blockId);
    return {
      text: block?.buttonText || '',
      link: block?.buttonLink || ''
    };
  };

  return {
    content,
    getBlock,
    getBlockContent,
    getBlockTitle,
    getBlockButton
  };
};
