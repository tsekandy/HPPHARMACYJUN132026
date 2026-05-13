import React, { useState } from 'react';
import { ArrowLeft, Search, AlertCircle, CheckCircle, Info, AlertTriangle, Zap } from 'lucide-react';

interface SEOIssue {
  type: 'error' | 'warning' | 'info';
  message: string;
  priority: number;
}

interface SEOSuggestion {
  title: string;
  description: string;
  impact: 'high' | 'medium' | 'low';
}

interface SEOAnalysis {
  score: number;
  issues: SEOIssue[];
  suggestions: SEOSuggestion[];
}

export default function SEOAnalyzer({ onBack }: { onBack: () => void }) {
  const [url, setUrl] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<SEOAnalysis | null>(null);
  const [error, setError] = useState('');

  const handleAnalyze = async () => {
    if (!url.trim()) {
      setError('Please enter a valid URL');
      return;
    }

    setIsAnalyzing(true);
    setError('');
    setAnalysis(null);

    try {
      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
      const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

      const response = await fetch(
        `${supabaseUrl}/functions/v1/seo-analyzer`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${anonKey}`,
          },
          body: JSON.stringify({
            url: url.startsWith('http') ? url : `https://${url}`,
          }),
        }
      );

      if (!response.ok) {
        throw new Error('Failed to analyze SEO');
      }

      const result = await response.json();
      if (result.success) {
        setAnalysis(result.analysis);
      } else {
        setError(result.error || 'Failed to analyze SEO');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const getScoreColor = (score: number): string => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    if (score >= 40) return 'text-orange-600';
    return 'text-red-600';
  };

  const getScoreBgColor = (score: number): string => {
    if (score >= 80) return 'bg-green-50 border-green-200';
    if (score >= 60) return 'bg-yellow-50 border-yellow-200';
    if (score >= 40) return 'bg-orange-50 border-orange-200';
    return 'bg-red-50 border-red-200';
  };

  const getIssueIcon = (type: string) => {
    switch (type) {
      case 'error':
        return <AlertCircle className="w-5 h-5 text-red-600" />;
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-yellow-600" />;
      case 'info':
        return <Info className="w-5 h-5 text-blue-600" />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="section-container py-8">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 mb-8 font-semibold"
        >
          <ArrowLeft className="w-5 h-5" />
          Back
        </button>

        <div className="max-w-3xl">
          <div className="mb-12">
            <p className="text-sm font-semibold text-primary-600 tracking-wide uppercase mb-3">SEO Tools</p>
            <h1 className="heading-lg text-neutral-900 mb-4">Website SEO Analyzer</h1>
            <p className="text-body-lg">
              Analyze your website's SEO performance and get actionable recommendations to improve your search engine visibility.
            </p>
          </div>

          {/* Analysis Input */}
          <div className="bg-neutral-50 rounded-2xl p-8 mb-8">
            <label className="block text-sm font-semibold text-neutral-900 mb-3">
              Website URL
            </label>
            <div className="flex gap-3">
              <input
                type="url"
                placeholder="Enter your website URL (e.g., example.com)"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleAnalyze()}
                className="input-field flex-1"
              />
              <button
                onClick={handleAnalyze}
                disabled={isAnalyzing}
                className="btn-primary px-8 disabled:opacity-50"
              >
                <Search className="w-5 h-5 mr-2" />
                {isAnalyzing ? 'Analyzing...' : 'Analyze'}
              </button>
            </div>
            {error && (
              <p className="text-red-600 text-sm mt-3">{error}</p>
            )}
          </div>

          {/* Results */}
          {analysis && (
            <div className="space-y-8">
              {/* Score Card */}
              <div className={`border-2 rounded-2xl p-8 ${getScoreBgColor(analysis.score)}`}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-neutral-600 mb-2">Overall SEO Score</p>
                    <p className={`text-5xl font-bold ${getScoreColor(analysis.score)}`}>
                      {analysis.score}/100
                    </p>
                  </div>
                  <div className="text-right">
                    {analysis.score >= 80 && (
                      <CheckCircle className="w-16 h-16 text-green-600 mb-2" />
                    )}
                    {analysis.score < 80 && (
                      <AlertTriangle className="w-16 h-16 text-yellow-600 mb-2" />
                    )}
                    <p className="text-sm font-medium text-neutral-700">
                      {analysis.score >= 80
                        ? 'Excellent!'
                        : analysis.score >= 60
                        ? 'Good'
                        : analysis.score >= 40
                        ? 'Needs work'
                        : 'Poor'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Issues */}
              {analysis.issues.length > 0 && (
                <div>
                  <h2 className="heading-md text-neutral-900 mb-4">Issues Found</h2>
                  <div className="space-y-3">
                    {analysis.issues.map((issue, i) => (
                      <div
                        key={i}
                        className={`flex gap-4 p-4 rounded-xl border ${
                          issue.type === 'error'
                            ? 'bg-red-50 border-red-200'
                            : issue.type === 'warning'
                            ? 'bg-yellow-50 border-yellow-200'
                            : 'bg-blue-50 border-blue-200'
                        }`}
                      >
                        <div className="shrink-0 mt-0.5">
                          {getIssueIcon(issue.type)}
                        </div>
                        <div className="flex-1">
                          <p className={`font-semibold text-sm ${
                            issue.type === 'error'
                              ? 'text-red-900'
                              : issue.type === 'warning'
                              ? 'text-yellow-900'
                              : 'text-blue-900'
                          }`}>
                            {issue.message}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Suggestions */}
              {analysis.suggestions.length > 0 && (
                <div>
                  <h2 className="heading-md text-neutral-900 mb-4">Recommendations</h2>
                  <div className="grid grid-cols-1 gap-4">
                    {analysis.suggestions.map((suggestion, i) => (
                      <div key={i} className="bg-white border border-neutral-200 rounded-xl p-6">
                        <div className="flex items-start gap-3 mb-2">
                          <Zap className="w-5 h-5 text-primary-600 mt-0.5 shrink-0" />
                          <h3 className="font-semibold text-neutral-900">{suggestion.title}</h3>
                          <span className={`text-xs font-semibold px-2 py-1 rounded ml-auto ${
                            suggestion.impact === 'high'
                              ? 'bg-red-100 text-red-700'
                              : suggestion.impact === 'medium'
                              ? 'bg-yellow-100 text-yellow-700'
                              : 'bg-blue-100 text-blue-700'
                          }`}>
                            {suggestion.impact.toUpperCase()} IMPACT
                          </span>
                        </div>
                        <p className="text-neutral-600 text-sm leading-relaxed">
                          {suggestion.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Info Box */}
          <div className="mt-12 p-6 bg-primary-50 border border-primary-100 rounded-xl">
            <p className="text-sm text-primary-800">
              <strong>SEO Analysis Tips:</strong> This tool analyzes your website's on-page SEO elements including title tags, meta descriptions, heading structure, and more.
              For comprehensive SEO audits, also consider Google Search Console and PageSpeed Insights.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
