import { CheckCircleIcon, ExclamationTriangleIcon, InformationCircleIcon, XCircleIcon } from '@heroicons/react/20/solid'

export default function Alert({ type, message }: { type: 'error' | 'warning' | 'success' | 'info', message: string }) {

    let icon, color
    switch (type) {
        case 'error':
            icon = <XCircleIcon className="h-5 w-5 text-red-400" aria-hidden="true" />
            color = 'red'
            break
        case 'warning':
            icon = <ExclamationTriangleIcon className="h-5 w-5 text-yellow-400" aria-hidden="true" />
            color = 'yellow'
            break
        case 'success':
            icon = <CheckCircleIcon className="h-5 w-5 text-green-400" aria-hidden="true" />
            color = 'green'
            break
        case 'info':
            icon = <InformationCircleIcon className="h-5 w-5 text-blue-400" aria-hidden="true" />
            color = 'blue'
            break
    }

    return (
        <div className={`rounded-md bg-${color}-50 p-4`}>
        <div className="flex">
            <div className="flex-shrink-0">
            {icon}
            </div>
            <div className="ml-3">
            <h3 className={`text-sm font-medium text-${color}-800`}>{message}</h3>
            </div>
        </div>
        </div>
    )
}