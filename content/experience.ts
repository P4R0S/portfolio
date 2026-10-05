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
    company: 'Paderborn University',
    role: 'Research Assistant',
    startDate: '2025',
    endDate: 'Present',
    bullets: [
      'Contributed to the development of CIRCA, Paderborn’s approximate circuit framework.',
      'Researching neural network optimization and approximation (pruning, quantization).',
      'Working on parallel circuit partitioning for approximation.',
    ],
    type: 'work',
  }
]
