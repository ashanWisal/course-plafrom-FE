import { useState } from 'react';
import { useFormikContext } from 'formik';
import { X } from 'lucide-react';

const TagsInput = () => {
  const { values, setFieldValue, errors, touched } = useFormikContext<any>();
  const [input, setInput] = useState('');

  const tags: string[] = values?.tags
    ? values.tags.split(',').map((t: string) => t.trim()).filter(Boolean)
    : [];

  const addTag = (tag: string) => {
    const trimmed = tag.trim().toLowerCase();
    if (!trimmed || tags.includes(trimmed)) return;
    const newTags = [...tags, trimmed];
    setFieldValue('tags', newTags.join(','));
    setInput('');
  };

  const removeTag = (tag: string) => {
    const newTags = tags.filter((t) => t !== tag);
    setFieldValue('tags', newTags.join(','));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      addTag(input);
    }
    if (e.key === 'Backspace' && !input && tags.length > 0) {
      removeTag(tags[tags.length - 1]);
    }
  };

  return (
    <div>
      <label className="block text-xs font-semibold text-gray-400 uppercase tracking-widest mb-2">
        Tags
      </label>
      <div className="w-full min-h-[48px] bg-[#0d1117] border border-[#30363d] rounded-lg px-3 py-2 flex flex-wrap gap-2 focus-within:border-blue-500 transition">
        {tags.map((tag) => (
          <span
            key={tag}
            className="flex items-center gap-1.5 bg-blue-600/20 text-blue-400 text-xs font-semibold px-2 py-1 rounded-md border border-blue-500/30"
          >
            {tag}
            <button
              type="button"
              onClick={() => removeTag(tag)}
              className="hover:text-red-400 transition"
            >
              <X size={10} />
            </button>
          </span>
        ))}
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={() => { if (input) addTag(input); }}
          placeholder={tags.length === 0 ? 'Add tag...' : ''}
          className="bg-transparent text-white text-sm outline-none placeholder-gray-600 min-w-[80px] flex-1"
        />
      </div>
      {touched?.tags && errors?.tags && (
        <p className="text-red-400 text-xs mt-1">{errors.tags as string}</p>
      )}
    </div>
  );
};

export default TagsInput;