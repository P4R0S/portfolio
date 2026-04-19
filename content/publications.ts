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
    title: 'CLAS: A Cross-Layer Approximate Synthesis Framework for LUT-based DNN Accelerators',
    venue: 'International Conference on Architecture of Computing Systems (ARCS)',
    year: 2026,
    area: 'Approximate Computing',
    abstract:
      'LUT-based DNN accelerators offer ultra-low latency FPGA inference, but their adoption is severely constrained by excessive resource consumption. This paper introduces CLAS, a cross-layer approximation framework for LUT-based DNNs that redefines approximation in fully unrolled networks by treating neurons as substitutable RTL components and jointly exploring combinations of approximated layers at the RTL across the network. CLAS achieves substantial LUT reductions with a small accuracy loss, outperforming algorithmic-level approximation baselines by delivering an additional 33% area savings with only a 4% drop in classification accuracy on the MNIST dataset.',
    pdfUrl: '/papers/jafari26_arc.pdf',
  }
]
