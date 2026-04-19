'use client'
import { motion } from 'framer-motion'
import { Download } from 'lucide-react'
import Image from 'next/image'

function SidebarHeading({ children }: { children: React.ReactNode }) {
  return (
    <div className="border-b border-[#8b2e2e] pb-1 mb-2.5">
      <p
        className="text-white text-[14px] font-semibold tracking-[2.8px] uppercase"
        style={{ fontFamily: 'var(--font-crimson-pro), serif' }}
      >
        {children}
      </p>
    </div>
  )
}

function MainHeading({ children }: { children: React.ReactNode }) {
  return (
    <div className="border-b border-[#e0e0e0] pb-1 mb-5">
      <p
        className="text-[#0a0a0a] text-[16px] font-semibold tracking-[2.4px] uppercase"
        style={{ fontFamily: 'var(--font-crimson-pro), serif' }}
      >
        {children}
      </p>
    </div>
  )
}

function ContactRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-0.5">
      <p
        className="text-[#99a1af] text-[11px] tracking-[0.56px] uppercase"
        style={{ fontFamily: 'var(--font-commissioner), sans-serif', fontWeight: 400 }}
      >
        {label}
      </p>
      <p
        className="text-white text-[13px] leading-snug break-all"
        style={{ fontFamily: 'var(--font-commissioner), sans-serif', fontWeight: 300 }}
      >
        {value}
      </p>
    </div>
  )
}

const experience = [
  {
    role: 'Research Assistant',
    company: 'Paderborn University',
    period: '2025 – Present',
    bullets: [
      'Approximating DNNs using RTL accelerators.',
      'Neural Network optimisation and approximation (Quantization, Pruning).',
      'Working with the HPC Parallel Computing of Paderborn pool.',
      'Circuit partitioning and parallel approximation.',
      'Circuits Sensitivity Analysis.',
    ],
  },
  {
    role: 'Software Developer (Intern)',
    company: 'Hesab Rayan',
    period: '2024 – 2025',
    bullets: [
      'Developing an Accounting webapp with C# and ASP.NET framework.',
    ],
  },
]

const education = [
  {
    degree: 'M.Sc. in Computer Engineering',
    school: 'Paderborn University',
    period: '2024 – Present',
    note: 'Specialized in Embedded Systems',
  },
  {
    degree: 'B.Sc. in Computer Engineering',
    school: 'Tehran Azad University',
    period: '2018 – 2023',
    note: 'Specialized in Software Development',
  },
]

const languages = [
  { name: 'Persian', level: 'Native' },
  { name: 'English', level: 'Advanced (C1)' },
  { name: 'German', level: 'Intermediate (A2-B1)' },
]

const skillGroups = [
  { label: 'ML / AI', items: ['PyTorch', 'PyTorch Geometric', 'scikit-learn', 'NumPy', 'GNN', 'XAI'] },
  { label: 'Hardware', items: ['FPGA', 'RTL Design', 'Xilinx Vivado', 'Yosys / ABC', 'Icarus Verilog'] },
  { label: 'Programming', items: ['Python', 'C / C++', 'Verilog', 'Bash', 'TypeScript'] },
  { label: 'Tools', items: ['Git', 'Linux', 'HPC / SLURM', 'Jupyter', 'LaTeX', 'Docker'] },
]

