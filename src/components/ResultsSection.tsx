import React, { useState } from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  AreaChart,
  Area,
} from 'recharts';
import { TrendingUp, Clock, UserCheck, ShieldCheck, ArrowUpRight } from 'lucide-react';

interface ConversionData {
  industry: string;
  before: number; // Conversion rate % before SimplyTalk
  after: number;  // Conversion rate % with SimplyTalk
  growth: string;
}

const INDUSTRY_RESULTS: ConversionData[] = [
  { industry: 'Clinics', before: 2.4, after: 7.2, growth: '+200%' },
  { industry: 'Property', before: 1.8, after: 6.1, growth: '+238%' },
  { industry: 'Tuition', before: 2.9, after: 8.4, growth: '+189%' },
  { industry: 'Salons', before: 3.5, after: 10.2, growth: '+191%' },
  { industry: 'Services', before: 2.1, after: 6.9, growth: '+228%' },
  { industry: 'Online Retail', before: 1.9, after: 5.6, growth: '+194%' },
];

const TIMELINE_DATA = [
  { month: 'Month 0', standardForm: 2.1, simplyTalk: 2.1 },
  { month: 'Month 1', standardForm: 2.2, simplyTalk: 4.8 },
  { month: 'Month 2', standardForm: 2.0, simplyTalk: 6.4 },
  { month: 'Month 3', standardForm: 2.3, simplyTalk: 7.6 },
  { month: 'Month 4', standardForm: 2.1, simplyTalk: 8.2 },
  { month: 'Month 5', standardForm: 2.2, simplyTalk: 8.9 },
];

