import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { 
  Gamepad2, 
  Puzzle, 
  Heart, 
  Star, 
  Check, 
  Plus 
} from 'lucide-react'

interface GameAttachmentProps {
  attachedGames: string[]
  setAttachedGames: (games: string[]) => void
}

const GAME_OPTIONS = [
  {
    id: 'puzzle',
    name: 'Jigsaw Puzzle',
    iconName: 'Puzzle',
    description: 'Puzzle game from your photos',
    preview: 'bg-gradient-to-br from-blue-400 to-purple-600',
    difficulty: 'Easy',
    estimatedTime: '5-10 minutes'
  },
  {
    id: 'memory',
    name: 'Memory Game',
    iconName: 'Star',
    description: 'Card matching memory game',
    preview: 'bg-gradient-to-br from-green-400 to-teal-600',
    difficulty: 'Medium',
    estimatedTime: '3-7 minutes'
  },
  {
    id: 'wordsearch',
    name: 'Word Search',
    iconName: 'Gamepad2',
    description: 'Find hidden words in letter grid',
    preview: 'bg-gradient-to-br from-orange-400 to-red-600',
    difficulty: 'Medium',
    estimatedTime: '10-15 minutes'
  },
  {
    id: 'love-quiz',
    name: 'Love Quiz',
    iconName: 'Heart',
    description: 'Fun questions for couples',
    preview: 'bg-gradient-to-br from-pink-400 to-rose-600',
    difficulty: 'Easy',
    estimatedTime: '5-8 minutes'
  },
  {
    id: 'crossword',
    name: 'Crossword',
    iconName: 'Puzzle',
    description: 'Custom crossword puzzle',
    preview: 'bg-gradient-to-br from-indigo-400 to-blue-600',
    difficulty: 'Hard',
    estimatedTime: '15-20 minutes'
  },
  {
    id: 'trivia',
    name: 'Fun Trivia',
    iconName: 'Star',
    description: 'Interesting questions about life',
    preview: 'bg-gradient-to-br from-yellow-400 to-orange-600',
    difficulty: 'Easy',
    estimatedTime: '5-12 minutes'
  }
]

// Helper function để lấy icon component
const getIconComponent = (iconName: string) => {
  const icons = {
    Puzzle,
    Star,
    Gamepad2,
    Heart
  }
  return icons[iconName as keyof typeof icons] || Gamepad2
}

export default function GameAttachment({ attachedGames, setAttachedGames }: GameAttachmentProps) {
  const handleToggleGame = (gameId: string) => {
    if (attachedGames.includes(gameId)) {
      setAttachedGames(attachedGames.filter(game => game !== gameId))
    } else {
      setAttachedGames([...attachedGames, gameId])
    }
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-lg font-semibold mb-2">Attach Games</h3>
        <p className="text-sm text-muted-foreground">
          Add fun interactive games to make your letter more engaging
        </p>
      </div>

      {/* Game Options */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {GAME_OPTIONS.map((game) => {
          const IconComponent = getIconComponent(game.iconName)
          const isSelected = attachedGames.includes(game.id)
          
          return (
            <Card 
              key={game.id} 
              className={`cursor-pointer transition-all hover:shadow-lg ${
                isSelected ? 'ring-2 ring-purple-500' : ''
              }`}
              onClick={() => handleToggleGame(game.id)}
            >
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <IconComponent className="h-4 w-4" />
                    <span>{game.name}</span>
                  </div>
                  {isSelected && (
                    <div className="bg-purple-500 text-white rounded-full p-1">
                      <Check className="h-3 w-3" />
                    </div>
                  )}
                </CardTitle>
                <CardDescription className="text-xs">
                  {game.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {/* Preview */}
                <div className={`h-24 w-full rounded-lg ${game.preview} relative flex items-center justify-center`}>
                  <div className="text-white text-xs font-medium bg-black/20 px-2 py-1 rounded">
                    Xem trước
                  </div>
                  {isSelected && (
                    <div className="absolute top-2 right-2 bg-white text-purple-500 rounded-full p-1">
                      <Check className="h-3 w-3" />
                    </div>
                  )}
                </div>

                {/* Game Info */}
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Difficulty:</span>
                    <span className={`font-medium ${
                      game.difficulty === 'Easy' ? 'text-green-600' : 
                      game.difficulty === 'Medium' ? 'text-yellow-600' : 'text-red-600'
                    }`}>
                      {game.difficulty}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Time:</span>
                    <span className="font-medium">{game.estimatedTime}</span>
                  </div>
                </div>

                {/* Action */}
                <Button
                  variant={isSelected ? "default" : "outline"}
                  className="w-full"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation()
                    handleToggleGame(game.id)
                  }}
                >
                  {isSelected ? (
                    <>
                      <Check className="h-4 w-4 mr-2" />
                      Selected
                    </>
                  ) : (
                    <>
                      <Plus className="h-4 w-4 mr-2" />
                      Add to Letter
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Selected Games Summary */}
      {attachedGames.length > 0 && (
        <Card className="bg-purple-50 border-purple-200">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm flex items-center gap-2">
              <Gamepad2 className="h-4 w-4" />
              Selected Games ({attachedGames.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {attachedGames.map((gameId) => {
                const game = GAME_OPTIONS.find(g => g.id === gameId)
                const IconComponent = getIconComponent(game?.iconName || 'Gamepad2')
                return (
                  <div key={gameId} className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <IconComponent className="h-4 w-4 text-purple-600" />
                      <span className="font-medium">{game?.name}</span>
                      <span className="text-muted-foreground">({game?.estimatedTime})</span>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleToggleGame(gameId)}
                      className="text-red-500 hover:text-red-700 hover:bg-red-50 h-8 w-8 p-0"
                    >
                      <Check className="h-3 w-3" />
                    </Button>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Status */}
      <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
        <p className="text-sm text-blue-800">
          <strong>Status:</strong> {attachedGames.length === 0 ? 'No games attached yet' : `${attachedGames.length} games attached`}
        </p>
        {attachedGames.length > 0 && (
          <p className="text-xs text-blue-600 mt-1">
            Estimated total play time: {
              attachedGames.reduce((total, gameId) => {
                const game = GAME_OPTIONS.find(g => g.id === gameId)
                const time = game?.estimatedTime.split('-')[1]?.replace(' minutes', '') || '0'
                return total + parseInt(time)
              }, 0)
            } minutes
          </p>
        )}
      </div>
    </div>
  )
}