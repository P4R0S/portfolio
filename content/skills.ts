export interface SkillCategory {
  name: string
  accent: string
  skills: string[]
}

export const skillCategories: SkillCategory[] = [
  {
    name: 'Languages',
    accent: 'violet',
    skills: ['Python', 'C', 'C++', 'Verilog', 'Bash', 'JavaScript', 'TypeScript'],
  },
  {
    name: 'ML / AI',
    accent: 'blue',
    skills: ['PyTorch', 'PyTorch Geometric', 'NumPy', 'SciPy', 'scikit-learn', 'NetworkX', 'XAI', 'Graph Neural Networks'],
  },
  {
    name: 'Hardware',
    accent: 'emerald',
    skills: ['FPGA', 'RTL Design', 'Xilinx Vivado', 'Yosys', 'ABC', 'LSOracle', 'Icarus Verilog', 'BLASYS', 'Approximate Circuits'],
  },
  {
    name: 'Tools & Infra',
    accent: 'orange',
    skills: ['Git', 'Linux', 'Jupyter', 'LaTeX', 'HPC / SLURM', 'Docker'],
  },
]
