'use client';
import React, { useState } from 'react';
import {
  Editor,
  EditorProvider,
  Toolbar,
  Separator,
  BtnBold,
  BtnItalic,
  BtnUnderline,
  BtnStrikeThrough,
  BtnNumberedList,
  BtnBulletList,
  BtnLink
} from 'react-simple-wysiwyg';
import { Button } from './ui/button';
import { WandSparkles } from 'lucide-react';
import { toast } from 'sonner';
import axios from 'axios';

const PROMPT = `Position title: {positionTitle} Write exactly 5-7 concise, impactful resume bullet points focused on measurable results and actions
Rules:
- Return output STRICTLY in this exact HTML format: <ul><li>First bullet</li><li>Second bullet</li>...</ul>
- Do NOT include any extra text, commentary, explanations, or markdown — ONLY valid HTML.
- Each bullet under 20 words.`;

const RichTextEditor = ({ value, onChange, title }) => {
  const [generating, setGenerating] = useState(false);

  const GenerateSummaryAi = async () => {
    if (!title) {
      toast.error('Please add position title to generate summary.');
      return;
    }

    setGenerating(true);
    const prompt = PROMPT.replace('{positionTitle}', title);

    try {
      const res = await axios.post('/api/aisummary', { prompt });
      let summary = res.data.summary;

      if (summary.startsWith('"') && summary.endsWith('"')) {
        summary = summary.slice(1, -1);
      }

      const cleanSummary = summary.replace(/[\[\]\{\}]/g, '');
      onChange(cleanSummary);
    } catch (error) {
      console.error('AI summary error:', error.response?.data || error.message);
      toast.error('Failed to generate summary.');
    }

    setGenerating(false);
  };

  return (
    <div>
      <div className="flex justify-between my-2 items-end">
        <label>Summary</label>
        <Button
          variant="outline"
          size="sm"
          type="button"
          onClick={GenerateSummaryAi}
          className="flex gap-2 items-center relative overflow-hidden"
          disabled={generating}
        >
          <WandSparkles className={`h-4 w-4 ${generating ? 'animate-wand' : ''}`} />
          {generating ? 'Generating...' : 'Generate with AI'}
        </Button>
      </div>

      <EditorProvider>
        <div className="border border-black rounded-md">
          <Toolbar className="w-full flex flex-nowrap items-center gap-1">
            <Separator />
            <BtnBold />
            <BtnItalic />
            <BtnUnderline />
            <BtnStrikeThrough />
            <Separator />
            <BtnNumberedList />
            <BtnBulletList />
            <Separator />
            <BtnLink />
          </Toolbar>
          <Editor
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="w-full"
          />
        </div>
      </EditorProvider>
    </div>
  );
};

export default React.memo(RichTextEditor);