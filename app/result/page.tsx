import { Suspense } from 'react';
import LoadingPulsingPizza from '../components/LoadingPulsingPizza';
import ResultPageClient from '../components/ResultPageClient';


export default function ResultPage() {
  return (
    <Suspense fallback={<LoadingPulsingPizza />}>
      <ResultPageClient />
    </Suspense>
  );
}