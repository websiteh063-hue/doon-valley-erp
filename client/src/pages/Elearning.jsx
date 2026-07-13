import React from 'react';
import { useLocation } from 'react-router-dom';
import { Laptop, Video, Calendar, Clock, AlertCircle } from 'lucide-react';

export default function Elearning() {
  const location = useLocation();
  const isExams = location.pathname.includes('online-exams');

  const items = isExams
    ? [
        { id: 1, title: 'Calculus Advanced MCQ Quiz', subject: 'Mathematics', date: '2026-07-20', time: '10:00 AM', duration: '60 Mins' },
        { id: 2, title: 'Optics Basic MCQ Test', subject: 'Physics', date: '2026-07-22', time: '11:30 AM', duration: '45 Mins' }
      ]
    : [
        { id: 1, title: 'Periodic Table Chemistry Lesson', subject: 'Chemistry', date: '2026-07-13', time: '11:00 AM', link: 'https://meet.google.com/abc-defg-hij' },
        { id: 2, title: 'Electromagnetism Lecture', subject: 'Physics', date: '2026-07-14', time: '02:00 PM', link: 'https://meet.google.com/xyz-lmno-pqr' }
      ];

  const cardClass = "glass-panel rounded-2xl p-6 border border-slate-850 space-y-4 hover:border-slate-800 transition-colors";

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight text-white mb-2 font-sans">
          {isExams ? 'Online Assessment Portal' : 'E-Learning Virtual Classes'}
        </h1>
        <p className="text-slate-400 text-sm">
          {isExams ? 'Participate in term computer-based tests and review diagnostic assessment records.' : 'Access virtual classroom schedules, live video lectures, and syllabus study guides.'}
        </p>
      </div>

      <div className="space-y-4">
        {items.map((item) => (
          <div key={item.id} className={cardClass}>
            <div className="flex justify-between items-start">
              <div className="space-y-1">
                <span className="badge-cyan font-bold px-2.5 py-1 rounded-xl text-[8px] uppercase tracking-wide">
                  {item.subject}
                </span>
                <h4 className="font-extrabold text-white text-base pt-1">{item.title}</h4>
              </div>
              <span className="badge-indigo font-bold px-2.5 py-1 rounded-xl text-[9px] uppercase tracking-wide flex items-center gap-1">
                {isExams ? <Laptop size={12} /> : <Video size={12} />}
                {isExams ? 'MCQ Exam' : 'Live Class'}
              </span>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-xs text-slate-400 border-t border-slate-850/40 pt-3">
              <div className="flex items-center gap-1.5">
                <Calendar size={14} className="text-indigo-400" />
                <span>Date: {item.date}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock size={14} className="text-cyan-400" />
                <span>Time: {item.time}</span>
              </div>
              {isExams ? (
                <div className="flex items-center gap-1.5">
                  <AlertCircle size={14} className="text-amber-450" />
                  <span>Duration: {item.duration}</span>
                </div>
              ) : (
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-400 hover:text-indigo-300 font-bold flex items-center gap-1.5 cursor-pointer"
                >
                  Join Meeting Link
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
