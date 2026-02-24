"use client";

import type { GenerateProjectResponse } from "../../types";
import { Loader2 } from "lucide-react";

interface Props {
  isGenerating?: boolean;
  generateError?: string | null;
  generateResult?: GenerateProjectResponse | null;
}

export function ReviewStep({ isGenerating, generateError, generateResult }: Props) {

  // Loading state
  if (isGenerating) {
    return (
      <div className="flex flex-col gap-8 items-center justify-center min-h-screen py-12">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-10 h-10 animate-spin text-blue-500" />
          <h2 className="text-lg font-semibold text-gray-600">Generating your project brief...</h2>
          <p className="text-sm text-gray-400">This may take a moment depending on document style</p>
        </div>
      </div>
    );
  }

  // Error state
  if (generateError) {
    return (
      <div className="flex flex-col gap-8 items-center justify-center min-h-screen py-12">
        <div className="flex flex-col items-center gap-4 max-w-md text-center">
          <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
            <span className="text-red-500 text-xl">✕</span>
          </div>
          <h2 className="text-lg font-semibold text-gray-700">Generation Failed</h2>
          <p className="text-sm text-red-500">{generateError}</p>
        </div>
      </div>
    );
  }

  // No result yet (shouldn't happen normally, but safety)
  if (!generateResult) {
    return (
      <div className="flex flex-col gap-14 items-center justify-center min-h-screen py-12 overflow-auto mb-25">
        <div className="w-[90%] max-w-198.5 aspect-794/1123 bg-white shadow-2xl border border-gray-200">
          {" "}
          {/* Kosong dulu */}
        </div>
        <div className="w-[90%] max-w-198.5 aspect-794/1123 bg-white shadow-2xl border border-gray-200">
          {" "}
          {/* Kosong dulu */}
        </div>
      </div>
    );
  }

  // Render AI result
  const brief = generateResult;

  return (
    <div className="flex flex-col gap-14 items-center justify-center py-12 overflow-auto mb-25">

      {/* Page 1 — Title, Overview, Problem, Objectives */}
      <div className="w-[90%] max-w-198.5 bg-white shadow-2xl border border-gray-200 p-12 space-y-8">

        {/* Watermark */}
        <p className="text-xs text-gray-300 text-right select-none">PREVIEW — Planify AI</p>

        {/* Title */}
        {brief.title && (
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{brief.title}</h1>
          </div>
        )}

        {/* Overview */}
        {brief.overview && (
          <div>
            <h2 className="text-sm font-semibold text-gray-500 uppercase mb-2">Overview</h2>
            <p className="text-sm text-gray-700 leading-relaxed">{brief.overview}</p>
          </div>
        )}

        {/* Target Audience */}
        {brief.targetAudience && (
          <div>
            <h2 className="text-sm font-semibold text-gray-500 uppercase mb-2">Target Audience</h2>
            {typeof brief.targetAudience === "string" ? (
              <p className="text-sm text-gray-700">{brief.targetAudience}</p>
            ) : (
              <div className="space-y-1">
                {brief.targetAudience.primary && <p className="text-sm text-gray-700"><span className="font-medium">Primary:</span> {brief.targetAudience.primary}</p>}
                {brief.targetAudience.secondary && <p className="text-sm text-gray-700"><span className="font-medium">Secondary:</span> {brief.targetAudience.secondary}</p>}
                {brief.targetAudience.admin && <p className="text-sm text-gray-700"><span className="font-medium">Admin:</span> {brief.targetAudience.admin}</p>}
              </div>
            )}
          </div>
        )}

        {/* Problem Statement */}
        {brief.problemStatement && (
          <div>
            <h2 className="text-sm font-semibold text-gray-500 uppercase mb-2">Problem Statement</h2>
            {brief.problemStatement.painPoints && (
              <ul className="list-disc list-inside space-y-1 mb-3">
                {brief.problemStatement.painPoints.map((p: string, i: number) => (
                  <li key={i} className="text-sm text-gray-700">{p}</li>
                ))}
              </ul>
            )}
            {brief.problemStatement.businessImpact && (
              <div>
                <p className="text-xs font-medium text-gray-500 mb-1">Business Impact</p>
                <p className="text-sm text-gray-700">{brief.problemStatement.businessImpact}</p>
              </div>
            )}
          </div>
        )}

        {/* Objectives */}
        {brief.objectives && Array.isArray(brief.objectives) && (
          <div>
            <h2 className="text-sm font-semibold text-gray-500 uppercase mb-2">Objectives</h2>
            <ul className="list-decimal list-inside space-y-1">
              {brief.objectives.map((obj: any, i: number) => (
                <li key={i} className="text-sm text-gray-700">{typeof obj === "string" ? obj : obj.objective || JSON.stringify(obj)}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Success Criteria */}
        {brief.successCriteria && Array.isArray(brief.successCriteria) && (
          <div>
            <h2 className="text-sm font-semibold text-gray-500 uppercase mb-2">Success Criteria</h2>
            <div className="grid grid-cols-2 gap-2">
              {brief.successCriteria.map((sc: any, i: number) => (
                <div key={i} className="p-2 bg-gray-50 rounded border">
                  <p className="text-xs font-medium text-gray-500">{sc.metric}</p>
                  <p className="text-sm text-gray-700">{sc.target}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Page 2 — Features, Tech Stack, Scope, Risks */}
      <div className="w-[90%] max-w-198.5 bg-white shadow-2xl border border-gray-200 p-12 space-y-8">

        <p className="text-xs text-gray-300 text-right select-none">PREVIEW — Planify AI</p>

        {/* Key Features */}
        {brief.keyFeatures && Array.isArray(brief.keyFeatures) && (
          <div>
            <h2 className="text-sm font-semibold text-gray-500 uppercase mb-3">Key Features</h2>
            <div className="space-y-3">
              {brief.keyFeatures.map((f: any, i: number) => (
                <div key={i} className="p-3 bg-gray-50 rounded border">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="text-sm font-semibold text-gray-800">{f.name}</h3>
                    {f.priority && (
                      <span className={`text-xs px-2 py-0.5 rounded-full ${f.priority === "Must" ? "bg-red-100 text-red-600" : f.priority === "Should" ? "bg-yellow-100 text-yellow-600" : "bg-gray-100 text-gray-600"}`}>
                        {f.priority}
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-600">{f.description}</p>
                  {f.userStory && <p className="text-xs text-gray-400 mt-1 italic">{f.userStory}</p>}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tech Stack */}
        {brief.recommendedTechStack && Array.isArray(brief.recommendedTechStack) && (
          <div>
            <h2 className="text-sm font-semibold text-gray-500 uppercase mb-3">Recommended Tech Stack</h2>
            <div className="space-y-2">
              {brief.recommendedTechStack.map((t: any, i: number) => (
                <div key={i} className="flex items-start gap-3 p-2 bg-gray-50 rounded border">
                  <span className="text-xs font-medium text-blue-500 bg-blue-50 px-2 py-0.5 rounded min-w-[70px] text-center">{t.category}</span>
                  <div>
                    <p className="text-sm font-medium text-gray-800">{t.technology}</p>
                    <p className="text-xs text-gray-500">{t.reason}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Scope */}
        {brief.scope && (
          <div>
            <h2 className="text-sm font-semibold text-gray-500 uppercase mb-2">Scope</h2>
            <div className="grid grid-cols-2 gap-4">
              {brief.scope.inScope && (
                <div>
                  <p className="text-xs font-medium text-green-600 mb-1">In Scope</p>
                  <ul className="list-disc list-inside space-y-1">
                    {brief.scope.inScope.map((s: string, i: number) => (
                      <li key={i} className="text-sm text-gray-700">{s}</li>
                    ))}
                  </ul>
                </div>
              )}
              {brief.scope.outOfScope && (
                <div>
                  <p className="text-xs font-medium text-red-600 mb-1">Out of Scope</p>
                  <ul className="list-disc list-inside space-y-1">
                    {brief.scope.outOfScope.map((s: string, i: number) => (
                      <li key={i} className="text-sm text-gray-700">{s}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Risks */}
        {brief.risks && Array.isArray(brief.risks) && (
          <div>
            <h2 className="text-sm font-semibold text-gray-500 uppercase mb-2">Risks</h2>
            <div className="space-y-2">
              {brief.risks.map((r: any, i: number) => (
                <div key={i} className="p-2 bg-gray-50 rounded border">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs px-2 py-0.5 rounded bg-orange-100 text-orange-600">{r.type}</span>
                    <p className="text-sm font-medium text-gray-800">{r.risk}</p>
                  </div>
                  <p className="text-xs text-gray-500">Mitigation: {r.mitigation}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Clarification Log */}
        {brief.clarificationLog && Array.isArray(brief.clarificationLog) && (
          <div>
            <h2 className="text-sm font-semibold text-gray-500 uppercase mb-2">AI Clarification Log</h2>
            <div className="space-y-2">
              {brief.clarificationLog.map((c: any, i: number) => (
                <div key={i} className="p-2 bg-blue-50 rounded border border-blue-100">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs text-blue-400">{c.date}</span>
                    <p className="text-sm font-medium text-blue-700">{c.topic}</p>
                  </div>
                  <p className="text-xs text-gray-600">{c.advice}</p>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