export default function CVPage() {
  return (
    <div className="min-h-screen bg-[#18181b] flex flex-col items-center pt-24 pb-16 px-4">

      {/* Download button */}
      <div className="w-full max-w-5xl flex justify-end mb-4">
        <a
          href="/cv.pdf"
          download
          className="flex items-center gap-2 px-4 py-2 rounded-xl border border-[#8b2e2e]/50 hover:border-[#8b2e2e] text-[#8b2e2e] hover:bg-[#8b2e2e]/10 text-sm font-medium transition-all duration-200"
        >
          <Download className="w-4 h-4" /> Download PDF
        </a>
      </div>

      {/* CV Document */}
      <div className="w-full max-w-5xl shadow-[0px_25px_50px_0px_rgba(0,0,0,0.5)] relative overflow-hidden flex border border-[#2c2c2c]">

        {/* Corner brackets */}
        <div className="absolute top-0 left-0 w-16 h-16 border-l-[3px] border-t-[3px] border-[#8b2e2e] z-10 pointer-events-none" />
        <div className="absolute top-0 right-0 w-16 h-16 border-r-[3px] border-t-[3px] border-[#8b2e2e] z-10 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-16 h-16 border-l-[3px] border-b-[3px] border-[#8b2e2e] z-10 pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-16 h-16 border-r-[3px] border-b-[3px] border-[#8b2e2e] z-10 pointer-events-none" />

        {/* ── SIDEBAR ── */}
        <motion.div
          className="w-[280px] shrink-0 flex flex-col gap-6 pt-10 px-8 pb-10"
          style={{ background: 'linear-gradient(180deg,#2c2c2c 0%,#1a1a1a 100%)' }}
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          {/* Profile photo */}
          <div className="flex justify-center">
            <div className="w-[180px] h-[180px] rounded-full overflow-hidden border-2 border-[#8b2e2e]/40">
              <Image
                src="/images/CV_pic.png"
                alt="Parsa Rostamzadeh"
                width={180}
                height={180}
                className="object-cover w-full h-full"
              />
            </div>
          </div>

          {/* Contact */}
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }} viewport={{ once: true }}>
            <SidebarHeading>Contact</SidebarHeading>
            <div className="flex flex-col gap-3">
              <ContactRow label="Email" value="paros.pr@gmail.com" />
              <ContactRow label="Phone" value="(+49)-1783396316" />
              <ContactRow label="Location" value="Paderborn, Germany" />
              <ContactRow label="LinkedIn" value="linkedin.com/in/paros1999" />
              <ContactRow label="Website" value="www.p4r0s.dev" />
            </div>
          </motion.div>

          {/* Languages */}
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }} viewport={{ once: true }}>
            <SidebarHeading>Languages</SidebarHeading>
            <div className="flex flex-col gap-3">
              {languages.map((lang) => (
                <div key={lang.name}>
                  <p
                    className="text-white text-[13px] leading-snug"
                    style={{ fontFamily: 'var(--font-commissioner), sans-serif', fontWeight: 400 }}
                  >
                    {lang.name}
                  </p>
                  <p
                    className="text-[#99a1af] text-[11px] leading-snug"
                    style={{ fontFamily: 'var(--font-commissioner), sans-serif', fontWeight: 300 }}
                  >
                    {lang.level}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Skills */}
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }} viewport={{ once: true }}>
            <SidebarHeading>Skills</SidebarHeading>
            <div className="flex flex-col gap-4">
              {skillGroups.map((group) => (
                <div key={group.label}>
                  <p
                    className="text-[#99a1af] text-[10px] tracking-[0.56px] uppercase mb-1"
                    style={{ fontFamily: 'var(--font-commissioner), sans-serif', fontWeight: 400 }}
                  >
                    {group.label}
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {group.items.map((skill) => (
                      <span
                        key={skill}
                        className="text-white text-[11px] bg-white/5 border border-white/10 rounded px-1.5 py-0.5 leading-snug"
                        style={{ fontFamily: 'var(--font-commissioner), sans-serif', fontWeight: 300 }}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* ── MAIN CONTENT ── */}
        <motion.div
          className="flex-1 bg-white flex flex-col gap-6 pt-14 px-14 pb-14"
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          {/* Name */}
          <div className="border-b-2 border-[#8b2e2e] pb-3">
            <h1
              className="text-[#1a1a1a] leading-tight tracking-tight"
              style={{
                fontFamily: 'var(--font-crimson-pro), serif',
                fontWeight: 700,
                fontSize: 'clamp(2rem, 4vw, 3.2rem)',
              }}
            >
              MohammadParsa<br />RostamzadehKhameneh
            </h1>
          </div>

          {/* Professional Summary */}
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }} viewport={{ once: true }}>
            <MainHeading>Professional Summary</MainHeading>
            <p
              className="text-[#2c2c2c] text-[15px] leading-relaxed"
              style={{ fontFamily: 'var(--font-commissioner), sans-serif', fontWeight: 300 }}
            >
              Computer Engineering M.Sc. student at Paderborn University, specializing in Embedded Systems
              and neural network approximation. Currently researching DNN optimization through quantization,
              pruning, and RTL hardware acceleration using HPC infrastructure. Complemented by hands-on
              software development experience with C# and ASP.NET. Passionate about bridging the gap
              between machine learning and efficient hardware implementation.
            </p>
          </motion.div>

          {/* Professional Experience */}
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.15 }} viewport={{ once: true }}>
            <MainHeading>Professional Experience</MainHeading>
            <div className="flex flex-col gap-7 border-l-2 border-[#e0e0e0] pl-5 relative">
              {experience.map((job, i) => (
                <div key={i} className="relative">
                  {/* timeline dot */}
                  <div className="absolute -left-[27px] top-2 w-3 h-3 rounded-full bg-[#8b2e2e]" />
                  <div className="flex flex-col gap-0.5 mb-2">
                    <h3
                      className="text-[#1a1a1a] text-[20px] leading-tight"
                      style={{ fontFamily: 'var(--font-crimson-pro), serif', fontWeight: 600 }}
                    >
                      {job.role}
                    </h3>
                    <div className="flex items-center gap-3">
                      <span
                        className="text-[#8b2e2e] text-[14px]"
                        style={{ fontFamily: 'var(--font-commissioner), sans-serif', fontWeight: 500 }}
                      >
                        {job.company}
                      </span>
                      <span
                        className="text-[#4a5565] text-[13px]"
                        style={{ fontFamily: 'var(--font-commissioner), sans-serif', fontWeight: 400 }}
                      >
                        {job.period}
                      </span>
                    </div>
                  </div>
                  <ul className="flex flex-col gap-1.5">
                    {job.bullets.map((b, bi) => (
                      <li key={bi} className="flex gap-3 items-start">
                        <span className="text-[#8b2e2e] text-[8px] mt-1.5 shrink-0">●</span>
                        <span
                          className="text-[#2c2c2c] text-[14px] leading-snug"
                          style={{ fontFamily: 'var(--font-commissioner), sans-serif', fontWeight: 300 }}
                        >
                          {b}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Education */}
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }} viewport={{ once: true }}>
            <MainHeading>Education</MainHeading>
            <div className="flex flex-col gap-5">
              {education.map((edu, i) => (
                <div key={i}>
                  <h3
                    className="text-[#1a1a1a] text-[18px] leading-tight mb-1"
                    style={{ fontFamily: 'var(--font-crimson-pro), serif', fontWeight: 600 }}
                  >
                    {edu.degree}
                  </h3>
                  <div className="flex items-center gap-3 mb-0.5">
                    <span className="text-[#6a7282] text-[13px]">•</span>
                    <span
                      className="text-[#2c2c2c] text-[14px]"
                      style={{ fontFamily: 'var(--font-commissioner), sans-serif', fontWeight: 400 }}
                    >
                      {edu.school}
                    </span>
                    <span
                      className="text-[#4a5565] text-[13px]"
                      style={{ fontFamily: 'var(--font-commissioner), sans-serif', fontWeight: 400 }}
                    >
                      {edu.period}
                    </span>
                  </div>
                  <p
                    className="text-[#4a5565] text-[13px] pl-4"
                    style={{ fontFamily: 'var(--font-commissioner), sans-serif', fontWeight: 300 }}
                  >
                    {edu.note}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>

        </motion.div>
      </div>
    </div>
  )
}
