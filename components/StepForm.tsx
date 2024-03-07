import { useCreateEventStepForm } from "@/hooks/useCreateEventStepForm";
import { twMerge } from "tailwind-merge";

interface Props {
    children: any;
    item: {id: number, name: string};
    className?: string
}

export const StepForm = ({children, item, className}: Props)=>{
    const {currentSection} = useCreateEventStepForm()

    if(item.id !== currentSection.id) return null
    const styles = twMerge("animate-fade-left p-2 m-2", className)
    return <div className={styles}>{children}</div>
}