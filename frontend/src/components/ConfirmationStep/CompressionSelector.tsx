import {FC} from "react";

type CompressionSelectorProps = {
    isLoading?: boolean
}

export const CompressionSelector: FC<CompressionSelectorProps> = ({isLoading}) => {
    return (isLoading
        ?
        <div className="flex w-full items-center gap-2 rounded-xl border border-gray-300 p-4">
            <div className="size-7 animate-spin-pretty rounded-full border-4 border-solid border-t-blue-500"></div>
            <p className="text-sm text-gray-700">Compressing your file...</p>
        </div>
        :
        <div className={"flex cursor-pointer gap-2 rounded-xl border-2 border-blue-200 bg-blue-25 p-4"}>
            <div>
                <div className={"grid size-4 place-items-center rounded-full border border-blue-600"}>
                    <div className="h-2 w-2 rounded-full bg-blue-600 transition-opacity"></div>
                </div>
            </div>
            <div className={"flex flex-col"}>
                <span className={"text-sm leading-4 text-blue-800"}>Convert to PDF</span>
                <span className={"text-sm text-blue-700"}>Best quality, retains images and other assets.</span>
            </div>
        </div>)
}