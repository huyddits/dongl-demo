'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { ChevronLeft, ChevronRight, Mail } from 'lucide-react'

import CoverBackgroundSelection from '@/components/letter/CoverBackgroundSelection'
import LetterContent from '@/components/letter/LetterContent'
import PhotoAttachment from '@/components/letter/PhotoAttachment'
import GameAttachment from '@/components/letter/GameAttachment'
import AddressSelection from '@/components/letter/AddressSelection'
import Payment from '@/components/letter/Payment'

const STEPS = [
  { id: 1, name: 'Cover & Background', component: CoverBackgroundSelection },
  { id: 2, name: 'Write Content', component: LetterContent },
  { id: 3, name: 'Attach Photos', component: PhotoAttachment },
  { id: 4, name: 'Attach Games', component: GameAttachment },
  { id: 5, name: 'Delivery Address', component: AddressSelection },
  { id: 6, name: 'Payment', component: Payment },
]

export default function LetterCreationPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [selectedCover, setSelectedCover] = useState<string | null>(null)
  const [selectedBackground, setSelectedBackground] = useState<string | null>(null)
  const [letterPages, setLetterPages] = useState<string[]>(['', '', ''])
  const [attachedPhotos, setAttachedPhotos] = useState<string[]>([])
  const [attachedGames, setAttachedGames] = useState<string[]>([])
  const [selectedAddress, setSelectedAddress] = useState<string | null>(null)
  const [customAddress, setCustomAddress] = useState<string>('')

  const progress = (currentStep / STEPS.length) * 100
  const CurrentStepComponent = STEPS[currentStep - 1].component

  const handleNext = () => {
    if (currentStep < STEPS.length) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleStepClick = (stepId: number) => {
    setCurrentStep(stepId)
  }

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return selectedCover !== null && selectedBackground !== null
      case 2:
        return letterPages.some(page => page.trim() !== '')
      case 5:
        return selectedAddress !== null || customAddress.trim() !== ''
      default:
        return true
    }
  }

  return (
    <div className="container py-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8">
          <div className="mb-4 flex items-center gap-2">
            <Mail className="h-6 w-6 text-purple-500" />
            <h1 className="text-3xl font-bold">Create Digital Letter</h1>
          </div>
          <p className="mb-6 text-lg text-muted-foreground">
            Create a beautiful digital letter with simple steps
          </p>

          {/* Progress Bar */}
          <div className="mb-6">
            <div className="mb-4 flex items-center justify-between">
              <span className="text-sm font-medium">Step {currentStep} / {STEPS.length}</span>
              <span className="text-sm text-muted-foreground">{Math.round(progress)}% completed</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          {/* Steps Navigation */}
          <div className="mb-8 grid grid-cols-2 gap-2 md:grid-cols-6">
            {STEPS.map((step) => (
              <Button
                key={step.id}
                variant={currentStep === step.id ? "default" : currentStep > step.id ? "outline" : "ghost"}
                className={`h-auto flex-col gap-1 p-3 text-xs ${
                  currentStep === step.id 
                    ? 'bg-purple-500 text-white' 
                    : currentStep > step.id 
                      ? 'border-green-500 text-green-600' 
                      : 'text-muted-foreground'
                }`}
                onClick={() => handleStepClick(step.id)}
                disabled={currentStep < step.id}
              >
                <span className="text-lg font-bold">{step.id}</span>
                <span className="text-center leading-tight">{step.name}</span>
              </Button>
            ))}
          </div>
        </div>

        {/* Current Step Content */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-purple-500 text-white text-sm font-bold">
                {currentStep}
              </span>
              {STEPS[currentStep - 1].name}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <CurrentStepComponent
              selectedCover={selectedCover}
              setSelectedCover={setSelectedCover}
              selectedBackground={selectedBackground}
              setSelectedBackground={setSelectedBackground}
              letterPages={letterPages}
              setLetterPages={setLetterPages}
              attachedPhotos={attachedPhotos}
              setAttachedPhotos={setAttachedPhotos}
              attachedGames={attachedGames}
              setAttachedGames={setAttachedGames}
              selectedAddress={selectedAddress}
              setSelectedAddress={setSelectedAddress}
              customAddress={customAddress}
              setCustomAddress={setCustomAddress}
            />
          </CardContent>
        </Card>

        {/* Navigation Buttons */}
        <div className="flex justify-between">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentStep === 1}
            className="flex items-center gap-2"
          >
            <ChevronLeft className="h-4 w-4" />
            Previous
          </Button>
          
          <div className="flex gap-2">
            {currentStep < STEPS.length && (
              <Button
                onClick={handleNext}
                disabled={!canProceed()}
                className="flex items-center gap-2"
              >
                Next
                <ChevronRight className="h-4 w-4" />
              </Button>
            )}
            
            {currentStep === STEPS.length && (
              <Button className="bg-green-600 hover:bg-green-700">
                Complete Order
              </Button>
            )}
          </div>
        </div>

        {/* Current Step Info */}
        <div className="mt-8 rounded-lg bg-muted p-4">
          <h3 className="mb-2 font-semibold">Current Step:</h3>
          <p className="text-sm text-muted-foreground">
            {STEPS[currentStep - 1].name} - {currentStep === 1 && "Choose cover and background for your letter"}
            {currentStep === 2 && "Write your letter content"}
            {currentStep === 3 && "Add photo attachments"}
            {currentStep === 4 && "Add game attachments"}
            {currentStep === 5 && "Select delivery address in Korea"}
            {currentStep === 6 && "Complete payment and order"}
          </p>
        </div>
      </div>
    </div>
  )
}