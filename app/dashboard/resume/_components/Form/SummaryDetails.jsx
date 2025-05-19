'use client'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import ResumeInfoContext from '@/Context/ResumeInfoContext'
import GlobalApi from '@/Service/GlobalApi'
import axios from 'axios'
import { LoaderCircle, WandSparkles } from 'lucide-react'
import { useParams } from 'next/navigation'
import React, { useContext, useEffect, useState } from 'react'
import { toast } from 'sonner'

const prompt = "jobTitle: {jobTitle}, depending on the job title give me a summary for my resume with in 4-5 lines in JSON format with field Experience Level and Summary with experience level for fresher, Mid-Level Experienced"

const SummaryDetails = ({ enableNext }) => {
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const [summary, setSummary] = useState();
  const [generating, setGenerating] = useState(false);
  const [saving, setSaving] = useState(false);
  const [aiSummaryList, setAiSummaryList] = useState();
  const params = useParams();

  useEffect(() => {
    summary && setResumeInfo({
      ...resumeInfo,
      summary: summary
    });
  }, [summary]);

  

  const GenerateSummaryAi = async () => {
    setGenerating(true);
    const PROMPT = prompt.replace("{jobTitle}", resumeInfo?.jobTitle);

    try {
      const res = await axios.post('/api/aisummary', { prompt: PROMPT });
      console.log(res.data);
      setAiSummaryList(JSON.parse(res.data.summary));
    } catch (error) {
      console.error(error);
      toast.error('Failed to generate summary.');
    }

    setGenerating(false);
  };

  const onSave = (e) => {
    e.preventDefault();
    setSaving(true);
    const data = {
      data: {
        summary: summary
      }
    };
    GlobalApi.UpdateResumeDetails(params?.resumeId, data).then((res) => {
      enableNext(true);
      setSaving(false);
      toast("Details Updated Successfully.");
    }, (err) => {
      console.log(err);
      setSaving(false);
    });
  };

  return (
    <div>
      <div className="p-5 shadow-lg rounded-lg border-t-[#0d1b2a] border-t-4 mt-8 ">
        <h2 className="font-bold text-lg ">Summary Details</h2>
        <p className="">Add overall summary for your CV</p>
        <form className="mt-4" onSubmit={onSave}>
          <div className="flex justify-between items-end">
            <label htmlFor="">Add Summary</label>
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
          <Textarea
            className="my-3"
            required
            defaultValue={resumeInfo?.summary}
            onChange={(e) => setSummary(e.target.value)}
          />
           <div className="mt-2 flex justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setSummary('')}
              disabled={saving || generating}
            >
              Clear
            </Button>
            <Button type="submit" disabled={saving}>
              {saving ? <LoaderCircle className="animate-spin" /> : "Save"}
            </Button>
          </div>
        </form>
      </div>

      {aiSummaryList && (
        <div className="mt-6 bg-gray-50 p-4 rounded-lg border border-gray-200 shadow-sm">
          <h2 className="font-bold text-lg mb-3 text-[#0d1b2a]">AI Suggestions</h2>
          {aiSummaryList.map((item, index) => (
            <div
              key={index}
              onClick={() => setSummary(item['Summary'])}
              className="mb-4 p-3 cursor-pointer border rounded-lg hover:shadow transition hover:bg-gray-100"
            >
              <h3 className="font-semibold text-[#0d1b2a] mb-1">
                Level: {item['Experience Level']}
              </h3>
              <p className="text-gray-700 text-sm leading-relaxed">
                {item['Summary']}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default SummaryDetails
