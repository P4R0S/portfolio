// CV-only content for /cv. Publications come from content/publications.ts so the CV and the
// home page can never disagree. Keep facts here in sync with content/experience.ts.

export interface CvContactRow {
  label: string
  value: string
}

export interface CvSkillGroup {
  label: string
  items: string[]
}

export interface CvJob {
  role: string
  company: string
  period: string
  bullets: string[]
}

export interface CvEducation {
  degree: string
  school: string
  period: string
  note: string
  highlights?: string[]
}

export const cvName = { first: 'MohammadParsa', last: 'RostamzadehKhameneh' }

export const cvSummary =
  'Research Assistant and Computer Engineering M.Sc. student at Paderborn University, specializing in ' +
  'Embedded Systems. I work on approximate computing and hardware-aware machine learning: making neural ' +
  'network accelerators smaller and cheaper through quantization, pruning, and RTL-level approximation, ' +
  'with large-scale experiments on HPC infrastructure. Co-author of a paper at ARCS 2026 and a second ' +
  'submission under review at DATE 2027. Hands-on with standard-cell design in Cadence Innovus, backed by ' +
  'software engineering experience in C# and ASP.NET.'

export const cvContact: CvContactRow[] = [
  { label: 'Email', value: 'paros.pr@gmail.com' },
  { label: 'Phone', value: '(+49)-1783396316' },
  { label: 'Location', value: 'Paderborn, Germany' },
  { label: 'LinkedIn', value: 'linkedin.com/in/parsa-rostamzadeh' },
  { label: 'GitHub', value: 'github.com/P4R0S' },
  { label: 'Website', value: 'www.p4r0s.dev' },
]

export const cvLanguages = [
  { name: 'Persian', level: 'Native' },
  { name: 'English', level: 'Advanced (C1)' },
  { name: 'German', level: 'Intermediate (A2-B1)' },
]

export const cvSkills: CvSkillGroup[] = [
  { label: 'ML / AI', items: ['PyTorch', 'PyTorch Geometric', 'scikit-learn', 'NumPy', 'GNN', 'XAI'] },
  { label: 'Hardware & VLSI', items: ['FPGA', 'RTL Design', 'Standard-Cell Design', 'Circuit Design', 'Approximate Circuits'] },
  { label: 'EDA Tools', items: ['Cadence Innovus', 'Synopsys Design Compiler', 'QuestaSim', 'Xilinx Vivado', 'Yosys / ABC', 'Icarus Verilog'] },
  { label: 'Programming', items: ['Python', 'C / C++', 'Verilog', 'Bash', 'TypeScript'] },
  { label: 'Tools', items: ['Git', 'Linux', 'HPC / SLURM', 'Jupyter', 'LaTeX', 'Docker'] },
]

export const cvResearchAssistant: CvJob = {
  role: 'Research Assistant',
  company: 'Paderborn University',
  period: '2025 – Present',
  bullets: [
    'Approximating DNN accelerators at the RTL level.',
    'Neural network optimisation and approximation (quantization, pruning).',
    'Circuit partitioning and parallel approximation, guided by circuit sensitivity analysis.',
    'Contributing to CIRCA, Paderborn’s approximate circuit generation framework.',
    'Running large-scale experiments on Paderborn’s HPC cluster (SLURM).',
  ],
}

export const cvOtherJobs: CvJob[] = [
  {
    role: 'Software Developer (Intern)',
    company: 'Hesab Rayan',
    period: '2024 – 2025',
    bullets: ['Developed an accounting web application with C# and ASP.NET.'],
  },
]

export const cvEducation: CvEducation[] = [
  {
    degree: 'M.Sc. in Computer Engineering',
    school: 'Paderborn University',
    period: '2024 – Present',
    note: 'Specialized in Embedded Systems',
    highlights: ['VLSI design: hands-on standard-cell design in Cadence Innovus.'],
  },
  {
    degree: 'B.Sc. in Computer Engineering',
    school: 'Tehran Azad University',
    period: '2018 – 2023',
    note: 'Specialized in Software Development',
  },
]
