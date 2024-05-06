import { MainForm } from "@/models/createEventStepForm";
import { eventApi } from "@/services/api/eventApi";
import { formatISO9075 } from "date-fns";
import { toast } from "sonner";
import { useFetchStatus } from "./useFetchStatus";
import { useRouter } from "@/components/navigation";
import { useTranslations } from "next-intl";
import { successMessages } from "@/contants/successMessages";
import { dateToUTC } from "@/helpers/dateToUTC";

export const useRegisterEvent = () => {
  const { loading, startLoading, stopLoading } = useFetchStatus();
  const router = useRouter();
  const httpSuccessT = useTranslations("httpSuccess");
  const httpErrorsT = useTranslations("httpErrors");

  const handleCreateEvent = async (mainForm: MainForm) => {
    try {
      startLoading();
      const data = formatFormToApi(mainForm);
      const event = await eventApi().create(data);
      const msg = httpSuccessT(successMessages["created successfully"]);
      toast.success(msg);
      router.push("/dashboard");

    } catch (e) {
      if ((e instanceof Error)) {
        const msg = httpErrorsT(e.message) || httpErrorsT("default");
        toast.error(msg);
      }else {
        toast.error(httpErrorsT("default"));
      }
      
    } finally {
      stopLoading();
    }
  };

  const formatFormToApi = (mainForm: MainForm) => {
    return {
      name: mainForm.GENERAL_FORM.name,
      description: mainForm.GENERAL_FORM.description,
      type: mainForm.EVENT_FORM.type,
      dates: mainForm.DATES_FORM.dates.map((date) => {
        const utcTime = dateToUTC(date)
        console.log({
          calendar: date,
          utcTime
        })
        return utcTime
      }),
    };
  };

  return {
    handleCreateEvent,
    loading,
  };
};
