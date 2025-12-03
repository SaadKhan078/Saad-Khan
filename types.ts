import React from 'react';

export interface Service {
  title: string;
  description: string;
  icon: React.ReactNode;
}

export interface TeamMember {
  name: string;
  role: string;
  image: string;
}

export interface Project {
  title: string;
  category: string;
  year: string;
  image: string;
}

export interface Testimonial {
  text: string;
  client: string;
  company: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

// AI Service Types
export interface SearchResult {
  text: string;
  sources?: Array<{
    web?: { uri: string; title: string };
  }>;
}