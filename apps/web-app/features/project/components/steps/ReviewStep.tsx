"use client";

import { useEffect, useRef, useState } from "react";
import type { GenerateProjectResponse } from "../../types";
import { Loader2 } from "lucide-react";

// Repeating diagonal watermark component
function PageWatermark() {
  const rows = 20;
  const cols = 3;
  const items = Array.from({ length: rows * cols });

  return (
    <div
      className="absolute inset-0 pointer-events-none z-10"
      aria-hidden="true"
      style={{ overflow: "hidden" }}
    >
      <div
        className="absolute inset-0 flex flex-wrap items-center justify-center"
        style={{
          transform: "rotate(-35deg)",
          transformOrigin: "center center",
          width: "200%",
          height: "200%",
          top: "-50%",
          left: "-50%",
          position: "absolute",
        }}
      >
        {items.map((_, i) => (
          <div
            key={i}
            style={{
              width: `${100 / cols}%`,
              height: `${100 / rows}%`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "2.2rem",
              fontWeight: 800,
              color: "rgba(0, 0, 0, 0.04)",
              letterSpacing: "0.09em",
              userSelect: "none",
              whiteSpace: "nowrap",
            }}
          >
            PLANIFY - PREVIEW
          </div>
        ))}
      </div>
    </div>
  );
}

// Mermaid diagram renderer with multiple fallback strategies
function MermaidDiagram({ code }: { code: string }) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const svgContainerRef = useRef<HTMLDivElement | null>(null);
  const [rendered, setRendered] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function renderDiagram() {
      if (!wrapperRef.current || !code) return;

      // Create an isolated container outside React's tree for Mermaid to use
      const tempContainer = document.createElement("div");
      tempContainer.style.position = "absolute";
      tempContainer.style.left = "-9999px";
      tempContainer.style.top = "-9999px";
      document.body.appendChild(tempContainer);

      try {
        const mermaid = (await import("mermaid")).default;
        mermaid.initialize({
          startOnLoad: false,
          theme: "neutral",
          securityLevel: "loose",
          fontFamily: "Arial, sans-serif",
        });

        const tempId = `mermaid_render_${Date.now()}`;
        const { svg } = await mermaid.render(tempId, code.trim());

        if (!cancelled && wrapperRef.current) {
          // Create a new div for SVG that React doesn't manage
          if (svgContainerRef.current) {
            wrapperRef.current.removeChild(svgContainerRef.current);
          }
          const svgDiv = document.createElement("div");
          svgDiv.innerHTML = svg;
          svgDiv.className = "flex items-center justify-center";
          wrapperRef.current.appendChild(svgDiv);
          svgContainerRef.current = svgDiv;
          setRendered(true);
        }
      } catch (e: any) {
        console.error("Mermaid render error:", e);
        if (!cancelled) {
          setError(true);
        }
      } finally {
        // Cleanup temp container
        if (document.body.contains(tempContainer)) {
          document.body.removeChild(tempContainer);
        }
      }
    }

    renderDiagram();

    return () => {
      cancelled = true;
    };
  }, [code]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (wrapperRef.current && svgContainerRef.current) {
        try {
          wrapperRef.current.removeChild(svgContainerRef.current);
        } catch (_) { /* already removed */ }
        svgContainerRef.current = null;
      }
    };
  }, []);

  if (error) {
    return (
      <div className="p-4 bg-gray-50 rounded border">
        <p className="text-xs font-medium text-gray-500 mb-2">Diagram Source Code</p>
        <pre className="text-xs text-gray-600 whitespace-pre-wrap font-mono">{code}</pre>
      </div>
    );
  }

  return (
    <div
      ref={wrapperRef}
      className="p-4 bg-gray-50 rounded border overflow-x-auto flex items-center justify-center"
      style={{ minHeight: rendered ? "auto" : "200px" }}
    >
      {!rendered && !error && <Loader2 className="w-6 h-6 animate-spin text-gray-400" />}
    </div>
  );
}

// A4 page wrapper — each page has consistent A4 look
function PreviewPage({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="w-[90%] max-w-[794px] bg-white shadow-2xl border border-gray-200 p-12 space-y-8 relative overflow-hidden"
      style={{ minHeight: "1123px" }}
    >
      <PageWatermark />
      {children}
    </div>
  );
}

interface Props {
  isGenerating?: boolean;
  generateError?: string | null;
  generateResult?: GenerateProjectResponse | null;
}

