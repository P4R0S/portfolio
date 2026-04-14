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
    company: 'Your University / Lab',
    role: 'PhD Researcher — ML Systems & Approximate Computing',
    startDate: '2022',
    endDate: 'Present',
    bullets: [
      'Research on approximate computing techniques for energy-efficient DNN inference.',
      'Developed FPGA-based hardware accelerators with configurable accuracy-power trade-offs.',
      'Published 5 papers at top venues (IEEE TC, ISCA, FPL, ACM CSUR, NeurIPS Workshop).',
    ],
    type: 'education',
  },
  {
    company: 'Company / Internship',
    role: 'ML Engineer Intern',
    startDate: '2023',
    endDate: '2023',
    bullets: [
      'Built and deployed LLM-based document intelligence pipelines processing 10K+ docs/day.',
      'Reduced model serving latency by 40% through quantization and ONNX optimization.',
      'Integrated RAG system into existing search infrastructure.',
    ],
    type: 'work',
  },
  {
    company: 'Your University',
    role: 'BSc Computer Engineering',
    startDate: '2018',
    endDate: '2022',
    bullets: [
      'Graduated top of class with specialization in computer architecture and embedded systems.',
      'Thesis: "FPGA Implementation of Approximate Arithmetic Units for Signal Processing".',
      'Teaching assistant for Digital Design and Computer Organization courses.',
    ],
    type: 'education',
  },
]
