export interface SkillCategory {
  name: string
  accent: string
  skills: string[]
}

export const skillCategories: SkillCategory[] = [
  {
    name: 'Languages',
    accent: 'violet',
    skills: ['Python', 'C', 'C++', 'VHDL', 'Verilog', 'Rust', 'JavaScript', 'TypeScript', 'Bash'],
  },
  {
    name: 'ML / AI',
    accent: 'blue',
    skills: ['PyTorch', 'TensorFlow', 'HuggingFace', 'CUDA', 'LangChain', 'scikit-learn', 'ONNX', 'Triton'],
  },
  {
    name: 'Hardware',
    accent: 'emerald',
    skills: ['FPGA', 'RTL Design', 'Xilinx Vivado', 'ModelSim', 'Approximate Circuits', 'RISC-V', 'SystemVerilog'],
  },
  {
    name: 'Tools & Infra',
    accent: 'orange',
    skills: ['Git', 'Docker', 'Linux', 'Jupyter', 'LaTeX', 'FastAPI', 'Vercel', 'GitHub Actions'],
  },
]
