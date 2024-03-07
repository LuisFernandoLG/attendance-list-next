import { Badge } from "./ui/badge";
import { sectionNamesArray } from "@/contants/createEventStepForm";
import { useCreateEventStepForm } from "@/hooks/useCreateEventStepForm";

export const StepFormNav = ({ className }: { className: string }) => {
  const { changeSection, currentSection } = useCreateEventStepForm();

  return (
    <nav className={className}>
      {sectionNamesArray.map((section, index) => (
        <Badge
          className={section.id === currentSection.id ? "cursor-pointer" : "pointer-events-none"}
          key={index}
          onClick={() => changeSection(section)}
          variant={section.id === currentSection.id ? "default" : "outline"}
        >
          {section.name}
        </Badge>
      ))}
    </nav>
  );
};
