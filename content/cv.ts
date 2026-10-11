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
  'Computer Engineering M.Sc. student (Embedded Systems) and graduate research assistant in the Computer ' +
  'Engineering Group at Paderborn University. Builds approximate-computing tools for FPGA-based DNN ' +
  'accelerators: RTL-level approximation, design-space exploration, and large-scale synthesis and ' +
  'simulation on an HPC cluster. Co-author of an ARC 2026 paper (Springer LNCS), with a second paper under ' +
  'review. Software engineering background in Python, C/C++ and C#.'

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
  { name: 'German', level: 'B1' },
]

export const cvSkills: CvSkillGroup[] = [
  { label: 'Digital design', items: ['Verilog', 'RTL design', 'logic synthesis', 'approximate circuits', 'standard-cell design'] },
  { label: 'EDA and FPGA tools', items: ['Xilinx Vivado', 'Yosys', 'ABC', 'BLASYS', 'Icarus Verilog', 'QuestaSim', 'Cadence Innovus', 'Synopsys Design Compiler'] },
  { label: 'Hardware-aware ML', items: ['PyTorch', 'PyTorch Geometric', 'quantization', 'pruning', 'LUT-based DNNs (LogicNets)', 'scikit-learn', 'NumPy', 'SciPy'] },
  { label: 'Optimization', items: ['design-space exploration', 'multi-objective genetic algorithms', 'Pareto analysis', 'graph partitioning'] },
  { label: 'Programming', items: ['Python', 'C/C++', 'Bash', 'C#'] },
  { label: 'Infrastructure', items: ['Linux', 'Git', 'HPC (SLURM)', 'Docker', 'LaTeX'] },
]

export const cvResearchAssistant: CvJob = {
  role: 'Graduate Research Assistant (Wissenschaftliche Hilfskraft)',
  company: 'Computer Engineering Group (Prof. Dr. Marco Platzner), Paderborn University',
  period: '2025 – Present',
  bullets: [
    'Co-developed CLAS, a cross-layer approximate synthesis framework for LUT-based DNN accelerators on FPGAs. It achieved an additional 33% area savings over algorithmic-level approximation baselines with a 4% accuracy drop on MNIST (ARC 2026).',
    'Co-developed a partition-based design-space exploration framework for approximate accelerators, combining spectral graph partitioning with sensitivity-driven error-budget allocation. It speeds up exploration by up to 92.9× while meeting every error constraint across 4 kernels and 20 size configurations (under review).',
    'Extended CIRCA, the group’s approximate circuit generation framework, with evolutionary approximation variants (Python, C, Yosys, ABC).',
    'Automated parallel synthesis and simulation campaigns on the Noctua 2 HPC cluster (PC2) using SLURM.',
  ],
}

export const cvOtherJobs: CvJob[] = [
  {
    role: 'Software Developer (Intern)',
    company: 'Hesab Rayan Pars',
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
