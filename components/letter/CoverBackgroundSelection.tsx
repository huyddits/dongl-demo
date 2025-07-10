import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Check, Image, Palette } from 'lucide-react'

interface CoverBackgroundSelectionProps {
  selectedCover: string | null
  setSelectedCover: (cover: string) => void
  selectedBackground: string | null
  setSelectedBackground: (background: string) => void
}

const COVER_OPTIONS = [
  {
    id: 'romantic',
    name: 'Romantic',
    preview: 'bg-gradient-to-br from-pink-400 to-purple-600',
    description: 'Perfect for love letters'
  },
  {
    id: 'birthday',
    name: 'Birthday',
    preview: 'bg-gradient-to-br from-yellow-400 to-orange-500',
    description: 'Great for birthday wishes'
  },
  {
    id: 'holiday',
    name: 'Holiday',
    preview: 'bg-gradient-to-br from-green-400 to-blue-500',
    description: 'For special occasions'
  },
  {
    id: 'business',
    name: 'Business',
    preview: 'bg-gradient-to-br from-gray-600 to-gray-800',
    description: 'Professional style'
  },
  {
    id: 'friendship',
    name: 'Friendship',
    preview: 'bg-gradient-to-br from-cyan-400 to-teal-500',
    description: 'Send to close friends'
  },
  {
    id: 'family',
    name: 'Family',
    preview: 'bg-gradient-to-br from-amber-400 to-red-500',
    description: 'For family members'
  }
]

const BACKGROUND_OPTIONS = [
  {
    id: 'lined',
    name: 'Lined Paper',
    preview: 'bg-white bg-[linear-gradient(transparent_19px,#e5e7eb_19px,#e5e7eb_20px,transparent_20px)] bg-[length:100%_20px]',
    description: 'Traditional lined paper'
  },
  {
    id: 'dotted',
    name: 'Dotted',
    preview: 'bg-white bg-[radial-gradient(circle_at_center,#e5e7eb_1px,transparent_1px)] bg-[length:20px_20px]',
    description: 'Modern dotted pattern'
  },
  {
    id: 'grid',
    name: 'Grid',
    preview: 'bg-white bg-[linear-gradient(#e5e7eb_1px,transparent_1px),linear-gradient(90deg,#e5e7eb_1px,transparent_1px)] bg-[length:20px_20px]',
    description: 'Grid pattern for structure'
  },
  {
    id: 'vintage',
    name: 'Vintage',
    preview: 'bg-gradient-to-br from-amber-50 to-orange-100',
    description: 'Warm vintage paper'
  },
  {
    id: 'floral',
    name: 'Floral',
    preview: 'bg-gradient-to-br from-pink-50 to-purple-100 bg-[radial-gradient(circle_at_25%_25%,rgba(219,39,119,0.1)_2px,transparent_2px),radial-gradient(circle_at_75%_75%,rgba(168,85,247,0.1)_2px,transparent_2px)] bg-[length:40px_40px]',
    description: 'Elegant floral background'
  },
  {
    id: 'simple',
    name: 'Simple',
    preview: 'bg-white',
    description: 'Clean white background'
  }
]

export default function CoverBackgroundSelection({ 
  selectedCover, 
  setSelectedCover, 
  selectedBackground, 
  setSelectedBackground 
}: CoverBackgroundSelectionProps) {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h3 className="text-lg font-semibold mb-2">Choose Cover & Background</h3>
        <p className="text-sm text-muted-foreground">
          Select a cover style and background pattern for your letter
        </p>
      </div>

      {/* Cover Selection */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Image className="h-5 w-5 text-purple-500" />
          <h4 className="text-lg font-medium">Letter Cover</h4>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {COVER_OPTIONS.map((cover) => (
            <Card 
              key={cover.id} 
              className={`cursor-pointer transition-all hover:shadow-lg ${
                selectedCover === cover.id ? 'ring-2 ring-purple-500' : ''
              }`}
              onClick={() => setSelectedCover(cover.id)}
            >
              <CardContent className="p-4">
                <div className="space-y-3">
                  {/* Preview */}
                  <div className={`h-24 w-full rounded-lg ${cover.preview} relative flex items-center justify-center`}>
                    <div className="text-white text-sm font-medium bg-black/20 px-3 py-1 rounded">
                      Preview
                    </div>
                    {selectedCover === cover.id && (
                      <div className="absolute top-2 right-2 bg-purple-500 text-white rounded-full p-1">
                        <Check className="h-4 w-4" />
                      </div>
                    )}
                  </div>

                  {/* Info */}
                  <div className="space-y-2">
                    <h4 className="font-medium">{cover.name}</h4>
                    <p className="text-sm text-muted-foreground">{cover.description}</p>
                  </div>

                  {/* Action */}
                  <Button
                    variant={selectedCover === cover.id ? "default" : "outline"}
                    className="w-full"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation()
                      setSelectedCover(cover.id)
                    }}
                  >
                    {selectedCover === cover.id ? 'Selected' : 'Select Cover'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Background Selection */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Palette className="h-5 w-5 text-purple-500" />
          <h4 className="text-lg font-medium">Paper Background</h4>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {BACKGROUND_OPTIONS.map((bg) => (
            <Card 
              key={bg.id} 
              className={`cursor-pointer transition-all hover:shadow-lg ${
                selectedBackground === bg.id ? 'ring-2 ring-purple-500' : ''
              }`}
              onClick={() => setSelectedBackground(bg.id)}
            >
              <CardContent className="p-4">
                <div className="space-y-3">
                  {/* Preview */}
                  <div className={`h-24 w-full rounded-lg border-2 border-gray-200 ${bg.preview} relative flex items-center justify-center`}>
                    <div className="text-gray-600 text-sm font-medium bg-white/80 px-3 py-1 rounded shadow-sm">
                      Preview
                    </div>
                    {selectedBackground === bg.id && (
                      <div className="absolute top-2 right-2 bg-purple-500 text-white rounded-full p-1">
                        <Check className="h-4 w-4" />
                      </div>
                    )}
                  </div>

                  {/* Info */}
                  <div className="space-y-2">
                    <h4 className="font-medium">{bg.name}</h4>
                    <p className="text-sm text-muted-foreground">{bg.description}</p>
                  </div>

                  {/* Action */}
                  <Button
                    variant={selectedBackground === bg.id ? "default" : "outline"}
                    className="w-full"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation()
                      setSelectedBackground(bg.id)
                    }}
                  >
                    {selectedBackground === bg.id ? 'Selected' : 'Select Background'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Selection Summary */}
      {(selectedCover || selectedBackground) && (
        <div className="mt-6 p-4 bg-purple-50 rounded-lg border border-purple-200">
          <h4 className="font-medium text-purple-800 mb-2">Current Selection:</h4>
          <div className="space-y-1 text-sm text-purple-700">
            {selectedCover && (
              <p><strong>Cover:</strong> {COVER_OPTIONS.find(c => c.id === selectedCover)?.name}</p>
            )}
            {selectedBackground && (
              <p><strong>Background:</strong> {BACKGROUND_OPTIONS.find(bg => bg.id === selectedBackground)?.name}</p>
            )}
          </div>
        </div>
      )}
    </div>
  )
}