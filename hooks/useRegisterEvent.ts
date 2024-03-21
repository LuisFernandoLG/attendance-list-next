import { MainForm } from "@/models/createEventStepForm";
import { eventApi } from "@/services/api/eventApi";
import { formatISO9075 } from "date-fns";
import { toast } from "sonner";
import { useFetchStatus } from "./useFetchStatus";
import { debounce } from "@/helpers/debounce";
import { useRouter } from "@/components/navigation";

export const useRegisterEvent = () => {
  const { loading, startLoading, stopLoading } = useFetchStatus();
  const router = useRouter();

  const handleCreateEvent = async (mainForm: MainForm) => {
    try {
      startLoading();
      const data = formatFormToApi(mainForm);
      const event = await eventApi().create(data);
      toast.success("Evento creado con éxito");
      debounce(() => {
        router.push("/dashboard");
      }, 2000);
    } catch (e) {
      if (e instanceof Error) toast.error(e.message);
    } finally {
      stopLoading();
    }
  };

  const formatFormToApi = (mainForm: MainForm) => {
    return {
      name: mainForm.GENERAL_FORM.name,
      description: mainForm.GENERAL_FORM.description,
      type: mainForm.EVENT_FORM.type,
      dates: mainForm.DATES_FORM.dates.map((date) => formatISO9075(date)),
    };
  };

  return {
    handleCreateEvent,
    loading,
  };
};
