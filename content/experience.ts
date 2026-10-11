export interface ExperienceItem {
  company: string
  role: string
  startDate: string
  endDate: string
  bullets: string[]
  type: 'work' | 'education'
}

export const experience: ExperienceItem[] = [
  {
    company: 'Tehran Azad University',
    role: 'B.Sc. in Computer Engineering',
    startDate: '2018',
    endDate: '2023',
    bullets: [
      'Specialized in software development, with core coursework in C#, C++ and Python.',
      'Built web applications in course and personal projects with .NET and FastAPI.',
      'Studied computer architecture and organization.',
    ],
    type: 'education',
  },
  {
    company: 'Paderborn University',
    role: 'M.Sc. in Computer Engineering',
    startDate: '2024',
    endDate: 'Present',
    bullets: [
      'Specializing in Embedded Systems.',
      'Hardware coursework and projects in FPGA and ASIC design, including hands-on standard-cell design in Cadence Innovus.',
      'Projects in LLMs and explainable AI, including LLM fine-tuning and RAG pipelines.',
    ],
    type: 'education',
  },
  {
    company: 'Hesab Rayan Pars',
    role: 'Software Developer',
    startDate: '2023',
    endDate: '2024',
    bullets: [
      'Developed an accounting web application in C# and ASP.NET as part of a development team.',
      'Gained hands-on experience with production software development and architecture.',
    ],
    type: 'work',
  },
  {
    company: 'Computer Engineering Group, Paderborn University',
    role: 'Graduate Research Assistant',
    startDate: '2025',
    endDate: 'Present',
    bullets: [
      'Co-developed CLAS, a cross-layer approximate synthesis framework for LUT-based DNN accelerators (ARC 2026).',
      'Co-developed a partition-based design-space exploration framework for approximate accelerators (under review).',
      'Extended CIRCA, the group’s approximate circuit generation framework, with evolutionary approximation variants.',
      'Automated parallel synthesis and simulation campaigns on the Noctua 2 HPC cluster (SLURM).',
    ],
    type: 'work',
  }
]
