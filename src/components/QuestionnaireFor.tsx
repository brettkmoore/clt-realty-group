'use client'

import { Questionnaire } from '@/components/Questionnaire'
import { buyersQuestionnaire, sellersQuestionnaire } from '@/content/questionnaires'

/**
 * The configs carry `show` functions for progressive disclosure, which
 * cannot be handed from a server page to a client component. This client
 * wrapper owns the import, so the pages pass a key instead.
 */
const questionnaires = { buyers: buyersQuestionnaire, sellers: sellersQuestionnaire }

export function QuestionnaireFor({ which }: { which: keyof typeof questionnaires }) {
  return <Questionnaire config={questionnaires[which]} />
}
