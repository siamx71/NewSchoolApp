import { useEffect, useState } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { useAuth } from '../context/AuthContext.jsx';
import { db } from '../firebase/firebase.js';
import { getLocalResults, saveLocalResults } from '../firebase/localPersistence.js';
import greenfieldLogo from '../greenfield_logo.png';

/* ─────────────────────────────────────────────────────────────
   SVG Icon helpers
   ───────────────────────────────────────────────────────────── */
const HamburgerIcon = () => (
  <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" viewBox="0 0 24 24">
    <line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/>
  </svg>
);
const BellIcon = () => (
  <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/>
  </svg>
);
const ChevronRight = () => (
  <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
    <polyline points="9 18 15 12 9 6"/>
  </svg>
);
const ChevronLeft = () => (
  <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
    <polyline points="15 18 9 12 15 6"/>
  </svg>
);
const LogoutIcon = () => (
  <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/>
  </svg>
);

/* Bottom-nav icons */
const HomeNavIcon    = ({ active }) => <svg width="22" height="22" fill={active?'#2563eb':'none'} stroke={active?'#2563eb':'#94a3b8'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>;
const NoticeNavIcon  = ({ active }) => <svg width="22" height="22" fill="none" stroke={active?'#2563eb':'#94a3b8'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/><path d="M12 8v4"/><path d="M12 16h.01"/></svg>;
const CalendarNavIcon= ({ active }) => <svg width="22" height="22" fill="none" stroke={active?'#2563eb':'#94a3b8'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>;
const MsgNavIcon     = ({ active }) => <svg width="22" height="22" fill={active?'#2563eb':'none'} stroke={active?'#2563eb':'#94a3b8'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>;
const ProfileNavIcon = ({ active }) => <svg width="22" height="22" fill="none" stroke={active?'#2563eb':'#94a3b8'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>;

/* Sidebar-size icons (colored via currentColor) */
const SBHomeIcon    = () => <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>;
const SBStudentIcon = () => <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>;
const SBTeacherIcon = () => <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>;
const SBExamIcon    = () => <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><rect x="5" y="2" width="14" height="20" rx="2"/><line x1="9" y1="7" x2="15" y2="7"/><line x1="9" y1="11" x2="15" y2="11"/><line x1="9" y1="15" x2="13" y2="15"/></svg>;
const SBRoutineIcon = () => <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>;
const SBFeeIcon     = () => <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>;
const SBNoticeIcon  = () => <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/><path d="M12 8v4"/><path d="M12 16h.01"/></svg>;
const SBCalendarIcon= () => <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>;
const SBMsgIcon     = () => <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>;
const SBProfileIcon = () => <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>;

/* Large card icons (white stroke on colored bg) */
const CardStudentIcon = () => <svg width="26" height="26" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>;
const CardTeacherIcon = () => <svg width="26" height="26" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>;
const CardExamIcon   = () => <svg width="26" height="26" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><rect x="5" y="2" width="14" height="20" rx="2"/><line x1="9" y1="7" x2="15" y2="7"/><line x1="9" y1="11" x2="15" y2="11"/><line x1="9" y1="15" x2="13" y2="15"/></svg>;
const CardRoutineIcon= () => <svg width="26" height="26" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>;
const CardFeeIcon    = () => <svg width="26" height="26" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>;

/* ─────────────────────────────────────────────────────────────
   Static data
   ───────────────────────────────────────────────────────────── */
const menuItems = [
  { id: 'student_info',        title: 'Student Info',       desc: 'View your personal information',          color: '#4a90e2', Icon: CardStudentIcon, SBIcon: SBStudentIcon },
  { id: 'teachers_directory',  title: 'Teachers Directory', desc: 'Find and connect with teachers',          color: '#38b26e', Icon: CardTeacherIcon, SBIcon: SBTeacherIcon },
  { id: 'exam_result',         title: 'Result',             desc: 'View results',                          color: '#8b5cf6', Icon: CardExamIcon,    SBIcon: SBExamIcon    },
  { id: 'class_routine',       title: 'Class & Routine',    desc: 'View class routine and schedule',         color: '#f97316', Icon: CardRoutineIcon, SBIcon: SBRoutineIcon },
  { id: 'fee_management',      title: 'Fee Management',     desc: 'View fee structure and payment history',  color: '#0ea5a4', Icon: CardFeeIcon,     SBIcon: SBFeeIcon     },
];

const tabItems = [
  { id: 'home',     label: 'Home',     NavIcon: HomeNavIcon,     SBIcon: SBHomeIcon     },
  { id: 'notice',   label: 'Notice',   NavIcon: NoticeNavIcon,   SBIcon: SBNoticeIcon   },
  { id: 'calendar', label: 'Calendar', NavIcon: CalendarNavIcon, SBIcon: SBCalendarIcon },
  { id: 'messages', label: 'Messages', NavIcon: MsgNavIcon,      SBIcon: SBMsgIcon      },
  { id: 'profile',  label: 'Profile',  NavIcon: ProfileNavIcon,  SBIcon: SBProfileIcon  },
];

const teachersList = [
  { name: 'Mrs. Sarah Jenkins',     subject: 'Mathematics & Algebra',    room: 'Room 304', email: 's.jenkins@greenfield.edu'    },
  { name: 'Dr. Alan Turing',        subject: 'Physics & Computer Science',room: 'Lab 2B',   email: 'a.turing@greenfield.edu'     },
  { name: 'Prof. Marie Curie',      subject: 'Chemistry',                room: 'Lab 1A',   email: 'm.curie@greenfield.edu'      },
  { name: 'Mr. William Shakespeare',subject: 'English Literature',       room: 'Room 102', email: 'w.shakespeare@greenfield.edu'},
];

const routineSlots = [
  { time: '09:00 AM – 10:00 AM', subject: 'Mathematics – Grade 10', instructor: 'Mrs. Sarah Jenkins',    room: 'Room 304', color: '#4a90e2' },
  { time: '10:15 AM – 11:15 AM', subject: 'Physics – Grade 11',     instructor: 'Dr. Alan Turing',       room: 'Lab 2B',   color: '#38b26e' },
  { time: '11:30 AM – 12:30 PM', subject: 'Chemistry – Grade 11',   instructor: 'Prof. Marie Curie',     room: 'Lab 1A',   color: '#f97316' },
  { time: '01:30 PM – 02:30 PM', subject: 'English Lit. – Grade 11',instructor: 'Mr. W. Shakespeare',   room: 'Room 102', color: '#8b5cf6' },
];

const feeRecords = [
  { name: 'Tuition Fee (Term 2)',  amount: '$1,200.00', status: 'Pending', color: '#ef4444' },
  { name: 'Activity Fee (Term 1)', amount: '$150.00',   status: 'Paid',    color: '#16a34a' },
  { name: 'Tuition Fee (Term 1)', amount: '$1,200.00',  status: 'Paid',    color: '#16a34a' },
  { name: 'Registration Fee',      amount: '$200.00',   status: 'Paid',    color: '#16a34a' },
];

// notices state is declared inside the component function

const calendarEvents = [
  { date: 'Jul 15', title: 'Mid-Term Exam Registration Deadline', desc: 'All courses' },
  { date: 'Jul 25', title: 'Mid-Term Exams Begin',                desc: 'Standard testing slots' },
  { date: 'Aug 01', title: 'Summer Academic Break',               desc: 'School closed until Aug 15' },
  { date: 'Sep 05', title: "Teacher's Day Celebration",           desc: 'Half-day activities' },
];

const messagesList = [
  { sender: 'Mrs. Sarah Jenkins', text: 'Please review the math formulas sheet before the test on Thursday.', time: '2 hours ago', unread: true  },
  { sender: 'Dr. Alan Turing',    text: 'Submit your physics lab project reports as a PDF by tonight.',        time: '1 day ago',   unread: false },
  { sender: 'School Office',      text: 'Term 2 fees statement has been updated. Clear dues before July 20.',  time: '3 days ago',  unread: false },
];

/* ─────────────────────────────────────────────────────────────
   Greeting helper
   ───────────────────────────────────────────────────────────── */
const getGreeting = () => {
  const h = new Date().getHours();
  if (h < 12) return 'Good Morning';
  if (h < 17) return 'Good Afternoon';
  return 'Good Evening';
};

/* ─────────────────────────────────────────────────────────────
   AddNoticeModal — allows creating a notice with optional file upload
   ───────────────────────────────────────────────────────────── */
function AddNoticeModal({ onClose, onAdd }) {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [desc, setDesc] = useState('');
  const [fileName, setFileName] = useState('');
  const [fileData, setFileData] = useState(null);
  const [error, setError] = useState('');

  const handleFile = (e) => {
    const f = e.target.files[0];
    if (!f) return;
    // Only accept PDF files
    if (f.type !== 'application/pdf') {
      setError('Only PDF files are allowed as attachments.');
      setFileName('');
      setFileData(null);
      return;
    }
    setFileName(f.name);
    setError('');
    const reader = new FileReader();
    reader.onload = (ev) => setFileData(ev.target.result);
    reader.readAsDataURL(f);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) { setError('Title is required'); return; }
    const newNotice = { date: date || new Date().toLocaleDateString(), title: title.trim(), desc: desc.trim(), fileName: fileName || '', fileData: fileData || '' };
    onAdd(newNotice);
  };

  return (
    <div className="tp-modal-overlay" onClick={onClose}>
      <div className="tp-modal" onClick={e => e.stopPropagation()}>
        <div className="tp-modal-header" style={{ borderBottomColor: '#2563eb' }}>
          <h3 className="tp-modal-title">➕ Add Notice</h3>
          <button className="tp-modal-close" onClick={onClose} aria-label="Close">✕</button>
        </div>
        <form className="tp-modal-body" onSubmit={handleSubmit}>
          <div className="tp-form-grid">
            <div className="tp-form-group">
              <label className="tp-form-label">Title</label>
              <input className={`tp-form-input${error ? ' tp-input-error' : ''}`} value={title} onChange={e => { setTitle(e.target.value); if (error) setError(''); }} />
            </div>
            <div className="tp-form-group">
              <label className="tp-form-label">Date</label>
              <input className="tp-form-input" type="date" value={date} onChange={e => setDate(e.target.value)} />
            </div>
            <div className="tp-form-group tp-form-full">
              <label className="tp-form-label">Description</label>
              <textarea className="tp-form-input" rows={3} value={desc} onChange={e => setDesc(e.target.value)} />
            </div>
            <div className="tp-form-group tp-form-full">
              <label className="tp-form-label">Attach PDF (optional)</label>
              <input type="file" accept="application/pdf" onChange={handleFile} />
              {fileName && <div style={{ marginTop: 8, fontSize: 13 }}>{fileName}</div>}
            </div>
          </div>
          {error && <div className="tp-form-error" style={{ marginTop: 8 }}>{error}</div>}
          <div className="tp-modal-footer">
            <button type="button" className="tp-modal-cancel-btn" onClick={onClose}>Cancel</button>
            <button type="submit" className="tp-modal-submit-btn" style={{ background: '#2563eb' }}>Add Notice</button>
          </div>
        </form>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   Sub-view detail content
   ───────────────────────────────────────────────────────────── */
function DetailContent({ section, user, results, loading, error }) {

  if (section === 'student_info') return (
    <div className="sv-detail-grid sv-detail-grid--single">
      <div className="sv-detail-panel">
        <div className="sv-info-row"><span className="sv-info-label">Full Name</span><span className="sv-info-value">{user.name}</span></div>
        <div className="sv-info-row"><span className="sv-info-label">Student ID</span><span className="sv-info-value">{user.userId}</span></div>
        <div className="sv-info-row"><span className="sv-info-label">Current Grade</span><span className="sv-info-value">Grade 11</span></div>
        <div className="sv-info-row"><span className="sv-info-label">Section</span><span className="sv-info-value">A</span></div>
        <div className="sv-info-row"><span className="sv-info-label">Roll Number</span><span className="sv-info-value">#18</span></div>
        <div className="sv-info-row"><span className="sv-info-label">Academic Year</span><span className="sv-info-value">2026–2027</span></div>
        <div className="sv-info-row" style={{ borderBottom: 'none' }}>
          <span className="sv-info-label">Enrollment Status</span>
          <span className="sv-info-value" style={{ color: '#16a34a', fontWeight: 700 }}>Active ✓</span>
        </div>
      </div>
    </div>
  );

  if (section === 'teachers_directory') return (
    <div className="sv-detail-grid">
      {teachersList.map((t, i) => (
        <div key={i} className="sv-detail-card">
          <div className="sv-teacher-avatar">{t.name.charAt(0)}</div>
          <p className="tp-detail-name">{t.name}</p>
          <p className="tp-detail-sub" style={{ color: '#38b26e', fontWeight: 600 }}>{t.subject}</p>
          <div className="sv-teacher-meta">
            <span>📍 {t.room}</span>
            <span>✉ {t.email}</span>
          </div>
        </div>
      ))}
    </div>
  );

  if (section === 'exam_result') return (
    <div className="sv-detail-grid sv-detail-grid--single">
      <div className="sv-detail-panel">
        {loading ? (
          <p style={{ color: '#64748b', fontSize: 14, textAlign: 'center', padding: 24 }}>Loading results…</p>
        ) : error ? (
          <p style={{ color: '#ef4444', fontSize: 14, textAlign: 'center', padding: 24 }}>{error}</p>
        ) : results.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '40px 24px' }}>
            <p style={{ color: '#94a3b8', fontSize: 14, margin: 0 }}>📭 No academic results recorded yet.</p>
            <p style={{ color: '#cbd5e1', fontSize: 13, margin: '8px 0 0' }}>Your results will appear here once they are published.</p>
          </div>
        ) : (
          <div>
            {/* Results Summary */}
            <div style={{ marginBottom: '24px' }}>
              <h3 style={{ fontSize: '14px', fontWeight: '700', color: '#1a2e4a', margin: '0 0 12px', textTransform: 'uppercase' }}>📊 Your Results Summary</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '12px' }}>
                <div style={{ background: '#f0f9ff', padding: '12px', borderRadius: '8px', borderLeft: '3px solid #2563eb' }}>
                  <p style={{ fontSize: '12px', color: '#64748b', margin: '0 0 4px', fontWeight: '600' }}>Total Subjects</p>
                  <p style={{ fontSize: '20px', fontWeight: '700', color: '#2563eb', margin: 0 }}>{results.length}</p>
                </div>
                <div style={{ background: '#f0fdf4', padding: '12px', borderRadius: '8px', borderLeft: '3px solid #16a34a' }}>
                  <p style={{ fontSize: '12px', color: '#64748b', margin: '0 0 4px', fontWeight: '600' }}>Passed</p>
                  <p style={{ fontSize: '20px', fontWeight: '700', color: '#16a34a', margin: 0 }}>{results.filter(r => r.status === 'Pass').length}</p>
                </div>
                <div style={{ background: '#fef2f2', padding: '12px', borderRadius: '8px', borderLeft: '3px solid #dc2626' }}>
                  <p style={{ fontSize: '12px', color: '#64748b', margin: '0 0 4px', fontWeight: '600' }}>Failed</p>
                  <p style={{ fontSize: '20px', fontWeight: '700', color: '#dc2626', margin: 0 }}>{results.filter(r => r.status === 'Fail').length}</p>
                </div>
              </div>
            </div>

            {/* Detailed Results Table */}
            <table className="sv-table" style={{ marginTop: '16px' }}>
              <thead>
                <tr>
                  <th className="sv-th">Subject</th>
                  <th className="sv-th" style={{ textAlign: 'center' }}>Marks</th>
                  <th className="sv-th" style={{ textAlign: 'center' }}>Grade</th>
                  <th className="sv-th" style={{ textAlign: 'center' }}>Status</th>
                </tr>
              </thead>
              <tbody>
                {results.map((res) => {
                  const grade = res.grade || (res.marks >= 90 ? 'A+' : res.marks >= 80 ? 'A' : res.marks >= 70 ? 'B' : res.marks >= 60 ? 'C' : 'F');
                  const gradeColor = grade === 'A+' ? '#7c3aed' : grade === 'A' ? '#2563eb' : grade === 'B' ? '#0284c7' : grade === 'C' ? '#f59e0b' : '#ef4444';
                  return (
                    <tr key={res.id} style={{ borderBottomColor: '#e2e8f0' }}>
                      <td className="sv-td" style={{ fontWeight: 600, color: '#1a2e4a' }}>{res.classId || res.subject || 'Subject'}</td>
                      <td className="sv-td" style={{ textAlign: 'center', fontSize: '15px', fontWeight: '700', color: '#2563eb' }}>{res.marks || 0}/100</td>
                      <td className="sv-td" style={{ textAlign: 'center' }}>
                        <span style={{
                          display: 'inline-block',
                          padding: '4px 10px',
                          borderRadius: '4px',
                          background: gradeColor,
                          color: '#fff',
                          fontSize: '13px',
                          fontWeight: '700',
                          minWidth: '32px',
                        }}>
                          {grade}
                        </span>
                      </td>
                      <td className="sv-td" style={{ textAlign: 'center' }}>
                        <span className={`sv-badge sv-badge--${res.status === 'Pass' ? 'pass' : 'fail'}`} style={{
                          background: res.status === 'Pass' ? '#d1fae5' : '#fee2e2',
                          color: res.status === 'Pass' ? '#065f46' : '#7f1d1d',
                          padding: '4px 10px',
                          borderRadius: '12px',
                          fontSize: '12px',
                          fontWeight: '600',
                        }}>
                          {res.status || 'N/A'}
                        </span>
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

  if (section === 'class_routine') return (
    <div className="sv-detail-grid">
      {routineSlots.map((r, i) => (
        <div key={i} className="sv-detail-card" style={{ borderLeft: `4px solid ${r.color}` }}>
          <p style={{ fontSize: 12, color: r.color, fontWeight: 700, margin: '0 0 6px' }}>{r.time}</p>
          <p className="tp-detail-name">{r.subject}</p>
          <p className="tp-detail-sub">{r.instructor}</p>
          <p className="tp-detail-email">📍 {r.room}</p>
        </div>
      ))}
    </div>
  );

  if (section === 'fee_management') return (
    <div className="sv-detail-grid sv-detail-grid--single">
      <div className="sv-detail-panel">
        <div className="sv-fee-summary">
          <span className="sv-fee-label">OUTSTANDING BALANCE</span>
          <span className="sv-fee-amount">$1,200.00</span>
        </div>
        <p style={{ fontSize: 13, fontWeight: 700, color: '#1a2e4a', margin: '0 0 12px' }}>Payment History</p>
        {feeRecords.map((f, i) => (
          <div key={i} className="sv-fee-row">
            <div>
              <p style={{ margin: 0, fontSize: 14, fontWeight: 700, color: '#1a2e4a' }}>{f.name}</p>
              <p style={{ margin: '3px 0 0', fontSize: 12, fontWeight: 600, color: f.color }}>{f.status}</p>
            </div>
            <span style={{ fontSize: 15, fontWeight: 800, color: '#1a2e4a' }}>{f.amount}</span>
          </div>
        ))}
      </div>
    </div>
  );

  return null;
}

/* ═════════════════════════════════════════════════════════════
   Main Component
   ═════════════════════════════════════════════════════════════ */
export default function StudentView() {
  const { user, signOut } = useAuth();

  const [activeTab,     setActiveTab]     = useState('home');
  const [activeSection, setActiveSection] = useState(null);
  const [menuOpen,      setMenuOpen]      = useState(false);
  const [notices, setNotices] = useState([
    { date: 'July 10, 2026',  title: 'Annual Sports Day Schedule',       desc: 'The annual sports meet is scheduled Oct 12–15. Registrations open next Monday.' },
    { date: 'July 05, 2026',  title: 'Mid-Term Exam Dates Released',      desc: 'Mid-term assessments begin July 25. Download the subject timetable from Routine.' },
    { date: 'June 28, 2026',  title: 'Parent-Teacher Meeting (PTM)',      desc: 'All parents are requested to attend the PTM on Friday, July 8, at 10:00 AM.' },
  ]);
  const [showAddNotice, setShowAddNotice] = useState(false);
  const [isMobileOrTablet, setIsMobileOrTablet] = useState(() => {
    try { return window.matchMedia('(max-width: 1024px)').matches; } catch { return true; }
  });

  // Firestore results
  const [results, setResults] = useState(() => {
    const cached = getLocalResults();
    return cached[user?.userId] || [];
  });
  const [loading, setLoading] = useState(false);
  const [error,   setError]   = useState('');

  useEffect(() => {
    if (activeSection === 'exam_result') {
      const fetchResults = async () => {
        setLoading(true);
        setError('');
        try {
          const q = query(collection(db, 'results'), where('studentId', '==', user.userId));
          const snap = await getDocs(q);
          const marks = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
          setResults(marks);
          const stored = getLocalResults();
          saveLocalResults({ ...stored, [user.userId]: marks });
        } catch {
          const stored = getLocalResults();
          setResults(stored[user.userId] || []);
          setError('Unable to load online results. Showing cached data if available.');
        } finally {
          setLoading(false);
        }
      };
      fetchResults();
    }
  }, [activeSection, user.userId]);

  useEffect(() => {
    let mq;
    try {
      mq = window.matchMedia('(max-width: 1024px)');
      const handler = (e) => setIsMobileOrTablet(e.matches);
      mq.addEventListener ? mq.addEventListener('change', handler) : mq.addListener(handler);
      return () => { mq.removeEventListener ? mq.removeEventListener('change', handler) : mq.removeListener(handler); };
    } catch {
      // ignore
    }
  }, []);

  /* Helpers */
  const isHome = activeTab === 'home';

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setActiveSection(null);
    setMenuOpen(false);
  };

  const handleCardClick = (id) => {
    setActiveTab('home');
    setActiveSection(id);
  };

  const handleSidebarClick = (id) => {
    const isMenu = menuItems.some((m) => m.id === id);
    if (id === 'home') { setActiveTab('home'); setActiveSection(null); }
    else if (isMenu)   { setActiveTab('home'); setActiveSection(id);   }
    else               { handleTabChange(id); }
    setMenuOpen(false);
  };

  const activeSidebarId = activeSection ?? (activeTab !== 'home' ? activeTab : 'home');

  /* Section meta for detail header */
  const sectionMeta = menuItems.find((m) => m.id === activeSection);

  return (
    <div className="tp-shell">

      {/* ══════════════════════════════════
          MOBILE DRAWER OVERLAY
          ══════════════════════════════════ */}
      {menuOpen && (
        <div className="tp-drawer-overlay" onClick={() => setMenuOpen(false)}>
          <div className="tp-drawer" onClick={(e) => e.stopPropagation()}>
            <p className="tp-drawer-title">Menu</p>
            <p className="tp-drawer-label">Signed in as</p>
            <p className="tp-drawer-name">{user?.name || user?.userId}</p>
            <p className="tp-drawer-role">Role: {user?.role}</p>
            <button className="tp-drawer-signout" onClick={signOut}>Sign Out</button>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════
          DESKTOP SIDEBAR
          ══════════════════════════════════ */}
      <aside className="tp-sidebar">
        {/* Brand */}
        <div className="tp-sidebar-brand">
          <img src={greenfieldLogo} alt="School logo" className="tp-sidebar-crest" />
          <span className="tp-sidebar-school">Greenfield<br />International School</span>
        </div>

        {/* Nav */}
        <nav className="tp-sidebar-nav">
          {/* Home */}
          <button
            className={`tp-sidebar-nav-item${activeSidebarId === 'home' ? ' active' : ''}`}
            onClick={() => handleSidebarClick('home')}
          >
            <SBHomeIcon /> Home
          </button>

          {/* Section label */}
          <p className="sv-sidebar-section-label">ACADEMICS</p>

          {/* Menu items */}
          {menuItems.map((item) => (
            <button
              key={item.id}
              className={`tp-sidebar-nav-item${activeSidebarId === item.id ? ' active' : ''}`}
              onClick={() => handleSidebarClick(item.id)}
            >
              <item.SBIcon /> {item.title}
            </button>
          ))}

          {/* Section label */}
          <p className="sv-sidebar-section-label">MORE</p>

          {/* Extra tabs: Notice, Calendar, Messages, Profile */}
          {tabItems.filter((t) => t.id !== 'home').map((tab) => (
            <button
              key={tab.id}
              className={`tp-sidebar-nav-item${activeSidebarId === tab.id ? ' active' : ''}`}
              onClick={() => handleSidebarClick(tab.id)}
            >
              <tab.SBIcon /> {tab.label}
            </button>
          ))}
        </nav>

        <div className="tp-sidebar-divider" />

        {/* User info + sign-out */}
        <div style={{ padding: '0 4px', marginBottom: 8 }}>
          <p style={{ fontSize: 13, fontWeight: 700, color: '#1a2e4a', margin: '0 0 2px' }}>
            {user?.name || user?.userId}
          </p>
          <p style={{ fontSize: 11.5, color: '#94a3b8', margin: 0, textTransform: 'capitalize' }}>
            {user?.role}
          </p>
        </div>
        <button className="tp-sidebar-signout" onClick={signOut}>
          <LogoutIcon /> Sign Out
        </button>
      </aside>

      {/* ══════════════════════════════════
          MAIN CONTENT
          ══════════════════════════════════ */}
      <main className="tp-main">

        {/* ── Sticky top bar ── */}
        <div className="tp-topbar">
          {/* Mobile hamburger */}
          <button className="tp-icon-btn tp-hamburger" onClick={() => setMenuOpen(true)} aria-label="Menu">
            <HamburgerIcon />
          </button>

          {/* Desktop greeting */}
          <div className="tp-topbar-greeting">
            <h2>{getGreeting()}</h2>
            <p>Learn &nbsp;•&nbsp; Grow &nbsp;•&nbsp; Succeed</p>
          </div>

          <div className="tp-topbar-right">
            <div className="tp-bell-wrap">
              <button className="tp-icon-btn" aria-label="Notifications"><BellIcon /></button>
              <div className="tp-bell-dot" />
            </div>
          </div>
        </div>

        {/* ── HOME: section detail view ── */}
        {isHome && activeSection !== null && (
          <div className="sv-content-area">
            <div className="tp-section-header">
              <button className="tp-back-btn" onClick={() => setActiveSection(null)}>
                <ChevronLeft /> Back
              </button>
              <h2 className="tp-section-title">{sectionMeta?.title}</h2>
            </div>
            <DetailContent
              section={activeSection}
              user={user}
              results={results}
              loading={loading}
              error={error}
            />
          </div>
        )}

        {/* ── HOME: menu overview ── */}
        {isHome && activeSection === null && (
          <>
            {/* Hero banner */}
            <div className="tp-hero">
              <div className="tp-greeting">
                <h1>{getGreeting()}</h1>
                <p>Learn &nbsp;•&nbsp; Grow &nbsp;•&nbsp; Succeed</p>
              </div>
              <div className="tp-school-brand">
                <img src={greenfieldLogo} alt="School crest" className="tp-crest" />
                <span className="tp-school-name">Greenfield<br />International School</span>
              </div>
            </div>

            {/* Menu cards */}
            <div className="tp-cards-grid">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  className="tp-menu-card"
                  onClick={() => handleCardClick(item.id)}
                >
                  <div className="tp-card-icon" style={{ background: item.color }}>
                    <item.Icon />
                  </div>
                  <div className="tp-card-text">
                    <p className="tp-card-title">{item.title}</p>
                    <p className="tp-card-desc">{item.desc}</p>
                  </div>
                  <div className="tp-card-chevron"><ChevronRight /></div>
                </button>
              ))}
            </div>
          </>
        )}

        {/* ── Notice Board ── */}
        {activeTab === 'notice' && (
          isMobileOrTablet ? (
            <div className="sv-content-area">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                <h2 className="sv-page-title">📢 Notice Board</h2>
                <button className="tp-add-student-btn" style={{ background: '#2563eb' }} onClick={() => setShowAddNotice(true)}>+ Add Notice</button>
              </div>
              <div className="sv-notice-grid">
                {notices.map((n, i) => (
                  <div key={i} className="sv-notice-card">
                    <span className="sv-notice-date">{n.date}</span>
                    <h3 className="sv-notice-title">{n.title}</h3>
                    <p className="sv-notice-desc">{n.desc}</p>
                    {n.fileData && (
                      <div style={{ marginTop: 10 }}>
                        <a href={n.fileData} download={n.fileName || `notice-${i}`} style={{ color: '#2563eb', fontWeight: 700 }}>Download attachment</a>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {showAddNotice && (
                <AddNoticeModal
                  onClose={() => setShowAddNotice(false)}
                  onAdd={(notice) => { setNotices(prev => [notice, ...prev]); setShowAddNotice(false); }}
                />
              )}
            </div>
          ) : (
            <div className="tp-placeholder">
              <div className="tp-placeholder-emoji">📢</div>
              <p className="tp-placeholder-title">Notice</p>
              <p className="tp-placeholder-sub">Not available on wide screens. Open on mobile or tablet to add/view notices.</p>
            </div>
          )
        )}

        {/* ── Event Calendar ── */}
        {activeTab === 'calendar' && (
          <div className="sv-content-area">
            <h2 className="sv-page-title">📅 Event Calendar</h2>
            <div className="sv-calendar-grid">
              {calendarEvents.map((ev, i) => (
                <div key={i} className="sv-calendar-card">
                  <div className="sv-calendar-badge">
                    <span>{ev.date.split(' ')[0]}</span>
                    <span style={{ fontSize: 20, fontWeight: 800 }}>{ev.date.split(' ')[1]}</span>
                  </div>
                  <div>
                    <h3 className="sv-calendar-title">{ev.title}</h3>
                    <p className="sv-calendar-desc">{ev.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── Messages ── */}
        {activeTab === 'messages' && (
          <div className="sv-content-area">
            <h2 className="sv-page-title">💬 Messages</h2>
            <div className="sv-messages-list">
              {messagesList.map((msg, i) => (
                <div key={i} className={`sv-message-card${msg.unread ? ' sv-message-card--unread' : ''}`}>
                  <div className="sv-message-avatar">{msg.sender.charAt(0)}</div>
                  <div className="sv-message-body">
                    <div className="sv-message-header">
                      <span className="sv-message-sender">{msg.sender}</span>
                      <span className="sv-message-time">{msg.time}</span>
                    </div>
                    <p className="sv-message-text">{msg.text}</p>
                  </div>
                  {msg.unread && <div className="sv-message-dot" />}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── Profile ── */}
        {activeTab === 'profile' && (
          <div className="sv-content-area">
            <h2 className="sv-page-title">👤 My Profile</h2>
            <div className="sv-profile-card">
              <div className="sv-profile-avatar">{user.name.charAt(0)}</div>
              <h3 className="sv-profile-name">{user.name}</h3>
              <p className="sv-profile-role">{user.role} Portal</p>
              <div className="sv-profile-info">
                <div className="sv-info-row"><span className="sv-info-label">User ID</span><span className="sv-info-value">{user.userId}</span></div>
                <div className="sv-info-row" style={{ borderBottom: 'none' }}>
                  <span className="sv-info-label">Linked Email</span>
                  <span className="sv-info-value">{user.userId}@greenfield.edu</span>
                </div>
              </div>
              <button className="sv-signout-btn" onClick={signOut}>LOG OUT</button>
            </div>
          </div>
        )}

      </main>

      {/* ══════════════════════════════════
          MOBILE BOTTOM NAVIGATION
          ══════════════════════════════════ */}
      <nav className="tp-bottom-nav">
        {tabItems.map((tab) => {
          const active = activeTab === tab.id && activeSection === null;
          return (
            <button
              key={tab.id}
              className="tp-nav-item"
              onClick={() => handleTabChange(tab.id)}
              aria-label={tab.label}
            >
              <tab.NavIcon active={active} />
              <span className="tp-nav-label" style={{ color: active ? '#2563eb' : '#94a3b8' }}>
                {tab.label}
              </span>
            </button>
          );
        })}
      </nav>

    </div>
  );
}
