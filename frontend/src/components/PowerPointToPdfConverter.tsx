"use client"
import {FC, useState} from "react";
import {ChooseFileStep} from "@/components/ChooseFileStep";
import {ConfirmationStep} from "@/components/ConfirmationStep";
import {DownloadStep} from "@/components/DownloadStep";

type PowerPointToPdfConverterProps = {}

export enum CurrentStep {
    CHOOSE,
    CONFIRMATION,
    DOWNLOAD
}

export const PowerPointToPdfConverter: FC<PowerPointToPdfConverterProps> = () => {

    const [currentStep, setCurrentStep] = useState<CurrentStep>(CurrentStep.CONFIRMATION)

    return <>
        <div className={"flex items-center justify-center w-screen h-screen"}>
            {
                currentStep === CurrentStep.CHOOSE ? <ChooseFileStep setCurrentStep={setCurrentStep}/>
                    : currentStep === CurrentStep.CONFIRMATION ? <ConfirmationStep/>
                    : <DownloadStep/>
            }
        </div>
    </>
}