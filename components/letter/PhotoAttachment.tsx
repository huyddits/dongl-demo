import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Upload, Image, X, Plus } from 'lucide-react'

interface PhotoAttachmentProps {
  attachedPhotos: string[]
  setAttachedPhotos: (photos: string[]) => void
}

const SAMPLE_PHOTOS = [
  'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=300&h=200&fit=crop',
  'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=300&h=200&fit=crop',
  'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=200&fit=crop',
  'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=300&h=200&fit=crop',
  'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=300&h=200&fit=crop',
  'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=300&h=200&fit=crop'
]

export default function PhotoAttachment({ attachedPhotos, setAttachedPhotos }: PhotoAttachmentProps) {
  const handleAddPhoto = (photoUrl: string) => {
    if (!attachedPhotos.includes(photoUrl)) {
      setAttachedPhotos([...attachedPhotos, photoUrl])
    }
  }

  const handleRemovePhoto = (photoUrl: string) => {
    setAttachedPhotos(attachedPhotos.filter(photo => photo !== photoUrl))
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const result = e.target?.result as string
        handleAddPhoto(result)
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-lg font-semibold mb-2">Attach Photos</h3>
        <p className="text-sm text-muted-foreground">
          Add photos to your letter to make it more vivid and personal
        </p>
      </div>

      {/* Upload Section */}
      <Card className="border-dashed border-2 border-gray-300 hover:border-purple-400 transition-colors">
        <CardContent className="p-6">
          <div className="text-center space-y-4">
            <div className="flex justify-center">
              <div className="rounded-full bg-purple-100 p-3">
                <Upload className="h-6 w-6 text-purple-600" />
              </div>
            </div>
            <div>
              <h4 className="font-medium mb-2">Upload Photos</h4>
              <p className="text-sm text-muted-foreground mb-4">
                Select photos from your computer or choose from sample gallery
              </p>
              <div className="flex flex-col sm:flex-row gap-2 justify-center">
                <Button variant="outline" className="relative">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  <Upload className="h-4 w-4 mr-2" />
                  Upload Photo
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Sample Photos Gallery */}
      <div>
        <h4 className="font-medium mb-4 flex items-center gap-2">
          <Image className="h-4 w-4" />
          Sample Photo Gallery
        </h4>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {SAMPLE_PHOTOS.map((photo, index) => (
            <Card 
              key={index} 
              className={`cursor-pointer transition-all hover:shadow-lg ${
                attachedPhotos.includes(photo) ? 'ring-2 ring-purple-500' : ''
              }`}
              onClick={() => handleAddPhoto(photo)}
            >
              <CardContent className="p-2">
                <div className="relative">
                  <img
                    src={photo}
                    alt={`Sample photo ${index + 1}`}
                    className="w-full h-24 object-cover rounded"
                  />
                  {attachedPhotos.includes(photo) ? (
                    <div className="absolute top-1 right-1 bg-purple-500 text-white rounded-full p-1">
                      <X className="h-3 w-3" />
                    </div>
                  ) : (
                    <div className="absolute top-1 right-1 bg-white/80 text-gray-600 rounded-full p-1">
                      <Plus className="h-3 w-3" />
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Attached Photos */}
      {attachedPhotos.length > 0 && (
        <div>
          <h4 className="font-medium mb-4">Selected Photos ({attachedPhotos.length})</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {attachedPhotos.map((photo, index) => (
              <Card key={index} className="relative group">
                <CardContent className="p-2">
                  <img
                    src={photo}
                    alt={`Attached photo ${index + 1}`}
                    className="w-full h-24 object-cover rounded"
                  />
                  <Button
                    variant="destructive"
                    size="sm"
                    className="absolute top-1 right-1 h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={() => handleRemovePhoto(photo)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Status */}
      <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
        <p className="text-sm text-blue-800">
          <strong>Status:</strong> {attachedPhotos.length === 0 ? 'No photos attached yet' : `${attachedPhotos.length} photos attached`}
        </p>
      </div>
    </div>
  )
}