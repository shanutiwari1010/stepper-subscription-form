import { useSubscription } from "../../context/subscription";
import StepSidebar from "./step-sidebar";
import PersonalInfo from "./steps/personal-info";
import SelectPlan from "./steps/select-plan";
import AddOns from "./steps/add-ons";
import Summary from "./steps/summary";
import { Card } from "@/components/ui/card";

export default function FormLayout() {
  const { currentStep } = useSubscription();

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <PersonalInfo />;
      case 2:
        return <SelectPlan />;
      case 3:
        return <AddOns />;
      case 4:
        return <Summary />;
      default:
        return <PersonalInfo />;
    }
  };

  return (
    <Card className="w-full max-w-[56rem] min-h-[40rem] p-4 md:p-4 grid grid-cols-1 md:grid-cols-[274px,1fr] gap-4 bg-white rounded-xl">
      <StepSidebar />
      <main className="p-4 md:py-8 pb-2 md:pb-4 place-items-center">
        {renderStep()}
      </main>
    </Card>
  );
}
