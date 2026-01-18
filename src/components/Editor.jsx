import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';
import { useEffect } from 'react';
import { Bold, Italic, List, Heading1, Quote } from 'lucide-react';

export default function Editor({ content, onDocChange }) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({ 
        placeholder: 'Start typing your strategy here...' 
      }),
    ],
    content: content,
    onUpdate: ({ editor }) => {
      onDocChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        // The 'prose' class here uses the Tailwind config you just updated
        class: 'prose dark:prose-invert focus:outline-none max-w-none min-h-[500px] p-8 text-gray-800 dark:text-gray-200 leading-relaxed',
      },
    },
  });

  // Sync with Supabase (External Changes)
  useEffect(() => {
    if (editor && content && content !== editor.getHTML()) {
      editor.commands.setContent(content, false);
    }
  }, [content, editor]);

  if (!editor) {
    return <div className="p-8 text-gray-400 animate-pulse">Loading editor...</div>;
  }

  return (
    <div className="w-full bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden flex flex-col">
      
      {/* 1. FIXED TOOLBAR (Replaces the crashing BubbleMenu) */}
      <div className="flex gap-1 p-2 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 sticky top-0 z-10">
        <ToolbarButton 
          onClick={() => editor.chain().focus().toggleBold().run()} 
          isActive={editor.isActive('bold')}
        >
          <Bold size={18} />
        </ToolbarButton>
        
        <ToolbarButton 
          onClick={() => editor.chain().focus().toggleItalic().run()} 
          isActive={editor.isActive('italic')}
        >
          <Italic size={18} />
        </ToolbarButton>

        <ToolbarButton 
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} 
          isActive={editor.isActive('heading', { level: 1 })}
        >
          <Heading1 size={18} />
        </ToolbarButton>

        <ToolbarButton 
          onClick={() => editor.chain().focus().toggleBulletList().run()} 
          isActive={editor.isActive('bulletList')}
        >
          <List size={18} />
        </ToolbarButton>

        <ToolbarButton 
          onClick={() => editor.chain().focus().toggleBlockquote().run()} 
          isActive={editor.isActive('blockquote')}
        >
          <Quote size={18} />
        </ToolbarButton>
      </div>

      {/* 2. THE EDITOR AREA */}
      <div className="flex-1 overflow-y-auto bg-white dark:bg-gray-800 cursor-text">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
}

// Small helper component for buttons
function ToolbarButton({ onClick, isActive, children }) {
  return (
    <button
      onClick={onClick}
      className={`p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors ${
        isActive ? 'bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300' : 'text-gray-600 dark:text-gray-400'
      }`}
    >
      {children}
    </button>
  );
}