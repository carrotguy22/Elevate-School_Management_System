const fs = require('fs');

const src = fs.readFileSync('src/App.jsx', 'utf8');

const components = [
  { name: 'Timetable', func: 'renderTimetable' },
  { name: 'MasterTimetable', func: 'renderMasterTimetable' }
];

components.forEach(comp => {
  const altStart = src.indexOf(`const ${comp.func} = () => (`);
  if (altStart !== -1) {
     let openParen = 0;
     let end = -1;
     for (let i = altStart + `const ${comp.func} = () => (`.length - 1; i < src.length; i++) {
       if (src[i] === '(') openParen++;
       if (src[i] === ')') {
         openParen--;
         if (openParen === 0) {
           end = i;
           break;
         }
       }
     }
     if (end > -1) {
       const body = src.substring(altStart + `const ${comp.func} = () => (`.length, end);
       const fileContent = "import React, { useState, useMemo } from 'react';\n" +
"import { Users, Calendar, AlertCircle, Plus, X, Check, Trash2, BookOpen, Clock, UserX, UserCheck, GraduationCap, ChevronDown, CalendarDays, School, UserPlus, Briefcase, Search, LayoutDashboard, Settings as SettingsIcon, TrendingUp, Save, Upload, UserCircle, FileText, Pencil } from 'lucide-react';\n" +
"import { useAppContext } from '../../context/AppContext';\n" +
"import { MAX_TEACHERS, MAX_STAFF, MAX_STUDENTS, DAYS, PERIODS } from '../../utils/constants';\n" +
"\n" +
"export default function " + comp.name + "() {\n" +
"  const ctx = useAppContext();\n" +
"  const { authUser, classes, teachers, setTeachers, timetable, setTimetable, selectedDay, setSelectedDay, selectedClass, setSelectedClass, activeTab, setActiveTab } = ctx;\n" +
"  const getSlotKey = (c, d, p) => `${c}|${d}|${p}`;\n" +
"  const [newClassName, setNewClassName] = useState('');\n" +
"  const showToast = (m) => alert(m);\n" +
"  const handleAddClass = (e) => { e.preventDefault(); };\n" +
"  const handleOpenAssignModal = () => {};\n" +
"  const getTeacherSlot = (tId, day, period) => {\n" +
"    for (const [key, data] of Object.entries(timetable)) {\n" +
"      const [cId, d, p] = key.split('|');\n" +
"      if (d === day && parseInt(p) === period && data.teacherId === tId) {\n" +
"        return { classId: cId, subject: data.subject, slotKey: key };\n" +
"      }\n" +
"    }\n" +
"    return null;\n" +
"  };\n" +
"  const openTeacherAssignModal = () => {};\n" +
"  \n" +
"  return (" + body + ");\n" +
"}\n";
       fs.writeFileSync(`src/components/Dashboard/${comp.name}.jsx`, fileContent);
       console.log(`Generated ${comp.name}.jsx`);
     }
  }
});
