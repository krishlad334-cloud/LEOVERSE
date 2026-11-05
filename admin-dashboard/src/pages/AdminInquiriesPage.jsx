import { useState, useEffect } from 'react';
import { Mail, Search, Trash2, ExternalLink, RefreshCw, Check, Copy, Send, Sparkles, Inbox } from 'lucide-react';

const LOCAL_STORAGE_KEY = 'leoverse_newsletter_inquiries';
const TARGET_EMAIL = 'krishlad334@gmail.com';

export default function AdminInquiriesPage() {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('All');
  const [copiedId, setCopiedId] = useState(null);

  const fetchInquiries = async () => {
    setLoading(true);
    try {
      // 1. Fetch from SQLite backend
      const res = await fetch('http://localhost:5173/api/inquiries');
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) {
          setInquiries(data);
          setLoading(false);
          return;
        }
      }
    } catch {
      // Backend maybe offline, fallback to localStorage
    }

    // 2. Fallback to localStorage
    try {
      const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        const mapped = parsed.map((item, idx) => ({
          id: `inq-local-${idx}`,
          email: item.email || item,
          name: item.name || 'VIP Subscriber',
          type: item.type || 'newsletter',
          subject: item.subject || 'VIP Newsletter Subscription',
          message: item.message || 'Subscribed via website footer',
          targetEmail: TARGET_EMAIL,
          status: 'new',
          createdAt: item.date || item.createdAt || new Date().toISOString()
        }));
        setInquiries(mapped);
      } else {
        setInquiries([]);
      }
    } catch {
      setInquiries([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInquiries();
  }, []);

  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:5173/api/inquiries/${id}`, { method: 'DELETE' });
    } catch {
      // silent
    }
    setInquiries((prev) => prev.filter((item) => item.id !== id));
  };

  const handleCopyEmail = (id, email) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(email);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    }
  };

  const filteredInquiries = inquiries.filter((item) => {
    if (filterType !== 'All') {
      if (filterType === 'Newsletter' && item.type !== 'newsletter') return false;
      if (filterType === 'Contact' && item.type !== 'contact') return false;
    }
    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase();
      const matchEmail = item.email?.toLowerCase().includes(q);
      const matchName = item.name?.toLowerCase().includes(q);
      const matchMsg = item.message?.toLowerCase().includes(q);
      if (!matchEmail && !matchName && !matchMsg) return false;
    }
    return true;
  });

  const newsletterCount = inquiries.filter((i) => i.type === 'newsletter').length;
  const contactCount = inquiries.filter((i) => i.type === 'contact').length;

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold font-serif text-[#2C4152] tracking-wide">
              Email Inquiries & VIP Leads
            </h1>
            <span className="px-2 py-0.5 text-[10px] font-bold bg-[#D5A249]/15 text-[#D5A249] rounded-full border border-[#D5A249]/30">
              {inquiries.length} Active
            </span>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            All customer inquiries and newsletter signups configured for delivery to{' '}
            <strong className="text-[#2C4152]">{TARGET_EMAIL}</strong>
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={fetchInquiries}
            disabled={loading}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold bg-white border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors shadow-xs cursor-pointer"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin text-[#D5A249]' : ''}`} />
            <span>Refresh</span>
          </button>

          <a
            href={`https://mail.google.com/mail/?view=cm&fs=1&to=${TARGET_EMAIL}&su=LEOVERSE+Test+Inquiry&body=This+is+a+direct+verification+email+to+${TARGET_EMAIL}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold bg-[#2C4152] text-white rounded-lg hover:bg-[#1f2e3a] transition-colors shadow-xs cursor-pointer"
          >
            <Send className="w-3.5 h-3.5 text-[#D5A249]" />
            <span>Open Krish's Gmail</span>
          </a>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-[11px] font-medium text-gray-400 uppercase tracking-wider block">
              Total Inquiries
            </span>
            <span className="text-2xl font-bold font-serif text-[#2C4152] mt-1 block">
              {inquiries.length}
            </span>
          </div>
          <div className="w-10 h-10 rounded-lg bg-[#2C4152]/5 flex items-center justify-center text-[#2C4152]">
            <Inbox className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-[11px] font-medium text-gray-400 uppercase tracking-wider block">
              VIP Newsletter
            </span>
            <span className="text-2xl font-bold font-serif text-[#D5A249] mt-1 block">
              {newsletterCount}
            </span>
          </div>
          <div className="w-10 h-10 rounded-lg bg-[#D5A249]/10 flex items-center justify-center text-[#D5A249]">
            <Sparkles className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-[11px] font-medium text-gray-400 uppercase tracking-wider block">
              Contact Forms
            </span>
            <span className="text-2xl font-bold font-serif text-blue-600 mt-1 block">
              {contactCount}
            </span>
          </div>
          <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600">
            <Mail className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-emerald-100 shadow-xs flex items-center justify-between bg-emerald-50/20">
          <div>
            <span className="text-[11px] font-medium text-emerald-800 uppercase tracking-wider block">
              Target Destination
            </span>
            <span className="text-xs font-semibold text-emerald-900 mt-1 block truncate max-w-[170px]" title={TARGET_EMAIL}>
              {TARGET_EMAIL}
            </span>
          </div>
          <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-700">
            <Check className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-1.5 w-full sm:w-auto">
          {['All', 'Newsletter', 'Contact'].map((t) => (
            <button
              key={t}
              onClick={() => setFilterType(t)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                filterType === t
                  ? 'bg-[#2C4152] text-white shadow-xs'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search email, name or message..."
            className="w-full pl-9 pr-3 py-1.5 text-xs bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-[#D5A249] focus:bg-white"
          />
        </div>
      </div>

      {/* Inquiries Table / List */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-xs overflow-hidden">
        {filteredInquiries.length === 0 ? (
          <div className="text-center py-16 px-4">
            <div className="w-14 h-14 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-3 text-gray-400 border border-gray-100">
              <Mail className="w-6 h-6" />
            </div>
            <h3 className="text-sm font-semibold text-gray-700">No inquiries found</h3>
            <p className="text-xs text-gray-400 mt-1 max-w-sm mx-auto">
              {searchTerm
                ? 'Try matching a different search term or clearing the filter.'
                : 'When visitors enter their email in the website footer or contact form, they will appear here and dispatch to ' + TARGET_EMAIL}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-gray-50/70 border-b border-gray-100 text-gray-500 font-semibold uppercase text-[10px] tracking-wider">
                  <th className="py-3 px-4">Subscriber / Sender</th>
                  <th className="py-3 px-4">Type</th>
                  <th className="py-3 px-4">Message / Details</th>
                  <th className="py-3 px-4">Date & Time</th>
                  <th className="py-3 px-4">Destination</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-gray-700">
                {filteredInquiries.map((inq) => {
                  const replySubject = encodeURIComponent(`LEOVERSE Atelier - Regarding your ${inq.subject || 'Inquiry'}`);
                  const replyBody = encodeURIComponent(`Dear ${inq.name || 'Client'},\n\nThank you for connecting with LEOVERSE Menswear Atelier.\n\nBest regards,\nKrish Lad\nStudio Admin, LEOVERSE`);
                  const gmailReplyUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(inq.email)}&su=${replySubject}&body=${replyBody}`;
                  
                  const forwardSubject = encodeURIComponent(`[Fwd] LEOVERSE Inquiry from ${inq.email}`);
                  const forwardBody = encodeURIComponent(`Inquiry Details:\n- Sender: ${inq.name || 'VIP Client'}\n- Email: ${inq.email}\n- Type: ${inq.type}\n- Date: ${inq.createdAt}\n- Message: ${inq.message || 'N/A'}`);
                  const gmailForwardUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${TARGET_EMAIL}&su=${forwardSubject}&body=${forwardBody}`;

                  return (
                    <tr key={inq.id} className="hover:bg-gray-50/80 transition-colors">
                      <td className="py-3.5 px-4">
                        <div className="font-semibold text-gray-900">{inq.name || 'VIP Subscriber'}</div>
                        <div className="text-[11px] text-gray-500 font-mono flex items-center gap-1.5 mt-0.5">
                          <span>{inq.email}</span>
                          <button
                            onClick={() => handleCopyEmail(inq.id, inq.email)}
                            title="Copy email address"
                            className="text-gray-400 hover:text-[#2C4152] transition-colors cursor-pointer"
                          >
                            {copiedId === inq.id ? (
                              <Check className="w-3 h-3 text-emerald-600" />
                            ) : (
                              <Copy className="w-3 h-3" />
                            )}
                          </button>
                        </div>
                      </td>

                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <span
                          className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                            inq.type === 'newsletter'
                              ? 'bg-[#D5A249]/15 text-[#9E7321] border border-[#D5A249]/30'
                              : 'bg-blue-50 text-blue-700 border border-blue-200'
                          }`}
                        >
                          {inq.type === 'newsletter' ? (
                            <>
                              <Sparkles className="w-2.5 h-2.5" />
                              VIP Newsletter
                            </>
                          ) : (
                            <>
                              <Mail className="w-2.5 h-2.5" />
                              Contact Form
                            </>
                          )}
                        </span>
                      </td>

                      <td className="py-3.5 px-4 max-w-xs">
                        <div className="font-medium text-gray-800 line-clamp-1">{inq.subject || 'VIP Subscription'}</div>
                        <div className="text-[11px] text-gray-500 line-clamp-1 mt-0.5">
                          {inq.message || 'No additional message provided.'}
                        </div>
                      </td>

                      <td className="py-3.5 px-4 whitespace-nowrap text-gray-500 text-[11px]">
                        {inq.createdAt ? new Date(inq.createdAt).toLocaleString() : 'Recent'}
                      </td>

                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <span className="text-[11px] font-mono font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                          {TARGET_EMAIL}
                        </span>
                      </td>

                      <td className="py-3.5 px-4 text-right whitespace-nowrap">
                        <div className="flex items-center justify-end gap-1.5">
                          <a
                            href={gmailReplyUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-semibold bg-gray-100 hover:bg-[#2C4152] hover:text-white text-gray-700 rounded transition-colors cursor-pointer"
                            title="Reply directly to customer via Gmail"
                          >
                            <Mail className="w-3 h-3 text-[#D5A249]" />
                            <span>Reply</span>
                            <ExternalLink className="w-2.5 h-2.5 opacity-60" />
                          </a>

                          <a
                            href={gmailForwardUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-semibold bg-[#D5A249]/15 hover:bg-[#D5A249] text-[#865e13] hover:text-white rounded transition-colors cursor-pointer"
                            title="Send inquiry to krishlad334@gmail.com"
                          >
                            <Send className="w-3 h-3" />
                            <span>Forward</span>
                          </a>

                          <button
                            onClick={() => handleDelete(inq.id)}
                            className="p-1 text-gray-400 hover:text-red-600 rounded transition-colors cursor-pointer ml-1"
                            title="Delete Inquiry"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
