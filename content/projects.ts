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
    title: 'LLM Quantization Framework',
    description: 'Post-training quantization for large language models with minimal accuracy loss.',
    longDescription:
      'A research framework implementing various quantization techniques (GPTQ, AWQ, SqueezeLLM) for LLMs. Achieves 4-bit quantization with <1% perplexity increase on LLaMA-2 and Mistral models.',
    tech: ['Python', 'PyTorch', 'CUDA', 'HuggingFace'],
    github: 'https://github.com/yourusername/llm-quantization',
    featured: true,
  },
  {
    title: 'Approximate Multiplier FPGA',
    description: 'Hardware implementation of approximate multipliers on FPGA for energy-efficient inference.',
    longDescription:
      'RTL design of configurable approximate multipliers targeting Xilinx FPGAs. Achieves 40% power reduction with <5% accuracy degradation on CNN workloads.',
    tech: ['VHDL', 'Xilinx Vivado', 'Python', 'MATLAB'],
    github: 'https://github.com/yourusername/approx-fpga',
    featured: true,
  },
  {
    title: 'RAG Pipeline for Technical Docs',
    description: 'Retrieval-augmented generation system for querying large technical documentation corpora.',
    longDescription:
      'End-to-end RAG pipeline using LangChain, ChromaDB, and OpenAI embeddings. Handles PDFs, markdown, and code files with chunk-aware retrieval.',
    tech: ['Python', 'LangChain', 'ChromaDB', 'FastAPI'],
    github: 'https://github.com/yourusername/rag-pipeline',
    featured: true,
  },
  {
    title: 'Neural Network Pruning Toolkit',
    description: 'Structured and unstructured pruning toolkit for PyTorch models.',
    longDescription:
      'Implements magnitude pruning, gradient-based pruning, and lottery ticket hypothesis experiments. Supports ResNet, VGG, and transformer architectures.',
    tech: ['Python', 'PyTorch', 'NumPy'],
    github: 'https://github.com/yourusername/pruning-toolkit',
    featured: false,
  },
  {
    title: 'RISC-V Core (Pipelined)',
    description: '5-stage pipelined RISC-V RV32I core with hazard detection.',
    longDescription:
      'Synthesizable RISC-V RV32I implementation with data/control hazard detection, forwarding, and branch prediction. Verified with RISC-V compliance tests.',
    tech: ['Verilog', 'ModelSim', 'GTKWave'],
    github: 'https://github.com/yourusername/riscv-core',
    featured: false,
  },
  {
    title: 'ML Model Serving Platform',
    description: 'Lightweight REST API server for serving PyTorch and ONNX models.',
    longDescription:
      'FastAPI-based model server with dynamic batching, ONNX Runtime support, Prometheus metrics, and Docker deployment. Sub-10ms P99 latency on CPU.',
    tech: ['Python', 'FastAPI', 'ONNX', 'Docker'],
    github: 'https://github.com/yourusername/ml-serving',
    featured: false,
  },
]
