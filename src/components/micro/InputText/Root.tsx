interface InputTextProps {
  label: string,
  children?: React.ReactNode
  className?: string
  placeholder?: string
}

export default function Root({label, children, className, placeholder}: InputTextProps) {
    return (
      <div className={className}>
        <label htmlFor={label} className="block text-sm font-medium leading-6 text-gray-900">
          {label}
        </label>
        <div className={`mt-2`}>
          <div className="flex pl-2 rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
            {children}
            <input
              id={label}
              name={label}
              type="text"
              placeholder={placeholder}
              className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
            />
          </div>
        </div>
      </div>
    )
  }