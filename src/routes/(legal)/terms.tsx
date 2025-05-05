import { createFileRoute } from '@tanstack/react-router'
import TermsPage from '@/features/legal/terms-page'

export const Route = createFileRoute('/(legal)/terms')({
  component: TermsPage
})
