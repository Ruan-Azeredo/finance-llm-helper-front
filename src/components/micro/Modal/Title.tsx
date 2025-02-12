import { DialogTitle } from '@headlessui/react'


const Title = ({title} : {title: string}) => {
    return (
        <DialogTitle as="h3" className="text-base font-semibold text-gray-900">
        {title}
        </DialogTitle>

    )
}

export default Title