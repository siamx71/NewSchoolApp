import { useState, useMemo } from 'react';

/* ─────────────────────────────────────────────────────────────
   Student Results Data with Father's Name
   ───────────────────────────────────────────────────────────── */
const STUDENT_RESULTS_DATA = [
  // Class 1 Students
  { class: 'Class 1', roll: '01', name: 'Aiden Brooks', fatherName: 'James Brooks', marks: 85, subject: 'Mathematics', status: 'Pass', grade: 'A' },
  { class: 'Class 1', roll: '01', name: 'Aiden Brooks', fatherName: 'James Brooks', marks: 78, subject: 'English', status: 'Pass', grade: 'B' },
  { class: 'Class 1', roll: '01', name: 'Aiden Brooks', fatherName: 'James Brooks', marks: 92, subject: 'Science', status: 'Pass', grade: 'A+' },
  
  { class: 'Class 1', roll: '02', name: 'Lily Turner', fatherName: 'Michael Turner', marks: 88, subject: 'Mathematics', status: 'Pass', grade: 'A' },
  { class: 'Class 1', roll: '02', name: 'Lily Turner', fatherName: 'Michael Turner', marks: 81, subject: 'English', status: 'Pass', grade: 'A' },
  { class: 'Class 1', roll: '02', name: 'Lily Turner', fatherName: 'Michael Turner', marks: 89, subject: 'Science', status: 'Pass', grade: 'A' },
  
  { class: 'Class 1', roll: '03', name: 'Noah Garcia', fatherName: 'Carlos Garcia', marks: 72, subject: 'Mathematics', status: 'Pass', grade: 'B' },
  { class: 'Class 1', roll: '03', name: 'Noah Garcia', fatherName: 'Carlos Garcia', marks: 75, subject: 'English', status: 'Pass', grade: 'B' },
  { class: 'Class 1', roll: '03', name: 'Noah Garcia', fatherName: 'Carlos Garcia', marks: 68, subject: 'Science', status: 'Pass', grade: 'C' },
  
  // Class 2 Students
  { class: 'Class 2', roll: '01', name: 'Ethan Brown', fatherName: 'Robert Brown', marks: 90, subject: 'Mathematics', status: 'Pass', grade: 'A+' },
  { class: 'Class 2', roll: '01', name: 'Ethan Brown', fatherName: 'Robert Brown', marks: 85, subject: 'English', status: 'Pass', grade: 'A' },
  { class: 'Class 2', roll: '01', name: 'Ethan Brown', fatherName: 'Robert Brown', marks: 88, subject: 'Science', status: 'Pass', grade: 'A' },
  
  { class: 'Class 2', roll: '02', name: 'Sophia Lee', fatherName: 'David Lee', marks: 80, subject: 'Mathematics', status: 'Pass', grade: 'A' },
  { class: 'Class 2', roll: '02', name: 'Sophia Lee', fatherName: 'David Lee', marks: 82, subject: 'English', status: 'Pass', grade: 'A' },
  { class: 'Class 2', roll: '02', name: 'Sophia Lee', fatherName: 'David Lee', marks: 79, subject: 'Science', status: 'Pass', grade: 'B' },
  
  { class: 'Class 2', roll: '03', name: 'Mason Taylor', fatherName: 'John Taylor', marks: 65, subject: 'Mathematics', status: 'Pass', grade: 'C' },
  { class: 'Class 2', roll: '03', name: 'Mason Taylor', fatherName: 'John Taylor', marks: 70, subject: 'English', status: 'Pass', grade: 'B' },
  { class: 'Class 2', roll: '03', name: 'Mason Taylor', fatherName: 'John Taylor', marks: 62, subject: 'Science', status: 'Pass', grade: 'C' },
  
  // Class 3 Students
  { class: 'Class 3', roll: '01', name: 'Jackson Walker', fatherName: 'William Walker', marks: 87, subject: 'Mathematics', status: 'Pass', grade: 'A' },
  { class: 'Class 3', roll: '01', name: 'Jackson Walker', fatherName: 'William Walker', marks: 84, subject: 'English', status: 'Pass', grade: 'A' },
  { class: 'Class 3', roll: '01', name: 'Jackson Walker', fatherName: 'William Walker', marks: 91, subject: 'Science', status: 'Pass', grade: 'A+' },
  
  { class: 'Class 3', roll: '02', name: 'Charlotte Hall', fatherName: 'Edward Hall', marks: 93, subject: 'Mathematics', status: 'Pass', grade: 'A+' },
  { class: 'Class 3', roll: '02', name: 'Charlotte Hall', fatherName: 'Edward Hall', marks: 89, subject: 'English', status: 'Pass', grade: 'A' },
  { class: 'Class 3', roll: '02', name: 'Charlotte Hall', fatherName: 'Edward Hall', marks: 95, subject: 'Science', status: 'Pass', grade: 'A+' },
  
  { class: 'Class 3', roll: '03', name: 'Sebastian Allen', fatherName: 'Christopher Allen', marks: 58, subject: 'Mathematics', status: 'Fail', grade: 'F' },
  { class: 'Class 3', roll: '03', name: 'Sebastian Allen', fatherName: 'Christopher Allen', marks: 64, subject: 'English', status: 'Pass', grade: 'C' },
  { class: 'Class 3', roll: '03', name: 'Sebastian Allen', fatherName: 'Christopher Allen', marks: 61, subject: 'Science', status: 'Pass', grade: 'C' },
  
  // Class 4 Students
  { class: 'Class 4', roll: '01', name: 'William Scott', fatherName: 'Patrick Scott', marks: 82, subject: 'Mathematics', status: 'Pass', grade: 'A' },
  { class: 'Class 4', roll: '01', name: 'William Scott', fatherName: 'Patrick Scott', marks: 80, subject: 'English', status: 'Pass', grade: 'A' },
  { class: 'Class 4', roll: '01', name: 'William Scott', fatherName: 'Patrick Scott', marks: 85, subject: 'Science', status: 'Pass', grade: 'A' },
  
  { class: 'Class 4', roll: '02', name: 'Avery Green', fatherName: 'Stephen Green', marks: 76, subject: 'Mathematics', status: 'Pass', grade: 'B' },
  { class: 'Class 4', roll: '02', name: 'Avery Green', fatherName: 'Stephen Green', marks: 77, subject: 'English', status: 'Pass', grade: 'B' },
  { class: 'Class 4', roll: '02', name: 'Avery Green', fatherName: 'Stephen Green', marks: 73, subject: 'Science', status: 'Pass', grade: 'B' },
  
  // Class 5 Students
  { class: 'Class 5', roll: '01', name: 'Alexander Mitchell', fatherName: 'Thomas Mitchell', marks: 89, subject: 'Mathematics', status: 'Pass', grade: 'A' },
  { class: 'Class 5', roll: '01', name: 'Alexander Mitchell', fatherName: 'Thomas Mitchell', marks: 86, subject: 'English', status: 'Pass', grade: 'A' },
  { class: 'Class 5', roll: '01', name: 'Alexander Mitchell', fatherName: 'Thomas Mitchell', marks: 90, subject: 'Science', status: 'Pass', grade: 'A+' },
  
  { class: 'Class 5', roll: '02', name: 'Ella Perez', fatherName: 'Miguel Perez', marks: 78, subject: 'Mathematics', status: 'Pass', grade: 'B' },
  { class: 'Class 5', roll: '02', name: 'Ella Perez', fatherName: 'Miguel Perez', marks: 81, subject: 'English', status: 'Pass', grade: 'A' },
  { class: 'Class 5', roll: '02', name: 'Ella Perez', fatherName: 'Miguel Perez', marks: 74, subject: 'Science', status: 'Pass', grade: 'B' },
];

