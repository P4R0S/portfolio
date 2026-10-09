export type ResearchArea = 'ML' | 'Hardware' | 'Approximate Computing' | 'LLM'

export type PublicationStatus = 'published' | 'under-review'

export interface Publication {
  title: string
  venue: string
  venueShort?: string         // e.g. 'DATE', shown with the year on the CV
  year: number
  area: ResearchArea
  status?: PublicationStatus  // defaults to 'published'
  abstract: string
}

export const publications: Publication[] = [
  {
    title: 'Divide et Approxima: Scalable Design Space Exploration for Approximate Accelerators via Partitioning and Sensitivity-driven Error Allocation',
    venue: 'Design, Automation and Test in Europe Conference (DATE)',
    venueShort: 'DATE',
    year: 2027,
    area: 'Approximate Computing',
    status: 'under-review',
    abstract:
      'Frameworks for automated synthesis of approximate hardware accelerators rely on repeated, typically simulation-based error estimation to navigate a design space that grows exponentially with the number of approximable components. For larger accelerators, this estimation cost dominates and prohibits a single exploration run from effectively exploring the solution space. We address this challenge with a partition-based synthesis framework that decomposes an accelerator into sub-designs small enough to explore tractably, combined with a lightweight, sensitivity-driven error-budget allocation strategy that distributes the global error across partitions so they can be searched independently and in parallel. Across four accelerator kernels in 20 size configurations, spanning a 28× size range and error targets of 1–10% RMSE, the framework accelerates design space exploration by up to 92.9× while meeting every error constraint. The resulting designs are never Pareto-dominated by single-search design space exploration and achieve up to 24.6 pp higher area savings.',
  },
  {
    title: 'CLAS: A Cross-Layer Approximate Synthesis Framework for LUT-based DNN Accelerators',
    venue: 'International Conference on Architecture of Computing Systems (ARCS)',
    venueShort: 'ARCS',
    year: 2026,
    area: 'Approximate Computing',
    abstract:
      'LUT-based DNN accelerators offer ultra-low latency FPGA inference, but their adoption is severely constrained by excessive resource consumption. This paper introduces CLAS, a cross-layer approximation framework for LUT-based DNNs that redefines approximation in fully unrolled networks by treating neurons as substitutable RTL components and jointly exploring combinations of approximated layers at the RTL across the network. CLAS achieves substantial LUT reductions with a small accuracy loss, outperforming algorithmic-level approximation baselines by delivering an additional 33% area savings with only a 4% drop in classification accuracy on the MNIST dataset.',
  }
]