export function ReviewStep({ isGenerating, generateError, generateResult }: Props) {

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

  if (!generateResult) {
    return (
      <div className="flex flex-col gap-14 items-center justify-center min-h-screen py-12 overflow-auto mb-25">
        <div className="w-[90%] max-w-[794px] aspect-[794/1123] bg-white shadow-2xl border border-gray-200" />
        <div className="w-[90%] max-w-[794px] aspect-[794/1123] bg-white shadow-2xl border border-gray-200" />
      </div>
    );
  }

  const brief = generateResult;
  const diagramCode = brief.diagram?.diagram || (typeof brief.diagram === "string" ? brief.diagram : null);

  return (
    <div
      className="flex flex-col gap-14 items-center justify-center py-12 overflow-auto mb-25"
      style={{ userSelect: "none", WebkitUserSelect: "none" }}
      onContextMenu={(e) => e.preventDefault()}
      onCopy={(e) => e.preventDefault()}
      onCut={(e) => e.preventDefault()}
    >

      {/* Page 1 — Title, Overview, Target Audience, Problem Statement */}
      <PreviewPage>
        {brief.title && (
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{brief.title}</h1>
          </div>
        )}

        {brief.overview && (
          <div>
            <h2 className="text-sm font-semibold text-gray-500 uppercase mb-2">Overview</h2>
            <p className="text-sm text-gray-700 leading-relaxed">{brief.overview}</p>
          </div>
        )}

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
      </PreviewPage>

      {/* Page 2 — Objectives, Success Criteria, Key Features */}
      <PreviewPage>
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
      </PreviewPage>

      {/* Page 3 — Tech Stack, Scope, Risks */}
      <PreviewPage>
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

        {brief.risks && Array.isArray(brief.risks) && (
          <div>
            <h2 className="text-sm font-semibold text-gray-500 uppercase mb-2">Risks & Mitigation</h2>
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
      </PreviewPage>

      {/* Page 4 — User Flow, SRS Modules */}
      <PreviewPage>
        {brief.userFlow && (
          <div>
            <h2 className="text-sm font-semibold text-gray-500 uppercase mb-2">User Flow</h2>
            {brief.userFlow.steps && Array.isArray(brief.userFlow.steps) && (
              <ol className="list-decimal list-inside space-y-1">
                {brief.userFlow.steps.map((s: string, i: number) => (
                  <li key={i} className="text-sm text-gray-700">{s}</li>
                ))}
              </ol>
            )}
          </div>
        )}

        {brief.srsModules && Array.isArray(brief.srsModules) && (
          <div>
            <h2 className="text-sm font-semibold text-gray-500 uppercase mb-3">SRS Modules</h2>
            <div className="space-y-4">
              {brief.srsModules.map((m: any, i: number) => (
                <div key={i}>
                  <h3 className="text-sm font-semibold text-gray-800 mb-1">{m.moduleName}</h3>
                  {m.requirements && Array.isArray(m.requirements) && (
                    <ul className="list-disc list-inside space-y-1 ml-2">
                      {m.requirements.map((r: any, j: number) => (
                        <li key={j} className="text-sm text-gray-700">
                          <span className="font-medium text-gray-500">[{r.id}]</span> {r.userStory}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </PreviewPage>

      {/* Page 5 — NFR, Assumptions, Clarification Log */}
      <PreviewPage>
        {brief.nonFunctionalRequirements && Array.isArray(brief.nonFunctionalRequirements) && (
          <div>
            <h2 className="text-sm font-semibold text-gray-500 uppercase mb-2">Non-Functional Requirements</h2>
            <ul className="list-disc list-inside space-y-1">
              {brief.nonFunctionalRequirements.map((nfr: any, i: number) => (
                <li key={i} className="text-sm text-gray-700">
                  {typeof nfr === "string" ? nfr : `${nfr.category}: ${nfr.requirement}`}
                </li>
              ))}
            </ul>
          </div>
        )}

        {brief.assumptions && Array.isArray(brief.assumptions) && (
          <div>
            <h2 className="text-sm font-semibold text-gray-500 uppercase mb-2">Assumptions</h2>
            <ul className="list-disc list-inside space-y-1">
              {brief.assumptions.map((a: any, i: number) => (
                <li key={i} className="text-sm text-gray-700">{typeof a === "string" ? a : a.assumption || JSON.stringify(a)}</li>
              ))}
            </ul>
          </div>
        )}

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
      </PreviewPage>

      {/* Page 6 — Architecture Diagram (own page, like PDF service) */}
      {diagramCode && (
        <PreviewPage>
          <div>
            <h2 className="text-sm font-semibold text-gray-500 uppercase mb-3">Architecture Diagram</h2>
            <MermaidDiagram code={diagramCode} />
            {brief.diagram?.description && (
              <p className="text-xs text-gray-500 mt-3 leading-relaxed">{brief.diagram.description}</p>
            )}
          </div>
        </PreviewPage>
      )}

    </div>
  );
}
