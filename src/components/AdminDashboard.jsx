import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext.jsx';
import greenfieldLogo from '../greenfield_logo.png';

/* ──────────────────────────────────────────
   SVG Icons
   ────────────────────────────────────────── */
const HamburgerIcon = () => (
  <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" viewBox="0 0 24 24">
    <line x1="3" y1="6" x2="21" y2="6"/>
    <line x1="3" y1="12" x2="21" y2="12"/>
    <line x1="3" y1="18" x2="21" y2="18"/>
  </svg>
);

const HomeIcon = () => (
  <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
    <polyline points="9 22 9 12 15 12 15 22"/>
  </svg>
);

const KeyIcon = () => (
  <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
    <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4"/>
  </svg>
);

const TeacherIcon = () => (
  <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
    <path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
  </svg>
);

const StudentIcon = () => (
  <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
  </svg>
);

const ExamIcon = () => (
  <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
    <rect x="5" y="2" width="14" height="20" rx="2"/>
    <line x1="9" y1="7" x2="15" y2="7"/><line x1="9" y1="11" x2="15" y2="11"/>
  </svg>
);

const NoticeIcon = () => (
  <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
    <path d="M22 2 11 13"/><path d="M22 2 15 22 11 13 2 9l20-7z"/>
  </svg>
);

const FeeIcon = () => (
  <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
    <rect x="1" y="4" width="22" height="16" rx="2"/>
    <line x1="1" y1="10" x2="23" y2="10"/>
  </svg>
);

const LogoutIcon = () => (
  <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
    <polyline points="16 17 21 12 16 7"/>
    <line x1="21" y1="12" x2="9" y2="12"/>
  </svg>
);

const ChevronLeft = () => (
  <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
    <polyline points="15 18 9 12 15 6"/>
  </svg>
);

const ChevronRight = () => (
  <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
    <polyline points="9 18 15 12 9 6"/>
  </svg>
);

/* ──────────────────────────────────────────
   Initial/Demo Data
   ────────────────────────────────────────── */
const initialTeachers = [
  { name: 'Mrs. Sarah Jenkins',  subject: 'Mathematics', email: 's.jenkins@school.edu', phone: '+1 (555) 012-3456' },
  { name: 'Dr. Alan Turing',     subject: 'Physics',     email: 'a.turing@school.edu',  phone: '+1 (555) 012-7890' },
  { name: 'Prof. Marie Curie',   subject: 'Chemistry',   email: 'm.curie@school.edu',   phone: '+1 (555) 012-4567' },
  { name: 'Ms. Amelia Earhart',  subject: 'English',     email: 'a.earhart@school.edu', phone: '+1 (555) 012-9012' },
];

const initialClasses = [
  {
    className: 'Class One', classNum: 1,
    students: [
      { name: 'Aiden Brooks', id: 'STU-0101', roll: '01', age: 6, birthday: '2020-04-12', fatherName: 'Robert Brooks', motherName: 'Jane Brooks' },
      { name: 'Lily Turner',  id: 'STU-0102', roll: '02', age: 6, birthday: '2020-09-05', fatherName: 'David Turner', motherName: 'Lisa Turner' },
    ]
  },
  {
    className: 'Class Two', classNum: 2,
    students: [
      { name: 'Ethan Brown', id: 'STU-0201', roll: '01', age: 7, birthday: '2019-01-20', fatherName: 'John Brown', motherName: 'Mary Brown' },
      { name: 'Sophia Lee',  id: 'STU-0202', roll: '02', age: 7, birthday: '2019-06-14', fatherName: 'Chris Lee', motherName: 'Helen Lee' },
    ]
  },
  {
    className: 'Class Three', classNum: 3,
    students: [
      { name: 'Jackson Walker', id: 'STU-0301', roll: '01', age: 8, birthday: '2018-03-24', fatherName: 'Arthur Walker', motherName: 'Alice Walker' },
    ]
  },
  { className: 'Class Four', classNum: 4, students: [] },
  { className: 'Class Five', classNum: 5, students: [] },
  { className: 'Class Six', classNum: 6, students: [] },
  { className: 'Class Seven', classNum: 7, students: [] },
  { className: 'Class Eight', classNum: 8, students: [] },
  { className: 'Class Nine', classNum: 9, students: [] },
  {
    className: 'Class Ten', classNum: 10,
    students: [
      { name: 'James Wilson', id: 'STU-1001', roll: '01', age: 15, birthday: '2011-05-18', fatherName: 'George Wilson', motherName: 'Patricia Wilson' },
      { name: 'Emily Chen',   id: 'STU-1002', roll: '02', age: 15, birthday: '2011-11-09', fatherName: 'William Chen', motherName: 'Susan Chen' },
    ]
  }
];

const initialExams = [
  { subject: 'Mathematics', date: '2026-07-15', grade: 'Class Ten', time: '09:00 AM' },
  { subject: 'Physics',     date: '2026-07-17', grade: 'Class Ten', time: '10:00 AM' },
  { subject: 'Chemistry',   date: '2026-07-19', grade: 'Class Ten', time: '09:30 AM' },
  { subject: 'English',     date: '2026-07-21', grade: 'Class Ten', time: '11:00 AM' },
];

const initialNotices = [
  { id: 1, title: 'Summer Vacation Announcement', date: '10 Jun 2026', desc: 'Summer vacation starts from June 20th to July 5th. Classes resume on July 6th.' },
  { id: 2, title: 'Annual Sports Meet 2026', date: '15 Jun 2026', desc: 'Register by June 18th for various field and track events scheduled next week.' }
];

const initialFees = [
  { id: 1, name: 'Term 1 Tuition Fee', status: 'Pending', amount: '$1,200.00' },
  { id: 2, name: 'Library Membership', status: 'Paid', amount: '$90.00' },
  { id: 3, name: 'Laboratory Fee', status: 'Paid', amount: '$150.00' }
];

const CLASS_COLORS = [
  '#4a90e2', '#38b26e', '#8b5cf6', '#f97316', '#0ea5a4',
  '#e11d48', '#d97706', '#0284c7', '#7c3aed', '#059669',
];

