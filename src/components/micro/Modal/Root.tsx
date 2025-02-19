import { Dialog, DialogBackdrop, DialogPanel} from '@headlessui/react'

const Root = (
    {
        children, open, setOpen
    } : {
        children: React.ReactNode, 
        open: boolean, 
        setOpen: React.Dispatch<React.SetStateAction<boolean>>
    }) => {
    return (
        <Dialog open={open} onClose={setOpen} className="relative z-50">
            <DialogBackdrop
            transition
            className="fixed inset-0 bg-gray-500/75 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
            />

            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                    <DialogPanel
                        transition
                        className="relative transform rounded-lg bg-white text-left shadow-xl transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 sm:w-full md:max-w-3xl sm:max-w-xl data-closed:sm:translate-y-0 data-closed:sm:scale-95"
                    >
                        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
                        <div className="flex min-h-full items-end justify-center text-center sm:items-center sm:p-0">
                            <div className="relative transform rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:w-full sm:max-w-3xl sm:p-6">
                                {children}
                            </div>
                        </div>
                    </DialogPanel>
                </div>
            </div>
        </Dialog>
    )
}

export default Root