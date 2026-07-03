import { useState } from 'react';
import { useAuth } from '../context/AuthContext.jsx';
import greenfieldLogo from '../greenfield_logo.png';
import schoolSilhouette from '../school_silhouette.png';
import ExamResultView from './ExamResultView.jsx';

/* ──────────────────────────────────────────
   SVG Icon Components
   ────────────────────────────────────────── */
const HamburgerIcon = () => (
  <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" viewBox="0 0 24 24">
    <line x1="3" y1="6" x2="21" y2="6"/>
    <line x1="3" y1="12" x2="21" y2="12"/>
    <line x1="3" y1="18" x2="21" y2="18"/>
  </svg>
);

const BellIcon = () => (
  <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
    <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
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
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
    <polyline points="16 17 21 12 16 7"/>
    <line x1="21" y1="12" x2="9" y2="12"/>
  </svg>
);

/* Nav Icons */
const HomeIcon = ({ active }) => (
  <svg width="22" height="22" fill={active ? '#2563eb' : 'none'} stroke={active ? '#2563eb' : '#94a3b8'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
    <polyline points="9 22 9 12 15 12 15 22"/>
  </svg>
);
const NoticeIcon = ({ active }) => (
  <svg width="22" height="22" fill="none" stroke={active ? '#2563eb' : '#94a3b8'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
    <path d="M22 2 11 13"/><path d="M22 2 15 22 11 13 2 9l20-7z"/>
  </svg>
);
const CalendarIcon = ({ active }) => (
  <svg width="22" height="22" fill="none" stroke={active ? '#2563eb' : '#94a3b8'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
    <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
  </svg>
);
const MessageIcon = ({ active }) => (
  <svg width="22" height="22" fill="none" stroke={active ? '#2563eb' : '#94a3b8'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
  </svg>
);
const ProfileIcon = ({ active }) => (
  <svg width="22" height="22" fill="none" stroke={active ? '#2563eb' : '#94a3b8'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
  </svg>
);

/* Menu card icons (white) */
const StudentInfoIcon = () => (
  <svg width="26" height="26" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
  </svg>
);
const TeacherDirIcon = () => (
  <svg width="26" height="26" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
    <path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
  </svg>
);
const ExamIcon = () => (
  <svg width="26" height="26" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
    <rect x="5" y="2" width="14" height="20" rx="2"/>
    <line x1="9" y1="7" x2="15" y2="7"/><line x1="9" y1="11" x2="15" y2="11"/><line x1="9" y1="15" x2="13" y2="15"/>
  </svg>
);
const RoutineIcon = () => (
  <svg width="26" height="26" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
    <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
    <circle cx="8" cy="15" r="1" fill="#fff"/><circle cx="12" cy="15" r="1" fill="#fff"/><circle cx="16" cy="15" r="1" fill="#fff"/>
  </svg>
);
const FeeIcon = () => (
  <svg width="26" height="26" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
    <rect x="1" y="4" width="22" height="16" rx="2"/>
    <line x1="1" y1="10" x2="23" y2="10"/>
  </svg>
);

/* Sidebar-only icons (colored) */
const SBStudentIcon = () => (
  <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
  </svg>
);
const SBTeacherIcon = () => (
  <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
    <path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
  </svg>
);
const SBExamIcon = () => (
  <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
    <rect x="5" y="2" width="14" height="20" rx="2"/>
    <line x1="9" y1="7" x2="15" y2="7"/><line x1="9" y1="11" x2="15" y2="11"/>
  </svg>
);
const SBRoutineIcon = () => (
  <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
    <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
  </svg>
);
const SBFeeIcon = () => (
  <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
    <rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/>
  </svg>
);
const SBHomeIcon = () => (
  <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
    <polyline points="9 22 9 12 15 12 15 22"/>
  </svg>
);

/* ──────────────────────────────────────────
   Static data
   ────────────────────────────────────────── */
const menuItems = [
  { id: 'students',  title: 'Student Info',         desc: 'View and update student information',    color: '#4a90e2', Icon: StudentInfoIcon, SBIcon: SBStudentIcon },
  { id: 'teachers',  title: 'Teachers Directory',    desc: 'Find and connect with teachers',          color: '#38b26e', Icon: TeacherDirIcon,  SBIcon: SBTeacherIcon },
  { id: 'exam',      title: 'Result',                 desc: 'View results',                          color: '#8b5cf6', Icon: ExamIcon,         SBIcon: SBExamIcon    },
  { id: 'routine',   title: 'Class & Routine',       desc: 'View class routine and schedule',         color: '#f97316', Icon: RoutineIcon,      SBIcon: SBRoutineIcon },
  { id: 'fees',      title: 'Fee Management',        desc: 'View fee structure and payment history',  color: '#0ea5a4', Icon: FeeIcon,          SBIcon: SBFeeIcon     },
];

const navItems = [
  { id: 'home',     label: 'Home',     Icon: HomeIcon    },
  { id: 'notice',   label: 'Notice',   Icon: NoticeIcon  },
  { id: 'calendar', label: 'Calendar', Icon: CalendarIcon },
  { id: 'messages', label: 'Messages', Icon: MessageIcon  },
  { id: 'profile',  label: 'Profile',  Icon: ProfileIcon  },
];

const teacherProfiles = [
  { name: 'Mrs. Sarah Jenkins',  subject: 'Mathematics', email: 's.jenkins@school.edu' },
  { name: 'Dr. Alan Turing',     subject: 'Physics',     email: 'a.turing@school.edu'  },
  { name: 'Prof. Marie Curie',   subject: 'Chemistry',   email: 'm.curie@school.edu'   },
  { name: 'Ms. Amelia Earhart',  subject: 'English',     email: 'a.earhart@school.edu' },
];
const classSections = [
  {
    className: 'Class One', classNum: 1,
    students: [
      { name: 'Aiden Brooks',    id: 'STU-0101', roll: '01' },
      { name: 'Lily Turner',     id: 'STU-0102', roll: '02' },
      { name: 'Noah Garcia',     id: 'STU-0103', roll: '03' },
      { name: 'Emma Wilson',     id: 'STU-0104', roll: '04' },
      { name: 'Liam Martinez',   id: 'STU-0105', roll: '05' },
      { name: 'Olivia Johnson',  id: 'STU-0106', roll: '06' },
    ],
  },
  {
    className: 'Class Two', classNum: 2,
    students: [
      { name: 'Ethan Brown',     id: 'STU-0201', roll: '01' },
      { name: 'Sophia Lee',      id: 'STU-0202', roll: '02' },
      { name: 'Mason Taylor',    id: 'STU-0203', roll: '03' },
      { name: 'Isabella Harris', id: 'STU-0204', roll: '04' },
      { name: 'Logan Clark',     id: 'STU-0205', roll: '05' },
      { name: 'Mia Lewis',       id: 'STU-0206', roll: '06' },
    ],
  },
  {
    className: 'Class Three', classNum: 3,
    students: [
      { name: 'Jackson Walker',  id: 'STU-0301', roll: '01' },
      { name: 'Charlotte Hall',  id: 'STU-0302', roll: '02' },
      { name: 'Sebastian Allen', id: 'STU-0303', roll: '03' },
      { name: 'Amelia Young',    id: 'STU-0304', roll: '04' },
      { name: 'Owen King',       id: 'STU-0305', roll: '05' },
      { name: 'Harper Wright',   id: 'STU-0306', roll: '06' },
    ],
  },
  {
    className: 'Class Four', classNum: 4,
    students: [
      { name: 'William Scott',   id: 'STU-0401', roll: '01' },
      { name: 'Avery Green',     id: 'STU-0402', roll: '02' },
      { name: 'Benjamin Adams',  id: 'STU-0403', roll: '03' },
      { name: 'Evelyn Baker',    id: 'STU-0404', roll: '04' },
      { name: 'Henry Nelson',    id: 'STU-0405', roll: '05' },
      { name: 'Abigail Carter',  id: 'STU-0406', roll: '06' },
    ],
  },
  {
    className: 'Class Five', classNum: 5,
    students: [
      { name: 'Alexander Mitchell', id: 'STU-0501', roll: '01' },
      { name: 'Ella Perez',         id: 'STU-0502', roll: '02' },
      { name: 'Daniel Roberts',     id: 'STU-0503', roll: '03' },
      { name: 'Grace Turner',       id: 'STU-0504', roll: '04' },
      { name: 'Michael Phillips',   id: 'STU-0505', roll: '05' },
      { name: 'Chloe Evans',        id: 'STU-0506', roll: '06' },
    ],
  },
  {
    className: 'Class Six', classNum: 6,
    students: [
      { name: 'Elijah Edwards',  id: 'STU-0601', roll: '01' },
      { name: 'Penelope Collins',id: 'STU-0602', roll: '02' },
      { name: 'James Stewart',   id: 'STU-0603', roll: '03' },
      { name: 'Layla Sanchez',   id: 'STU-0604', roll: '04' },
      { name: 'Ryan Morris',     id: 'STU-0605', roll: '05' },
      { name: 'Zoey Rogers',     id: 'STU-0606', roll: '06' },
    ],
  },
  {
    className: 'Class Seven', classNum: 7,
    students: [
      { name: 'Luke Reed',       id: 'STU-0701', roll: '01' },
      { name: 'Nora Cook',       id: 'STU-0702', roll: '02' },
      { name: 'Samuel Morgan',   id: 'STU-0703', roll: '03' },
      { name: 'Hannah Bell',     id: 'STU-0704', roll: '04' },
      { name: 'Wyatt Murphy',    id: 'STU-0705', roll: '05' },
      { name: 'Lillian Bailey',  id: 'STU-0706', roll: '06' },
    ],
  },
  {
    className: 'Class Eight', classNum: 8,
    students: [
      { name: 'Gabriel Rivera',  id: 'STU-0801', roll: '01' },
      { name: 'Addison Cooper',  id: 'STU-0802', roll: '02' },
      { name: 'Anthony Richardson', id: 'STU-0803', roll: '03' },
      { name: 'Aubrey Cox',      id: 'STU-0804', roll: '04' },
      { name: 'Dylan Howard',    id: 'STU-0805', roll: '05' },
      { name: 'Stella Ward',     id: 'STU-0806', roll: '06' },
    ],
  },
  {
    className: 'Class Nine', classNum: 9,
    students: [
      { name: 'Caleb Torres',    id: 'STU-0901', roll: '01' },
      { name: 'Leah Peterson',   id: 'STU-0902', roll: '02' },
      { name: 'Isaac Gray',      id: 'STU-0903', roll: '03' },
      { name: 'Violet Ramirez',  id: 'STU-0904', roll: '04' },
      { name: 'Nathan James',    id: 'STU-0905', roll: '05' },
      { name: 'Aurora Watson',   id: 'STU-0906', roll: '06' },
    ],
  },
  {
    className: 'Class Ten', classNum: 10,
    students: [
      { name: 'James Wilson',    id: 'STU-1001', roll: '01' },
      { name: 'Emily Chen',      id: 'STU-1002', roll: '02' },
      { name: 'Marcus Davis',    id: 'STU-1003', roll: '03' },
      { name: 'Priya Sharma',    id: 'STU-1004', roll: '04' },
      { name: 'Oliver Brooks',   id: 'STU-1005', roll: '05' },
      { name: 'Aria Kennedy',    id: 'STU-1006', roll: '06' },
    ],
  },
];
const examData = [
  { subject: 'Mathematics', date: '15 Jul 2026', grade: 'Grade 10', time: '9:00 AM'  },
  { subject: 'Physics',     date: '17 Jul 2026', grade: 'Grade 11', time: '10:00 AM' },
  { subject: 'Chemistry',   date: '19 Jul 2026', grade: 'Grade 11', time: '9:30 AM'  },
  { subject: 'English',     date: '21 Jul 2026', grade: 'Grade 10', time: '11:00 AM' },
];
const routineData = [
  { day: 'Monday',    subject: 'Mathematics', time: '8:00 – 9:30 AM',   room: 'Room 101' },
  { day: 'Tuesday',   subject: 'Physics',     time: '9:30 – 11:00 AM',  room: 'Lab 2'    },
  { day: 'Wednesday', subject: 'Chemistry',   time: '8:00 – 9:30 AM',   room: 'Lab 1'    },
  { day: 'Thursday',  subject: 'English',     time: '10:00 – 11:30 AM', room: 'Room 203' },
  { day: 'Friday',    subject: 'Mathematics', time: '8:00 – 9:30 AM',   room: 'Room 101' },
];
const feeData = [
  { name: 'Tuition Fee',    status: 'Pending', amount: '$1,200.00' },
  { name: 'Library Fee',    status: 'Paid',    amount: '$90.00'    },
  { name: 'Laboratory Fee', status: 'Paid',    amount: '$150.00'   },
  { name: 'Activity Fee',   status: 'Pending', amount: '$75.00'    },
];

/* ──────────────────────────────────────────
   Helpers
   ────────────────────────────────────────── */
const getGreeting = () => {
  const h = new Date().getHours();
  if (h < 12) return 'Good Morning';
  if (h < 17) return 'Good Afternoon';
  return 'Good Evening';
};

const Badge = ({ color, label }) => (
  <span className="tp-badge" style={{ background: color }}>{label}</span>
);

/* ──────────────────────────────────────────
   Class colour palette (cycles through 10 classes)
   ────────────────────────────────────────── */
const CLASS_COLORS = [
  '#4a90e2', '#38b26e', '#8b5cf6', '#f97316', '#0ea5a4',
  '#e11d48', '#d97706', '#0284c7', '#7c3aed', '#059669',
];

/* ──────────────────────────────────────────
   Ordinal helper
   ────────────────────────────────────────── */
const ORDINALS = ['One','Two','Three','Four','Five','Six','Seven','Eight','Nine','Ten'];

const getClassAbbrev = (cls, idx) => {
  if (idx < 10) return ORDINALS[idx];
  const name = cls.className;
  const match = name.match(/^(?:Class|Grade)\s+(.+)$/i);
  const coreName = match ? match[1] : name;
  if (coreName.length <= 4) return coreName;
  if (!isNaN(coreName)) return coreName;
  return coreName.slice(0, 3).toUpperCase();
};

/* ──────────────────────────────────────────
   AddClassModal
   ────────────────────────────────────────── */
function AddClassModal({ onClose, onAdd }) {
  const [className, setClassName] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!className.trim()) {
      setError('Class name is required');
      return;
    }
    onAdd(className.trim());
  };

  return (
    <div className="tp-modal-overlay" onClick={onClose}>
      <div className="tp-modal" onClick={e => e.stopPropagation()}>
        <div className="tp-modal-header" style={{ borderBottomColor: '#2563eb' }}>
          <h3 className="tp-modal-title">🏫 Add Custom Class</h3>
          <button className="tp-modal-close" onClick={onClose} aria-label="Close">✕</button>
        </div>

        <form className="tp-modal-body" onSubmit={handleSubmit}>
          <div className="tp-form-grid" style={{ gridTemplateColumns: '1fr' }}>
            <div className="tp-form-group tp-form-full">
              <label className="tp-form-label">Class Name *</label>
              <input
                className={`tp-form-input${error ? ' tp-input-error' : ''}`}
                type="text"
                placeholder="e.g. Class Eleven, Science, Grade A"
                value={className}
                onChange={e => {
                  setClassName(e.target.value);
                  if (error) setError('');
                }}
                autoFocus
              />
              {error && <span className="tp-form-error">{error}</span>}
            </div>
          </div>

          <div className="tp-modal-footer">
            <button type="button" className="tp-modal-cancel-btn" onClick={onClose}>Cancel</button>
            <button
              type="submit"
              className="tp-modal-submit-btn"
              style={{ background: '#2563eb' }}
            >
              Add Class
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}


/* ──────────────────────────────────────────
   AddGroupModal
   ────────────────────────────────────────── */
function AddGroupModal({ onClose, onAdd, classColor }) {
  const [groupName, setGroupName] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!groupName.trim()) {
      setError('Group name is required');
      return;
    }
    onAdd(groupName.trim());
  };

  return (
    <div className="tp-modal-overlay" onClick={onClose}>
      <div className="tp-modal" onClick={e => e.stopPropagation()}>
        <div className="tp-modal-header" style={{ borderBottomColor: classColor }}>
          <h3 className="tp-modal-title">👥 Add Custom Group</h3>
          <button className="tp-modal-close" onClick={onClose} aria-label="Close">✕</button>
        </div>

        <form className="tp-modal-body" onSubmit={handleSubmit}>
          <div className="tp-form-grid" style={{ gridTemplateColumns: '1fr' }}>
            <div className="tp-form-group tp-form-full">
              <label className="tp-form-label">Group Name *</label>
              <input
                className={`tp-form-input${error ? ' tp-input-error' : ''}`}
                type="text"
                placeholder="e.g. Group D, Biology Team"
                value={groupName}
                onChange={e => {
                  setGroupName(e.target.value);
                  if (error) setError('');
                }}
                autoFocus
              />
              {error && <span className="tp-form-error">{error}</span>}
            </div>
          </div>

          <div className="tp-modal-footer">
            <button type="button" className="tp-modal-cancel-btn" onClick={onClose}>Cancel</button>
            <button
              type="submit"
              className="tp-modal-submit-btn"
              style={{ background: classColor }}
            >
              Add Group
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────
   GroupRoster – shows groups of one class
   ────────────────────────────────────────── */
function GroupRoster({ classData, classIdx, onBack, onSelectGroup, onAddGroup, onDeleteGroups, teachers, onAssignGroupHeadTeacher }) {
  const [showAddModal, setShowAddModal]   = useState(false);
  const [deleteMode, setDeleteMode]       = useState(false);
  const [selectedGroups, setSelectedGroups] = useState(new Set());
  const [showConfirm, setShowConfirm]     = useState(false);
  const [headModalGroup, setHeadModalGroup] = useState(null);
  const [selectedHeadEmail, setSelectedHeadEmail] = useState('');

  const classColor = CLASS_COLORS[(classData.classNum - 1) % CLASS_COLORS.length];

  const toggleSelect = (groupName) => {
    setSelectedGroups(prev => {
      const next = new Set(prev);
      next.has(groupName) ? next.delete(groupName) : next.add(groupName);
      return next;
    });
  };

  const selectAll = () => setSelectedGroups(new Set(classData.groups));
  const clearAll  = () => setSelectedGroups(new Set());

  const handleDeleteConfirm = () => {
    onDeleteGroups(classIdx, [...selectedGroups]);
    setSelectedGroups(new Set());
    setDeleteMode(false);
    setShowConfirm(false);
  };

  const handleAddGroup = (groupName) => {
    onAddGroup(classIdx, groupName);
    setShowAddModal(false);
  };

  return (
    <>
      {showAddModal && (
        <AddGroupModal
          onClose={() => setShowAddModal(false)}
          onAdd={handleAddGroup}
          classColor={classColor}
        />
      )}

      {showConfirm && (
        <div className="tp-modal-overlay" onClick={() => setShowConfirm(false)}>
          <div className="tp-confirm-modal" onClick={e => e.stopPropagation()}>
            <div className="tp-confirm-icon">⚠️</div>
            <h3 className="tp-confirm-title">
              Delete {selectedGroups.size} Group{selectedGroups.size !== 1 ? 's' : ''}?
            </h3>
            <p className="tp-confirm-sub">
              This action cannot be undone. All students in the selected group{selectedGroups.size !== 1 ? 's' : ''} will be permanently removed.
            </p>
            <div className="tp-confirm-actions">
              <button className="tp-modal-cancel-btn" onClick={() => setShowConfirm(false)}>Cancel</button>
              <button className="tp-delete-exec-btn" onClick={handleDeleteConfirm}>Yes, Delete</button>
            </div>
          </div>
        </div>
      )}

      <div className="tp-section-header">
        <button className="tp-back-btn" onClick={onBack}>
          <ChevronLeft /> Back to Classes
        </button>
        <h2 className="tp-section-title">{classData.className} — Groups</h2>
      </div>

      {headModalGroup && (
        <div className="tp-modal-overlay" onClick={() => setHeadModalGroup(null)}>
          <div className="tp-modal" onClick={e => e.stopPropagation()}>
            <div className="tp-modal-header" style={{ borderBottomColor: classColor }}>
              <h3 className="tp-modal-title">🎓 Assign Head Teacher</h3>
              <button className="tp-modal-close" onClick={() => setHeadModalGroup(null)} aria-label="Close">✕</button>
            </div>
            <div className="tp-modal-body">
              <div className="tp-form-group tp-form-full">
                <label className="tp-form-label">Group</label>
                <input className="tp-form-input" type="text" value={headModalGroup} disabled />
              </div>
              <div className="tp-form-group tp-form-full">
                <label className="tp-form-label">Head Teacher</label>
                <select
                  className="tp-form-input"
                  value={selectedHeadEmail}
                  onChange={(e) => setSelectedHeadEmail(e.target.value)}
                >
                  <option value="">— Unassigned —</option>
                  {teachers.map((teacher) => (
                    <option key={teacher.email} value={teacher.email}>
                      {teacher.name} — {teacher.subject}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="tp-modal-footer">
              <button className="tp-modal-cancel-btn" onClick={() => setHeadModalGroup(null)}>Cancel</button>
              <button
                className="tp-modal-submit-btn"
                style={{ background: classColor }}
                onClick={() => {
                  onAssignGroupHeadTeacher(classIdx, headModalGroup, selectedHeadEmail);
                  setHeadModalGroup(null);
                }}
              >
                Save Head Teacher
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="tp-roster-toolbar">
        <span className="tp-roster-badge" style={{ background: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)', color: '#16a34a', borderColor: '#bbf7d0' }}>
          👥 {classData.groups.length} Groups
        </span>
        <button
          className="tp-add-student-btn"
          style={{ background: classColor }}
          onClick={() => setShowAddModal(true)}
        >
          + Add Group
        </button>
      </div>

      {classData.groups.length === 0 ? (
        <div className="tp-roster-empty">
          <span>👥</span>
          <p>No groups yet. Add the first group!</p>
        </div>
      ) : (
        <div className="tp-class-grid" style={{ paddingBottom: '0' }}>
          {classData.groups.map((group, idx) => {
            const studentCount = classData.students.filter(s => s.group === group).length;
            const isSelected = selectedGroups.has(group);
            return (
              <button
                key={group}
                className={`tp-class-card${deleteMode && isSelected ? ' tp-card-selected' : ''}${deleteMode ? ' tp-card-selectable' : ''}`}
                onClick={deleteMode ? () => toggleSelect(group) : () => onSelectGroup(idx)}
                style={{ '--cls-color': classColor }}
              >
                {deleteMode && (
                  <div className={`tp-roster-checkbox${isSelected ? ' tp-cb-checked' : ''}`} style={{ position: 'absolute', top: 12, right: 12, zIndex: 10 }}>
                    {isSelected ? '✓' : ''}
                  </div>
                )}
                <div className="tp-class-card-num" style={{ background: classColor }}>
                  {group.replace('Group ', '').slice(0, 3)}
                </div>
                <div className="tp-class-card-body">
                  <p className="tp-class-card-title">{group}</p>
                  <p className="tp-class-card-count">{studentCount} Students</p>
                  <p className="tp-class-card-sub" style={{ marginTop: 6, color: '#64748b', fontSize: 13 }}>
                    Head: {teachers.find((t) => t.email === classData.groupHeadTeachers?.[group])?.name || 'Unassigned'}
                  </p>
                </div>
                {!deleteMode && (
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 8 }}>
                    <button
                      type="button"
                      className="tp-small-btn"
                      style={{ borderColor: classColor, color: classColor, background: 'rgba(37, 99, 235, 0.08)' }}
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedHeadEmail(classData.groupHeadTeachers?.[group] || '');
                        setHeadModalGroup(group);
                      }}
                    >
                      Change Head
                    </button>
                    <div className="tp-class-card-arrow"><ChevronRight /></div>
                  </div>
                )}
              </button>
            );
          })}
        </div>
      )}

      <div className="tp-delete-section">
        {!deleteMode ? (
          <button
            className="tp-delete-toggle-btn"
            onClick={() => setDeleteMode(true)}
            disabled={classData.groups.length === 0}
          >
            🗑️ Select Groups to Delete
          </button>
        ) : (
          <div className="tp-delete-bar">
            <div className="tp-delete-bar-left">
              <span className="tp-delete-count">
                {selectedGroups.size} of {classData.groups.length} selected
              </span>
              <button className="tp-select-all-btn" onClick={selectedGroups.size === classData.groups.length ? clearAll : selectAll}>
                {selectedGroups.size === classData.groups.length ? 'Deselect All' : 'Select All'}
              </button>
            </div>
            <div className="tp-delete-bar-right">
              <button
                className="tp-delete-cancel-btn"
                onClick={() => { setDeleteMode(false); setSelectedGroups(new Set()); }}
              >
                Cancel
              </button>
              <button
                className="tp-delete-exec-btn"
                disabled={selectedGroups.size === 0}
                onClick={() => setShowConfirm(true)}
              >
                🗑️ Delete ({selectedGroups.size})
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

/* ──────────────────────────────────────────
   AddStudentModal
   ────────────────────────────────────────── */
function AddStudentModal({ onClose, onAdd, classColor }) {
  const [form, setForm] = useState({ name: '', age: '', birthday: '', fatherName: '', motherName: '' });
  const [profilePicPreview, setProfilePicPreview] = useState(null);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: null }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => setProfilePicPreview(ev.target.result);
    reader.readAsDataURL(file);
  };

  const validate = () => {
    const errs = {};
    if (!form.name.trim())     errs.name       = 'Full name is required';
    if (!form.age || isNaN(form.age) || Number(form.age) < 1 || Number(form.age) > 25)
                               errs.age        = 'Valid age required (1–25)';
    if (!form.birthday)        errs.birthday   = 'Date of birth is required';
    if (!form.fatherName.trim()) errs.fatherName = "Father's name is required";
    if (!form.motherName.trim()) errs.motherName = "Mother's name is required";
    return errs;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setSubmitting(true);
    const id = `STU-${Date.now().toString().slice(-6)}`;
    onAdd({
      name:        form.name.trim(),
      age:         Number(form.age),
      birthday:    form.birthday,
      fatherName:  form.fatherName.trim(),
      motherName:  form.motherName.trim(),
      profilePic:  profilePicPreview,
      id,
      roll:        '00', // recalculated on add
    });
  };

  return (
    <div className="tp-modal-overlay" onClick={onClose}>
      <div className="tp-modal" onClick={e => e.stopPropagation()}>
        {/* Header */}
        <div className="tp-modal-header" style={{ borderBottomColor: classColor }}>
          <h3 className="tp-modal-title">➕ Add New Student</h3>
          <button className="tp-modal-close" onClick={onClose} aria-label="Close">✕</button>
        </div>

        <form className="tp-modal-body" onSubmit={handleSubmit}>
          {/* Profile picture */}
          <div className="tp-pic-upload-area">
            <label htmlFor="tp-profile-pic" className="tp-pic-label">
              {profilePicPreview
                ? <img src={profilePicPreview} alt="Preview" className="tp-pic-preview" />
                : <div className="tp-pic-placeholder" style={{ borderColor: classColor }}>
                    <span className="tp-pic-icon">📷</span>
                    <p className="tp-pic-text">Upload Photo</p>
                    <p className="tp-pic-hint">Click to browse</p>
                  </div>
              }
            </label>
            <input
              id="tp-profile-pic"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              style={{ display: 'none' }}
            />
          </div>

          {/* Fields */}
          <div className="tp-form-grid">
            <div className="tp-form-group tp-form-full">
              <label className="tp-form-label">Full Name *</label>
              <input
                className={`tp-form-input${errors.name ? ' tp-input-error' : ''}`}
                type="text" placeholder="e.g. John Smith"
                value={form.name} onChange={e => handleChange('name', e.target.value)}
              />
              {errors.name && <span className="tp-form-error">{errors.name}</span>}
            </div>

            <div className="tp-form-group">
              <label className="tp-form-label">Age *</label>
              <input
                className={`tp-form-input${errors.age ? ' tp-input-error' : ''}`}
                type="number" placeholder="e.g. 12" min="1" max="25"
                value={form.age} onChange={e => handleChange('age', e.target.value)}
              />
              {errors.age && <span className="tp-form-error">{errors.age}</span>}
            </div>

            <div className="tp-form-group">
              <label className="tp-form-label">Date of Birth *</label>
              <input
                className={`tp-form-input${errors.birthday ? ' tp-input-error' : ''}`}
                type="date"
                value={form.birthday} onChange={e => handleChange('birthday', e.target.value)}
              />
              {errors.birthday && <span className="tp-form-error">{errors.birthday}</span>}
            </div>

            <div className="tp-form-group">
              <label className="tp-form-label">Father's Name *</label>
              <input
                className={`tp-form-input${errors.fatherName ? ' tp-input-error' : ''}`}
                type="text" placeholder="Father's full name"
                value={form.fatherName} onChange={e => handleChange('fatherName', e.target.value)}
              />
              {errors.fatherName && <span className="tp-form-error">{errors.fatherName}</span>}
            </div>

            <div className="tp-form-group">
              <label className="tp-form-label">Mother's Name *</label>
              <input
                className={`tp-form-input${errors.motherName ? ' tp-input-error' : ''}`}
                type="text" placeholder="Mother's full name"
                value={form.motherName} onChange={e => handleChange('motherName', e.target.value)}
              />
              {errors.motherName && <span className="tp-form-error">{errors.motherName}</span>}
            </div>
          </div>

          {/* Footer */}
          <div className="tp-modal-footer">
            <button type="button" className="tp-modal-cancel-btn" onClick={onClose}>Cancel</button>
            <button
              type="submit"
              className="tp-modal-submit-btn"
              style={{ background: classColor }}
              disabled={submitting}
            >
              {submitting ? 'Adding…' : 'Add Student'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────
   EditStudentModal — Full Profile Editor
   ────────────────────────────────────────── */
function EditStudentModal({ student, onClose, onSave, classColor }) {
  const [activeTab, setActiveTab] = useState('personal');
  const [form, setForm] = useState({
    name:        student.name        || '',
    age:         student.age         || '',
    birthday:    student.birthday    || '',
    gender:      student.gender      || '',
    bloodGroup:  student.bloodGroup  || '',
    phone:       student.phone       || '',
    address:     student.address     || '',
    fatherName:  student.fatherName  || '',
    fatherPhone: student.fatherPhone || '',
    motherName:  student.motherName  || '',
    motherPhone: student.motherPhone || '',
    guardianName:student.guardianName|| '',
    roll:        student.roll        || '',
    section:     student.section     || '',
    year:        student.year        || '',
    notes:       student.notes       || '',
  });
  const [profilePicPreview, setProfilePicPreview] = useState(student.profilePic || null);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: null }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => setProfilePicPreview(ev.target.result);
    reader.readAsDataURL(file);
  };

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = 'Full name is required';
    if (form.age && (isNaN(form.age) || Number(form.age) < 1 || Number(form.age) > 25))
      errs.age = 'Valid age required (1–25)';
    return errs;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); setActiveTab('personal'); return; }
    setSubmitting(true);
    setTimeout(() => {
      onSave({
        ...student,
        name:         form.name.trim(),
        age:          form.age ? Number(form.age) : undefined,
        birthday:     form.birthday,
        gender:       form.gender,
        bloodGroup:   form.bloodGroup,
        phone:        form.phone.trim(),
        address:      form.address.trim(),
        fatherName:   form.fatherName.trim(),
        fatherPhone:  form.fatherPhone.trim(),
        motherName:   form.motherName.trim(),
        motherPhone:  form.motherPhone.trim(),
        guardianName: form.guardianName.trim(),
        roll:         form.roll,
        section:      form.section.trim(),
        year:         form.year.trim(),
        notes:        form.notes.trim(),
        profilePic:   profilePicPreview,
      });
      setSubmitting(false);
    }, 320);
  };

  const tabs = [
    { id: 'personal',  label: '👤 Personal'  },
    { id: 'family',    label: '👨‍👩‍👧 Family'    },
    { id: 'academic',  label: '🎓 Academic'  },
  ];

  const Field = ({ label, field, type = 'text', placeholder = '', required = false, options }) => (
    <div className="es-field">
      <label className="es-label">{label}{required && <span style={{ color: '#ef4444' }}> *</span>}</label>
      {options ? (
        <select
          className={`es-input${errors[field] ? ' es-input-err' : ''}`}
          value={form[field]}
          onChange={e => handleChange(field, e.target.value)}
        >
          <option value="">— Select —</option>
          {options.map(o => <option key={o} value={o}>{o}</option>)}
        </select>
      ) : (
        <input
          className={`es-input${errors[field] ? ' es-input-err' : ''}`}
          type={type}
          placeholder={placeholder}
          value={form[field]}
          onChange={e => handleChange(field, e.target.value)}
        />
      )}
      {errors[field] && <span className="es-err">{errors[field]}</span>}
    </div>
  );

  return (
    <div className="tp-modal-overlay" onClick={onClose}>
      <div className="es-modal" onClick={e => e.stopPropagation()}>

        {/* ── Profile header ── */}
        <div className="es-header" style={{ background: `linear-gradient(135deg, ${classColor}dd, ${classColor}99)` }}>
          <button className="es-close-btn" onClick={onClose} aria-label="Close">✕</button>

          {/* Avatar upload */}
          <label htmlFor="es-photo-input" className="es-avatar-wrap">
            {profilePicPreview
              ? <img src={profilePicPreview} alt="Student" className="es-avatar-img" />
              : <div className="es-avatar-placeholder">
                  <span style={{ fontSize: 32 }}>{form.name.charAt(0) || '?'}</span>
                </div>
            }
            <div className="es-avatar-overlay">📷</div>
          </label>
          <input id="es-photo-input" type="file" accept="image/*" onChange={handleFileChange} style={{ display: 'none' }} />

          <div className="es-header-info">
            <p className="es-header-name">{form.name || 'Student Name'}</p>
            <p className="es-header-meta">ID: {student.id} &nbsp;·&nbsp; Roll: {student.roll}</p>
            {form.section && <p className="es-header-meta">{form.section}</p>}
          </div>
        </div>

        {/* ── Tabs ── */}
        <div className="es-tabs">
          {tabs.map(t => (
            <button
              key={t.id}
              className={`es-tab${activeTab === t.id ? ' es-tab-active' : ''}`}
              style={activeTab === t.id ? { borderBottomColor: classColor, color: classColor } : {}}
              onClick={() => setActiveTab(t.id)}
              type="button"
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* ── Form body ── */}
        <form className="es-body" onSubmit={handleSubmit}>

          {/* Personal tab */}
          {activeTab === 'personal' && (
            <div className="es-grid">
              <Field label="Full Name" field="name" placeholder="e.g. Aiden Brooks" required />
              <Field label="Roll Number" field="roll" placeholder="e.g. 01" />
              <Field label="Age" field="age" type="number" placeholder="e.g. 12" />
              <Field label="Date of Birth" field="birthday" type="date" />
              <Field label="Gender" field="gender" options={['Male', 'Female', 'Other']} />
              <Field label="Blood Group" field="bloodGroup" options={['A+','A−','B+','B−','AB+','AB−','O+','O−']} />
              <Field label="Phone / Contact" field="phone" placeholder="e.g. +1 555 0101" />
              <div className="es-field es-field-full">
                <label className="es-label">Home Address</label>
                <textarea
                  className="es-input es-textarea"
                  placeholder="Street, City, State"
                  value={form.address}
                  onChange={e => handleChange('address', e.target.value)}
                  rows={2}
                />
              </div>
            </div>
          )}

          {/* Family tab */}
          {activeTab === 'family' && (
            <div className="es-grid">
              <Field label="Father's Full Name" field="fatherName" placeholder="Father's name" />
              <Field label="Father's Phone" field="fatherPhone" placeholder="e.g. +1 555 0202" />
              <Field label="Mother's Full Name" field="motherName" placeholder="Mother's name" />
              <Field label="Mother's Phone" field="motherPhone" placeholder="e.g. +1 555 0303" />
              <Field label="Guardian's Name (if different)" field="guardianName" placeholder="Guardian's name" />
            </div>
          )}

          {/* Academic tab */}
          {activeTab === 'academic' && (
            <div className="es-grid">
              <Field label="Roll Number" field="roll" placeholder="e.g. 01" />
              <Field label="Section / Group" field="section" placeholder="e.g. Group A" />
              <Field label="Academic Year" field="year" placeholder="e.g. 2025–2026" />
              <div className="es-field es-field-full">
                <label className="es-label">Teacher's Notes</label>
                <textarea
                  className="es-input es-textarea"
                  placeholder="Notes about this student's progress, behaviour, etc."
                  value={form.notes}
                  onChange={e => handleChange('notes', e.target.value)}
                  rows={3}
                />
              </div>
            </div>
          )}

          {/* ── Footer ── */}
          <div className="es-footer">
            <button type="button" className="tp-modal-cancel-btn" onClick={onClose}>Cancel</button>
            <button
              type="submit"
              className="tp-modal-submit-btn"
              style={{ background: classColor }}
              disabled={submitting}
            >
              {submitting ? '✓ Saving…' : '💾 Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────
   StudentRoster – shows students of one class
   ────────────────────────────────────────── */
function StudentRoster({ classData, classIdx, onBack, onAddStudent, onDeleteStudents, groupName, onUpdateStudent, teachers, onAssignTeacher }) {
  const [showAddModal, setShowAddModal]   = useState(false);
  const [showAssignTeacherModal, setShowAssignTeacherModal] = useState(false);
  const [deleteMode, setDeleteMode]       = useState(false);
  const [selectedIds, setSelectedIds]     = useState(new Set());
  const [showConfirm, setShowConfirm]     = useState(false);
  const [activeMenuId, setActiveMenuId]   = useState(null);
  const [editingStudent, setEditingStudent] = useState(null);

  const classColor = CLASS_COLORS[(classData.classNum - 1) % CLASS_COLORS.length];

  const toggleSelect = (id) => {
    setSelectedIds(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const selectAll = () => setSelectedIds(new Set(classData.students.map(s => s.id)));
  const clearAll  = () => setSelectedIds(new Set());

  const handleDeleteConfirm = () => {
    onDeleteStudents(classIdx, [...selectedIds]);
    setSelectedIds(new Set());
    setDeleteMode(false);
    setShowConfirm(false);
  };

  const handleAddStudent = (student) => {
    onAddStudent(classIdx, student);
    setShowAddModal(false);
  };

  return (
    <>
      {/* Click-away backdrop for dropdown menus */}
      {activeMenuId && (
        <div
          style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 150 }}
          onClick={() => setActiveMenuId(null)}
        />
      )}

      {/* Edit Modal */}
      {editingStudent && (
        <EditStudentModal
          student={editingStudent}
          onClose={() => setEditingStudent(null)}
          onSave={(student) => {
            onUpdateStudent(classIdx, student);
            setEditingStudent(null);
          }}
          classColor={classColor}
        />
      )}

      {/* Add Modals */}
      {showAddModal && (
        <AddStudentModal
          onClose={() => setShowAddModal(false)}
          onAdd={handleAddStudent}
          classColor={classColor}
        />
      )}
      {showAssignTeacherModal && (
        <AssignTeacherModal
          onClose={() => setShowAssignTeacherModal(false)}
          teachers={teachers}
          assignedTeacherEmails={classData.groupTeachers?.[groupName] || []}
          onAssign={(teacherEmails) => {
            onAssignTeacher(classIdx, groupName, teacherEmails);
            setShowAssignTeacherModal(false);
          }}
          themeColor={classColor}
        />
      )}

      {/* Delete Confirm Modal */}
      {showConfirm && (
        <div className="tp-modal-overlay" onClick={() => setShowConfirm(false)}>
          <div className="tp-confirm-modal" onClick={e => e.stopPropagation()}>
            <div className="tp-confirm-icon">⚠️</div>
            <h3 className="tp-confirm-title">
              Delete {selectedIds.size} Student{selectedIds.size !== 1 ? 's' : ''}?
            </h3>
            <p className="tp-confirm-sub">
              This action cannot be undone. The selected student profile{selectedIds.size !== 1 ? 's' : ''} will be permanently removed.
            </p>
            <div className="tp-confirm-actions">
              <button className="tp-modal-cancel-btn" onClick={() => setShowConfirm(false)}>Cancel</button>
              <button className="tp-delete-exec-btn" onClick={handleDeleteConfirm}>Yes, Delete</button>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="tp-section-header">
        <button className="tp-back-btn" onClick={onBack}>
          <ChevronLeft /> Back to Groups
        </button>
        <h2 className="tp-section-title">{classData.className} — {groupName}</h2>
      </div>

      {/* Toolbar */}
      <div className="tp-roster-toolbar">
        <span className="tp-roster-badge">🎓 {classData.students.length} Students in {groupName}</span>
        <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
          <button
            className="tp-add-student-btn"
            style={{ background: classColor }}
            onClick={() => setShowAddModal(true)}
          >
            + Add Student
          </button>
          <button
            className="tp-add-student-btn"
            style={{ background: '#38b26e' }}
            onClick={() => setShowAssignTeacherModal(true)}
          >
            Assign Teacher
          </button>
        </div>
      </div>

      {/* Assigned teacher */}
      {classData.groupTeachers?.[groupName]?.length > 0 && (
        <div className="tp-detail-card" style={{ margin: '0 20px 16px', padding: '16px 18px', background: '#f8fafc' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 12 }}>
            <div className="tp-roster-avatar" style={{ width: 52, height: 52, background: classColor, fontSize: 18 }}>
              {teachers.find(t => t.email === classData.groupTeachers[groupName][0])?.name?.charAt(0) || 'T'}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <p style={{ margin: 0, fontSize: 15, fontWeight: 700, color: '#1f2937' }}>Assigned Teachers</p>
              <p style={{ margin: '4px 0 0', fontSize: 13, color: '#475569' }}>
                {classData.groupTeachers[groupName].length} teacher{classData.groupTeachers[groupName].length !== 1 ? 's' : ''}
              </p>
            </div>
            <span className="tp-badge" style={{ background: '#d1fae5', color: '#065f46' }}>Assigned</span>
          </div>
          <div style={{ display: 'grid', gap: 10 }}>
            {classData.groupTeachers[groupName].map((email) => {
              const teacher = teachers.find(t => t.email === email);
              return (
                <div key={email} style={{ display: 'flex', justifyContent: 'space-between', gap: 12, padding: '10px 12px', borderRadius: 12, background: '#fff', border: '1px solid #e2e8f0' }}>
                  <div style={{ minWidth: 0 }}>
                    <p style={{ margin: 0, fontSize: 14, fontWeight: 700, color: '#1f2937' }}>{teacher?.name || email}</p>
                    <p style={{ margin: '4px 0 0', fontSize: 12, color: '#475569' }}>{teacher?.subject || 'No subject assigned'}</p>
                  </div>
                  <span style={{ fontSize: 12, color: '#64748b', whiteSpace: 'nowrap' }}>{teacher?.email || ''}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Roster grid */}
      {classData.students.length === 0 ? (
        <div className="tp-roster-empty">
          <span>👥</span>
          <p>No students in {groupName} yet. Add the first student!</p>
        </div>
      ) : (
        <div className="tp-student-roster-grid">
          {classData.students.map((s, i) => {
            const isMenuOpen = activeMenuId === String(s.id);
            return (
              <div
                key={s.id}
                className={`tp-student-roster-card${deleteMode && selectedIds.has(s.id) ? ' tp-card-selected' : ''}${deleteMode ? ' tp-card-selectable' : ''}`}
                onClick={deleteMode ? () => toggleSelect(s.id) : undefined}
                style={{ paddingRight: deleteMode ? 16 : 44 }}
              >
                {/* Checkbox (delete mode) */}
                {deleteMode && (
                  <div className={`tp-roster-checkbox${selectedIds.has(s.id) ? ' tp-cb-checked' : ''}`}>
                    {selectedIds.has(s.id) ? '✓' : ''}
                  </div>
                )}

                {/* Avatar */}
                {s.profilePic
                  ? <img src={s.profilePic} alt={s.name} className="tp-roster-avatar-img" />
                  : <div className="tp-roster-avatar" style={{ background: classColor }}>{s.name.charAt(0)}</div>
                }

                {/* Student info */}
                <div className="tp-roster-info">
                  <p className="tp-roster-name">{s.name}</p>
                  <p className="tp-roster-id">ID: {s.id}</p>
                  <p className="tp-roster-roll">Roll No: {s.roll}</p>
                  {s.age      && <p className="tp-roster-meta">Age: {s.age}{s.birthday ? ` · DOB: ${s.birthday}` : ''}</p>}
                  {s.fatherName && <p className="tp-roster-meta">Father: {s.fatherName}</p>}
                  {s.motherName && <p className="tp-roster-meta">Mother: {s.motherName}</p>}
                </div>

                {/* Three-dot options (absolute, top-right of card) */}
                {!deleteMode && (
                  <>
                    <button
                      className="tp-roster-options-btn"
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveMenuId(isMenuOpen ? null : String(s.id));
                      }}
                      aria-label="Options"
                    >
                      ⋮
                    </button>

                    {isMenuOpen && (
                      <div
                        className="tp-dropdown-menu"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <button
                          type="button"
                          className="tp-dropdown-item"
                          onClick={(e) => {
                            e.stopPropagation();
                            setEditingStudent(s);
                            setActiveMenuId(null);
                          }}
                        >
                          ✏️ Edit Details
                        </button>
                      </div>
                    )}
                  </>
                )}

                {/* Card number badge */}
                <span className="tp-roster-num">#{String(i + 1).padStart(2, '0')}</span>
              </div>
            );
          })}
        </div>
      )}


      {/* ── Delete section ── */}
      <div className="tp-delete-section">
        {!deleteMode ? (
          <button
            className="tp-delete-toggle-btn"
            onClick={() => setDeleteMode(true)}
            disabled={classData.students.length === 0}
          >
            🗑️ Select Students to Delete
          </button>
        ) : (
          <div className="tp-delete-bar">
            <div className="tp-delete-bar-left">
              <span className="tp-delete-count">
                {selectedIds.size} of {classData.students.length} selected
              </span>
              <button className="tp-select-all-btn" onClick={selectedIds.size === classData.students.length ? clearAll : selectAll}>
                {selectedIds.size === classData.students.length ? 'Deselect All' : 'Select All'}
              </button>
            </div>
            <div className="tp-delete-bar-right">
              <button
                className="tp-delete-cancel-btn"
                onClick={() => { setDeleteMode(false); setSelectedIds(new Set()); }}
              >
                Cancel
              </button>
              <button
                className="tp-delete-exec-btn"
                disabled={selectedIds.size === 0}
                onClick={() => setShowConfirm(true)}
              >
                🗑️ Delete ({selectedIds.size})
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

/* ──────────────────────────────────────────
   AddTeacherModal
   ────────────────────────────────────────── */
function AddTeacherModal({ onClose, onAdd, themeColor }) {
  const [form, setForm] = useState({ name: '', subject: '', email: '', phone: '' });
  const [profilePicPreview, setProfilePicPreview] = useState(null);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: null }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => setProfilePicPreview(ev.target.result);
    reader.readAsDataURL(file);
  };

  const validate = () => {
    const errs = {};
    if (!form.name.trim())     errs.name    = 'Full name is required';
    if (!form.subject.trim())  errs.subject = 'Subject is required';
    if (!form.email.trim()) {
      errs.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      errs.email = 'Valid email is required';
    }
    if (!form.phone.trim())    errs.phone   = 'Phone number is required';
    return errs;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setSubmitting(true);
    onAdd({
      name:       form.name.trim(),
      subject:    form.subject.trim(),
      email:      form.email.trim().toLowerCase(),
      phone:      form.phone.trim(),
      profilePic: profilePicPreview,
    });
  };

  return (
    <div className="tp-modal-overlay" onClick={onClose}>
      <div className="tp-modal" onClick={e => e.stopPropagation()}>
        <div className="tp-modal-header" style={{ borderBottomColor: themeColor }}>
          <h3 className="tp-modal-title">➕ Add New Teacher</h3>
          <button className="tp-modal-close" onClick={onClose} aria-label="Close">✕</button>
        </div>

        <form className="tp-modal-body" onSubmit={handleSubmit}>
          {/* Profile Picture */}
          <div className="tp-pic-upload-area">
            <label htmlFor="tp-teacher-pic" className="tp-pic-label">
              {profilePicPreview
                ? <img src={profilePicPreview} alt="Preview" className="tp-pic-preview" />
                : <div className="tp-pic-placeholder" style={{ borderColor: themeColor }}>
                    <span className="tp-pic-icon">📷</span>
                    <p className="tp-pic-text">Upload Photo</p>
                    <p className="tp-pic-hint">Click to browse</p>
                  </div>
              }
            </label>
            <input
              id="tp-teacher-pic"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              style={{ display: 'none' }}
            />
          </div>

          {/* Form fields */}
          <div className="tp-form-grid">
            <div className="tp-form-group tp-form-full">
              <label className="tp-form-label">Full Name *</label>
              <input
                className={`tp-form-input${errors.name ? ' tp-input-error' : ''}`}
                type="text" placeholder="e.g. Mrs. Sarah Jenkins"
                value={form.name} onChange={e => handleChange('name', e.target.value)}
              />
              {errors.name && <span className="tp-form-error">{errors.name}</span>}
            </div>

            <div className="tp-form-group">
              <label className="tp-form-label">Subject *</label>
              <input
                className={`tp-form-input${errors.subject ? ' tp-input-error' : ''}`}
                type="text" placeholder="e.g. Mathematics"
                value={form.subject} onChange={e => handleChange('subject', e.target.value)}
              />
              {errors.subject && <span className="tp-form-error">{errors.subject}</span>}
            </div>

            <div className="tp-form-group">
              <label className="tp-form-label">Email Address *</label>
              <input
                className={`tp-form-input${errors.email ? ' tp-input-error' : ''}`}
                type="email" placeholder="e.g. s.jenkins@school.edu"
                value={form.email} onChange={e => handleChange('email', e.target.value)}
              />
              {errors.email && <span className="tp-form-error">{errors.email}</span>}
            </div>

            <div className="tp-form-group tp-form-full">
              <label className="tp-form-label">Phone Number *</label>
              <input
                className={`tp-form-input${errors.phone ? ' tp-input-error' : ''}`}
                type="text" placeholder="e.g. +1 (555) 019-2834"
                value={form.phone} onChange={e => handleChange('phone', e.target.value)}
              />
              {errors.phone && <span className="tp-form-error">{errors.phone}</span>}
            </div>
          </div>

          <div className="tp-modal-footer">
            <button type="button" className="tp-modal-cancel-btn" onClick={onClose}>Cancel</button>
            <button
              type="submit"
              className="tp-modal-submit-btn"
              style={{ background: themeColor }}
              disabled={submitting}
            >
              {submitting ? 'Adding…' : 'Add Teacher'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function AssignTeacherModal({ onClose, teachers, assignedTeacherEmails, onAssign, themeColor }) {
  const [selectedEmails, setSelectedEmails] = useState(assignedTeacherEmails || []);

  const toggleEmail = (email) => {
    setSelectedEmails((prev) => (
      prev.includes(email)
        ? prev.filter((item) => item !== email)
        : [...prev, email]
    ));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAssign(selectedEmails);
  };

  return (
    <div className="tp-modal-overlay" onClick={onClose}>
      <div className="tp-modal" onClick={e => e.stopPropagation()}>
        <div className="tp-modal-header" style={{ borderBottomColor: themeColor }}>
          <h3 className="tp-modal-title">👩‍🏫 Assign Class Teachers</h3>
          <button className="tp-modal-close" onClick={onClose} aria-label="Close">✕</button>
        </div>

        <form className="tp-modal-body" onSubmit={handleSubmit}>
          <div className="tp-form-grid" style={{ gridTemplateColumns: '1fr' }}>
            <div className="tp-form-group tp-form-full">
              <label className="tp-form-label">Select Teachers</label>
              <div style={{ display: 'grid', gap: 10, marginTop: 8 }}>
                {teachers.map((t) => {
                  const selected = selectedEmails.includes(t.email);
                  return (
                    <label
                      key={t.email}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 10,
                        padding: '10px 12px',
                        borderRadius: 12,
                        border: '1px solid #e2e8f0',
                        background: selected ? '#eff6ff' : '#fff',
                        cursor: 'pointer',
                      }}
                    >
                      <input
                        type="checkbox"
                        checked={selected}
                        onChange={() => toggleEmail(t.email)}
                        style={{ width: 16, height: 16, margin: 0 }}
                      />
                      <div style={{ minWidth: 0 }}>
                        <p style={{ margin: 0, fontSize: 14, fontWeight: 700 }}>{t.name}</p>
                        <p style={{ margin: '3px 0 0', fontSize: 13, color: '#475569' }}>{t.subject}</p>
                      </div>
                    </label>
                  );
                })}
              </div>
            </div>
          </div>

          <div style={{ marginTop: 12, color: '#64748b', fontSize: 13 }}>
            Select one or more teachers for this class group.
          </div>

          <div className="tp-modal-footer">
            <button type="button" className="tp-modal-cancel-btn" onClick={onClose}>Cancel</button>
            <button type="submit" className="tp-modal-submit-btn" style={{ background: themeColor }}>
              Save Assignment
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────
   AddRoutineModal
   ────────────────────────────────────────── */
function AddRoutineModal({ onClose, onAdd, classColor }) {
  const [day, setDay] = useState('Monday');
  const [subject, setSubject] = useState('');
  const [time, setTime] = useState('');
  const [room, setRoom] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!subject.trim()) { setError('Subject is required'); return; }
    onAdd({ day, subject: subject.trim(), time: time.trim(), room: room.trim() });
  };

  return (
    <div className="tp-modal-overlay" onClick={onClose}>
      <div className="tp-modal" onClick={e => e.stopPropagation()}>
        <div className="tp-modal-header" style={{ borderBottomColor: classColor }}>
          <h3 className="tp-modal-title">➕ Add Routine Item</h3>
          <button className="tp-modal-close" onClick={onClose} aria-label="Close">✕</button>
        </div>
        <form className="tp-modal-body" onSubmit={handleSubmit}>
          <div className="tp-form-grid">
            <div className="tp-form-group">
              <label className="tp-form-label">Day</label>
              <select className="tp-form-input" value={day} onChange={e => setDay(e.target.value)}>
                <option>Monday</option>
                <option>Tuesday</option>
                <option>Wednesday</option>
                <option>Thursday</option>
                <option>Friday</option>
                <option>Saturday</option>
              </select>
            </div>
            <div className="tp-form-group">
              <label className="tp-form-label">Subject</label>
              <input className={`tp-form-input${error ? ' tp-input-error' : ''}`} value={subject} onChange={e => { setSubject(e.target.value); if (error) setError(''); }} />
            </div>
            <div className="tp-form-group">
              <label className="tp-form-label">Time</label>
              <input className="tp-form-input" value={time} onChange={e => setTime(e.target.value)} placeholder="e.g. 8:00 – 9:30 AM" />
            </div>
            <div className="tp-form-group">
              <label className="tp-form-label">Room</label>
              <input className="tp-form-input" value={room} onChange={e => setRoom(e.target.value)} placeholder="e.g. Room 101" />
            </div>
          </div>
          {error && <div className="tp-form-error" style={{ marginTop: 8 }}>{error}</div>}
          <div className="tp-modal-footer">
            <button type="button" className="tp-modal-cancel-btn" onClick={onClose}>Cancel</button>
            <button type="submit" className="tp-modal-submit-btn" style={{ background: classColor }}>Add</button>
          </div>
        </form>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────
   RoutineGroupView
   ────────────────────────────────────────── */
function RoutineGroupView({ classData, classIdx, groupName, onBack, onAddRoutine, onDeleteRoutine, currentTeacherEmail }) {
  const classColor = CLASS_COLORS[(classData.classNum - 1) % CLASS_COLORS.length];
  const routines = classData.routines?.[groupName] || [];
  const isHead = classData.groupHeadTeachers?.[groupName] === currentTeacherEmail;
  const [showAdd, setShowAdd] = useState(false);

  return (
    <>
      {showAdd && (
        <AddRoutineModal
          onClose={() => setShowAdd(false)}
          onAdd={(item) => { onAddRoutine(classIdx, groupName, item); setShowAdd(false); }}
          classColor={classColor}
        />
      )}

      <div className="tp-section-header">
        <button className="tp-back-btn" onClick={onBack}><ChevronLeft /> Back to Groups</button>
        <h2 className="tp-section-title">{classData.className} — {groupName} Routine</h2>
      </div>

      <div style={{ margin: '12px 20px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ color: '#6b7280' }}>{routines.length} slot{routines.length !== 1 ? 's' : ''}</div>
        {isHead && (
          <button className="tp-add-student-btn" style={{ background: classColor }} onClick={() => setShowAdd(true)}>+ Add Routine</button>
        )}
      </div>

      <div style={{ padding: '16px 20px' }}>
        {routines.length === 0 ? (
          <div className="tp-roster-empty"><span>📭</span><p>No routine items yet.</p></div>
        ) : (
          <div style={{ display: 'grid', gap: 10 }}>
            {routines.map((r, idx) => (
              <div key={idx} className="tp-detail-card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <p style={{ margin: 0, fontWeight: 700 }}>{r.subject}</p>
                  <p style={{ margin: '6px 0 0', color: '#6b7280' }}>{r.day} · {r.time} · {r.room}</p>
                </div>
                {isHead && (
                  <button className="tp-delete-exec-btn" onClick={() => onDeleteRoutine(classIdx, groupName, idx)}>Delete</button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}


/* ──────────────────────────────────────────
   TeacherRoster – shows list of teachers + add + delete selection
   ────────────────────────────────────────── */
function TeacherRoster({ teachers, onAddTeacher, onDeleteTeachers }) {
  const [showAddModal, setShowAddModal] = useState(false);
  const [deleteMode, setDeleteMode]     = useState(false);
  const [selectedEmails, setSelectedEmails] = useState(new Set());
  const [showConfirm, setShowConfirm]   = useState(false);

  const themeColor = '#38b26e'; // Teacher section green

  const toggleSelect = (email) => {
    setSelectedEmails(prev => {
      const next = new Set(prev);
      next.has(email) ? next.delete(email) : next.add(email);
      return next;
    });
  };

  const selectAll = () => setSelectedEmails(new Set(teachers.map(t => t.email)));
  const clearAll  = () => setSelectedEmails(new Set());

  const handleDeleteConfirm = () => {
    onDeleteTeachers([...selectedEmails]);
    setSelectedEmails(new Set());
    setDeleteMode(false);
    setShowConfirm(false);
  };

  const handleAddTeacher = (teacher) => {
    onAddTeacher(teacher);
    setShowAddModal(false);
  };

  return (
    <>
      {/* Add Modal */}
      {showAddModal && (
        <AddTeacherModal
          onClose={() => setShowAddModal(false)}
          onAdd={handleAddTeacher}
          themeColor={themeColor}
        />
      )}

      {/* Delete Confirm Modal */}
      {showConfirm && (
        <div className="tp-modal-overlay" onClick={() => setShowConfirm(false)}>
          <div className="tp-confirm-modal" onClick={e => e.stopPropagation()}>
            <div className="tp-confirm-icon">⚠️</div>
            <h3 className="tp-confirm-title">
              Delete {selectedEmails.size} Teacher{selectedEmails.size !== 1 ? 's' : ''}?
            </h3>
            <p className="tp-confirm-sub">
              This action cannot be undone. The selected teacher profile{selectedEmails.size !== 1 ? 's' : ''} will be permanently removed.
            </p>
            <div className="tp-confirm-actions">
              <button className="tp-modal-cancel-btn" onClick={() => setShowConfirm(false)}>Cancel</button>
              <button className="tp-delete-exec-btn" onClick={handleDeleteConfirm}>Yes, Delete</button>
            </div>
          </div>
        </div>
      )}

      {/* Toolbar */}
      <div className="tp-roster-toolbar">
        <span className="tp-roster-badge" style={{ background: 'linear-gradient(135deg, #e8f5e9 0%, #c8e6c9 100%)', color: '#2e7d32', borderColor: '#a5d6a7' }}>
          👨‍🏫 {teachers.length} Teachers Directory
        </span>
        <button
          className="tp-add-student-btn"
          style={{ background: themeColor }}
          onClick={() => setShowAddModal(true)}
        >
          + Add Teacher
        </button>
      </div>

      {/* Grid */}
      {teachers.length === 0 ? (
        <div className="tp-roster-empty">
          <span>👥</span>
          <p>No teachers yet. Add the first teacher!</p>
        </div>
      ) : (
        <div className="tp-detail-grid">
          {teachers.map((t) => (
            <div
              key={t.email}
              className={`tp-detail-card${deleteMode && selectedEmails.has(t.email) ? ' tp-card-selected' : ''}${deleteMode ? ' tp-card-selectable' : ''}`}
              onClick={deleteMode ? () => toggleSelect(t.email) : undefined}
            >
              {deleteMode && (
                <div className={`tp-roster-checkbox${selectedEmails.has(t.email) ? ' tp-cb-checked' : ''}`} style={{ marginBottom: 12 }}>
                  {selectedEmails.has(t.email) ? '✓' : ''}
                </div>
              )}
              
              <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 12 }}>
                {t.profilePic ? (
                  <img src={t.profilePic} alt={t.name} className="tp-roster-avatar-img" style={{ width: 44, height: 44 }} />
                ) : (
                  <div className="tp-roster-avatar" style={{ background: themeColor, width: 44, height: 44, fontSize: 16 }}>
                    {t.name.replace(/^(Mr\.|Mrs\.|Ms\.|Dr\.|Prof\.)\s+/i, '').charAt(0)}
                  </div>
                )}
                <div>
                  <p className="tp-detail-name" style={{ margin: 0 }}>{t.name}</p>
                  <span className="tp-badge" style={{ background: themeColor, fontSize: 11, padding: '3px 8px', borderRadius: 6, display: 'inline-block', marginTop: 4 }}>
                    {t.subject}
                  </span>
                </div>
              </div>

              <div style={{ borderTop: '1px solid #f1f5f9', paddingTop: 10, marginTop: 4 }}>
                <p className="tp-detail-email" style={{ fontSize: 12.5, color: '#475569', display: 'flex', alignItems: 'center', gap: 6, margin: '0 0 4px' }}>
                  📧 {t.email}
                </p>
                {t.phone && (
                  <p className="tp-detail-email" style={{ fontSize: 12.5, color: '#475569', display: 'flex', alignItems: 'center', gap: 6, margin: 0 }}>
                    📞 {t.phone}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Delete bar */}
      <div className="tp-delete-section">
        {!deleteMode ? (
          <button
            className="tp-delete-toggle-btn"
            onClick={() => setDeleteMode(true)}
            disabled={teachers.length === 0}
          >
            🗑️ Select Teachers to Delete
          </button>
        ) : (
          <div className="tp-delete-bar">
            <div className="tp-delete-bar-left">
              <span className="tp-delete-count">
                {selectedEmails.size} of {teachers.length} selected
              </span>
              <button className="tp-select-all-btn" onClick={selectedEmails.size === teachers.length ? clearAll : selectAll}>
                {selectedEmails.size === teachers.length ? 'Deselect All' : 'Select All'}
              </button>
            </div>
            <div className="tp-delete-bar-right">
              <button
                className="tp-delete-cancel-btn"
                onClick={() => { setDeleteMode(false); setSelectedEmails(new Set()); }}
              >
                Cancel
              </button>
              <button
                className="tp-delete-exec-btn"
                disabled={selectedEmails.size === 0}
                onClick={() => setShowConfirm(true)}
              >
                🗑️ Delete ({selectedEmails.size})
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

/* ──────────────────────────────────────────
   Detail Content
   ────────────────────────────────────────── */
function DetailContent({
  section,
  selectedClass,
  onSelectClass,
  onBackFromClass,
  classes,
  onAddStudent,
  onDeleteStudents,
  teachers,
  onAddTeacher,
  onDeleteTeachers,
  onAddClass,
  selectedGroup,
  onSelectGroup,
  onBackFromGroup,
  onAddGroup,
  onDeleteGroups,
  onUpdateStudent,
  onAssignTeacher,
  onAssignGroupHeadTeacher,
  selectedRoutineClass,
  onSelectRoutineClass,
  onBackFromRoutineClass,
  selectedRoutineGroup,
  onSelectRoutineGroup,
  onBackFromRoutineGroup,
  onAddRoutine,
  onDeleteRoutine,
  currentTeacherEmail,
}) {
  const [showAddClassModal, setShowAddClassModal] = useState(false);

  /* ── STUDENTS: three-level (class list → group list → roster) ── */
  if (section === 'students') {
    if (selectedClass !== null) {
      if (selectedGroup !== null) {
        const currentGroup = classes[selectedClass].groups[selectedGroup];
        const filteredClassData = {
          ...classes[selectedClass],
          students: classes[selectedClass].students.filter(s => s.group === currentGroup)
        };
        return (
          <StudentRoster
            classData={filteredClassData}
            classIdx={selectedClass}
            groupName={currentGroup}
            onBack={onBackFromGroup}
            onAddStudent={(classIdx, student) => onAddStudent(classIdx, student, currentGroup)}
            onDeleteStudents={onDeleteStudents}
            onUpdateStudent={onUpdateStudent}
            teachers={teachers}
            onAssignTeacher={onAssignTeacher}
          />
        );
      }
      return (
        <GroupRoster
          classData={classes[selectedClass]}
          classIdx={selectedClass}
          onBack={onBackFromClass}
          onSelectGroup={onSelectGroup}
          onAddGroup={onAddGroup}
          onDeleteGroups={onDeleteGroups}
          teachers={teachers}
          onAssignGroupHeadTeacher={onAssignGroupHeadTeacher}
        />
      );
    }
    return (
      <>
        {showAddClassModal && (
          <AddClassModal
            onClose={() => setShowAddClassModal(false)}
            onAdd={(className) => {
              onAddClass(className);
              setShowAddClassModal(false);
            }}
          />
        )}
        <div className="tp-class-grid">
          {classes.map((cls, idx) => (
            <button
              key={cls.classNum}
              className="tp-class-card"
              onClick={() => onSelectClass(idx)}
              style={{ '--cls-color': CLASS_COLORS[idx % CLASS_COLORS.length] }}
            >
              <div className="tp-class-card-num" style={{ background: CLASS_COLORS[idx % CLASS_COLORS.length] }}>
                {getClassAbbrev(cls, idx)}
              </div>
              <div className="tp-class-card-body">
                <p className="tp-class-card-title">{cls.className}</p>
                <p className="tp-class-card-count">{cls.students.length} Students</p>
              </div>
              <div className="tp-class-card-arrow"><ChevronRight /></div>
            </button>
          ))}

          <button
            className="tp-class-card tp-class-card-add"
            onClick={() => setShowAddClassModal(true)}
            style={{
              borderStyle: 'dashed',
              borderWidth: '2px',
              borderColor: '#cbd5e1',
              background: '#f8fafc',
              justifyContent: 'center',
              height: '100%',
              minHeight: '88px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#64748b', fontWeight: 600 }}>
              <span style={{ fontSize: '20px' }}>➕</span> Add Custom Class
            </div>
          </button>
        </div>
      </>
    );
  }

  if (section === 'teachers') return (
    <TeacherRoster
      teachers={teachers}
      onAddTeacher={onAddTeacher}
      onDeleteTeachers={onDeleteTeachers}
    />
  );

  if (section === 'exam') return <ExamResultView classes={classes} />;

  if (section === 'routine') {
    if (selectedRoutineClass !== null) {
      const classData = classes[selectedRoutineClass];
      if (selectedRoutineGroup !== null) {
        const groupName = classData.groups[selectedRoutineGroup];
        return (
          <RoutineGroupView
            classData={classData}
            classIdx={selectedRoutineClass}
            groupName={groupName}
            onBack={onBackFromRoutineGroup}
            onAddRoutine={onAddRoutine}
            onDeleteRoutine={onDeleteRoutine}
            currentTeacherEmail={currentTeacherEmail}
          />
        );
      }
      return (
        <GroupRoster
          classData={classData}
          classIdx={selectedRoutineClass}
          onBack={onBackFromRoutineClass}
          onSelectGroup={onSelectRoutineGroup}
          onAddGroup={onAddGroup}
          onDeleteGroups={onDeleteGroups}
          teachers={teachers}
          onAssignGroupHeadTeacher={onAssignGroupHeadTeacher}
        />
      );
    }

    return (
      <>
        {showAddClassModal && (
          <AddClassModal
            onClose={() => setShowAddClassModal(false)}
            onAdd={(className) => {
              onAddClass(className);
              setShowAddClassModal(false);
            }}
          />
        )}
        <div className="tp-class-grid">
          {classes.map((cls, idx) => (
            <button
              key={cls.classNum}
              className="tp-class-card"
              onClick={() => onSelectRoutineClass(idx)}
              style={{ '--cls-color': CLASS_COLORS[idx % CLASS_COLORS.length] }}
            >
              <div className="tp-class-card-num" style={{ background: CLASS_COLORS[idx % CLASS_COLORS.length] }}>
                {getClassAbbrev(cls, idx)}
              </div>
              <div className="tp-class-card-body">
                <p className="tp-class-card-title">{cls.className}</p>
                <p className="tp-class-card-count">{cls.students.length} Students</p>
              </div>
              <div className="tp-class-card-arrow"><ChevronRight /></div>
            </button>
          ))}

          <button
            className="tp-class-card tp-class-card-add"
            onClick={() => setShowAddClassModal(true)}
            style={{
              borderStyle: 'dashed',
              borderWidth: '2px',
              borderColor: '#cbd5e1',
              background: '#f8fafc',
              justifyContent: 'center',
              height: '100%',
              minHeight: '88px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#64748b', fontWeight: 600 }}>
              <span style={{ fontSize: '20px' }}>➕</span> Add Custom Class
            </div>
          </button>
        </div>
      </>
    );
  }

  if (section === 'fees') return (
    <div className="tp-detail-grid">
      {feeData.map((f) => (
        <div key={f.name} className="tp-detail-card">
          <div className="tp-detail-card-row">
            <div>
              <p className="tp-detail-name">{f.name}</p>
              <Badge color={f.status === 'Paid' ? '#0ea5a4' : '#ef4444'} label={f.status} />
            </div>
            <span className="tp-detail-amount">{f.amount}</span>
          </div>
        </div>
      ))}
    </div>
  );

  return null;
}

/* ══════════════════════════════════════════
   Main Component
   ══════════════════════════════════════════ */
export default function TeacherPanel() {
  const { user, signOut } = useAuth();
  const [activeNav, setActiveNav]         = useState('home');
  const [activeSection, setActiveSection] = useState(null);
  const [selectedClass, setSelectedClass] = useState(null);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [selectedRoutineClass, setSelectedRoutineClass] = useState(null);
  const [selectedRoutineGroup, setSelectedRoutineGroup] = useState(null);
  const [menuOpen, setMenuOpen]           = useState(false);

  /* Stateful class roster — supports add & delete */
  const [classes, setClasses] = useState(() =>
    classSections.map(c => {
      const defaultGroups = ['Group A', 'Group B', 'Group C'];
      const studentsWithGroup = c.students.map((s, idx) => ({
        ...s,
        group: defaultGroups[idx % defaultGroups.length]
      }));
      return {
        ...c,
        groups: defaultGroups,
        students: studentsWithGroup,
        groupTeachers: {},
        groupHeadTeachers: {},
        routines: {},
      };
    })
  );

  /* Stateful teacher roster — supports add & delete */
  const [teachers, setTeachers] = useState(() =>
    teacherProfiles.map(t => ({ ...t }))
  );

  const handleAddTeacher = (newTeacher) => {
    setTeachers(prev => [...prev, newTeacher]);
  };

  const handleDeleteTeachers = (emails) => {
    const emailSet = new Set(emails);
    setTeachers(prev => prev.filter(t => !emailSet.has(t.email)));
  };

  const handleAddStudent = (classIdx, student, groupName) => {
    setClasses(prev => prev.map((cls, i) => {
      if (i !== classIdx) return cls;
      const newRoll = String(cls.students.length + 1).padStart(2, '0');
      return { ...cls, students: [...cls.students, { ...student, roll: newRoll, group: groupName }] };
    }));
  };

  const handleAddRoutine = (classIdx, groupName, routineItem) => {
    setClasses(prev => prev.map((cls, i) => {
      if (i !== classIdx) return cls;
      const existing = cls.routines || {};
      const groupRoutines = existing[groupName] || [];
      return {
        ...cls,
        routines: {
          ...existing,
          [groupName]: [...groupRoutines, routineItem],
        },
      };
    }));
  };

  const handleDeleteRoutine = (classIdx, groupName, itemIndex) => {
    setClasses(prev => prev.map((cls, i) => {
      if (i !== classIdx) return cls;
      const existing = cls.routines || {};
      const groupRoutines = existing[groupName] || [];
      return {
        ...cls,
        routines: {
          ...existing,
          [groupName]: groupRoutines.filter((_, idx) => idx !== itemIndex),
        },
      };
    }));
  };

  const handleAssignTeacher = (classIdx, groupName, teacherEmails) => {
    setClasses(prev => prev.map((cls, i) => {
      if (i !== classIdx) return cls;
      return {
        ...cls,
        groupTeachers: {
          ...cls.groupTeachers,
          [groupName]: Array.isArray(teacherEmails) ? [...new Set(teacherEmails)] : [teacherEmails],
        },
      };
    }));
  };

  const handleAssignGroupHeadTeacher = (classIdx, groupName, teacherEmail) => {
    setClasses(prev => prev.map((cls, i) => {
      if (i !== classIdx) return cls;
      return {
        ...cls,
        groupHeadTeachers: {
          ...cls.groupHeadTeachers,
          [groupName]: teacherEmail || '',
        },
      };
    }));
  };

  const handleDeleteStudents = (classIdx, ids) => {
    const idSet = new Set(ids);
    setClasses(prev => prev.map((cls, i) => {
      if (i !== classIdx) return cls;
      const remaining = cls.students
        .filter(s => !idSet.has(s.id))
        .map((s, j) => ({ ...s, roll: String(j + 1).padStart(2, '0') }));
      return { ...cls, students: remaining };
    }));
  };

  const handleUpdateStudent = (classIdx, updatedStudent) => {
    setClasses(prev => prev.map((cls, i) => {
      if (i !== classIdx) return cls;
      const updatedStudents = cls.students.map(s => 
        s.id === updatedStudent.id ? updatedStudent : s
      );
      return { ...cls, students: updatedStudents };
    }));
  };

  const handleAddClass = (className) => {
    setClasses(prev => {
      const maxNum = prev.reduce((max, c) => Math.max(max, c.classNum || 0), 0);
      return [
        ...prev,
        {
          className,
          classNum: maxNum + 1,
          groups: ['Group A', 'Group B', 'Group C'],
          students: [],
          groupTeachers: {},
          groupHeadTeachers: {},
          routines: {},
        }
      ];
    });
  };

  const handleAddGroup = (classIdx, groupName) => {
    setClasses(prev => prev.map((cls, i) => {
      if (i !== classIdx) return cls;
      const groups = cls.groups || [];
      if (groups.includes(groupName)) return cls;
      return {
        ...cls,
        groups: [...groups, groupName],
        routines: {
          ...cls.routines,
          [groupName]: [],
        },
      };
    }));
  };

  const handleDeleteGroups = (classIdx, groupNames) => {
    const groupSet = new Set(groupNames);
    setClasses(prev => prev.map((cls, i) => {
      if (i !== classIdx) return cls;
      const remainingGroups = (cls.groups || []).filter(g => !groupSet.has(g));
      const remainingStudents = cls.students.filter(s => !groupSet.has(s.group));
      const remainingGroupHeadTeachers = { ...cls.groupHeadTeachers };
      const remainingRoutines = { ...cls.routines };
      groupNames.forEach((name) => {
        delete remainingGroupHeadTeachers[name];
        delete remainingRoutines[name];
      });
      return { ...cls, groups: remainingGroups, students: remainingStudents, groupHeadTeachers: remainingGroupHeadTeachers, routines: remainingRoutines };
    }));
  };

  const isHome     = activeNav === 'home';
  const inSection  = isHome && activeSection !== null;
  const sectionMeta = menuItems.find((m) => m.id === activeSection);

  const handleCardClick   = (id) => { setActiveSection(id); setSelectedClass(null); setSelectedGroup(null); };
  const handleBack        = ()   => { setActiveSection(null); setSelectedClass(null); setSelectedGroup(null); };
  const handleNavClick    = (id) => { setActiveNav(id); setActiveSection(null); setSelectedClass(null); setSelectedGroup(null); };

  const handleSidebarNav = (id) => {
    if (id === 'home') { setActiveSection(null); setActiveNav('home'); setSelectedClass(null); setSelectedGroup(null); setSelectedRoutineClass(null); setSelectedRoutineGroup(null); }
    else { setActiveSection(id); setActiveNav('home'); setSelectedClass(null); setSelectedGroup(null); setSelectedRoutineClass(null); setSelectedRoutineGroup(null); }
  };

  const selectedProfile = {
    userId: user?.userId,
    name: user?.name,
    role: user?.role,
  };

  const studentRecords = classes.flatMap((cls) => cls.students.map((s) => ({
    ...s,
    role: 'student',
    className: cls.className,
    classNum: cls.classNum,
  })));

  const selectedProfileDetails = selectedProfile.role === 'teacher'
    ? teachers.find((t) => {
        const idMatch = String(t.email || '').toLowerCase() === String(selectedProfile.userId || '').toLowerCase();
        const nameMatch = String(t.name || '').toLowerCase() === String(selectedProfile.name || '').toLowerCase();
        return idMatch || nameMatch;
      }) || null
    : studentRecords.find((s) => {
        const idMatch = String(s.id || '').toLowerCase() === String(selectedProfile.userId || '').toLowerCase();
        const nameMatch = String(s.name || '').toLowerCase() === String(selectedProfile.name || '').toLowerCase();
        return idMatch || nameMatch;
      }) || null;

  const currentTeacherProfile = selectedProfile.role === 'teacher'
    ? teachers.find((t) => {
        const normalizedUserId = String(selectedProfile.userId || '').toLowerCase();
        return String(t.email || '').toLowerCase() === normalizedUserId
          || String(t.name || '').toLowerCase() === String(selectedProfile.name || '').toLowerCase();
      }) || null
    : null;

  const currentTeacherEmail = currentTeacherProfile?.email || '';

  const activeSidebarId = activeSection ?? (activeNav !== 'home' ? activeNav : 'home');

  const selectedRoutineClassData = selectedRoutineClass !== null ? classes[selectedRoutineClass] : null;

  return (
    <div className="tp-shell">

      {/* ════════════════════════════════
          MOBILE DRAWER OVERLAY
          ════════════════════════════════ */}
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

      {/* ════════════════════════════════
          DESKTOP SIDEBAR
          ════════════════════════════════ */}
      <aside className="tp-sidebar">
        {/* Brand */}
        <div className="tp-sidebar-brand">
          <img src={greenfieldLogo} alt="School logo" className="tp-sidebar-crest" />
          <span className="tp-sidebar-school">Greenfield<br />International School</span>
        </div>

        {/* Nav */}
        <nav className="tp-sidebar-nav">
          <button
            className={`tp-sidebar-nav-item${activeSidebarId === 'home' ? ' active' : ''}`}
            onClick={() => handleSidebarNav('home')}
          >
            <SBHomeIcon /> Home
          </button>

          {menuItems.map((item) => (
            <button
              key={item.id}
              className={`tp-sidebar-nav-item${activeSidebarId === item.id ? ' active' : ''}`}
              onClick={() => handleSidebarNav(item.id)}
            >
              <item.SBIcon /> {item.title}
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

      {/* ════════════════════════════════
          MAIN CONTENT
          ════════════════════════════════ */}
      <main className="tp-main">

        {/* ── Top bar ── */}
        {activeNav !== 'profile' && (
          <div className="tp-topbar">
            {/* Mobile: hamburger */}
            <button className="tp-icon-btn tp-hamburger" onClick={() => setMenuOpen(true)} aria-label="Menu">
              <HamburgerIcon />
            </button>

            {/* Desktop: greeting in topbar */}
            <div className="tp-topbar-greeting">
              <h2>{getGreeting()}</h2>
              <p>Learn &nbsp;•&nbsp; Grow &nbsp;•&nbsp; Succeed</p>
            </div>

            <div className="tp-topbar-right">
              <div className="tp-bell-wrap">
                <button className="tp-icon-btn" aria-label="Notifications">
                  <BellIcon />
                </button>
                <div className="tp-bell-dot" />
              </div>
            </div>
          </div>
        )}

        {/* ── HOME: section detail view ── */}
        {inSection && (
          <>
            {/* Only show the outer section header when NOT drilling into a class roster */}
            {!(activeSection === 'students' && selectedClass !== null) && (
              <div className="tp-section-header">
                <button className="tp-back-btn" onClick={handleBack}>
                  <ChevronLeft /> Back
                </button>
                <h2 className="tp-section-title">{sectionMeta?.title}</h2>
              </div>
            )}
            <DetailContent
              section={activeSection}
              selectedClass={selectedClass}
              onSelectClass={(idx) => setSelectedClass(idx)}
              onBackFromClass={() => { setSelectedClass(null); setSelectedGroup(null); }}
              classes={classes}
              onAddStudent={handleAddStudent}
              onDeleteStudents={handleDeleteStudents}
              teachers={teachers}
              onAddTeacher={handleAddTeacher}
              onDeleteTeachers={handleDeleteTeachers}
              onAddClass={handleAddClass}
              selectedGroup={selectedGroup}
              onSelectGroup={(idx) => setSelectedGroup(idx)}
              onBackFromGroup={() => setSelectedGroup(null)}
              onAssignTeacher={handleAssignTeacher}
              onAssignGroupHeadTeacher={handleAssignGroupHeadTeacher}
              onAddGroup={handleAddGroup}
              onDeleteGroups={handleDeleteGroups}
              onUpdateStudent={handleUpdateStudent}
                selectedRoutineClass={selectedRoutineClass}
                onSelectRoutineClass={(idx) => setSelectedRoutineClass(idx)}
                onBackFromRoutineClass={() => { setSelectedRoutineClass(null); setSelectedRoutineGroup(null); }}
                selectedRoutineGroup={selectedRoutineGroup}
                onSelectRoutineGroup={(idx) => setSelectedRoutineGroup(idx)}
                onBackFromRoutineGroup={() => setSelectedRoutineGroup(null)}
                onAddRoutine={handleAddRoutine}
                onDeleteRoutine={handleDeleteRoutine}
                currentTeacherEmail={currentTeacherEmail}
            />
          </>
        )}

        {/* ── HOME: menu overview ── */}
        {isHome && !inSection && (
          <>
            {/* Hero */}
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

            {/* School silhouette (mobile / tablet only) */}
            <div className="tp-silhouette-wrap">
              <img src={schoolSilhouette} alt="" />
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

        {/* ── User profile page ── */}
        {!isHome && activeNav === 'profile' && (
          <div className="tp-profile-page">
            <div className="tp-detail-grid tp-detail-grid--single">
              <div className="tp-profile-card">
                <div className="tp-profile-header">
                  <div className="tp-profile-avatar" style={{ background: '#38b26e' }}>
                    {selectedProfileDetails?.profilePic ? (
                      <img src={selectedProfileDetails.profilePic} alt={selectedProfile.name} className="tp-profile-avatar-img" />
                    ) : (
                      <span>{(selectedProfile?.name || user?.name || 'U').charAt(0)}</span>
                    )}
                  </div>
                  <div>
                    <p className="tp-profile-name">{selectedProfile?.name || user?.name || 'User'}</p>
                    <p className="tp-profile-role">
                      {selectedProfile.role === 'teacher'
                        ? selectedProfileDetails?.subject || 'Teacher'
                        : selectedProfile.role === 'student'
                          ? selectedProfileDetails?.className ? `${selectedProfileDetails.className} Student` : 'Student'
                          : selectedProfile.role?.charAt(0).toUpperCase() + String(selectedProfile.role || '').slice(1)}
                    </p>
                    <p className="tp-profile-email">📧 {selectedProfileDetails?.email || selectedProfile.userId || 'N/A'}</p>
                  </div>
                </div>

                <div className="tp-profile-details-grid">
                  <div className="tp-profile-detail-row">
                    <span className="tp-profile-detail-label">Full name</span>
                    <span className="tp-profile-detail-value">{selectedProfile?.name || 'N/A'}</span>
                  </div>
                  <div className="tp-profile-detail-row">
                    <span className="tp-profile-detail-label">Account ID</span>
                    <span className="tp-profile-detail-value">{selectedProfile?.userId || 'N/A'}</span>
                  </div>
                  <div className="tp-profile-detail-row">
                    <span className="tp-profile-detail-label">Email</span>
                    <span className="tp-profile-detail-value">{selectedProfileDetails?.email || `${selectedProfile?.userId || 'N/A'}@greenfield.edu`}</span>
                  </div>
                  <div className="tp-profile-detail-row">
                    <span className="tp-profile-detail-label">Role</span>
                    <span className="tp-profile-detail-value">{selectedProfile?.role?.charAt(0).toUpperCase() + String(selectedProfile?.role || '').slice(1)}</span>
                  </div>
                  <div className="tp-profile-detail-row">
                    <span className="tp-profile-detail-label">Subject / Class</span>
                    <span className="tp-profile-detail-value">
                      {selectedProfile.role === 'teacher'
                        ? selectedProfileDetails?.subject || 'Not assigned'
                        : selectedProfileDetails?.className || 'Not assigned'}
                    </span>
                  </div>
                  <div className="tp-profile-detail-row">
                    <span className="tp-profile-detail-label">Phone / Roll</span>
                    <span className="tp-profile-detail-value">
                      {selectedProfile.role === 'teacher'
                        ? selectedProfileDetails?.phone || 'Not provided'
                        : selectedProfileDetails?.roll || 'Not available'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── Non-home placeholder pages ── */}
        {!isHome && activeNav !== 'profile' && (
          <div className="tp-placeholder">
            <div className="tp-placeholder-emoji">
              {activeNav === 'notice' ? '📢' : activeNav === 'calendar' ? '📅' : activeNav === 'messages' ? '💬' : '👤'}
            </div>
            <p className="tp-placeholder-title">
              {navItems.find((n) => n.id === activeNav)?.label}
            </p>
            <p className="tp-placeholder-sub">Coming soon</p>
          </div>
        )}

      </main>

      {/* ════════════════════════════════
          MOBILE BOTTOM NAV
          ════════════════════════════════ */}
      <nav className="tp-bottom-nav">
        {navItems.map((nav) => {
          const active = activeNav === nav.id;
          return (
            <button
              key={nav.id}
              className="tp-nav-item"
              onClick={() => handleNavClick(nav.id)}
              aria-label={nav.label}
            >
              <nav.Icon active={active} />
              <span className="tp-nav-label" style={{ color: active ? '#2563eb' : '#94a3b8' }}>
                {nav.label}
              </span>
            </button>
          );
        })}
      </nav>

    </div>
  );
}