/* ─────────────────────────────────────────────────────────────
   Status Badge Component
   ───────────────────────────────────────────────────────────── */
const StatusBadge = ({ status }) => {
  const colors = {
    'Pass': { bg: '#d1fae5', text: '#065f46', border: '#6ee7b7' },
    'Fail': { bg: '#fee2e2', text: '#7f1d1d', border: '#fca5a5' },
  };
  const style = colors[status] || { bg: '#f3f4f6', text: '#374151', border: '#d1d5db' };
  
  return (
    <span style={{
      display: 'inline-block',
      padding: '4px 12px',
      borderRadius: '20px',
      background: style.bg,
      color: style.text,
      fontSize: '12px',
      fontWeight: '600',
      border: `1px solid ${style.border}`,
    }}>
      {status}
    </span>
  );
};

/* ─────────────────────────────────────────────────────────────
   Grade Badge Component
   ───────────────────────────────────────────────────────────── */
const GradeBadge = ({ grade }) => {
  const gradeColors = {
    'A+': '#7c3aed',
    'A': '#2563eb',
    'B': '#0284c7',
    'C': '#f59e0b',
    'F': '#ef4444',
  };
  
  return (
    <span style={{
      display: 'inline-block',
      padding: '4px 10px',
      borderRadius: '4px',
      background: gradeColors[grade] || '#6b7280',
      color: '#fff',
      fontSize: '13px',
      fontWeight: '700',
      minWidth: '32px',
      textAlign: 'center',
    }}>
      {grade}
    </span>
  );
};

