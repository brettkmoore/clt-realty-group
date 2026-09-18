import type { Metadata } from 'next'

import { SchemaGraph } from '@/components/SchemaGraph'
import { breadcrumb } from '@/lib/schema'
import { QuizClient } from '@/app/quiz/QuizClient'

export const metadata: Metadata = {
  title: 'Real Estate IQ Quiz',
  description:
    'Six real scenarios from Candace L. Thompson’s own transactions in Rock Hill, Charlotte, Waxhaw and Mooresville. Pick what you would do, see what actually worked, and find out where you are in the process. About four minutes.',
  alternates: { canonical: '/quiz/' },
}

export default function QuizPage() {
  return (
    <>
      <SchemaGraph nodes={[breadcrumb([{ name: 'Home', path: '/' }, { name: 'Real Estate IQ Quiz', path: '/quiz/' }])]} />
      <QuizClient />
    </>
  )
}
