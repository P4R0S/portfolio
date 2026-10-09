import { CvDocument } from '@/components/cv/CvDocument'

/** Page shell for /cv: the CV sheet centered on the themed page background. */
export function CvPage() {
  return (
    <div className="min-h-screen flex flex-col items-center pt-24 pb-16 px-4">
      <CvDocument />
    </div>
  )
}
