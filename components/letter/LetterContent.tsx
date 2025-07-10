import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Plus, FileText, Trash2 } from 'lucide-react'

interface LetterContentProps {
  letterPages: string[]
  setLetterPages: (pages: string[]) => void
  selectedBackground: string | null
}

const BACKGROUND_CLASSES = {
  lined: 'bg-white bg-[linear-gradient(transparent_19px,#e5e7eb_19px,#e5e7eb_20px,transparent_20px)] bg-[length:100%_20px]',
  dotted: 'bg-white bg-[radial-gradient(circle_at_center,#e5e7eb_1px,transparent_1px)] bg-[length:20px_20px]',
  grid: 'bg-white bg-[linear-gradient(#e5e7eb_1px,transparent_1px),linear-gradient(90deg,#e5e7eb_1px,transparent_1px)] bg-[length:20px_20px]',
  vintage: 'bg-gradient-to-br from-amber-50 to-orange-100',
  floral: 'bg-gradient-to-br from-pink-50 to-purple-100 bg-[radial-gradient(circle_at_25%_25%,rgba(219,39,119,0.1)_2px,transparent_2px),radial-gradient(circle_at_75%_75%,rgba(168,85,247,0.1)_2px,transparent_2px)] bg-[length:40px_40px]',
  simple: 'bg-white'
}

export default function LetterContent({ letterPages, setLetterPages, selectedBackground }: LetterContentProps) {
  const backgroundClass = selectedBackground ? BACKGROUND_CLASSES[selectedBackground as keyof typeof BACKGROUND_CLASSES] : BACKGROUND_CLASSES.simple

  const handlePageChange = (index: number, value: string) => {
    const newPages = [...letterPages]
    newPages[index] = value
    setLetterPages(newPages)
  }

  const addNewPage = () => {
    setLetterPages([...letterPages, ''])
  }

  const deletePage = (index: number) => {
    if (letterPages.length > 1) {
      const newPages = letterPages.filter((_, i) => i !== index)
      setLetterPages(newPages)
    }
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-lg font-semibold mb-2">Write Letter Content</h3>
        <p className="text-sm text-muted-foreground">
          Write your letter content. You can write multiple pages and add new pages as needed.
        </p>
      </div>

      {/* Pages */}
      <div className="space-y-6">
        {letterPages.map((page, index) => (
          <Card key={index} className="relative">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  <span>Page {index + 1}</span>
                </div>
                {letterPages.length > 1 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => deletePage(index)}
                    className="text-red-500 hover:text-red-700 hover:bg-red-50"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className={`rounded-lg border-2 border-gray-200 p-4 ${backgroundClass}`}>
                <Textarea
                  value={page}
                  onChange={(e) => handlePageChange(index, e.target.value)}
                  placeholder={`Write content for page ${index + 1}...`}
                  className="min-h-[300px] resize-none border-0 bg-transparent text-gray-800 placeholder:text-gray-500 focus-visible:ring-0"
                  style={{
                    lineHeight: selectedBackground === 'lined' ? '20px' : 'normal',
                    backgroundAttachment: 'local'
                  }}
                />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Add New Page Button */}
      <div className="text-center">
        <Button
          onClick={addNewPage}
          variant="outline"
          className="flex items-center gap-2"
        >
          <Plus className="h-4 w-4" />
          Add New Page
        </Button>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-purple-600">
              {letterPages.length}
            </div>
            <div className="text-sm text-muted-foreground">
              Pages
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">
              {letterPages.reduce((total, page) => total + page.length, 0)}
            </div>
            <div className="text-sm text-muted-foreground">
              Characters
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">
              {letterPages.reduce((total, page) => total + page.split(/\s+/).filter(word => word.length > 0).length, 0)}
            </div>
            <div className="text-sm text-muted-foreground">
              Words
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-orange-600">
              {letterPages.filter(page => page.trim() !== '').length}
            </div>
            <div className="text-sm text-muted-foreground">
              Pages with Content
            </div>
          </CardContent>
        </Card>
      </div>

      {letterPages.some(page => page.trim() !== '') && (
        <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-200">
          <p className="text-sm text-green-800">
            <strong>Progress:</strong> You have written content for {letterPages.filter(page => page.trim() !== '').length} pages
          </p>
        </div>
      )}
    </div>
  )
}