import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { MapPin, Edit3, Check } from 'lucide-react'
import { useState } from 'react'

interface AddressSelectionProps {
  selectedAddress: string | null
  setSelectedAddress: (address: any) => void
  customAddress: string
  setCustomAddress: (address: string) => void
}

const KOREA_ADDRESSES = [
  {
    id: 'seoul-gangnam',
    district: 'Gangnam-gu',
    city: 'Seoul',
    address: '123 Gangnam-daero, Gangnam-gu, Seoul 06283',
    description: 'Popular shopping and business district'
  },
  {
    id: 'seoul-hongdae',
    district: 'Mapo-gu',
    city: 'Seoul',
    address: '456 Hongik-ro, Mapo-gu, Seoul 04062',
    description: 'University area with vibrant nightlife'
  },
  {
    id: 'seoul-myeongdong',
    district: 'Jung-gu',
    city: 'Seoul',
    address: '789 Myeongdong-gil, Jung-gu, Seoul 04537',
    description: 'Famous shopping district'
  },
  {
    id: 'busan-haeundae',
    district: 'Haeundae-gu',
    city: 'Busan',
    address: '321 Haeundae-ro, Haeundae-gu, Busan 48094',
    description: 'Beautiful beach area'
  },
  {
    id: 'busan-seomyeon',
    district: 'Busanjin-gu',
    city: 'Busan',
    address: '654 Seomyeon-ro, Busanjin-gu, Busan 47285',
    description: 'Central business district'
  },
  {
    id: 'incheon-songdo',
    district: 'Yeonsu-gu',
    city: 'Incheon',
    address: '987 Songdogukje-daero, Yeonsu-gu, Incheon 21984',
    description: 'Modern international business district'
  },
  {
    id: 'daegu-dongseong',
    district: 'Jung-gu',
    city: 'Daegu',
    address: '147 Dongseong-ro, Jung-gu, Daegu 41911',
    description: 'Historic downtown area'
  },
  {
    id: 'daejeon-dunsan',
    district: 'Seo-gu',
    city: 'Daejeon',
    address: '258 Dunsan-ro, Seo-gu, Daejeon 35229',
    description: 'Government and business hub'
  },
  {
    id: 'gwangju-sangmu',
    district: 'Seo-gu',
    city: 'Gwangju',
    address: '369 Sangmu-daero, Seo-gu, Gwangju 61949',
    description: 'Cultural and administrative center'
  },
  {
    id: 'ulsan-samsan',
    district: 'Nam-gu',
    city: 'Ulsan',
    address: '741 Samsan-ro, Nam-gu, Ulsan 44776',
    description: 'Industrial city center'
  }
]

export default function AddressSelection({ 
  selectedAddress, 
  setSelectedAddress, 
  customAddress, 
  setCustomAddress 
}: AddressSelectionProps) {
  const [addressMode, setAddressMode] = useState<'preset' | 'custom'>('preset')

  const handleAddressModeChange = (mode: 'preset' | 'custom') => {
    setAddressMode(mode)
    if (mode === 'preset') {
      setCustomAddress('')
    } else {
      setSelectedAddress(null)
    }
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-lg font-semibold mb-2">Delivery Address in Korea</h3>
        <p className="text-sm text-muted-foreground">
          Select a delivery address in South Korea for your digital letter
        </p>
      </div>

      {/* Address Mode Selection */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            Address Type
          </CardTitle>
        </CardHeader>
        <CardContent>
          <RadioGroup 
            value={addressMode} 
            onValueChange={(value) => handleAddressModeChange(value as 'preset' | 'custom')}
          >
            <div className="flex items-center space-x-3 border rounded-lg p-3">
              <RadioGroupItem value="preset" id="preset" />
              <div className="flex-1">
                <label htmlFor="preset" className="text-sm font-medium cursor-pointer">
                  Choose from Popular Addresses
                </label>
                <p className="text-xs text-muted-foreground">Select from 10 popular Korean addresses</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 border rounded-lg p-3">
              <RadioGroupItem value="custom" id="custom" />
              <div className="flex-1">
                <label htmlFor="custom" className="text-sm font-medium cursor-pointer">
                  Enter Custom Address
                </label>
                <p className="text-xs text-muted-foreground">Type your own Korean address</p>
              </div>
            </div>
          </RadioGroup>
        </CardContent>
      </Card>

      {/* Preset Addresses */}
      {addressMode === 'preset' && (
        <div className="space-y-4">
          <h4 className="font-medium">Popular Addresses in Korea</h4>
          <div className="grid grid-cols-1 gap-3">
            {KOREA_ADDRESSES.map((address) => (
              <Card 
                key={address.id}
                className={`cursor-pointer transition-all hover:shadow-md ${
                  selectedAddress === address.id ? 'ring-2 ring-purple-500 bg-purple-50' : ''
                }`}
                onClick={() => setSelectedAddress(address.id)}
              >
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <MapPin className="h-4 w-4 text-purple-500" />
                        <span className="font-medium">{address.district}, {address.city}</span>
                        {selectedAddress === address.id && (
                          <Check className="h-4 w-4 text-purple-500" />
                        )}
                      </div>
                      <p className="text-sm text-gray-600 mb-1">{address.address}</p>
                      <p className="text-xs text-muted-foreground">{address.description}</p>
                    </div>
                    <Button
                      variant={selectedAddress === address.id ? "default" : "outline"}
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation()
                        setSelectedAddress(address.id)
                      }}
                    >
                      {selectedAddress === address.id ? 'Selected' : 'Select'}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Custom Address */}
      {addressMode === 'custom' && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Edit3 className="h-4 w-4" />
              Enter Custom Address
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="custom-address">Full Address in Korea</Label>
              <Input
                id="custom-address"
                placeholder="Enter complete Korean address (e.g., 123 Street Name, District, City, Postal Code)"
                value={customAddress}
                onChange={(e) => setCustomAddress(e.target.value)}
                className="min-h-[100px]"
              />
            </div>
            <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
              <p className="text-sm text-blue-800">
                <strong>Format example:</strong> 123 Gangnam-daero, Gangnam-gu, Seoul 06283, South Korea
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Selection Summary */}
      {(selectedAddress || customAddress.trim()) && (
        <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-200">
          <h4 className="font-medium text-green-800 mb-2 flex items-center gap-2">
            <Check className="h-4 w-4" />
            Selected Delivery Address:
          </h4>
          <div className="text-sm text-green-700">
            {selectedAddress && (
              <div>
                {(() => {
                  const addr = KOREA_ADDRESSES.find(a => a.id === selectedAddress)
                  return (
                    <div>
                      <p className="font-medium">{addr?.district}, {addr?.city}</p>
                      <p>{addr?.address}</p>
                    </div>
                  )
                })()}
              </div>
            )}
            {customAddress.trim() && (
              <p>{customAddress}</p>
            )}
          </div>
        </div>
      )}

      {/* Address Requirements */}
      <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
        <h4 className="font-medium text-gray-800 mb-2">Delivery Information:</h4>
        <ul className="text-sm text-gray-600 space-y-1">
          <li>• Digital letters are delivered via email immediately</li>
          <li>• Physical address is used for verification and future services</li>
          <li>• All addresses must be within South Korea</li>
          <li>• Delivery confirmation will be sent to your email</li>
        </ul>
      </div>
    </div>
  )
}