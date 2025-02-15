import { useSubscription } from "../../context/subscription";

const steps = [
  { number: 1, title: "YOUR INFO", subtitle: "STEP 1" },
  { number: 2, title: "SELECT PLAN", subtitle: "STEP 2" },
  { number: 3, title: "ADD-ONS", subtitle: "STEP 3" },
  { number: 4, title: "SUMMARY", subtitle: "STEP 4" }
];

export default function StepSidebar() {
  const { currentStep } = useSubscription();

  return (
    <aside className="flex md:block justify-center gap-4 md:gap-8 p-8 bg-[url('/assets/images/bg-sidebar-desktop.svg')] bg-no-repeat bg-cover rounded-lg text-white">

      {steps.map((step) => (
        <div key={step.number} className="flex items-center gap-4">
          <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center font-bold mb-3
            ${currentStep === step.number ? 'bg-[hsl(206,94%,87%)] text-black border-[hsl(206,94%,87%)]' : 'border-white'}`}>
            {step.number}
          </div>
          <div className="hidden md:block">
            <p className="text-sm text-gray-300">{step.subtitle}</p>
            <p className="font-bold text-sm mb-5">{step.title}</p>
          </div>
        </div>
      ))}
    </aside>
  );
}
