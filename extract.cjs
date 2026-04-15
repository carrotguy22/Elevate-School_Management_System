const fs = require('fs');
const path = require('path');

const src = fs.readFileSync('src/App.jsx', 'utf8');

const components = [
  { name: 'TeacherDirectory', func: 'renderTeachers' },
  { name: 'TeacherRoutine', func: 'renderTeacherRoutine' },
  { name: 'StudentDirectory', func: 'renderStudents' },
  { name: 'StudentDashboard', func: 'renderStudentDashboard' },
  { name: 'Classrooms', func: 'renderClassrooms' },
  { name: 'Attendance', func: 'renderYearlyAttendance' },
  { name: 'Timetable', func: 'renderTimetable' },
  { name: 'MasterTimetable', func: 'renderMasterTimetable' },
  { name: 'StaffDirectory', func: 'renderStaff' },
  { name: 'Settings', func: 'renderSettings' },
];

components.forEach(comp => {
  const start = src.indexOf(`const ${comp.func} = () => {`);
  if (start !== -1) {
    let openBraces = 0;
    let end = -1;
    for (let i = start + `const ${comp.func} = () => {`.length - 1; i < src.length; i++) {
      if (src[i] === '{') openBraces++;
      if (src[i] === '}') {
        openBraces--;
        if (openBraces === 0) {
          end = i;
          break;
        }
      }
    }
    if (end > -1) {
      const body = src.substring(start + `const ${comp.func} = () => {`.length, end);
      
      const fileContent = "import React, { useState, useMemo } from 'react';\n" +
"import { Users, Calendar, AlertCircle, Plus, X, Check, Trash2, BookOpen, Clock, UserX, UserCheck, GraduationCap, ChevronDown, CalendarDays, School, UserPlus, Briefcase, Search, LayoutDashboard, Settings as SettingsIcon, TrendingUp, Save, Upload, UserCircle, FileText, Pencil } from 'lucide-react';\n" +
"import { useAppContext } from '../../context/AppContext';\n" +
"import { MAX_TEACHERS, MAX_STAFF, MAX_STUDENTS, DAYS, PERIODS } from '../../utils/constants';\n" +
"\n" +
"export default function " + comp.name + "() {\n" +
"  const ctx = useAppContext();\n" +
"  const { \n" +
"    authUser, classes, teachers, setTeachers, timetable, setTimetable, classTeachers, setClassTeachers,\n" +
"    students, setStudents, nonTeachingStaff, setNonTeachingStaff, classSubjects, setClassSubjects,\n" +
"    examTypes, setExamTypes, studentMarks, setStudentMarks, dayOverrides, setDayOverrides,\n" +
"    yearlyAttendance, setYearlyAttendance, selectedDay, setSelectedDay, selectedClass, setSelectedClass,\n" +
"    activeTab, setActiveTab \n" +
"  } = ctx;\n" +
"  \n" +
"  const [teacherSearch, setTeacherSearch] = useState('');\n" +
"  const [newTeacherName, setNewTeacherName] = useState('');\n" +
"  const [newTeacherSubjects, setNewTeacherSubjects] = useState('');\n" +
"  const [newTeacherClasses, setNewTeacherClasses] = useState([]);\n" +
"  const [isClassDropdownOpen, setIsClassDropdownOpen] = useState(false);\n" +
"  const [studentGlobalSearch, setStudentGlobalSearch] = useState('');\n" +
"  const [studentFilterClass, setStudentFilterClass] = useState('All');\n" +
"  const [profileModal, setProfileModal] = useState({ isOpen: false, student: null });\n" +
"  const [reportModal, setReportModal] = useState({ isOpen: false, studentId: null });\n" +
"  const [editStudentModal, setEditStudentModal] = useState({ isOpen: false, student: null });\n" +
"  const [studentSearch, setStudentSearch] = useState('');\n" +
"  const [isClassTeacherDropdownOpen, setIsClassTeacherDropdownOpen] = useState(false);\n" +
"  const [classTeacherSearchQuery, setClassTeacherSearchQuery] = useState('');\n" +
"  const [newStudentRollNo, setNewStudentRollNo] = useState('');\n" +
"  const [newStudentName, setNewStudentName] = useState('');\n" +
"  const [assignModal, setAssignModal] = useState({ isOpen: false, classId: '', day: '', period: null });\n" +
"  const [assignTeacherId, setAssignTeacherId] = useState('');\n" +
"  const [assignSubject, setAssignSubject] = useState('');\n" +
"  const [teacherAssignModal, setTeacherAssignModal] = useState({ isOpen: false, day: '', period: null, oldSlotKey: null, newClassId: '', newSubject: '', teacherId: '' });\n" +
"  const [staffSearch, setStaffSearch] = useState('');\n" +
"  const [newStaffName, setNewStaffName] = useState('');\n" +
"  const [newStaffRole, setNewStaffRole] = useState('');\n" +
"  const [importStats, setImportStats] = useState(null);\n" +
"  const [settingsSelectedClass, setSettingsSelectedClass] = useState('Class 1 A');\n" +
"  const [newSubject, setNewSubject] = useState('');\n" +
"  const [newExamName, setNewExamName] = useState('');\n" +
"  const [newExamMarks, setNewExamMarks] = useState('');\n" +
"  const [newClassName, setNewClassName] = useState('');\n" +
"  const [adminRoutineTeacherId, setAdminRoutineTeacherId] = useState('');\n" +
"  const showToast = (m, t='success') => alert(m);\n" +
"  const todayDateKey = new Date().toISOString().split('T')[0];\n" +
"  const academicMonths = [{name: 'Jan'}, {name: 'Feb'}];\n" +
"  const [attMonthIdx, setAttMonthIdx] = useState(0);\n" +
"  const getSlotKey = (c, d, p) => `${c}|${d}|${p}`;\n" +
"  const myClasses = authUser?.role === 'Admin' ? classes : classes.filter(cls => classTeachers[cls] === authUser?.refId);\n" +
"  const absentTeachers = teachers.filter(t => !t.isPresent);\n" +
"  const presentTeachers = teachers.filter(t => t.isPresent);\n" +
"  const isHoliday = () => false;\n" +
"  const getWorkingDaysInMonth = () => 20;\n" +
"  const getStudentPresentInMonth = () => 18;\n" +
"  const handleAddTeacher = () => {};\n" +
"  const handleDeleteTeacher = () => {};\n" +
"  const toggleTeacherPresence = () => {};\n" +
"  const openTeacherAssignModal = () => {};\n" +
"  const handleAddStudent = () => {};\n" +
"  const handleToggleStudent = () => {};\n" +
"  const handleDeleteStudent = () => {};\n" +
"  const handleAddStaff = () => {};\n" +
"  const handleToggleStaff = () => {};\n" +
"  const handleDeleteStaff = () => {};\n" +
"  const handleOpenAssignModal = () => {};\n" +
"  const handleAssignClassTeacher = () => {};\n" +
"  const handleAddSubject = () => {};\n" +
"  const handleDeleteSubject = () => {};\n" +
"  const handleApplySubjectsToAll = () => {};\n" +
"  const handleAddExam = () => {};\n" +
"  const handleDeleteExam = () => {};\n" +
"  const handleMarkChange = () => {};\n" +
"  const handleAddClass = () => {};\n" +
"  const getTeacherSlot = (tId, day, period) => {\n" +
"    for (const [key, data] of Object.entries(timetable)) {\n" +
"      const [cId, d, p] = key.split('|');\n" +
"      if (d === day && parseInt(p) === period && data.teacherId === tId) {\n" +
"        return { classId: cId, subject: data.subject, slotKey: key };\n" +
"      }\n" +
"    }\n" +
"    return null;\n" +
"  };\n" +
"\n" + body + "\n}\n";
      fs.writeFileSync(`src/components/Dashboard/${comp.name}.jsx`, fileContent);
      console.log(`Generated ${comp.name}.jsx`);
    }
  }
});
