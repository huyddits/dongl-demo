import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { CreditCard, Wallet, Gift, DollarSign, Check, Mail, Shield } from 'lucide-react'
import { useState } from 'react'

interface PaymentProps {
  selectedCover: string | null
  selectedBackground: string | null
  letterPages: string[]
  attachedPhotos: string[]
  attachedGames: string[]
}

const PAYMENT_METHODS = [
  {
    id: 'credit-card',
    name: 'Credit/Debit Card',
    icon: CreditCard,
    description: 'Visa, Mastercard, JCB'
  },
  {
    id: 'e-wallet',
    name: 'E-Wallet',
    icon: Wallet,
    description: 'PayPal, Apple Pay, Google Pay'
  },
  {
    id: 'bank-transfer',
    name: 'Bank Transfer',
    icon: DollarSign,
    description: 'Direct bank transfer'
  }
]

export default function Payment({ 
  selectedCover, 
  selectedBackground, 
  letterPages, 
  attachedPhotos, 
  attachedGames 
}: PaymentProps) {
  const [paymentMethod, setPaymentMethod] = useState('credit-card')
  const [email, setEmail] = useState('')
  const [recipientEmail, setRecipientEmail] = useState('')

  // Calculate pricing
  const basePrice = 50000 // Base price: 50,000 KRW
  const photoPrice = attachedPhotos.length * 5000 // 5,000 KRW per photo
  const gamePrice = attachedGames.length * 10000 // 10,000 KRW per game
  const pagePrice = Math.max(0, letterPages.length - 3) * 3000 // 3,000 KRW per additional page (first 3 free)
  
  const subtotal = basePrice + photoPrice + gamePrice + pagePrice
  const discount = subtotal > 100000 ? 10000 : 0 // 10,000 KRW discount if over 100,000
  const total = subtotal - discount

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('ko-KR', {
      style: 'currency',
      currency: 'KRW'
    }).format(price)
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-lg font-semibold mb-2">Payment</h3>
        <p className="text-sm text-muted-foreground">
          Complete payment to send your digital letter
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Order Summary */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Gift className="h-5 w-5" />
              Order Summary
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Order Details */}
            <div className="space-y-3 text-sm">
              <div className="flex justify-between items-center">
                <span>Basic digital letter</span>
                <span className="font-medium">{formatPrice(basePrice)}</span>
              </div>
              
              {attachedPhotos.length > 0 && (
                <div className="flex justify-between items-center">
                  <span>Photo attachments ({attachedPhotos.length} photos)</span>
                  <span className="font-medium">{formatPrice(photoPrice)}</span>
                </div>
              )}
              
              {attachedGames.length > 0 && (
                <div className="flex justify-between items-center">
                  <span>Games ({attachedGames.length} games)</span>
                  <span className="font-medium">{formatPrice(gamePrice)}</span>
                </div>
              )}
              
              {letterPages.length > 3 && (
                <div className="flex justify-between items-center">
                  <span>Additional pages ({letterPages.length - 3} pages)</span>
                  <span className="font-medium">{formatPrice(pagePrice)}</span>
                </div>
              )}
              
              <hr className="my-3" />
              
              <div className="flex justify-between items-center">
                <span>Subtotal</span>
                <span className="font-medium">{formatPrice(subtotal)}</span>
              </div>
              
              {discount > 0 && (
                <div className="flex justify-between items-center text-green-600">
                  <span>Discount</span>
                  <span className="font-medium">-{formatPrice(discount)}</span>
                </div>
              )}
              
              <hr className="my-3" />
              
              <div className="flex justify-between items-center text-lg font-bold">
                <span>Total</span>
                <span className="text-purple-600">{formatPrice(total)}</span>
              </div>
            </div>

            {/* Order Features */}
            <div className="mt-6 space-y-2">
              <h4 className="font-medium text-sm">Order contents:</h4>
              <div className="space-y-1 text-xs text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Check className="h-3 w-3 text-green-500" />
                  <span>Letter cover: {selectedCover || 'Not selected'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="h-3 w-3 text-green-500" />
                  <span>Paper background: {selectedBackground || 'Not selected'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="h-3 w-3 text-green-500" />
                  <span>Number of pages: {letterPages.length}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="h-3 w-3 text-green-500" />
                  <span>Photo attachments: {attachedPhotos.length}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="h-3 w-3 text-green-500" />
                  <span>Games: {attachedGames.length}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Payment Form */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <CreditCard className="h-5 w-5" />
              Payment Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Email Fields */}
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Your Email *</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your.email@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="recipient-email">Recipient Email *</Label>
                <Input
                  id="recipient-email"
                  type="email"
                  placeholder="recipient@example.com"
                  value={recipientEmail}
                  onChange={(e) => setRecipientEmail(e.target.value)}
                />
              </div>
            </div>

            {/* Payment Method Selection */}
            <div className="space-y-3">
              <Label>Payment Method</Label>
              <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                {PAYMENT_METHODS.map((method) => {
                  const IconComponent = method.icon
                  return (
                    <div key={method.id} className="flex items-center space-x-3 border rounded-lg p-3">
                      <RadioGroupItem value={method.id} id={method.id} />
                      <IconComponent className="h-4 w-4" />
                      <div className="flex-1">
                        <label htmlFor={method.id} className="text-sm font-medium cursor-pointer">
                          {method.name}
                        </label>
                        <p className="text-xs text-muted-foreground">{method.description}</p>
                      </div>
                    </div>
                  )
                })}
              </RadioGroup>
            </div>

            {/* Payment Form based on selected method */}
            {paymentMethod === 'credit-card' && (
              <div className="space-y-3">
                <div className="space-y-2">
                  <Label htmlFor="card-number">Card Number</Label>
                  <Input id="card-number" placeholder="1234 5678 9012 3456" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-2">
                    <Label htmlFor="expiry">Expiry Date</Label>
                    <Input id="expiry" placeholder="MM/YY" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cvv">CVV</Label>
                    <Input id="cvv" placeholder="123" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="card-name">Cardholder Name</Label>
                  <Input id="card-name" placeholder="Name on card" />
                </div>
              </div>
            )}

            {/* Security Notice */}
            <div className="flex items-start gap-2 p-3 bg-green-50 rounded-lg border border-green-200">
              <Shield className="h-4 w-4 text-green-600 mt-0.5" />
              <div className="text-xs text-green-800">
                <p className="font-medium">Secure Payment</p>
                <p>Payment information is encrypted and securely protected</p>
              </div>
            </div>

            {/* Submit Button */}
            <Button 
              className="w-full bg-purple-600 hover:bg-purple-700"
              size="lg"
              disabled={!email || !recipientEmail}
            >
              <Mail className="h-4 w-4 mr-2" />
              Pay and Send Letter - {formatPrice(total)}
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Additional Info */}
      <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
        <p className="text-sm text-blue-800">
          <strong>Note:</strong> After successful payment, the digital letter will be sent immediately to the recipient's email. 
          You will also receive a confirmation copy via email.
        </p>
      </div>
    </div>
  )
}