import { FC } from 'react';
import {PdfIcon} from "@/icons/PdfIcon";
import {CheckIcon} from "@/icons/CheckIcon";
import {Button} from "@/components/PowerPointToPdfConverter/Button";

type DownloadStepProps = {
    pdfUrl: string
};

export const DownloadStep: FC<DownloadStepProps> = ({pdfUrl}) => {
    return (
        <div className="flex flex-col gap-4 rounded-xl bg-white p-6 shadow-md min-w-[336px] w-[464px]">
            <div className="flex flex-col gap-4 rounded-lg border border-gray-300 p-4 text-center w-full">
                <div className={"flex items-center flex-col"}>
                    <div className={""}>
                        <PdfIcon/>
                    </div>
                    <div className={"-mt-3"}>
                        <CheckIcon/>
                    </div>
                </div>
                <p className={"font-[600] text-[20px]/[30px] lin"}>
                    File converted successfully!
                </p>
            </div>
            <div className="flex w-full gap-3 h-10">
                <Button variant={"secondary"}>
                    Convert another
                </Button>
                <Button variant={"primary"}>
                    Download file
                </Button>
            </div>
        </div>
    );
};
