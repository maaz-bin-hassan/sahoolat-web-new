'use client';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function TermDetails() {
  const params = useParams();
  const { details } = params;
  const [current, setCurrent] = useState({ title: '', content: '' });

  useEffect(() => {
    async function fetchTerms() {
      try {
        const res = await axios.get('/api/terms-conditions');
        if (res.data && res.data[details]) {
          setCurrent({
            title: res.data[details].title || 'Terms',
            content: res.data[details].content || 'No terms content available.'
          });
        } else {
          setCurrent({ title: 'Terms', content: 'No terms found for this section.' });
        }
      } catch (error) {
        setCurrent({ title: 'Terms', content: 'Failed to load terms. Please try again later.' });
      }
    }

    fetchTerms();
  }, [details]);
  return (
    <div className="max-w-8xl mx-auto py-20 px-4 sm:px-6 lg:px-8 text-[#1d1d1f]">
      <div className="mb-10">
        <h1 className="text-5xl text-center font-extrabold tracking-tight mb-4">{current.title}</h1>
        <p className="text-sm text-center text-gray-500 italic">Last updated: 29th May, 2025</p>
      </div>
      <article
        className="prose max-w-none prose-headings:text-[#1d1d1f] prose-h1:text-4xl prose-h1:font-bold prose-h2:mt-10 prose-h2:text-2xl prose-h2:font-semibold prose-h2:text-brand prose-p:text-base prose-p:leading-7 prose-li:pl-2 prose-li:mb-2 prose-ul:list-disc prose-ul:pl-6 prose-strong:font-semibold prose-p:mt-4 prose-p:mb-4"
        dangerouslySetInnerHTML={{ __html: current.content }}
      />
    </div>
  );
}