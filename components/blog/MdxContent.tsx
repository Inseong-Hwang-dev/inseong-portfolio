import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function MdxContent({ source }: { source: string }) {
  return (
    <div className="prose-blog">
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{source}</ReactMarkdown>
    </div>
  );
}
