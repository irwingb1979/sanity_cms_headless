"use client";

import { useState } from "react";

interface Post {
    title: string;
    category: string;
    slug: { current: string };
    body: string;
}

interface CategoryTabsProps {
    posts: Post[];
}

export default function CategoryTabs({ posts }: CategoryTabsProps) {
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

    // Get unique categories from posts
    const categories = [...new Set(posts.map((p) => p.category))];

    return (
        <div className="mt-16 mb-8">
            <h1 className="text-5xl font-bold mb-2 text-center">Browse by Category</h1>
            <h4 className="text-center mb-9">
                Select a category to see more related content
            </h4>

            {/* Category buttons */}
            <div className="flex flex-wrap gap-4 justify-center">
                {categories.map((cat) => (
                    <button
                        key={cat}
                        onClick={() => setSelectedCategory(cat)}
                        className={`btn btn-outline rounded-lg ${selectedCategory === cat ? "btn-success" : "btn-ghost"
                            }`}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            {/* Posts for selected category */}
            <div className="mt-12 text-center">
                {selectedCategory ? (
                    posts
                        .filter((post) => post.category === selectedCategory)
                        .map((post) => (
                            <>
                                <div key={post.title} className="mb-6">
                                    <h2 className="font-bold">{post.title}</h2>
                                </div>
                         
                            </>
                        ))
                ) : (
                    <p className="italic text-gray-500">
                        Select a category to view posts
                    </p>
                )}
            </div>
        </div>
    );
}
