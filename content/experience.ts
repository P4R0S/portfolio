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
    company: 'Tehran Azad University ',
    role: 'B.Sc. in Computer Engineering',
    startDate: '2018',
    endDate: '2023',
    bullets: [
      'Got the Idea of the Basics of Programming especially with C#, C++ and Python.',
      'Have Done many implementatipn and Personal Projects in the world of the Web Development with the modern Frameworks (.Net, FastAPI).',
      'Also have got understanding of Computer Architecture and structure.',
    ],
    type: 'education',
  },
  {
    company: 'Paderborn University',
    role: 'M.sc in Computer Engineering',
    startDate: '2024',
    endDate: '',
    bullets: [
      'Studying Master in Computer Engineering specializied in Embedded Systems. ',
      'Have been working and dealt with many Courses and Projects related to the Hardwares (FPGA, ASICS).',
      'Done Deep projects in the Field of LLMs and XAI, also have dealt deep in the LLM Fine Tuning and RAG Pipeline.',
    ],
    type: 'education',
  },
  {
    company: 'Hesab Rayan Pars',
    role: 'Software Developer',
    startDate: '2023',
    endDate: '2024',
    bullets: [
      'Have gained the Experience to work in teams and with the C# Accounting softwarre Development.',
      'Have had hands on experience with real world and practical software Development Architecture.',
    ],
    type: 'work',
  },
  {
    company: 'Paderborn University',
    role: 'Research Assistant',
    startDate: '2025',
    endDate: '',
    bullets: [
      'Has contribute and done Development on the CIRCA (Paderborn approximation Framework).',
      'Has done many research in the Neural Network Optimisation and approximation (Pruning, Quantization).',
      'Has Worked and deep dive to solve the Parallel Circuit Partioning Approximation.',
    ],
    type: 'work',
  }
]
