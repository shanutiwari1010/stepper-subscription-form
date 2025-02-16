import { useSubscription } from "../../context/subscription";
import StepSidebar from "./step-sidebar";
import PersonalInfo from "./steps/personal-info";
import SelectPlan from "./steps/select-plan";
import AddOns from "./steps/add-ons";
import Summary from "./steps/summary";
import { Card } from "@/components/ui/card";
import Thankyou from "./thankyou";

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
      case 5:
        return <Thankyou />;
      default:
        return <PersonalInfo />;
    }
  };

  return (
    <div className="flex flex-col justify-center bg-magnolia md:bg-transparent">
      <section className="md:hidden block">
        <StepSidebar />
      </section>

      <span className="mb-20 mx-4 md:mb-0 md:mx-0">
        <Card className="w-full max-w-[56rem] md:min-h-[40rem] p-4 md:p-4 grid grid-cols-1 md:grid-cols-[274px,1fr] gap-4 bg-white rounded-xl z-10 relative -top-14 md:-top-0">
          <section className="hidden md:block">
            <StepSidebar />
          </section>
          <main className="p-4 md:p-8 pb-2 md:pb-4 place-items-center">
            {renderStep()}
          </main>
        </Card>
      </span>
    </div>
  );
}
