import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Check } from 'lucide-react'

interface BackgroundSelectionProps {
  selectedBackground: string | null
  setSelectedBackground: (background: string) => void
}

const BACKGROUND_OPTIONS = [
  {
    id: 'lined',
    name: 'Giấy kẻ dòng',
    preview: 'bg-white bg-[linear-gradient(transparent_19px,#e5e7eb_19px,#e5e7eb_20px,transparent_20px)] bg-[length:100%_20px]',
    description: 'Giấy kẻ dòng truyền thống'
  },
  {
    id: 'dotted',
    name: 'Giấy chấm bi',
    preview: 'bg-white bg-[radial-gradient(circle_at_center,#e5e7eb_1px,transparent_1px)] bg-[length:20px_20px]',
    description: 'Giấy chấm bi hiện đại'
  },
  {
    id: 'grid',
    name: 'Giấy ô vuông',
    preview: 'bg-white bg-[linear-gradient(#e5e7eb_1px,transparent_1px),linear-gradient(90deg,#e5e7eb_1px,transparent_1px)] bg-[length:20px_20px]',
    description: 'Giấy ô vuông tiện lợi'
  },
  {
    id: 'vintage',
    name: 'Giấy cổ điển',
    preview: 'bg-gradient-to-br from-amber-50 to-orange-100',
    description: 'Nền giấy cổ điển ấm áp'
  },
  {
    id: 'floral',
    name: 'Hoa văn',
    preview: 'bg-gradient-to-br from-pink-50 to-purple-100 bg-[radial-gradient(circle_at_25%_25%,rgba(219,39,119,0.1)_2px,transparent_2px),radial-gradient(circle_at_75%_75%,rgba(168,85,247,0.1)_2px,transparent_2px)] bg-[length:40px_40px]',
    description: 'Nền hoa văn trang nhã'
  },
  {
    id: 'simple',
    name: 'Đơn giản',
    preview: 'bg-white',
    description: 'Nền trắng đơn giản'
  }
]

export default function BackgroundSelection({ selectedBackground, setSelectedBackground }: BackgroundSelectionProps) {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-lg font-semibold mb-2">Chọn nền thư</h3>
        <p className="text-sm text-muted-foreground">
          Chọn loại nền giấy cho nội dung thư của bạn
        </p>
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
                <div className={`h-32 w-full rounded-lg border-2 border-gray-200 ${bg.preview} relative flex items-center justify-center`}>
                  <div className="text-gray-600 text-sm font-medium bg-white/80 px-3 py-1 rounded shadow-sm">
                    Xem trước
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
                  onClick={(e) => {
                    e.stopPropagation()
                    setSelectedBackground(bg.id)
                  }}
                >
                  {selectedBackground === bg.id ? 'Đã chọn' : 'Chọn nền này'}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {selectedBackground && (
        <div className="mt-6 p-4 bg-purple-50 rounded-lg border border-purple-200">
          <p className="text-sm text-purple-800">
            <strong>Đã chọn:</strong> Nền {BACKGROUND_OPTIONS.find(bg => bg.id === selectedBackground)?.name}
          </p>
        </div>
      )}
    </div>
  )
}