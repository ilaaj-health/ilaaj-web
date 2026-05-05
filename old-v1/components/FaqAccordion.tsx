'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

const faqs = [
  {
    question: 'Is Ilaaj AI free to use?',
    answer:
      'Yes! Ilaaj AI is completely free. You can get AI health consultations and doctor-verified prescriptions without any charges.',
  },
  {
    question: 'Are prescriptions reviewed by real doctors?',
    answer:
      "Absolutely! Every prescription suggested by AI is reviewed and approved by a licensed doctor. You receive a verified prescription with the doctor's name.",
  },
  {
    question: 'Can I chat in Urdu?',
    answer:
      'Yes! Ilaaj AI fully supports Urdu. You can type in Roman Urdu or Urdu script, or use voice messages in Urdu.',
  },
  {
    question: 'How do I use it for family members?',
    answer:
      "Go to your profile and tap 'Add Member'. Create profiles for your children, parents, or any family member. Then select who you're consulting for when chatting.",
  },
  {
    question: 'Is my health information secure?',
    answer:
      'Yes, all your health data is encrypted and only accessible to you. We never share your information with anyone without your consent.',
  },
  {
    question: 'What should I do in an emergency?',
    answer:
      'For serious emergencies, immediately call 1122 (Rescue) or go to the nearest hospital. Ilaaj AI is for general health consultations, not emergencies.',
  },
]

export default function FaqAccordion() {
  const [activeFaq, setActiveFaq] = useState<number | null>(null)

  return (
    <div className="space-y-4">
      {faqs.map((faq, index) => (
        <div
          key={index}
          className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
        >
          <button
            className="w-full px-6 py-5 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
            onClick={() => setActiveFaq(activeFaq === index ? null : index)}
          >
            <span className="font-semibold text-gray-900">{faq.question}</span>
            <ChevronDown
              className={`w-5 h-5 text-gray-400 transition-transform ${
                activeFaq === index ? 'rotate-180' : ''
              }`}
            />
          </button>
          <div
            className={`overflow-hidden transition-all duration-300 ${
              activeFaq === index ? 'max-h-48' : 'max-h-0'
            }`}
          >
            <div className="px-6 pb-5 text-gray-600 leading-relaxed">
              {faq.answer}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
