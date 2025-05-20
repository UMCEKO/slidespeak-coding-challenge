"use client"
import {FC, useState} from "react";
import {ChooseFileStep} from "@/components/PowerPointToPdfConverter/ChooseFileStep";
import {ConfirmationStep} from "@/components/PowerPointToPdfConverter/ConfirmationStep";
import {DownloadStep} from "@/components/PowerPointToPdfConverter/DownloadStep";
import {ErrorPopup} from "@/components/PowerPointToPdfConverter/ErrorPopup";

type PowerPointToPdfConverterProps = {}

export enum CurrentStep {
    CHOOSE,
    CONFIRMATION,
    DOWNLOAD
}

export const PowerPointToPdfConverter: FC<PowerPointToPdfConverterProps> = () => {
    const [currentStep, setCurrentStep] = useState<CurrentStep>(CurrentStep.CHOOSE)
    const [file, setFile] = useState<null | File>(null)
    const [pdfUrl, setPdfUrl] = useState<null | string>(null)

    return <>
        <div className={"flex items-center justify-center w-screen h-screen"}>
            {
                currentStep === CurrentStep.CHOOSE
                    ? <ChooseFileStep setFile={setFile} setCurrentStep={setCurrentStep}/>
                    : currentStep === CurrentStep.CONFIRMATION && file
                        ? <ConfirmationStep file={file} setCurrentStep={setCurrentStep} setPdfUrl={setPdfUrl}/>
                        : currentStep === CurrentStep.DOWNLOAD && pdfUrl ? <DownloadStep pdfUrl={pdfUrl}/>
                            : <ErrorPopup/>
            }
        </div>
    </>
}
