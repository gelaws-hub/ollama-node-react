import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm"; // GitHub-style Markdown (tables, checklists)
import rehypeHighlight from "rehype-highlight"; // Code highlighting
import "highlight.js/styles/github-dark.css"; // Import a highlight style

type MarkdownRendererProps = {
  content: string;
  className?: string;
};

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content, className }) => {
  return (
    <ReactMarkdown
      className={className}
      children={content}
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeHighlight]}
    />
  );
};

export default MarkdownRenderer;
