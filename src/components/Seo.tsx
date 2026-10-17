import React, { useEffect } from 'react';

interface SeoProps {
  title: string;
  description: string;
  ogTitle?: string;
  ogDescription?: string;
}

export const Seo: React.FC<SeoProps> = ({
  title,
  description,
  ogTitle,
  ogDescription,
}) => {
  useEffect(() => {
    document.title = title;

    const setMeta = (name: string, content: string, isProperty = false) => {
      const attr = isProperty ? 'property' : 'name';
      let element = document.querySelector(`meta[${attr}="${name}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attr, name);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    setMeta('description', description);
    setMeta('og:title', ogTitle || title, true);
    setMeta('og:description', ogDescription || description, true);
  }, [title, description, ogTitle, ogDescription]);

  return null;
};
