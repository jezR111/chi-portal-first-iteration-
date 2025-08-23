// File: components/dashboard/Widgets/TargetedContentFeed.tsx
"use client";

import { ArrowRightIcon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";

// Define a type for a single content item for better TypeScript support
type ContentItem = {
  id: number;
  type: string;
  title: string;
  category: string;
};

// Mock data - in a real app, this would likely come from props or an API
const contentItems: ContentItem[] = [
  { id: 1, type: "Article", title: "5 Strategies for Effective Leadership", category: "Career Growth" },
  { id: 2, type: "Video", title: "Introduction to Mindfulness", category: "Well-being" },
  { id: 3, type: "Podcast", title: "The Art of Deep Work", category: "Productivity" },
];

// A smaller, dedicated component for rendering a single item
const ContentItemCard = ({ item }: { item: ContentItem }) => (
  <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-xl shadow-sm flex items-center space-x-4 transition-all hover:shadow-md hover:bg-gray-100 dark:hover:bg-gray-700">
    <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center">
      <span className="text-indigo-600 dark:text-indigo-400 text-xs font-bold">{item.type}</span>
    </div>
    <div className="flex-1">
      <p className="font-semibold text-gray-900 dark:text-white">{item.title}</p>
      <p className="text-sm text-gray-500 dark:text-gray-400">{item.category}</p>
    </div>
    <button aria-label={`View ${item.title}`} className="text-gray-400 hover:text-indigo-500 transition-colors">
      <ArrowRightIcon className="w-5 h-5" />
    </button>
  </div>
);


export const TargetedContentFeed = () => {
  return (
    <Card className="bg-white dark:bg-gray-900 shadow-md">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-gray-800 dark:text-white">
          For You
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {contentItems.map(item => (
            <ContentItemCard key={item.id} item={item} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};