export const ResultsSection: React.FC = () => {
  const [activeView, setActiveView] = useState<'byIndustry' | 'timeline'>('byIndustry');

  return (
    <section className="py-20 sm:py-24 bg-white border-t border-slate-200/60" id="results">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-teal-50 text-emerald-800 font-bold text-xs uppercase tracking-wider">
            <TrendingUp className="w-3.5 h-3.5 text-[#14C3A2]" />
            <span>Proven Lead Performance</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1F2433] tracking-tight">
            Average Increase in Lead Conversion Rates
          </h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            When customer questions are answered in seconds instead of hours, more visitors stay, qualify themselves, and leave their contact details.
          </p>
        </div>

        {/* 4 Stat Highlights */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <div className="bg-[#F7F8FC] rounded-2xl p-6 border border-slate-200/80 shadow-2xs">
            <div className="flex items-center justify-between text-xs font-bold text-emerald-600 mb-2">
              <span>LEAD VOLUME</span>
              <ArrowUpRight className="w-4 h-4" />
            </div>
            <div className="text-3xl sm:text-4xl font-extrabold text-[#1F2433] tracking-tight">
              +208%
            </div>
            <p className="text-xs text-slate-500 mt-1">Average conversion surge across all sectors</p>
          </div>

          <div className="bg-[#F7F8FC] rounded-2xl p-6 border border-slate-200/80 shadow-2xs">
            <div className="flex items-center justify-between text-xs font-bold text-[#3B2FD0] mb-2">
              <span>RESPONSE SPEED</span>
              <Clock className="w-4 h-4" />
            </div>
            <div className="text-3xl sm:text-4xl font-extrabold text-[#1F2433] tracking-tight">
              &lt; 5 sec
            </div>
            <p className="text-xs text-slate-500 mt-1">Instant reply speed, day, night, and weekends</p>
          </div>

          <div className="bg-[#F7F8FC] rounded-2xl p-6 border border-slate-200/80 shadow-2xs">
            <div className="flex items-center justify-between text-xs font-bold text-[#14C3A2] mb-2">
              <span>AFTER-HOURS LEADS</span>
              <TrendingUp className="w-4 h-4" />
            </div>
            <div className="text-3xl sm:text-4xl font-extrabold text-[#1F2433] tracking-tight">
              43%
            </div>
            <p className="text-xs text-slate-500 mt-1">Of qualified leads captured outside office hours</p>
          </div>

          <div className="bg-[#F7F8FC] rounded-2xl p-6 border border-slate-200/80 shadow-2xs">
            <div className="flex items-center justify-between text-xs font-bold text-slate-700 mb-2">
              <span>EXTRA STAFF</span>
              <UserCheck className="w-4 h-4" />
            </div>
            <div className="text-3xl sm:text-4xl font-extrabold text-[#1F2433] tracking-tight">
              0
            </div>
            <p className="text-xs text-slate-500 mt-1">No additional receptionist or sales staff needed</p>
          </div>
        </div>

        {/* Interactive Chart Container */}
        <div className="bg-[#F7F8FC] rounded-3xl p-6 sm:p-10 border border-slate-200/90 shadow-sm space-y-6">
          {/* Chart Controls & Legend */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-4 border-b border-slate-200/80">
            <div>
              <h3 className="text-lg font-bold text-[#1F2433]">
                {activeView === 'byIndustry'
                  ? 'Visitor-to-Lead Conversion Rate (%) by Industry'
                  : 'Cumulative Lead Conversion Growth Rate over Time (%)'}
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Comparing standard static contact forms vs. Simply Talk automated conversational qualification.
              </p>
            </div>

            {/* Toggle View Buttons */}
            <div className="flex items-center bg-white p-1 rounded-xl border border-slate-200 shrink-0">
              <button
                type="button"
                onClick={() => setActiveView('byIndustry')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                  activeView === 'byIndustry'
                    ? 'bg-[#3B2FD0] text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                By Industry
              </button>
              <button
                type="button"
                onClick={() => setActiveView('timeline')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                  activeView === 'timeline'
                    ? 'bg-[#3B2FD0] text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                6-Month Timeline
              </button>
            </div>
          </div>

          {/* Recharts Visualization */}
          <div className="w-full h-[320px] sm:h-[380px] pt-2">
            {activeView === 'byIndustry' ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={INDUSTRY_RESULTS} margin={{ top: 20, right: 20, left: -10, bottom: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" vertical={false} />
                  <XAxis
                    dataKey="industry"
                    tick={{ fill: '#64748B', fontSize: 12, fontWeight: 600 }}
                    axisLine={{ stroke: '#CBD5E1' }}
                    tickLine={false}
                  />
                  <YAxis
                    tickFormatter={(v) => `${v}%`}
                    tick={{ fill: '#64748B', fontSize: 11 }}
                    axisLine={{ stroke: '#CBD5E1' }}
                    tickLine={false}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#1F2433',
                      borderColor: '#334155',
                      borderRadius: '12px',
                      color: '#FFFFFF',
                      fontSize: '12px',
                      boxShadow: '0 10px 25px -5px rgba(0,0,0,0.3)',
                    }}
                    formatter={(val: any, name: any) => [
                      `${val}% conversion rate`,
                      name === 'after' ? 'With Simply Talk' : 'Before (Static Form)',
                    ]}
                  />
                  <Legend
                    wrapperStyle={{ paddingTop: '15px', fontSize: '12px', fontWeight: 600 }}
                    formatter={(value) => (value === 'after' ? 'With Simply Talk' : 'Before (Static Contact Form)')}
                  />
                  <Bar
                    dataKey="before"
                    name="before"
                    fill="#94A3B8"
                    radius={[6, 6, 0, 0]}
                    maxBarSize={45}
                  />
                  <Bar
                    dataKey="after"
                    name="after"
                    fill="#14C3A2"
                    radius={[6, 6, 0, 0]}
                    maxBarSize={45}
                  />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={TIMELINE_DATA} margin={{ top: 20, right: 20, left: -10, bottom: 20 }}>
                  <defs>
                    <linearGradient id="colorSimplyTalk" x1="0" y1="0" x2="0" y2="1">
                      <stop stopColor="#14C3A2" stopOpacity={0.4} />
                      <stop stopColor="#14C3A2" stopOpacity={0.02} />
                    </linearGradient>
                    <linearGradient id="colorStatic" x1="0" y1="0" x2="0" y2="1">
                      <stop stopColor="#94A3B8" stopOpacity={0.2} />
                      <stop stopColor="#94A3B8" stopOpacity={0.0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" vertical={false} />
                  <XAxis
                    dataKey="month"
                    tick={{ fill: '#64748B', fontSize: 12, fontWeight: 600 }}
                    axisLine={{ stroke: '#CBD5E1' }}
                    tickLine={false}
                  />
                  <YAxis
                    tickFormatter={(v) => `${v}%`}
                    tick={{ fill: '#64748B', fontSize: 11 }}
                    axisLine={{ stroke: '#CBD5E1' }}
                    tickLine={false}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#1F2433',
                      borderColor: '#334155',
                      borderRadius: '12px',
                      color: '#FFFFFF',
                      fontSize: '12px',
                      boxShadow: '0 10px 25px -5px rgba(0,0,0,0.3)',
                    }}
                    formatter={(val: any, name: any) => [
                      `${val}% conversion rate`,
                      name === 'simplyTalk' ? 'With Simply Talk' : 'Static Form Only',
                    ]}
                  />
                  <Legend
                    wrapperStyle={{ paddingTop: '15px', fontSize: '12px', fontWeight: 600 }}
                    formatter={(value) =>
                      value === 'simplyTalk' ? 'With Simply Talk (Instant AI Qualification)' : 'Static Contact Form Only'
                    }
                  />
                  <Area
                    type="monotone"
                    dataKey="standardForm"
                    name="standardForm"
                    stroke="#94A3B8"
                    strokeWidth={2}
                    fillOpacity={1}
                    fill="url(#colorStatic)"
                  />
                  <Area
                    type="monotone"
                    dataKey="simplyTalk"
                    name="simplyTalk"
                    stroke="#14C3A2"
                    strokeWidth={3}
                    fillOpacity={1}
                    fill="url(#colorSimplyTalk)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            )}
          </div>

          {/* Reassurance footnote */}
          <div className="pt-2 text-center text-xs text-slate-500 flex items-center justify-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#14C3A2]" />
            <span>Based on aggregated conversion metrics from early client trial deployments.</span>
          </div>
        </div>
      </div>
    </section>
  );
};
