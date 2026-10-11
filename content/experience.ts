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
      'Built a strong programming foundation, especially in C#, C++ and Python.',
      'Completed many implementations and personal projects in web development with modern frameworks (.NET, FastAPI).',
      'Gained a solid understanding of computer architecture and organization.',
    ],
    type: 'education',
  },
  {
    company: 'Paderborn University',
    role: 'M.Sc. in Computer Engineering',
    startDate: '2024',
    endDate: 'Present',
    bullets: [
      'Studying for a Master’s in Computer Engineering, specializing in Embedded Systems.',
      'Worked on many courses and projects related to hardware (FPGA, ASIC).',
      'Completed in-depth projects in LLMs and XAI, including LLM fine-tuning and RAG pipelines.',
    ],
    type: 'education',
  },
  {
    company: 'Hesab Rayan Pars',
    role: 'Software Developer',
    startDate: '2023',
    endDate: '2024',
    bullets: [
      'Gained experience working in a team on C# accounting software development.',
      'Got hands-on experience with real-world software development and architecture.',
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
