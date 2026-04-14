export type ResearchArea = 'ML' | 'Hardware' | 'Approximate Computing' | 'LLM'

export interface Publication {
  title: string
  venue: string
  year: number
  area: ResearchArea
  abstract: string
  pdfUrl?: string
  doi?: string
}

export const publications: Publication[] = [
  {
    title: 'Approximate Computing for Energy-Efficient Neural Network Inference',
    venue: 'IEEE Transactions on Computers',
    year: 2024,
    area: 'Approximate Computing',
    abstract:
      'We propose a systematic framework for applying approximate computing techniques to DNN inference, achieving 3.2× energy reduction with less than 2% accuracy loss across ImageNet benchmarks.',
    pdfUrl: '/papers/approx-nn-2024.pdf',
    doi: 'https://doi.org/10.1109/TC.2024.xxxxx',
  },
  {
    title: 'Hardware-Aware Quantization of Large Language Models',
    venue: 'ACM Conference on Computer Architecture (ISCA)',
    year: 2024,
    area: 'LLM',
    abstract:
      'A co-design methodology for quantizing LLMs targeting specific hardware backends, demonstrating 2.8× throughput improvement on edge devices while maintaining >98% of baseline accuracy.',
    pdfUrl: '/papers/hw-quant-llm-2024.pdf',
    doi: 'https://doi.org/10.1145/xxxxx',
  },
  {
    title: 'Configurable Approximate Multipliers for FPGA-Based Accelerators',
    venue: 'International Conference on Field-Programmable Logic (FPL)',
    year: 2023,
    area: 'Hardware',
    abstract:
      'We present a library of parametrically configurable approximate multipliers optimized for FPGA synthesis, with automated accuracy-power trade-off exploration.',
    pdfUrl: '/papers/approx-mult-fpga-2023.pdf',
    doi: 'https://doi.org/10.1109/FPL.2023.xxxxx',
  },
  {
    title: 'Survey of Approximate Computing Techniques for Machine Learning',
    venue: 'ACM Computing Surveys',
    year: 2023,
    area: 'Approximate Computing',
    abstract:
      'A comprehensive survey of approximate computing methods applied to machine learning workloads, covering algorithm-level, hardware-level, and co-design approaches.',
    pdfUrl: '/papers/survey-approx-ml-2023.pdf',
    doi: 'https://doi.org/10.1145/xxxxx',
  },
  {
    title: 'Efficient Sparse Attention for Long-Context LLMs on Resource-Constrained Hardware',
    venue: 'NeurIPS Workshop on Efficient NLP',
    year: 2023,
    area: 'LLM',
    abstract:
      'Sparse attention patterns derived from hardware memory constraints, enabling 128K context windows on GPUs with 24GB VRAM with 1.9× speed improvement.',
    pdfUrl: '/papers/sparse-attn-2023.pdf',
  },
]
