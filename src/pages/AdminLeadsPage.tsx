import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Users,
  Search,
  Download,
  Trash2,
  CheckCircle,
  Clock,
  Globe,
  Filter,
  ArrowLeft,
  Sparkles,
  Phone,
  Mail,
  ShieldAlert,
} from 'lucide-react';
import { Seo } from '../components/Seo';
import { CapturedLead } from '../components/ChatWidget';
import { auth, db } from '../lib/firebase';
import { collection, getDocs, orderBy, query, limit } from 'firebase/firestore';

const STORAGE_KEY = 'simplytalk_captured_leads';

export const AdminLeadsPage: React.FC = () => {
  const [leads, setLeads] = useState<CapturedLead[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterChannel, setFilterChannel] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [isLoading, setIsLoading] = useState(true);

  // Load from both localStorage and Firestore
  useEffect(() => {
    const loadLeads = async () => {
      setIsLoading(true);
      const combined: CapturedLead[] = [];

      // 1. From localStorage
      try {
        const local = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
        if (Array.isArray(local)) {
          combined.push(...local);
        }
      } catch (e) {
        console.warn('Error reading localStorage leads', e);
      }

      // 2. From Firestore (if available)
      try {
        const q = query(collection(db, 'leads'), orderBy('createdAt', 'desc'), limit(50));
        const snap = await getDocs(q);
        snap.forEach((doc) => {
          const d = doc.data();
          // Avoid duplicate IDs
          if (!combined.some((item) => item.id === doc.id)) {
            combined.push({
              id: doc.id,
              name: d.name || 'Anonymous',
              email: d.email || '',
              phone: d.phone || '',
              page: d.page || '/',
              timestamp: d.createdAt || new Date().toISOString(),
              channel: d.channel || 'website_bot',
              status: d.status || 'new',
              summary: d.summary || '',
            });
          }
        });
      } catch (err) {
        console.warn('Firestore leads read note (non-authenticated or empty):', err);
      }

      // Fallback sample lead if completely empty so the owner can preview the UI
      if (combined.length === 0) {
        combined.push({
          id: 'lead_sample_1',
          name: 'Sarah Jenkins',
          email: 'sarah.jenkins@example.com',
          phone: '+1 (555) 019-2834',
          page: '/#pricing',
          timestamp: new Date().toISOString(),
          channel: 'website_bot',
          status: 'new',
          summary: 'Inquired about Team plan conversation credit reset cycle and WhatsApp integration.',
        });
      }

      setLeads(combined);
      setIsLoading(false);
    };

    loadLeads();
  }, []);

  const handleClearAll = () => {
    if (window.confirm('Are you sure you want to clear stored demo leads from local storage?')) {
      localStorage.removeItem(STORAGE_KEY);
      setLeads([]);
    }
  };

  const handleExportCsv = () => {
    if (leads.length === 0) return;
    const headers = ['ID', 'Name', 'Email', 'Phone', 'Origin Page', 'Channel', 'Status', 'Timestamp', 'Summary'];
    const rows = leads.map((l) => [
      l.id,
      `"${l.name.replace(/"/g, '""')}"`,
      `"${l.email.replace(/"/g, '""')}"`,
      `"${l.phone.replace(/"/g, '""')}"`,
      `"${l.page}"`,
      l.channel,
      l.status,
      l.timestamp,
      `"${(l.summary || '').replace(/"/g, '""')}"`,
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `simplytalk_leads_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredLeads = leads.filter((lead) => {
    const matchesSearch =
      lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.phone.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.page.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesChannel = filterChannel === 'all' || lead.channel === filterChannel;
    const matchesStatus = filterStatus === 'all' || lead.status === filterStatus;
    return matchesSearch && matchesChannel && matchesStatus;
  });

  return (
    <div className="pt-28 pb-20 bg-[#F7F8FC] min-h-screen">
      <Seo
        title="Captured Leads Dashboard (Demo) | Simply Talk"
        description="Demo administrative leads viewer showing leads captured by Simply Talk live chat and forms."
      />

      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Top Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-200">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#14C3A2]" />
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Internal Demo Dashboard
              </span>
            </div>
            <h1 className="text-3xl font-extrabold text-[#1F2433] tracking-tight mt-1">
              Captured Leads Inbox
            </h1>
            <p className="text-xs text-slate-500">
              Verified persistence in Firestore & Local Storage with originating page tracking.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleExportCsv}
              className="px-4 py-2 rounded-xl bg-white border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50 shadow-2xs inline-flex items-center gap-2 cursor-pointer"
            >
              <Download className="w-4 h-4 text-[#3B2FD0]" />
              <span>Export CSV</span>
            </button>
            <button
              onClick={handleClearAll}
              className="px-4 py-2 rounded-xl bg-white border border-slate-200 text-xs font-bold text-slate-500 hover:text-red-600 shadow-2xs inline-flex items-center gap-1.5 cursor-pointer"
            >
              <Trash2 className="w-4 h-4" />
              <span>Clear Demo</span>
            </button>
          </div>
        </div>

        {/* Filters and Search Bar */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by name, email, phone..."
              className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 text-xs focus:outline-hidden focus:ring-2 focus:ring-[#3B2FD0]"
            />
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="flex items-center gap-1.5 text-xs text-slate-600">
              <Filter className="w-3.5 h-3.5 text-slate-400" />
              <span>Channel:</span>
              <select
                value={filterChannel}
                onChange={(e) => setFilterChannel(e.target.value)}
                className="px-2.5 py-1.5 rounded-lg border border-slate-200 text-xs bg-slate-50 cursor-pointer"
              >
                <option value="all">All Channels</option>
                <option value="website_bot">Website Chatbot</option>
                <option value="whatsapp_demo">WhatsApp Demo</option>
                <option value="contact_form">Contact Form</option>
              </select>
            </div>

            <div className="flex items-center gap-1.5 text-xs text-slate-600">
              <span>Status:</span>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-2.5 py-1.5 rounded-lg border border-slate-200 text-xs bg-slate-50 cursor-pointer"
              >
                <option value="all">All Statuses</option>
                <option value="new">New</option>
                <option value="contacted">Contacted</option>
                <option value="qualified">Qualified</option>
              </select>
            </div>
          </div>
        </div>

        {/* Leads Table */}
        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[750px]">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-xs font-bold text-slate-500 uppercase tracking-wider">
                  <th className="py-4 px-6">Prospect Name</th>
                  <th className="py-4 px-4">Contact Info</th>
                  <th className="py-4 px-4">Originating Page</th>
                  <th className="py-4 px-4">Channel</th>
                  <th className="py-4 px-4">Status</th>
                  <th className="py-4 px-6 text-right">Captured At</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs">
                {filteredLeads.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-12 text-center text-slate-400">
                      No leads match the current search or filters. Test the live chat on any page to capture one!
                    </td>
                  </tr>
                ) : (
                  filteredLeads.map((lead) => (
                    <tr key={lead.id} className="hover:bg-slate-50/70 transition-colors">
                      <td className="py-4 px-6 font-bold text-slate-900">
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-full bg-indigo-50 text-[#3B2FD0] flex items-center justify-center font-bold text-xs shrink-0">
                            {lead.name.slice(0, 1).toUpperCase()}
                          </div>
                          <div>
                            <div>{lead.name}</div>
                            {lead.summary && (
                              <div className="text-[10px] text-slate-400 font-normal line-clamp-1 max-w-[200px]">
                                {lead.summary}
                              </div>
                            )}
                          </div>
                        </div>
                      </td>

                      <td className="py-4 px-4 text-slate-600">
                        <div className="space-y-0.5">
                          <div className="flex items-center gap-1.5 font-mono text-[11px]">
                            <Mail className="w-3 h-3 text-[#3B2FD0]" />
                            <span>{lead.email}</span>
                          </div>
                          {lead.phone && (
                            <div className="flex items-center gap-1.5 font-mono text-[11px] text-slate-500">
                              <Phone className="w-3 h-3 text-[#14C3A2]" />
                              <span>{lead.phone}</span>
                            </div>
                          )}
                        </div>
                      </td>

                      <td className="py-4 px-4 font-mono text-[11px] text-[#3B2FD0]">
                        <span className="bg-indigo-50 px-2 py-0.5 rounded-md">
                          {lead.page}
                        </span>
                      </td>

                      <td className="py-4 px-4">
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-teal-50 text-emerald-800">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#14C3A2]" />
                          {lead.channel === 'website_bot' ? 'Website Chat' : lead.channel}
                        </span>
                      </td>

                      <td className="py-4 px-4">
                        <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-bold bg-amber-50 text-amber-800 border border-amber-200">
                          {lead.status.toUpperCase()}
                        </span>
                      </td>

                      <td className="py-4 px-6 text-right text-slate-400 font-mono text-[11px]">
                        {new Date(lead.timestamp).toLocaleString([], {
                          month: 'short',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Info notice */}
        <div className="text-center text-xs text-slate-400">
          This dashboard is an internal demo view for testing lead capture flows. It is not displayed in the public marketing navigation.
        </div>
      </div>
    </div>
  );
};