const getSubjectResults = (student, className) => {
  const seed = `${className}-${student.roll || '00'}-${student.name || 'student'}`.split('').reduce((sum, char) => sum + char.charCodeAt(0), 0);
  const subjects = [
    { subject: 'Mathematics', base: 60 },
    { subject: 'English', base: 58 },
    { subject: 'Science', base: 62 },
  ];

  return subjects.map((item) => {
    const marks = Math.min(100, item.base + (seed % 20) + (item.subject.length % 8));
    let grade = 'C';
    let status = 'Pass';

    if (marks >= 90) {
      grade = 'A+';
    } else if (marks >= 80) {
      grade = 'A';
    } else if (marks >= 70) {
      grade = 'B';
    } else if (marks >= 60) {
      grade = 'C';
    } else {
      grade = 'F';
      status = 'Fail';
    }

    return {
      subject: item.subject,
      marks,
      status,
      grade,
    };
  });
};

/* ═════════════════════════════════════════════════════════════
   Main Component
   ═════════════════════════════════════════════════════════════ */
export default function ExamResultView({ classes = [] }) {
  // Search & Filter States
  const [searchClass, setSearchClass] = useState('');
  const [searchRoll, setSearchRoll] = useState('');
  const [searchFatherName, setSearchFatherName] = useState('');
  const [searchGroup, setSearchGroup] = useState('');
  const [selectedStudentKey, setSelectedStudentKey] = useState(null);
  const [showEntryForm, setShowEntryForm] = useState(false);
  const [editingResultKey, setEditingResultKey] = useState(null);
  const [entryMeta, setEntryMeta] = useState({
    class: '',
    roll: '',
    name: '',
    fatherName: '',
    group: '',
  });
  const [entryRows, setEntryRows] = useState([
    { id: `${Date.now()}-1`, subject: 'Mathematics', marks: '' },
  ]);
  const [enteredResults, setEnteredResults] = useState([]);

  const getGradeFromMarks = (marks) => {
    if (marks >= 90) return 'A+';
    if (marks >= 80) return 'A';
    if (marks >= 70) return 'B';
    if (marks >= 60) return 'C';
    return 'F';
  };

  const classOptions = classes.map(c => c.className);
  const selectedClassGroups = classes.find(c => c.className === entryMeta.class)?.groups || [];
  const searchClassGroups = classes.find(c => c.className === searchClass)?.groups || [];

  const handleEntryMetaChange = (field) => (event) => {
    setEntryMeta(prev => ({ ...prev, [field]: event.target.value }));
  };

  const handleClassChange = (event) => {
    const selectedClass = event.target.value;
    const classObject = classes.find(c => c.className === selectedClass);
    setEntryMeta(prev => ({
      ...prev,
      class: selectedClass,
      group: classObject?.groups?.[0] || '',
    }));
  };

  const handleRowChange = (rowId, field) => (event) => {
    setEntryRows(prev => prev.map(row => row.id === rowId ? { ...row, [field]: event.target.value } : row));
  };

  const addEntryRow = () => {
    setEntryRows(prev => [
      ...prev,
      { id: `${Date.now()}-${prev.length + 1}`, subject: 'Mathematics', marks: '' },
    ]);
  };

  const cloneEntryRow = (rowId) => {
    setEntryRows(prev => {
      const row = prev.find(r => r.id === rowId);
      if (!row) return prev;
      return [
        ...prev,
        { id: `${Date.now()}-${prev.length + 1}`, subject: row.subject, marks: row.marks },
      ];
    });
  };

  const removeEntryRow = (rowId) => {
    setEntryRows(prev => prev.length > 1 ? prev.filter(row => row.id !== rowId) : prev);
  };

  const handleEditResult = (resultKey) => {
    const result = enteredResults.find(r => r.key === resultKey);
    if (!result) return;
    setEditingResultKey(resultKey);
    setEntryMeta({
      class: result.class,
      roll: result.roll,
      name: result.name,
      fatherName: result.fatherName,
      group: result.group,
    });
    setEntryRows([{ id: `${Date.now()}-edit`, subject: result.subject, marks: String(result.marks) }]);
    setShowEntryForm(true);
  };

  const resetEntryForm = () => {
    setEditingResultKey(null);
    setEntryMeta({ class: '', roll: '', name: '', fatherName: '', group: '' });
    setEntryRows([{ id: `${Date.now()}-1`, subject: 'Mathematics', marks: '' }]);
  };

  const handleAddResult = (event) => {
    event.preventDefault();
    if (!entryMeta.class.trim() || !entryMeta.roll.trim() || !entryMeta.name.trim()) {
      return;
    }

    const validRows = entryRows.filter(row => row.subject.trim() && row.marks.trim());
    if (validRows.length === 0) {
      return;
    }

    if (editingResultKey) {
      const row = validRows[0];
      const marks = parseInt(row.marks, 10);
      if (Number.isNaN(marks)) return;
      const grade = getGradeFromMarks(marks);
      const status = grade === 'F' ? 'Fail' : 'Pass';
      setEnteredResults(prev => prev.map(result => result.key === editingResultKey ? {
        ...result,
        class: entryMeta.class,
        roll: entryMeta.roll,
        name: entryMeta.name,
        fatherName: entryMeta.fatherName || 'N/A',
        group: entryMeta.group || 'N/A',
        subject: row.subject,
        marks,
        status,
        grade,
      } : result));
    } else {
      const newRows = validRows.map(row => {
        const marks = parseInt(row.marks, 10);
        const grade = getGradeFromMarks(marks);
        const status = grade === 'F' ? 'Fail' : 'Pass';
        return {
          class: entryMeta.class,
          roll: entryMeta.roll,
          name: entryMeta.name,
          fatherName: entryMeta.fatherName || 'N/A',
          group: entryMeta.group || 'N/A',
          subject: row.subject,
          marks,
          status,
          grade,
          key: `${entryMeta.class}-${entryMeta.roll}-${entryMeta.name}-${row.subject}-${Date.now()}-${Math.random()}`,
        };
      });
      setEnteredResults(prev => [...prev, ...newRows]);
    }

    resetEntryForm();
    setShowEntryForm(false);
    setEditingResultKey(null);
    setSelectedStudentKey(null);
  };

  // Get unique classes and prepare sorted data
  const uniqueClasses = useMemo(() => {
    const classNames = (classes || []).map(cls => cls.className).filter(Boolean);
    if (classNames.length > 0) return [...new Set(classNames)].sort();
    return [...new Set(STUDENT_RESULTS_DATA.map(d => d.class))].sort();
  }, [classes]);

  // Group results by student
  const studentResults = useMemo(() => {
    const grouped = {};

    const addStudent = (student, className) => {
      const key = `${className}-${student.roll || '00'}-${student.name}`;
      if (!grouped[key]) {
        grouped[key] = {
          key,
          class: className,
          roll: student.roll || '00',
          name: student.name,
          fatherName: student.fatherName || 'N/A',
          group: student.group || 'N/A',
          subjects: [],
        };
      }

      grouped[key].subjects = getSubjectResults(student, className);
    };

    if (Array.isArray(classes) && classes.length > 0) {
      classes.forEach((cls) => {
        (cls.students || []).forEach((student) => addStudent(student, cls.className));
      });
    } else {
      STUDENT_RESULTS_DATA.forEach((result) => {
        const key = `${result.class}-${result.roll}-${result.name}`;
        if (!grouped[key]) {
          grouped[key] = {
            key,
            class: result.class,
            roll: result.roll,
            name: result.name,
            fatherName: result.fatherName,
            group: 'N/A',
            subjects: [],
          };
        }
        grouped[key].subjects.push({
          subject: result.subject,
          marks: result.marks,
          status: result.status,
          grade: result.grade,
        });
      });
    }

    enteredResults.forEach((result) => {
      const key = `${result.class}-${result.roll}-${result.name}`;
      if (!grouped[key]) {
        grouped[key] = {
          key,
          class: result.class,
          roll: result.roll,
          name: result.name,
          fatherName: result.fatherName,
          group: result.group || 'N/A',
          subjects: [],
        };
      }
      grouped[key].subjects.push({
        subject: result.subject,
        marks: result.marks,
        status: result.status,
        grade: result.grade,
        resultKey: result.key,
      });
    });

    return Object.values(grouped);
  }, [classes, enteredResults]);

  // Filter based on search criteria
  const filteredResults = useMemo(() => {
    return studentResults.filter(student => {
      const classMatch = !searchClass || student.class.toLowerCase().includes(searchClass.toLowerCase());
      const rollMatch = !searchRoll || student.roll === searchRoll;
      const fatherMatch = !searchFatherName || student.fatherName.toLowerCase().includes(searchFatherName.toLowerCase());
      const groupMatch = !searchGroup || student.group.toLowerCase().includes(searchGroup.toLowerCase());
      return classMatch && rollMatch && fatherMatch && groupMatch;
    });
  }, [studentResults, searchClass, searchRoll, searchFatherName, searchGroup]);

  const handleReset = () => {
    setSearchClass('');
    setSearchRoll('');
    setSearchFatherName('');
    setSearchGroup('');
    setSelectedStudentKey(null);
  };

  const selectedStudent = useMemo(() => {
    return filteredResults.find(student => student.key === selectedStudentKey) || null;
  }, [filteredResults, selectedStudentKey]);

  const renderEntrySection = () => (
    <div style={{
      background: '#f8fafc',
      padding: '24px',
      borderRadius: '12px',
      marginBottom: '24px',
      border: '1px solid #e2e8f0',
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '16px',
      }}>
        <div>
          <h3 style={{ margin: 0, fontSize: '16px', fontWeight: '700', color: '#1a2e4a' }}>✏️ Enter Student Result</h3>
          <p style={{ margin: '6px 0 0', color: '#64748b', fontSize: '13px' }}>Add marks for multiple subjects in one submission.</p>
        </div>
        <button
          type="button"
          onClick={() => {
            setShowEntryForm(false);
            resetEntryForm();
          }}
          style={{
            padding: '8px 14px',
            fontSize: '13px',
            fontWeight: '600',
            background: '#f1f5f9',
            color: '#475569',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
          }}
        >
          Cancel
        </button>
      </div>

      <form onSubmit={handleAddResult}>
        <div style={{ display: 'grid', gap: '16px', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '6px', color: '#475569', fontSize: '12px', fontWeight: '700', textTransform: 'uppercase' }}>Class</label>
            <select value={entryMeta.class} onChange={handleClassChange} style={{ width: '100%', padding: '10px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', background: '#fff', cursor: 'pointer' }}>
              <option value="">Select class</option>
              {classOptions.map((cls) => (
                <option key={cls} value={cls}>{cls}</option>
              ))}
            </select>
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '6px', color: '#475569', fontSize: '12px', fontWeight: '700', textTransform: 'uppercase' }}>Roll Number</label>
            <input value={entryMeta.roll} onChange={handleEntryMetaChange('roll')} placeholder="Roll number" style={{ width: '100%', padding: '10px 12px', borderRadius: '6px', border: '1px solid #cbd5e1' }} />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '6px', color: '#475569', fontSize: '12px', fontWeight: '700', textTransform: 'uppercase' }}>Student Name</label>
            <input value={entryMeta.name} onChange={handleEntryMetaChange('name')} placeholder="Student name" style={{ width: '100%', padding: '10px 12px', borderRadius: '6px', border: '1px solid #cbd5e1' }} />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '6px', color: '#475569', fontSize: '12px', fontWeight: '700', textTransform: 'uppercase' }}>Father's Name</label>
            <input value={entryMeta.fatherName} onChange={handleEntryMetaChange('fatherName')} placeholder="Father's name" style={{ width: '100%', padding: '10px 12px', borderRadius: '6px', border: '1px solid #cbd5e1' }} />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '6px', color: '#475569', fontSize: '12px', fontWeight: '700', textTransform: 'uppercase' }}>Group</label>
            <select value={entryMeta.group} onChange={handleEntryMetaChange('group')} style={{ width: '100%', padding: '10px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', background: '#fff', cursor: 'pointer' }}>
              <option value="">Select group</option>
              {selectedClassGroups.map((group) => (
                <option key={group} value={group}>{group}</option>
              ))}
            </select>
          </div>
        </div>

        <div style={{ marginTop: '24px', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '20px', background: '#ffffff' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h4 style={{ margin: 0, fontSize: '15px', fontWeight: '700', color: '#1a2e4a' }}>Subject Rows</h4>
            <button
              type="button"
              onClick={addEntryRow}
              style={{
                padding: '8px 14px',
                fontSize: '13px',
                fontWeight: '600',
                background: '#2563eb',
                color: '#fff',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
              }}
            >
              Add Subject
            </button>
          </div>

          {entryRows.map((row, index) => (
            <div key={row.id} style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr 1fr', gap: '12px', alignItems: 'end', marginBottom: '14px' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '6px', color: '#475569', fontSize: '12px', fontWeight: '700', textTransform: 'uppercase' }}>Subject</label>
                <select value={row.subject} onChange={handleRowChange(row.id, 'subject')} style={{ width: '100%', padding: '10px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', background: '#fff', cursor: 'pointer' }}>
                  <option>Mathematics</option>
                  <option>English</option>
                  <option>Science</option>
                  <option>History</option>
                  <option>Geography</option>
                  <option>Computer Science</option>
                </select>
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '6px', color: '#475569', fontSize: '12px', fontWeight: '700', textTransform: 'uppercase' }}>Marks</label>
                <input value={row.marks} onChange={handleRowChange(row.id, 'marks')} type="number" min="0" max="100" placeholder="Marks" style={{ width: '100%', padding: '10px 12px', borderRadius: '6px', border: '1px solid #cbd5e1' }} />
              </div>
              <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                <button
                  type="button"
                  onClick={() => cloneEntryRow(row.id)}
                  style={{
                    padding: '10px 12px',
                    borderRadius: '8px',
                    border: '1px solid #cbd5e1',
                    background: '#eef2ff',
                    color: '#3730a3',
                    cursor: 'pointer',
                    fontWeight: '600',
                  }}
                >
                  Clone
                </button>
                {entryRows.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeEntryRow(row.id)}
                    style={{
                      padding: '10px 12px',
                      borderRadius: '8px',
                      border: '1px solid #f1f5f9',
                      background: '#f8fafc',
                      color: '#475569',
                      cursor: 'pointer',
                      fontWeight: '600',
                    }}
                  >
                    Remove
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        <div style={{ marginTop: '18px', display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
          <button type="button" onClick={() => {
            setShowEntryForm(false);
            resetEntryForm();
          }} style={{ padding: '10px 16px', borderRadius: '8px', border: '1px solid #cbd5e1', background: '#fff', color: '#475569', cursor: 'pointer' }}>Cancel</button>
          <button type="submit" style={{ padding: '10px 16px', borderRadius: '8px', border: 'none', background: '#2563eb', color: '#fff', cursor: 'pointer', fontWeight: '700' }}>{editingResultKey ? 'Save Change' : 'Save Result'}</button>
        </div>
      </form>
    </div>
  );

  /* ─────────────────────────────────────────────────────────────
     Render: Search Panel
     ───────────────────────────────────────────────────────────── */
  const renderSearchPanel = () => (
    <div style={{
      background: '#f8fafc',
      padding: '24px',
      borderRadius: '12px',
      marginBottom: '24px',
      border: '1px solid #e2e8f0',
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '16px',
      }}>
        <h3 style={{
          margin: 0,
          fontSize: '16px',
          fontWeight: '700',
          color: '#1a2e4a',
        }}>
          🔍 Search Student Results
        </h3>
        <button
          onClick={handleReset}
          style={{
            padding: '6px 14px',
            fontSize: '12px',
            fontWeight: '600',
            background: '#e0e7ff',
            color: '#4f46e5',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            transition: 'all 0.3s',
          }}
          onMouseEnter={e => e.target.style.background = '#c7d2fe'}
          onMouseLeave={e => e.target.style.background = '#e0e7ff'}
        >
          Reset Filters
        </button>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
        gap: '16px',
      }}>
        {/* Class Search */}
        <div>
          <label style={{
            display: 'block',
            fontSize: '12px',
            fontWeight: '700',
            color: '#475569',
            marginBottom: '6px',
            textTransform: 'uppercase',
          }}>
            Class Name
          </label>
          <select
            value={searchClass}
            onChange={e => {
              setSearchClass(e.target.value);
              setSearchGroup('');
            }}
            style={{
              width: '100%',
              padding: '10px 12px',
              fontSize: '14px',
              borderRadius: '6px',
              border: '1px solid #cbd5e1',
              background: '#fff',
              color: '#1a2e4a',
              fontWeight: '500',
              cursor: 'pointer',
              transition: 'border-color 0.3s',
            }}
            onFocus={e => e.target.style.borderColor = '#2563eb'}
            onBlur={e => e.target.style.borderColor = '#cbd5e1'}
          >
            <option value="">Select a class</option>
            {classOptions.map(cls => (
              <option key={cls} value={cls}>{cls}</option>
            ))}
          </select>
        </div>

        {/* Roll Number Search */}
        <div>
          <label style={{
            display: 'block',
            fontSize: '12px',
            fontWeight: '700',
            color: '#475569',
            marginBottom: '6px',
            textTransform: 'uppercase',
          }}>
            Roll Number
          </label>
          <input
            type="text"
            placeholder="e.g., 01, 02"
            value={searchRoll}
            onChange={e => setSearchRoll(e.target.value)}
            style={{
              width: '100%',
              padding: '10px 12px',
              fontSize: '14px',
              borderRadius: '6px',
              border: '1px solid #cbd5e1',
              background: '#fff',
              color: '#1a2e4a',
              fontWeight: '500',
              transition: 'border-color 0.3s',
            }}
            onFocus={e => e.target.style.borderColor = '#2563eb'}
            onBlur={e => e.target.style.borderColor = '#cbd5e1'}
          />
        </div>

        {/* Father's Name Search */}
        <div>
          <label style={{
            display: 'block',
            fontSize: '12px',
            fontWeight: '700',
            color: '#475569',
            marginBottom: '6px',
            textTransform: 'uppercase',
          }}>
            Father's Name
          </label>
          <input
            type="text"
            placeholder="Search by father's name"
            value={searchFatherName}
            onChange={e => setSearchFatherName(e.target.value)}
            style={{
              width: '100%',
              padding: '10px 12px',
              fontSize: '14px',
              borderRadius: '6px',
              border: '1px solid #cbd5e1',
              background: '#fff',
              color: '#1a2e4a',
              fontWeight: '500',
              transition: 'border-color 0.3s',
            }}
            onFocus={e => e.target.style.borderColor = '#2563eb'}
            onBlur={e => e.target.style.borderColor = '#cbd5e1'}
          />
        </div>

        {/* Group Search */}
        <div>
          <label style={{
            display: 'block',
            fontSize: '12px',
            fontWeight: '700',
            color: '#475569',
            marginBottom: '6px',
            textTransform: 'uppercase',
          }}>
            Group
          </label>
          <select
            value={searchGroup}
            onChange={e => setSearchGroup(e.target.value)}
            style={{
              width: '100%',
              padding: '10px 12px',
              fontSize: '14px',
              borderRadius: '6px',
              border: '1px solid #cbd5e1',
              background: '#fff',
              color: '#1a2e4a',
              fontWeight: '500',
              cursor: 'pointer',
              transition: 'border-color 0.3s',
            }}
            onFocus={e => e.target.style.borderColor = '#2563eb'}
            onBlur={e => e.target.style.borderColor = '#cbd5e1'}
            disabled={!searchClass}
          >
            <option value="">Select a group</option>
            {searchClassGroups.map(group => (
              <option key={group} value={group}>{group}</option>
            ))}
          </select>
        </div>
      </div>

      <div style={{
        marginTop: '14px',
        fontSize: '13px',
        color: '#64748b',
        fontWeight: '500',
      }}>
        Showing <strong>{filteredResults.length}</strong> student{filteredResults.length !== 1 ? 's' : ''}
      </div>
    </div>
  );

  /* ─────────────────────────────────────────────────────────────
     Render: Student List
     ───────────────────────────────────────────────────────────── */
  const renderStudentList = () => (
    <div style={{ overflowX: 'auto' }}>
      <table style={{
        width: '100%',
        borderCollapse: 'collapse',
        background: '#fff',
        borderRadius: '8px',
        overflow: 'hidden',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
      }}>
        <thead>
          <tr style={{ background: '#f1f5f9', borderBottom: '2px solid #e2e8f0' }}>
            <th style={{
              padding: '14px 16px',
              textAlign: 'left',
              fontSize: '12px',
              fontWeight: '700',
              color: '#475569',
              textTransform: 'uppercase',
            }}>Student Name</th>
            <th style={{
              padding: '14px 16px',
              textAlign: 'left',
              fontSize: '12px',
              fontWeight: '700',
              color: '#475569',
              textTransform: 'uppercase',
            }}>Roll Number</th>
            <th style={{
              padding: '14px 16px',
              textAlign: 'left',
              fontSize: '12px',
              fontWeight: '700',
              color: '#475569',
              textTransform: 'uppercase',
            }}>Father's Name</th>
            <th style={{
              padding: '14px 16px',
              textAlign: 'left',
              fontSize: '12px',
              fontWeight: '700',
              color: '#475569',
              textTransform: 'uppercase',
            }}>Group</th>
          </tr>
        </thead>
        <tbody>
          {filteredResults.length === 0 ? (
            <tr>
              <td colSpan="3" style={{
                padding: '40px 16px',
                textAlign: 'center',
                color: '#94a3b8',
                fontSize: '14px',
              }}>
                📭 No student found. Try adjusting your search filters.
              </td>
            </tr>
          ) : (
            filteredResults.map(student => (
              <tr
                key={student.key}
                onClick={() => setSelectedStudentKey(student.key)}
                style={{
                  borderBottom: '1px solid #f1f5f9',
                  background: '#fff',
                  cursor: 'pointer',
                  transition: 'background-color 0.2s',
                }}
                onMouseEnter={e => e.currentTarget.style.backgroundColor = '#f8fafc'}
                onMouseLeave={e => e.currentTarget.style.backgroundColor = '#fff'}
              >
                <td style={{
                  padding: '14px 16px',
                  color: '#2563eb',
                  fontSize: '14px',
                  fontWeight: '700',
                }}>
                  {student.name}
                </td>
                <td style={{
                  padding: '14px 16px',
                  color: '#1a2e4a',
                  fontSize: '14px',
                  fontWeight: '600',
                }}>{student.roll}</td>
                <td style={{
                  padding: '14px 16px',
                  color: '#475569',
                  fontSize: '13px',
                }}>{student.fatherName}</td>
                <td style={{
                  padding: '14px 16px',
                  color: '#2563eb',
                  fontSize: '13px',
                  fontWeight: '700',
                }}>{student.group}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );

  /* ─────────────────────────────────────────────────────────────
     Render: Student Result Details
     ───────────────────────────────────────────────────────────── */
  const renderStudentDetails = () => {
    if (!selectedStudent) return null;

    return (
      <div style={{
        background: '#fff',
        borderRadius: '10px',
        border: '1px solid #e2e8f0',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)',
        overflow: 'hidden',
      }}>
        <div style={{
          background: '#f8fafc',
          padding: '16px 20px',
          borderBottom: '1px solid #e2e8f0',
        }}>
          <button
            onClick={() => setSelectedStudentKey(null)}
            style={{
              padding: '8px 12px',
              border: 'none',
              borderRadius: '6px',
              background: '#e0e7ff',
              color: '#4f46e5',
              fontWeight: '600',
              cursor: 'pointer',
              marginBottom: '12px',
            }}
          >
            ← Back to Student List
          </button>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
            <div>
              <h3 style={{ margin: 0, fontSize: '18px', color: '#1a2e4a' }}>{selectedStudent.name}</h3>
              <p style={{ margin: '6px 0 0', color: '#64748b', fontSize: '14px' }}>
                Roll Number: <strong>{selectedStudent.roll}</strong> • Father: <strong>{selectedStudent.fatherName}</strong> • Group: <strong>{selectedStudent.group}</strong>
              </p>
            </div>
            <span style={{
              background: '#eff6ff',
              color: '#2563eb',
              padding: '6px 10px',
              borderRadius: '999px',
              fontSize: '12px',
              fontWeight: '700',
            }}>
              {selectedStudent.class}
            </span>
          </div>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: '#f8fafc' }}>
                <th style={{ padding: '12px 16px', textAlign: 'left', color: '#475569', fontSize: '12px', textTransform: 'uppercase' }}>Subject</th>
                <th style={{ padding: '12px 16px', textAlign: 'center', color: '#475569', fontSize: '12px', textTransform: 'uppercase' }}>Marks</th>
                <th style={{ padding: '12px 16px', textAlign: 'center', color: '#475569', fontSize: '12px', textTransform: 'uppercase' }}>Grade</th>
                <th style={{ padding: '12px 16px', textAlign: 'center', color: '#475569', fontSize: '12px', textTransform: 'uppercase' }}>Status</th>
                <th style={{ padding: '12px 16px', textAlign: 'center', color: '#475569', fontSize: '12px', textTransform: 'uppercase' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {selectedStudent.subjects.map((subject, idx) => (
                <tr key={idx} style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '12px 16px', color: '#1a2e4a', fontWeight: '600' }}>{subject.subject}</td>
                  <td style={{ padding: '12px 16px', textAlign: 'center', color: '#2563eb', fontWeight: '700' }}>{subject.marks}/100</td>
                  <td style={{ padding: '12px 16px', textAlign: 'center' }}><GradeBadge grade={subject.grade} /></td>
                  <td style={{ padding: '12px 16px', textAlign: 'center' }}><StatusBadge status={subject.status} /></td>
                  <td style={{ padding: '12px 16px', textAlign: 'center' }}>
                    {subject.resultKey ? (
                      <button
                        type="button"
                        onClick={() => handleEditResult(subject.resultKey)}
                        style={{
                          padding: '6px 10px',
                          borderRadius: '6px',
                          border: 'none',
                          background: '#e0f2fe',
                          color: '#0369a1',
                          cursor: 'pointer',
                          fontWeight: '700',
                        }}
                      >
                        Edit
                      </button>
                    ) : (
                      '-'
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  return (
    <div style={{ padding: '20px 0' }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '24px',
        paddingBottom: '16px',
        borderBottom: '1px solid #e2e8f0',
      }}>
        <h2 style={{
          margin: 0,
          fontSize: '20px',
          fontWeight: '700',
          color: '#1a2e4a',
        }}>
          📋 Results
        </h2>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        {selectedStudent && (
          <button
            onClick={() => setSelectedStudentKey(null)}
            style={{
              padding: '8px 14px',
              fontSize: '13px',
              fontWeight: '600',
              background: '#f1f5f9',
              color: '#475569',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
            }}
          >
            ← Back to List
          </button>
        )}
        <button
          type="button"
          onClick={() => setShowEntryForm(prev => !prev)}
          style={{
            padding: '8px 14px',
            fontSize: '13px',
            fontWeight: '600',
            background: '#2563eb',
            color: '#fff',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
          }}
        >
          Enter Result
        </button>
      </div>
      </div>

      {!showEntryForm && renderSearchPanel()}
      {showEntryForm && renderEntrySection()}

      <div style={{
        background: '#fff',
        borderRadius: '8px',
        overflow: 'hidden',
      }}>
        {selectedStudent ? renderStudentDetails() : renderStudentList()}
      </div>
    </div>
  );
}