const ORDINALS = ['One','Two','Three','Four','Five','Six','Seven','Eight','Nine','Ten'];

/* ──────────────────────────────────────────
   Modals
   ────────────────────────────────────────── */

/* Add Teacher Modal */
function AddTeacherModal({ onClose, onAdd }) {
  const [form, setForm] = useState({ name: '', subject: '', email: '', phone: '' });
  const [profilePicPreview, setProfilePicPreview] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => setProfilePicPreview(ev.target.result);
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.subject.trim()) return;
    onAdd({ ...form, profilePic: profilePicPreview });
  };

  return (
    <div className="tp-modal-overlay" onClick={onClose}>
      <div className="tp-modal" onClick={e => e.stopPropagation()}>
        <div className="tp-modal-header" style={{ borderBottomColor: '#38b26e' }}>
          <h3 className="tp-modal-title">➕ Add New Teacher</h3>
          <button className="tp-modal-close" onClick={onClose}>✕</button>
        </div>
        <form className="tp-modal-body" onSubmit={handleSubmit}>
          <div className="tp-pic-upload-area">
            <label htmlFor="adm-teacher-pic" className="tp-pic-label">
              {profilePicPreview ? (
                <img src={profilePicPreview} alt="Preview" className="tp-pic-preview" />
              ) : (
                <div className="tp-pic-placeholder" style={{ borderColor: '#38b26e' }}>
                  <span className="tp-pic-icon">📷</span>
                  <p className="tp-pic-text">Upload Photo</p>
                </div>
              )}
            </label>
            <input id="adm-teacher-pic" type="file" accept="image/*" onChange={handleFileChange} style={{ display: 'none' }} />
          </div>
          <div className="tp-form-grid">
            <div className="tp-form-group tp-form-full">
              <label className="tp-form-label">Full Name *</label>
              <input className="tp-form-input" type="text" placeholder="e.g. Dr. Susan Miller" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required />
            </div>
            <div className="tp-form-group">
              <label className="tp-form-label">Subject *</label>
              <input className="tp-form-input" type="text" placeholder="e.g. Biology" value={form.subject} onChange={e => setForm({ ...form, subject: e.target.value })} required />
            </div>
            <div className="tp-form-group">
              <label className="tp-form-label">Email *</label>
              <input className="tp-form-input" type="email" placeholder="e.g. s.miller@school.edu" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} required />
            </div>
            <div className="tp-form-group tp-form-full">
              <label className="tp-form-label">Phone Number *</label>
              <input className="tp-form-input" type="text" placeholder="e.g. +1 (555) 019-3344" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} required />
            </div>
          </div>
          <div className="tp-modal-footer">
            <button type="button" className="tp-modal-cancel-btn" onClick={onClose}>Cancel</button>
            <button type="submit" className="tp-modal-submit-btn" style={{ background: '#38b26e' }}>Add Teacher</button>
          </div>
        </form>
      </div>
    </div>
  );
}

/* Add Student Modal */
function AddStudentModal({ onClose, onAdd, classNum }) {
  const [form, setForm] = useState({ name: '', age: '', birthday: '', fatherName: '', motherName: '' });
  const [profilePicPreview, setProfilePicPreview] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => setProfilePicPreview(ev.target.result);
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.age) return;
    onAdd({
      ...form,
      profilePic: profilePicPreview,
      id: `STU-${Date.now().toString().slice(-6)}`,
    });
  };

  return (
    <div className="tp-modal-overlay" onClick={onClose}>
      <div className="tp-modal" onClick={e => e.stopPropagation()}>
        <div className="tp-modal-header" style={{ borderBottomColor: '#2563eb' }}>
          <h3 className="tp-modal-title">➕ Add Student to Class {ORDINALS[classNum - 1]}</h3>
          <button className="tp-modal-close" onClick={onClose}>✕</button>
        </div>
        <form className="tp-modal-body" onSubmit={handleSubmit}>
          <div className="tp-pic-upload-area">
            <label htmlFor="adm-student-pic" className="tp-pic-label">
              {profilePicPreview ? (
                <img src={profilePicPreview} alt="Preview" className="tp-pic-preview" />
              ) : (
                <div className="tp-pic-placeholder" style={{ borderColor: '#2563eb' }}>
                  <span className="tp-pic-icon">📷</span>
                  <p className="tp-pic-text">Upload Photo</p>
                </div>
              )}
            </label>
            <input id="adm-student-pic" type="file" accept="image/*" onChange={handleFileChange} style={{ display: 'none' }} />
          </div>
          <div className="tp-form-grid">
            <div className="tp-form-group tp-form-full">
              <label className="tp-form-label">Full Name *</label>
              <input className="tp-form-input" type="text" placeholder="e.g. John Doe" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required />
            </div>
            <div className="tp-form-group">
              <label className="tp-form-label">Age *</label>
              <input className="tp-form-input" type="number" placeholder="e.g. 14" value={form.age} onChange={e => setForm({ ...form, age: e.target.value })} required />
            </div>
            <div className="tp-form-group">
              <label className="tp-form-label">Date of Birth *</label>
              <input className="tp-form-input" type="date" value={form.birthday} onChange={e => setForm({ ...form, birthday: e.target.value })} required />
            </div>
            <div className="tp-form-group">
              <label className="tp-form-label">Father's Name *</label>
              <input className="tp-form-input" type="text" placeholder="Father's full name" value={form.fatherName} onChange={e => setForm({ ...form, fatherName: e.target.value })} required />
            </div>
            <div className="tp-form-group">
              <label className="tp-form-label">Mother's Name *</label>
              <input className="tp-form-input" type="text" placeholder="Mother's full name" value={form.motherName} onChange={e => setForm({ ...form, motherName: e.target.value })} required />
            </div>
          </div>
          <div className="tp-modal-footer">
            <button type="button" className="tp-modal-cancel-btn" onClick={onClose}>Cancel</button>
            <button type="submit" className="tp-modal-submit-btn" style={{ background: '#2563eb' }}>Add Student</button>
          </div>
        </form>
      </div>
    </div>
  );
}

