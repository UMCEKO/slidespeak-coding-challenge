import {Dispatch, FC, SetStateAction} from "react";

import {CurrentStep, ErrorState} from "@/components/PowerPointToPdfConverter";

type ErrorPopupProps = {
    setCurrentStep: Dispatch<SetStateAction<CurrentStep>>,
    errorState: ErrorState
}

export const ErrorPopup: FC<ErrorPopupProps> = () => {
    return <></>
}