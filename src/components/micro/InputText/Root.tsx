import { ExclamationCircleIcon } from "@heroicons/react/24/solid"

interface InputTextProps {
  label: string
  children?: React.ReactNode
  className?: string
  placeholder?: string
  validationError?: boolean
  invalidMessage?: string
  defaultValue?: string
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
}


export default function Root({label, children, className, placeholder, validationError, invalidMessage, defaultValue, onChange}: InputTextProps) {
    return (
      <div className={className}>
        <label htmlFor={label} className="block text-sm font-medium leading-6 text-gray-900">
          {label}
        </label>
        <div className={`mt-2`}>
          <div className={`flex pl-2 rounded-md shadow-sm ring-1 ring-inset ${validationError ? 'ring-red-300 ' : 'ring-gray-300'} focus-within:ring-2 focus-within:ring-inset focus-within:ring-blue-600`}>
            {children}
            <input
              id={label}
              name={label}
              type="text"
              onChange={onChange}
              placeholder={placeholder}
              aria-invalid={validationError}
              defaultValue={defaultValue}
              className={
                `block flex-1 border-0 bg-transparent py-1.5 pl-1 focus:ring-0 sm:text-sm sm:leading-6 
                ${
                  validationError ? 
                  'text-red-900 ring-red-300 placeholder:text-red-300 focus:ring-red-500 -mr-8' 
                  :
                  'text-gray-900 placeholder:text-gray-400'
                }`
              }
            />
            {validationError ? (
              <div className="pointer-events-none inset-y-0 right-0 flex items-center pr-3">
                <ExclamationCircleIcon aria-hidden="true" className="h-5 w-5 text-red-500" />
              </div>
            ) : null}
          </div>
        </div>
        {validationError ? (
          <p id="email-error" className="mt-2 text-sm text-red-600">
            {invalidMessage}
          </p>
        ) : null}
      </div>
    )
  }