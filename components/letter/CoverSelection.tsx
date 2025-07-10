import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Check } from 'lucide-react'

interface CoverSelectionProps {
  selectedCover: string | null
  setSelectedCover: (cover: string) => void
}

const COVER_OPTIONS = [
  {
    id: 'romantic',
    name: 'Lãng mạn',
    preview: 'bg-gradient-to-br from-pink-400 to-purple-600',
    description: 'Phù hợp cho thư tình yêu'
  },
  {
    id: 'birthday',
    name: 'Sinh nhật',
    preview: 'bg-gradient-to-br from-yellow-400 to-orange-500',
    description: 'Tối ưu cho lời chúc sinh nhật'
  },
  {
    id: 'holiday',
    name: 'Kỳ nghỉ',
    preview: 'bg-gradient-to-br from-green-400 to-blue-500',
    description: 'Dành cho những dịp lễ đặc biệt'
  },
  {
    id: 'business',
    name: 'Công việc',
    preview: 'bg-gradient-to-br from-gray-600 to-gray-800',
    description: 'Phong cách chuyên nghiệp'
  },
  {
    id: 'friendship',
    name: 'Hữu nghị',
    preview: 'bg-gradient-to-br from-cyan-400 to-teal-500',
    description: 'Gửi tặng bạn bè thân thiết'
  },
  {
    id: 'family',
    name: 'Gia đình',
    preview: 'bg-gradient-to-br from-amber-400 to-red-500',
    description: 'Thư gửi người thân trong gia đình'
  }
]

export default function CoverSelection({ selectedCover, setSelectedCover }: CoverSelectionProps) {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-lg font-semibold mb-2">Chọn bìa thư</h3>
        <p className="text-sm text-muted-foreground">
          Chọn một mẫu bìa phù hợp với nội dung thư của bạn
        </p>
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
                <div className={`h-32 w-full rounded-lg ${cover.preview} relative flex items-center justify-center`}>
                  <div className="text-white text-sm font-medium bg-black/20 px-3 py-1 rounded">
                    Xem trước
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
                  onClick={(e) => {
                    e.stopPropagation()
                    setSelectedCover(cover.id)
                  }}
                >
                  {selectedCover === cover.id ? 'Đã chọn' : 'Chọn bìa này'}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {selectedCover && (
        <div className="mt-6 p-4 bg-purple-50 rounded-lg border border-purple-200">
          <p className="text-sm text-purple-800">
            <strong>Đã chọn:</strong> Bìa thư {COVER_OPTIONS.find(c => c.id === selectedCover)?.name}
          </p>
        </div>
      )}
    </div>
  )
}