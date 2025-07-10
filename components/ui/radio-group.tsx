import * as React from "react"

interface RadioGroupProps {
  value?: string
  onValueChange?: (value: string) => void
  children: React.ReactNode
  className?: string
}

interface RadioGroupItemProps {
  value: string
  id?: string
  className?: string
  children?: React.ReactNode
}

const RadioGroupContext = React.createContext<{
  value?: string
  onValueChange?: (value: string) => void
}>({})

const RadioGroup = React.forwardRef<HTMLDivElement, RadioGroupProps>(
  ({ className = "", value, onValueChange, children, ...props }, ref) => {
    return (
      <RadioGroupContext.Provider value={{ value, onValueChange }}>
        <div
          ref={ref}
          className={`grid gap-2 ${className}`}
          role="radiogroup"
          {...props}
        >
          {children}
        </div>
      </RadioGroupContext.Provider>
    )
  }
)
RadioGroup.displayName = "RadioGroup"

const RadioGroupItem = React.forwardRef<HTMLButtonElement, RadioGroupItemProps>(
  ({ className = "", value, id, children, ...props }, ref) => {
    const { value: selectedValue, onValueChange } = React.useContext(RadioGroupContext)
    const isSelected = selectedValue === value

    return (
      <button
        ref={ref}
        type="button"
        role="radio"
        aria-checked={isSelected}
        id={id}
        className={`aspect-square h-4 w-4 rounded-full border border-gray-300 text-purple-600 ring-offset-white focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 relative ${className}`}
        onClick={() => onValueChange?.(value)}
        {...props}
      >
        {isSelected && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-2.5 w-2.5 rounded-full bg-purple-600" />
          </div>
        )}
        {children}
      </button>
    )
  }
)
RadioGroupItem.displayName = "RadioGroupItem"

export { RadioGroup, RadioGroupItem }