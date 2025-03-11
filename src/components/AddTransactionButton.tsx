import { StyledButton } from "./micro/StyledButton"
import { useAnimate } from "motion/react"
import { CheckCircleIcon } from "@heroicons/react/20/solid"
import { useState } from "react"

const AddTransactionButton = ({action}: {action: () => void}) => {

    const [checked, setChecked] = useState<boolean>(false)

    const [scope, animate] = useAnimate()

    const onButtonClick = () => {
        animate([
            [".addName", { y: -32, display: "none" }, { duration: 0.2, delay: 0 }],
            [".icon", { scale: 1, display: "block" }, { duration: 0.2, delay: 0 }],
            [".icon", { scale: 0, display: "none" }, { duration: 0.4, delay: 0.4 }],
            [".addName", { y: 0, display: "block" }, { duration: 0.4, delay: 0 }],
        ]);
        setChecked(true)
        setTimeout(() => setChecked(false), 1300)
    }

    return (
        <div ref={scope}>

            <StyledButton.Root className='checkButton h-9 mt-8 flex disabled:cursor-not-allowed overflow-hidden'
            action={() => {
                action()
                onButtonClick()
            }}
            disabled={checked}
            
            >
                <div className="addName">Adicionar</div>
                <CheckCircleIcon className="icon w-6 h-6 mx-[20px] scale-0 hidden" />
            </StyledButton.Root> 
        </div>
    )
}

export default AddTransactionButton