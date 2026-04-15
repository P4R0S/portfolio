export interface Project {
  title: string
  description: string
  longDescription: string
  tech: string[]
  github?: string
  demo?: string
  featured: boolean
}

export const projects: Project[] = [
  {
    title: 'CLAS — Cross-Layer Approximate Synthesis',
    description: 'End-to-end pipeline for approximating FPGA-deployed neural networks at the circuit level.',
    longDescription:
      'A four-stage research pipeline that takes a quantized neural network, profiles per-neuron sensitivity via LASSO regression, generates approximate neuron variants using BLASYS, and runs a multi-objective genetic algorithm to find Pareto-optimal area-accuracy trade-offs across the full network. Evaluated using Vivado synthesis for area and Icarus Verilog for accuracy.',
    tech: ['Python', 'Verilog', 'Yosys', 'Vivado', 'Genetic Algorithm', 'LogicNets'],
    github: 'https://github.com/P4R0S/CLAS',
    featured: true,
  },
  {
    title: 'BLASYS Neural Network Approximation Pipeline',
    description: 'HPC-optimized pipeline for approximating neural network neurons using Boolean Matrix Factorization.',
    longDescription:
      'Automates the approximation of neural network neurons using Boolean Logic Approximation and Synthesis (BLASYS). Extracts neurons from network layers, applies Boolean Matrix Factorization with configurable error thresholds, and generates a Pareto front of approximate designs trading off chip area vs. accuracy. Optimized for 120-core HPC nodes with full parallel execution.',
    tech: ['Python', 'Verilog', 'BLASYS', 'HPC', 'Pareto Optimization'],
    github: 'https://github.com/P4R0S/BLASYS',
    featured: true,
  },
  {
    title: 'Circuit Approximation via Spectral Partitioning',
    description: 'Selectively approximates arithmetic circuits to minimize silicon area within a user-defined error budget.',
    longDescription:
      'A three-stage pipeline that analyzes circuit sensitivity via reverse-topological DFG traversal, partitions circuits using the Fiedler vector of the graph Laplacian with sensitivity-aware edge weights, then applies Lagrangian relaxation to optimally distribute an error budget across partitions. Achieves near-global-optimal approximation with independent subproblem solving.',
    tech: ['Python', 'Jupyter', 'NumPy', 'SciPy', 'Graph Theory', 'Lagrangian Relaxation'],
    github: 'https://github.com/P4R0S/Partioning',
    featured: true,
  },
  {
    title: 'PubMed Graph Attention Network + XAI',
    description: 'Graph Attention Network for scientific paper classification with full explainability framework.',
    longDescription:
      'Implements a GAT for node classification on the PubMed citation network (diabetes literature), featuring a comprehensive Explainable AI framework with attention pattern analysis, feature importance visualization, and multi-perspective explanations. Built at Paderborn University for the Explainable AI course.',
    tech: ['Python', 'PyTorch', 'PyTorch Geometric', 'NetworkX', 'XAI'],
    github: 'https://github.com/P4R0S/PubMed_GNN_Project',
    featured: false,
  },
  {
    title: 'Reservoir Network Quantization',
    description: 'Quantization experiments on Echo State Networks for NARMA time series prediction.',
    longDescription:
      'Investigates the effect of weight quantization (4-bit, 6-bit, 8-bit) on Echo State Network performance across NARMA10 and NARMA20 tasks. Includes quantized weights for reservoir, input, bias, and readout layers, with per-level accuracy comparisons and full saved states for reproducibility.',
    tech: ['Python', 'Jupyter', 'NumPy', 'Echo State Networks', 'Quantization'],
    github: 'https://github.com/P4R0S/Reservoir_Pruning',
    featured: false,
  },
  {
    title: 'Neural Network from Scratch',
    description: 'Full feedforward neural network built with NumPy only — no frameworks.',
    longDescription:
      'Implements every component of a neural network by hand: activation functions (Sigmoid, ReLU, Tanh) with derivatives, Binary Cross-Entropy and MSE loss, Xavier and He weight initialization, forward propagation, backpropagation via chain rule, and gradient descent. Applied to breast cancer malignancy classification on real clinical data.',
    tech: ['Python', 'NumPy', 'Jupyter'],
    github: 'https://github.com/P4R0S/Neural_Network_from_Scratch',
    featured: false,
  },
  {
    title: 'CIRCA — Approximate Circuit Generation',
    description: 'Extensions and implementations on the CIRCA approximate circuit synthesis framework.',
    longDescription:
      'Contributed implementations and extensions to CIRCA, the modular approximate circuit generation framework by Paderborn University. Work includes evolutionary approximate circuit variants (Circa_evo) and a DDECS-targeted extension integrating custom approximation strategies into the CIRCA pipeline.',
    tech: ['Python', 'C', 'Verilog', 'Yosys', 'ABC', 'CIRCA'],
    github: 'https://github.com/P4R0S/Circa_evo',
    featured: false,
  },
]