/* Add Exam Modal */
function AddExamModal({ onClose, onAdd }) {
  const [form, setForm] = useState({ subject: '', date: '', grade: 'Class One', time: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.subject.trim() || !form.date) return;
    onAdd(form);
  };

  return (
    <div className="tp-modal-overlay" onClick={onClose}>
      <div className="tp-modal" onClick={e => e.stopPropagation()}>
        <div className="tp-modal-header" style={{ borderBottomColor: '#8b5cf6' }}>
          <h3 className="tp-modal-title">➕ Schedule New Exam</h3>
          <button className="tp-modal-close" onClick={onClose}>✕</button>
        </div>
        <form className="tp-modal-body" onSubmit={handleSubmit}>
          <div className="tp-form-grid">
            <div className="tp-form-group tp-form-full">
              <label className="tp-form-label">Subject *</label>
              <input className="tp-form-input" type="text" placeholder="e.g. Mathematics" value={form.subject} onChange={e => setForm({ ...form, subject: e.target.value })} required />
            </div>
            <div className="tp-form-group">
              <label className="tp-form-label">Date *</label>
              <input className="tp-form-input" type="date" value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} required />
            </div>
            <div className="tp-form-group">
              <label className="tp-form-label">Time *</label>
              <input className="tp-form-input" type="text" placeholder="e.g. 10:00 AM" value={form.time} onChange={e => setForm({ ...form, time: e.target.value })} required />
            </div>
            <div className="tp-form-group tp-form-full">
              <label className="tp-form-label">Target Class</label>
              <select className="tp-form-input" value={form.grade} onChange={e => setForm({ ...form, grade: e.target.value })}>
                {ORDINALS.map(ord => (
                  <option key={ord} value={`Class ${ord}`}>Class {ord}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="tp-modal-footer">
            <button type="button" className="tp-modal-cancel-btn" onClick={onClose}>Cancel</button>
            <button type="submit" className="tp-modal-submit-btn" style={{ background: '#8b5cf6' }}>Schedule Exam</button>
          </div>
        </form>
      </div>
    </div>
  );
}

/* Add Notice Modal */
function AddNoticeModal({ onClose, onAdd }) {
  const [form, setForm] = useState({ title: '', desc: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title.trim() || !form.desc.trim()) return;
    const formattedDate = new Date().toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' });
    onAdd({ id: Date.now(), title: form.title, desc: form.desc, date: formattedDate });
  };

  return (
    <div className="tp-modal-overlay" onClick={onClose}>
      <div className="tp-modal" onClick={e => e.stopPropagation()}>
        <div className="tp-modal-header" style={{ borderBottomColor: '#f97316' }}>
          <h3 className="tp-modal-title">➕ Create Public Notice</h3>
          <button className="tp-modal-close" onClick={onClose}>✕</button>
        </div>
        <form className="tp-modal-body" onSubmit={handleSubmit}>
          <div className="tp-form-grid">
            <div className="tp-form-group tp-form-full">
              <label className="tp-form-label">Notice Title *</label>
              <input className="tp-form-input" type="text" placeholder="e.g. Winter Holiday schedule" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} required />
            </div>
            <div className="tp-form-group tp-form-full">
              <label className="tp-form-label">Detailed Content *</label>
              <textarea className="tp-form-input" rows="4" placeholder="Enter notice details here..." value={form.desc} onChange={e => setForm({ ...form, desc: e.target.value })} required style={{ fontFamily: 'inherit', resize: 'vertical' }}></textarea>
            </div>
          </div>
          <div className="tp-modal-footer">
            <button type="button" className="tp-modal-cancel-btn" onClick={onClose}>Cancel</button>
            <button type="submit" className="tp-modal-submit-btn" style={{ background: '#f97316' }}>Publish Notice</button>
          </div>
        </form>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────
   Main Component
   ────────────────────────────────────────── */
export default function AdminDashboard() {
  const { user, signOut, createUser, deleteUser } = useAuth();
  const [activeTab, setActiveTab] = useState('overview'); // overview, accounts, teachers, students, exams, notices, fees
  const [menuOpen, setMenuOpen] = useState(false);

  // User Accounts forms
  const [accountForm, setAccountForm] = useState({ userId: '', name: '', password: '', role: 'student' });
  const [selectedProfileId, setSelectedProfileId] = useState('');
  const [accountStatus, setAccountStatus] = useState('');
  const [accountError, setAccountError] = useState('');
  const [registeredAccounts, setRegisteredAccounts] = useState({});

  // Stateful databases
  const [teachers, setTeachers] = useState(initialTeachers);
  const [classes, setClasses] = useState(initialClasses);
  const [exams, setExams] = useState(initialExams);
  const [notices, setNotices] = useState(initialNotices);
  const [fees, setFees] = useState(initialFees);

  // Profile lookup options
  const teacherProfiles = teachers.map((t) => ({
    key: t.email,
    label: t.name,
    userId: t.email,
    role: 'teacher',
  }));

  const studentProfiles = classes.flatMap((cls) =>
    cls.students.map((s) => ({
      key: s.id,
      label: `${s.name} — ${cls.className}`,
      userId: s.id,
      role: 'student',
    }))
  );

  const profileOptions = accountForm.role === 'teacher' ? teacherProfiles : accountForm.role === 'student' ? studentProfiles : [];

  const handleProfileSelect = (profileId) => {
    setSelectedProfileId(profileId);
    const profile = profileOptions.find((p) => p.key === profileId);
    if (profile) {
      setAccountForm((prev) => ({
        ...prev,
        role: profile.role,
        name: profile.label.split(' — ')[0],
        userId: profile.userId,
      }));
    } else {
      setAccountForm((prev) => ({ ...prev, name: '', userId: '' }));
    }
  };

  // Modals
  const [showAddTeacher, setShowAddTeacher] = useState(false);
  const [showAddStudent, setShowAddStudent] = useState(false);
  const [showAddExam, setShowAddExam] = useState(false);
  const [showAddNotice, setShowAddNotice] = useState(false);

  // Drilldown
  const [selectedClassIdx, setSelectedClassIdx] = useState(null);

  // Delete Selection
  const [deleteMode, setDeleteMode] = useState(false);
  const [selectedIds, setSelectedIds] = useState(new Set());

  // Load created user accounts on render or tab change
  const loadAccounts = () => {
    try {
      const raw = window.localStorage.getItem('schoolAppLocalUsers');
      if (raw) {
        setRegisteredAccounts(JSON.parse(raw));
      } else {
        setRegisteredAccounts({
          'demo-student': { userId: 'demo-student', name: 'Demo Student', password: 'demo', role: 'student' },
          'demo-teacher': { userId: 'demo-teacher', name: 'Demo Teacher', password: 'demo', role: 'teacher' },
          'admin': { userId: 'admin', name: 'Admin Administrator', password: 'admin', role: 'admin' },
        });
      }
    } catch (e) {
      // ignore
    }
  };

  useEffect(() => {
    loadAccounts();
  }, []);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    setMenuOpen(false);
    setDeleteMode(false);
    setSelectedIds(new Set());
    setSelectedClassIdx(null);
    if (tab === 'accounts') {
      loadAccounts();
    }
  };

  const handleCreateAccountSubmit = async (e) => {
    e.preventDefault();
    setAccountStatus('');
    setAccountError('');
    if (!accountForm.userId.trim() || !accountForm.name.trim() || !accountForm.password.trim()) {
      setAccountError('Please fill in all fields.');
      return;
    }
    try {
      await createUser({
        userId: accountForm.userId.trim(),
        name: accountForm.name.trim(),
        password: accountForm.password.trim(),
        role: accountForm.role,
      });
      setAccountStatus(`Successfully registered ${accountForm.role} account "${accountForm.userId}".`);
      setAccountForm({ userId: '', name: '', password: '', role: 'student' });
      loadAccounts();
    } catch (err) {
      setAccountError(err.message || 'Error creating user.');
    }
  };

  const toggleSelect = (id) => {
    setSelectedIds(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const executeDelete = async () => {
    if (activeTab === 'teachers') {
      setTeachers(prev => prev.filter(t => !selectedIds.has(t.email)));
    } else if (activeTab === 'students' && selectedClassIdx !== null) {
      setClasses(prev => prev.map((cls, idx) => {
        if (idx !== selectedClassIdx) return cls;
        return { ...cls, students: cls.students.filter(s => !selectedIds.has(s.id)) };
      }));
    } else if (activeTab === 'exams') {
      setExams(prev => prev.filter(e => !selectedIds.has(`${e.subject}-${e.grade}`)));
    } else if (activeTab === 'notices') {
      setNotices(prev => prev.filter(n => !selectedIds.has(n.id)));
    } else if (activeTab === 'fees') {
      setFees(prev => prev.filter(f => !selectedIds.has(f.id)));
    } else if (activeTab === 'accounts') {
      const idsToDelete = Array.from(selectedIds).filter(id => String(id).trim() !== 'admin');
      if (idsToDelete.length === 0) {
        setAccountStatus('The admin account cannot be deleted.');
        setAccountError('');
        setSelectedIds(new Set());
        setDeleteMode(false);
        return;
      }

      for (const id of idsToDelete) {
        try {
          await deleteUser(id);
        } catch (err) {
          console.warn('Unable to remove login account', err);
        }
      }
      loadAccounts();
      setAccountStatus(`Removed ${idsToDelete.length} login account${idsToDelete.length > 1 ? 's' : ''}.`);
      setAccountError('');
    }
    setSelectedIds(new Set());
    setDeleteMode(false);
  };

  const handleToggleFee = (id) => {
    setFees(prev => prev.map(f => {
      if (f.id !== id) return f;
      return { ...f, status: f.status === 'Paid' ? 'Pending' : 'Paid' };
    }));
  };

  // Stats Counters
  const totalTeachers = teachers.length;
  const totalStudents = classes.reduce((acc, c) => acc + c.students.length, 0);
  const totalExams = exams.length;

  return (
    <div className="tp-shell">
      {/* ════════════════════════════════
          MOBILE DRAWER OVERLAY
          ════════════════════════════════ */}
      {menuOpen && (
        <div className="tp-drawer-overlay" onClick={() => setMenuOpen(false)}>
          <div className="tp-drawer" onClick={e => e.stopPropagation()}>
            <p className="tp-drawer-title">Admin Dashboard</p>
            <p className="tp-drawer-label">Signed in as</p>
            <p className="tp-drawer-name">{user?.name || 'Administrator'}</p>
            <p className="tp-drawer-role">Role: System Admin</p>

            <button className="tp-drawer-signout" onClick={signOut}>Sign Out</button>
          </div>
        </div>
      )}

      {/* ════════════════════════════════
          DESKTOP SIDEBAR
          ════════════════════════════════ */}
      <aside className="tp-sidebar">
        <div className="tp-sidebar-brand">
          <img src={greenfieldLogo} alt="School logo" className="tp-sidebar-crest" />
          <span className="tp-sidebar-school">Greenfield<br />Admin Portal</span>
        </div>
        <nav className="tp-sidebar-nav">
          <button className={`tp-sidebar-nav-item ${activeTab === 'overview' ? 'active' : ''}`} onClick={() => handleTabClick('overview')}>
            <HomeIcon /> Overview
          </button>
          <button className={`tp-sidebar-nav-item ${activeTab === 'accounts' ? 'active' : ''}`} onClick={() => handleTabClick('accounts')}>
            <KeyIcon /> User Logins
          </button>
          <button className={`tp-sidebar-nav-item ${activeTab === 'teachers' ? 'active' : ''}`} onClick={() => handleTabClick('teachers')}>
            <TeacherIcon /> Teachers
          </button>
          <button className={`tp-sidebar-nav-item ${activeTab === 'students' ? 'active' : ''}`} onClick={() => handleTabClick('students')}>
            <StudentIcon /> Students
          </button>
          <button className={`tp-sidebar-nav-item ${activeTab === 'exams' ? 'active' : ''}`} onClick={() => handleTabClick('exams')}>
            <ExamIcon /> Exams
          </button>
          <button className={`tp-sidebar-nav-item ${activeTab === 'notices' ? 'active' : ''}`} onClick={() => handleTabClick('notices')}>
            <NoticeIcon /> Notices
          </button>
          <button className={`tp-sidebar-nav-item ${activeTab === 'fees' ? 'active' : ''}`} onClick={() => handleTabClick('fees')}>
            <FeeIcon /> Fees Control
          </button>
        </nav>
        <div className="tp-sidebar-divider" />
        <div style={{ padding: '0 4px', marginBottom: 8 }}>
          <p style={{ fontSize: 13, fontWeight: 700, color: '#1a2e4a', margin: '0 0 2px' }}>{user?.name || 'System Admin'}</p>
          <p style={{ fontSize: 11.5, color: '#94a3b8', margin: 0, textTransform: 'capitalize' }}>Administrator</p>
        </div>
        <button className="tp-sidebar-signout" onClick={signOut}>
          <LogoutIcon /> Sign Out
        </button>
      </aside>

      {/* ════════════════════════════════
          MAIN CONTENT
          ════════════════════════════════ */}
      <main className="tp-main">
        {/* Topbar */}
        <div className="tp-topbar">
          <button className="tp-icon-btn tp-hamburger" onClick={() => setMenuOpen(true)} aria-label="Menu">
            <HamburgerIcon />
          </button>
          <div className="tp-topbar-greeting">
            <h2>School Control Panel 🛡️</h2>
            <p>Learn · Manage · Coordinate</p>
          </div>
          <button className="tp-icon-btn" onClick={signOut} aria-label="Logout" style={{ marginLeft: 'auto', display: 'flex', gap: 8, alignItems: 'center', background: '#f1f5f9', padding: '6px 14px', borderRadius: 10, fontSize: 13, fontWeight: 700, color: '#ef4444' }}>
            <LogoutIcon /> <span>Logout</span>
          </button>
        </div>

        {/* Tab 1: Overview */}
        {activeTab === 'overview' && (
          <div style={{ padding: '24px 20px' }}>
            <div className="tp-hero" style={{ marginBottom: 24 }}>
              <div className="tp-greeting">
                <h1>Overview Metrics</h1>
                <p>Monitor real-time directories, exams schedule, and fee controls.</p>
              </div>
            </div>
            <div className="tp-class-grid" style={{ padding: 0 }}>
              <div className="tp-class-card" style={{ '--cls-color': '#38b26e' }}>
                <div className="tp-class-card-num" style={{ background: '#38b26e' }}>👨‍🏫</div>
                <div className="tp-class-card-body">
                  <p className="tp-class-card-title">Total Teachers</p>
                  <p className="tp-class-card-count">{totalTeachers} Registered</p>
                </div>
              </div>
              <div className="tp-class-card" style={{ '--cls-color': '#2563eb' }}>
                <div className="tp-class-card-num" style={{ background: '#2563eb' }}>🎓</div>
                <div className="tp-class-card-body">
                  <p className="tp-class-card-title">Total Students</p>
                  <p className="tp-class-card-count">{totalStudents} Active</p>
                </div>
              </div>
              <div className="tp-class-card" style={{ '--cls-color': '#8b5cf6' }}>
                <div className="tp-class-card-num" style={{ background: '#8b5cf6' }}>📅</div>
                <div className="tp-class-card-body">
                  <p className="tp-class-card-title">Exams Scheduled</p>
                  <p className="tp-class-card-count">{totalExams} Schedules</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: User Logins (Accounts Creation) */}
        {activeTab === 'accounts' && (
          <div style={{ padding: '24px 20px' }}>
            <div className="tp-roster-toolbar" style={{ padding: '0 0 16px' }}>
              <span className="tp-roster-badge" style={{ background: 'linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)', color: '#2563eb', borderColor: '#bfdbfe' }}>
                🔑 User Login Creation
              </span>
            </div>

            {/* Create Account Form */}
            <div className="tp-student-roster-card" style={{ display: 'block', padding: '20px 24px', marginBottom: 28 }}>
              <h3 style={{ margin: '0 0 16px', fontSize: 16, fontWeight: 700, color: '#1a2e4a' }}>Create Credentials</h3>
              <form onSubmit={handleCreateAccountSubmit}>
                <div className="tp-form-grid">
                  <div className="tp-form-group">
                    <label className="tp-form-label">Full Name</label>
                    <input className="tp-form-input" type="text" placeholder="e.g. Samuel Green" value={accountForm.name} onChange={e => setAccountForm({ ...accountForm, name: e.target.value })} required />
                  </div>
                  <div className="tp-form-group">
                    <label className="tp-form-label">Account Role</label>
                    <select
                      className="tp-form-input"
                      value={accountForm.role}
                      onChange={e => {
                        const role = e.target.value;
                        setAccountForm((prev) => ({ ...prev, role, userId: '', name: '' }));
                        setSelectedProfileId('');
                      }}
                    >
                      <option value="student">Student</option>
                      <option value="teacher">Teacher</option>
                      <option value="admin">System Admin</option>
                    </select>
                  </div>
                  {(accountForm.role === 'teacher' || accountForm.role === 'student') && (
                    <div className="tp-form-group tp-form-full">
                      <label className="tp-form-label">Pick existing {accountForm.role}</label>
                      <select
                        className="tp-form-input"
                        value={selectedProfileId}
                        onChange={e => handleProfileSelect(e.target.value)}
                      >
                        <option value="">Select profile to auto-fill</option>
                        {profileOptions.map((profile) => (
                          <option key={profile.key} value={profile.key}>
                            {profile.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}
                  <div className="tp-form-group">
                    <label className="tp-form-label">Full Name</label>
                    <input
                      className="tp-form-input"
                      type="text"
                      placeholder="e.g. Samuel Green"
                      value={accountForm.name}
                      onChange={e => setAccountForm({ ...accountForm, name: e.target.value })}
                      required
                    />
                  </div>
                  <div className="tp-form-group">
                    <label className="tp-form-label">Username / User ID</label>
                    <input
                      className="tp-form-input"
                      type="text"
                      placeholder={accountForm.role === 'teacher' ? 'Use teacher email or alias' : 'Use student ID or alias'}
                      value={accountForm.userId}
                      onChange={e => setAccountForm({ ...accountForm, userId: e.target.value })}
                      required
                      readOnly={Boolean(selectedProfileId)}
                    />
                  </div>
                  <div className="tp-form-group">
                    <label className="tp-form-label">Password</label>
                    <input className="tp-form-input" type="password" placeholder="Enter secure password" value={accountForm.password} onChange={e => setAccountForm({ ...accountForm, password: e.target.value })} required />
                  </div>
                </div>
                <div style={{ marginTop: 20, display: 'flex', gap: 12, alignItems: 'center' }}>
                  <button className="tp-add-student-btn" type="submit" style={{ background: '#2563eb', padding: '10px 24px' }}>
                    Create Account
                  </button>
                  {accountStatus && <span style={{ color: '#0ea5e9', fontSize: 13, fontWeight: 600 }}>{accountStatus}</span>}
                  {accountError && <span style={{ color: '#ef4444', fontSize: 13, fontWeight: 600 }}>{accountError}</span>}
                </div>
              </form>
            </div>

            {/* List of Registered Accounts */}
            <h3 style={{ margin: '20px 0 12px', fontSize: 16, fontWeight: 700, color: '#1a2e4a' }}>Registered Logins</h3>
            <div className="tp-student-roster-grid" style={{ padding: 0 }}>
              {Object.values(registeredAccounts).map(acc => {
                const isAdminAccount = String(acc.userId).trim() === 'admin';
                return (
                  <div
                    key={acc.userId}
                    className={`tp-student-roster-card ${deleteMode && selectedIds.has(acc.userId) ? 'tp-card-selected' : ''}`}
                    onClick={deleteMode && !isAdminAccount ? () => toggleSelect(acc.userId) : undefined}
                    style={{ cursor: deleteMode && !isAdminAccount ? 'pointer' : 'default', display: 'flex', justifyContent: 'space-between', alignItems: 'center', opacity: isAdminAccount ? 0.9 : 1 }}
                  >
                  {deleteMode && (
                    <div className={`tp-roster-checkbox ${selectedIds.has(acc.userId) ? 'tp-cb-checked' : ''}`}>
                      {selectedIds.has(acc.userId) ? '✓' : ''}
                    </div>
                  )}
                  <div className="tp-roster-info">
                    <p className="tp-roster-name">{acc.name}</p>
                    <p className="tp-roster-id">Username: {acc.userId}</p>
                    <p className="tp-roster-roll" style={{ fontFamily: 'Courier New', fontWeight: 700 }}>Password: {acc.password}</p>
                  </div>
                    <span className="tp-badge" style={{ background: acc.role === 'admin' ? '#ef4444' : acc.role === 'teacher' ? '#38b26e' : '#2563eb' }}>
                      {acc.role}
                    </span>
                  </div>
                );
              })}
            </div>

            <div className="tp-delete-section">
              {!deleteMode ? (
                <button className="tp-delete-toggle-btn" onClick={() => setDeleteMode(true)} disabled={Object.keys(registeredAccounts).filter(id => String(id).trim() !== 'admin').length === 0}>🗑️ Select to Remove Login</button>
              ) : (
                <div className="tp-delete-bar">
                  <span className="tp-delete-count">{selectedIds.size} selected</span>
                  <div className="tp-delete-bar-right">
                    <button className="tp-delete-cancel-btn" onClick={() => { setDeleteMode(false); setSelectedIds(new Set()); }}>Cancel</button>
                    <button className="tp-delete-exec-btn" disabled={selectedIds.size === 0} onClick={executeDelete}>Delete</button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Tab 3: Teachers */}
        {activeTab === 'teachers' && (
          <div style={{ padding: '24px 20px' }}>
            <div className="tp-roster-toolbar" style={{ padding: '0 0 16px' }}>
              <span className="tp-roster-badge" style={{ background: '#e8f5e9', color: '#2e7d32', borderColor: '#a5d6a7' }}>
                👨‍🏫 {teachers.length} Teachers
              </span>
              <button className="tp-add-student-btn" style={{ background: '#38b26e' }} onClick={() => setShowAddTeacher(true)}>
                + Add Teacher
              </button>
            </div>

            <div className="tp-student-roster-grid" style={{ padding: 0 }}>
              {teachers.map(t => (
                <div key={t.email} className={`tp-student-roster-card ${deleteMode && selectedIds.has(t.email) ? 'tp-card-selected' : ''}`} onClick={deleteMode ? () => toggleSelect(t.email) : undefined} style={{ cursor: deleteMode ? 'pointer' : 'default' }}>
                  {deleteMode && (
                    <div className={`tp-roster-checkbox ${selectedIds.has(t.email) ? 'tp-cb-checked' : ''}`}>
                      {selectedIds.has(t.email) ? '✓' : ''}
                    </div>
                  )}
                  {t.profilePic ? (
                    <img src={t.profilePic} alt={t.name} className="tp-roster-avatar-img" />
                  ) : (
                    <div className="tp-roster-avatar" style={{ background: '#38b26e' }}>{t.name.charAt(0)}</div>
                  )}
                  <div className="tp-roster-info">
                    <p className="tp-roster-name">{t.name}</p>
                    <p className="tp-roster-id">Subject: {t.subject}</p>
                    <p className="tp-roster-roll">Email: {t.email}</p>
                    <p className="tp-roster-meta">Phone: {t.phone}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="tp-delete-section">
              {!deleteMode ? (
                <button className="tp-delete-toggle-btn" onClick={() => setDeleteMode(true)} disabled={teachers.length === 0}>🗑️ Select to Remove</button>
              ) : (
                <div className="tp-delete-bar">
                  <span className="tp-delete-count">{selectedIds.size} selected</span>
                  <div className="tp-delete-bar-right">
                    <button className="tp-delete-cancel-btn" onClick={() => { setDeleteMode(false); setSelectedIds(new Set()); }}>Cancel</button>
                    <button className="tp-delete-exec-btn" disabled={selectedIds.size === 0} onClick={executeDelete}>Delete</button>
                  </div>
                </div>
              )}
            </div>

            {showAddTeacher && <AddTeacherModal onClose={() => setShowAddTeacher(false)} onAdd={(newT) => { setTeachers([...teachers, newT]); setShowAddTeacher(false); }} />}
          </div>
        )}

        {/* Tab 4: Students */}
        {activeTab === 'students' && (
          <div style={{ padding: '24px 20px' }}>
            {selectedClassIdx === null ? (
              <div className="tp-class-grid" style={{ padding: 0 }}>
                {classes.map((cls, idx) => (
                  <button key={cls.classNum} className="tp-class-card" onClick={() => setSelectedClassIdx(idx)} style={{ '--cls-color': CLASS_COLORS[idx % CLASS_COLORS.length] }}>
                    <div className="tp-class-card-num" style={{ background: CLASS_COLORS[idx % CLASS_COLORS.length] }}>
                      {ORDINALS[idx]}
                    </div>
                    <div className="tp-class-card-body">
                      <p className="tp-class-card-title">{cls.className}</p>
                      <p className="tp-class-card-count">{cls.students.length} Students</p>
                    </div>
                    <div className="tp-class-card-arrow"><ChevronRight /></div>
                  </button>
                ))}
              </div>
            ) : (
              <div>
                <div className="tp-section-header" style={{ marginBottom: 16 }}>
                  <button className="tp-back-btn" onClick={() => { setSelectedClassIdx(null); setDeleteMode(false); setSelectedIds(new Set()); }}>
                    <ChevronLeft /> Back
                  </button>
                  <h2 className="tp-section-title">{classes[selectedClassIdx].className}</h2>
                </div>
                <div className="tp-roster-toolbar" style={{ padding: '0 0 16px' }}>
                  <span className="tp-roster-badge">🎓 {classes[selectedClassIdx].students.length} Enrolled</span>
                  <button className="tp-add-student-btn" style={{ background: '#2563eb' }} onClick={() => setShowAddStudent(true)}>
                    + Add Student
                  </button>
                </div>

                {classes[selectedClassIdx].students.length === 0 ? (
                  <div className="tp-roster-empty">
                    <span>👥</span>
                    <p>No students in this class yet.</p>
                  </div>
                ) : (
                  <div className="tp-student-roster-grid" style={{ padding: 0 }}>
                    {classes[selectedClassIdx].students.map((s, idx) => (
                      <div key={s.id} className={`tp-student-roster-card ${deleteMode && selectedIds.has(s.id) ? 'tp-card-selected' : ''}`} onClick={deleteMode ? () => toggleSelect(s.id) : undefined} style={{ cursor: deleteMode ? 'pointer' : 'default' }}>
                        {deleteMode && (
                          <div className={`tp-roster-checkbox ${selectedIds.has(s.id) ? 'tp-cb-checked' : ''}`}>
                            {selectedIds.has(s.id) ? '✓' : ''}
                          </div>
                        )}
                        {s.profilePic ? (
                          <img src={s.profilePic} alt={s.name} className="tp-roster-avatar-img" />
                        ) : (
                          <div className="tp-roster-avatar" style={{ background: CLASS_COLORS[selectedClassIdx % CLASS_COLORS.length] }}>{s.name.charAt(0)}</div>
                        )}
                        <div className="tp-roster-info">
                          <p className="tp-roster-name">{s.name}</p>
                          <p className="tp-roster-id">ID: {s.id}</p>
                          <p className="tp-roster-roll">Roll No: {s.roll}</p>
                          <p className="tp-roster-meta">Age: {s.age} · DOB: {s.birthday}</p>
                        </div>
                        <span className="tp-roster-num">#{String(idx + 1).padStart(2, '0')}</span>
                      </div>
                    ))}
                  </div>
                )}

                <div className="tp-delete-section">
                  {!deleteMode ? (
                    <button className="tp-delete-toggle-btn" onClick={() => setDeleteMode(true)} disabled={classes[selectedClassIdx].students.length === 0}>🗑️ Select to Remove</button>
                  ) : (
                    <div className="tp-delete-bar">
                      <span className="tp-delete-count">{selectedIds.size} selected</span>
                      <div className="tp-delete-bar-right">
                        <button className="tp-delete-cancel-btn" onClick={() => { setDeleteMode(false); setSelectedIds(new Set()); }}>Cancel</button>
                        <button className="tp-delete-exec-btn" disabled={selectedIds.size === 0} onClick={executeDelete}>Delete</button>
                      </div>
                    </div>
                  )}
                </div>

                {showAddStudent && (
                  <AddStudentModal classNum={classes[selectedClassIdx].classNum} onClose={() => setShowAddStudent(false)} onAdd={(newS) => {
                    setClasses(prev => prev.map((cls, idx) => {
                      if (idx !== selectedClassIdx) return cls;
                      const nextRoll = String(cls.students.length + 1).padStart(2, '0');
                      return { ...cls, students: [...cls.students, { ...newS, roll: nextRoll }] };
                    }));
                    setShowAddStudent(false);
                  }} />
                )}
              </div>
            )}
          </div>
        )}

        {/* Tab 5: Exams */}
        {activeTab === 'exams' && (
          <div style={{ padding: '24px 20px' }}>
            <div className="tp-roster-toolbar" style={{ padding: '0 0 16px' }}>
              <span className="tp-roster-badge" style={{ background: '#f3e8ff', color: '#6b21a8', borderColor: '#d8b4fe' }}>
                📅 {exams.length} Schedules
              </span>
              <button className="tp-add-student-btn" style={{ background: '#8b5cf6' }} onClick={() => setShowAddExam(true)}>
                + Schedule Exam
              </button>
            </div>

            <div className="tp-student-roster-grid" style={{ padding: 0 }}>
              {exams.map(e => {
                const uniqueKey = `${e.subject}-${e.grade}`;
                return (
                  <div key={uniqueKey} className={`tp-student-roster-card ${deleteMode && selectedIds.has(uniqueKey) ? 'tp-card-selected' : ''}`} onClick={deleteMode ? () => toggleSelect(uniqueKey) : undefined} style={{ cursor: deleteMode ? 'pointer' : 'default' }}>
                    {deleteMode && (
                      <div className={`tp-roster-checkbox ${selectedIds.has(uniqueKey) ? 'tp-cb-checked' : ''}`}>
                        {selectedIds.has(uniqueKey) ? '✓' : ''}
                      </div>
                    )}
                    <div className="tp-roster-info">
                      <p className="tp-roster-name">{e.subject}</p>
                      <p className="tp-roster-id">Target: {e.grade}</p>
                      <p className="tp-roster-roll">Time: {e.time}</p>
                      <p className="tp-roster-meta">Date: {e.date}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="tp-delete-section">
              {!deleteMode ? (
                <button className="tp-delete-toggle-btn" onClick={() => setDeleteMode(true)} disabled={exams.length === 0}>🗑️ Select to Remove</button>
              ) : (
                <div className="tp-delete-bar">
                  <span className="tp-delete-count">{selectedIds.size} selected</span>
                  <div className="tp-delete-bar-right">
                    <button className="tp-delete-cancel-btn" onClick={() => { setDeleteMode(false); setSelectedIds(new Set()); }}>Cancel</button>
                    <button className="tp-delete-exec-btn" disabled={selectedIds.size === 0} onClick={executeDelete}>Delete</button>
                  </div>
                </div>
              )}
            </div>

            {showAddExam && <AddExamModal onClose={() => setShowAddExam(false)} onAdd={(newEx) => { setExams([...exams, newEx]); setShowAddExam(false); }} />}
          </div>
        )}

        {/* Tab 6: Notices */}
        {activeTab === 'notices' && (
          <div style={{ padding: '24px 20px' }}>
            <div className="tp-roster-toolbar" style={{ padding: '0 0 16px' }}>
              <span className="tp-roster-badge" style={{ background: '#ffedd5', color: '#c2410c', borderColor: '#fed7aa' }}>
                📢 {notices.length} Public Notices
              </span>
              <button className="tp-add-student-btn" style={{ background: '#f97316' }} onClick={() => setShowAddNotice(true)}>
                + Create Notice
              </button>
            </div>

            <div className="tp-student-roster-grid" style={{ padding: 0 }}>
              {notices.map(n => (
                <div key={n.id} className={`tp-student-roster-card ${deleteMode && selectedIds.has(n.id) ? 'tp-card-selected' : ''}`} onClick={deleteMode ? () => toggleSelect(n.id) : undefined} style={{ cursor: deleteMode ? 'pointer' : 'default', flexDirection: 'column', alignItems: 'flex-start', gap: 6 }}>
                  {deleteMode && (
                    <div className={`tp-roster-checkbox ${selectedIds.has(n.id) ? 'tp-cb-checked' : ''}`} style={{ marginBottom: 4 }}>
                      {selectedIds.has(n.id) ? '✓' : ''}
                    </div>
                  )}
                  <div style={{ display: 'flex', width: '100%', justifyContent: 'space-between', alignItems: 'center' }}>
                    <p className="tp-roster-name" style={{ fontSize: 15 }}>{n.title}</p>
                    <span style={{ fontSize: 11, fontWeight: 700, color: '#94a3b8' }}>{n.date}</span>
                  </div>
                  <p className="tp-roster-meta" style={{ fontSize: 12.5, color: '#64748b', lineHeight: 1.4 }}>{n.desc}</p>
                </div>
              ))}
            </div>

            <div className="tp-delete-section">
              {!deleteMode ? (
                <button className="tp-delete-toggle-btn" onClick={() => setDeleteMode(true)} disabled={notices.length === 0}>🗑️ Select to Remove</button>
              ) : (
                <div className="tp-delete-bar">
                  <span className="tp-delete-count">{selectedIds.size} selected</span>
                  <div className="tp-delete-bar-right">
                    <button className="tp-delete-cancel-btn" onClick={() => { setDeleteMode(false); setSelectedIds(new Set()); }}>Cancel</button>
                    <button className="tp-delete-exec-btn" disabled={selectedIds.size === 0} onClick={executeDelete}>Delete</button>
                  </div>
                </div>
              )}
            </div>

            {showAddNotice && <AddNoticeModal onClose={() => setShowAddNotice(false)} onAdd={(newN) => { setNotices([...notices, newN]); setShowAddNotice(false); }} />}
          </div>
        )}

        {/* Tab 7: Fees Control */}
        {activeTab === 'fees' && (
          <div style={{ padding: '24px 20px' }}>
            <div className="tp-roster-toolbar" style={{ padding: '0 0 16px' }}>
              <span className="tp-roster-badge" style={{ background: '#ccfbf1', color: '#0f766e', borderColor: '#99f6e4' }}>
                💳 Fee Structures & Invoices
              </span>
            </div>

            <div className="tp-student-roster-grid" style={{ padding: 0 }}>
              {fees.map(f => (
                <div key={f.id} className="tp-student-roster-card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div className="tp-roster-info">
                    <p className="tp-roster-name">{f.name}</p>
                    <p className="tp-roster-id" style={{ color: '#0f766e' }}>Amount: {f.amount}</p>
                  </div>
                  <button onClick={() => handleToggleFee(f.id)} className="tp-add-student-btn" style={{ background: f.status === 'Paid' ? '#0ea5a4' : '#ef4444', fontSize: 11, padding: '6px 12px', boxShadow: 'none' }}>
                    {f.status}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* ════════════════════════════════
          MOBILE BOTTOM NAV
          ════════════════════════════════ */}
      <nav className="tp-bottom-nav">
        <button className={`tp-nav-item ${activeTab === 'overview' ? 'active' : ''}`} onClick={() => handleTabClick('overview')} aria-label="Home">
          <HomeIcon />
          <span className="tp-nav-label">Overview</span>
        </button>
        <button className={`tp-nav-item ${activeTab === 'accounts' ? 'active' : ''}`} onClick={() => handleTabClick('accounts')} aria-label="Logins">
          <KeyIcon />
          <span className="tp-nav-label">Logins</span>
        </button>
        <button className={`tp-nav-item ${activeTab === 'teachers' ? 'active' : ''}`} onClick={() => handleTabClick('teachers')} aria-label="Teachers">
          <TeacherIcon />
          <span className="tp-nav-label">Teachers</span>
        </button>
        <button className={`tp-nav-item ${activeTab === 'students' ? 'active' : ''}`} onClick={() => handleTabClick('students')} aria-label="Students">
          <StudentIcon />
          <span className="tp-nav-label">Students</span>
        </button>
      </nav>
    </div>
  );
}
