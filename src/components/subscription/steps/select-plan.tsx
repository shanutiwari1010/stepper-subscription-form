import { useSubscription } from "@/context/subscription";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";

const plans = [
  { name: "Arcade", icon: "/assets/images/icon-arcade.svg", monthlyPrice: 9 },
  {
    name: "Advanced",
    icon: "/assets/images/icon-advanced.svg",
    monthlyPrice: 12,
  },
  { name: "Pro", icon: "/assets/images/icon-pro.svg", monthlyPrice: 15 },
];

export default function SelectPlan() {
  const {
    setCurrentStep,
    selectedPlan,
    setSelectedPlan,
    isYearly,
    setIsYearly,
  } = useSubscription();

  const handlePlanSelect = (plan: (typeof plans)[0]) => {
    setSelectedPlan({
      name: plan.name as "Arcade" | "Advanced" | "Pro",
      price: isYearly ? plan.monthlyPrice * 10 : plan.monthlyPrice,
      isYearly,
    });
  };

  return (
    <div className="gap-10 flex flex-col h-full">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-marine-blue">
          Select your plan
        </h1>
        <p className="text-cool-gray text-sm">
          You have the option of monthly or yearly billing.
        </p>
      </div>

      <div className="flex flex-col justify-between h-full gap-10 md:gap-0">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:h-44">
          {plans.map((plan) => (
            <Card
              key={plan.name}
              className={cn(
                "flex flex-row md:flex-col gap-4 md:gap-10 p-4 min-w-40 h-fit cursor-pointer border hover:border-purplish-blue",
                selectedPlan?.name === plan.name &&
                  "border-border-purplish-blue bg-alabaster"
              )}
              onClick={() => handlePlanSelect(plan)}
            >
              <img src={plan.icon} alt={plan.name} className="h-10 w-10" />

              <div className="flex flex-col gap-1">
                <h3 className="font-bold text-marine-blue">{plan.name}</h3>
                <p className="text-cool-gray">
                  $
                  {isYearly
                    ? `${plan.monthlyPrice * 10}/yr`
                    : `${plan.monthlyPrice}/mo`}
                </p>
                {isYearly && (
                  <p className="text-sm text-marine-blue">2 months free</p>
                )}
              </div>
            </Card>
          ))}
        </div>

        <div className="flex items-center justify-center gap-4 bg-alabaster p-4 rounded-lg">
          <span
            className={`${!isYearly ? "text-marine-blue" : "text-cool-gray"}`}
          >
            Monthly
          </span>
          <Switch
            checked={isYearly}
            onCheckedChange={setIsYearly}
            className="bg-marine-blue"
          />
          <span
            className={`${isYearly ? "text-marine-blue" : "text-cool-gray"}`}
          >
            Yearly
          </span>
        </div>
        <div className="flex justify-between pt-12 md:pt-20">
          <Button
            variant="ghost"
            onClick={() => setCurrentStep(1)}
            className="text-cool-gray hover:text-marine-blue hover:bg-white pl-0"
          >
            Go Back
          </Button>
          <Button
            size="lg"
            variant="default"
            onClick={() => setCurrentStep(3)}
            disabled={!selectedPlan}
            className="bg-marine-blue hover:bg-marine-blue/90"
          >
            Next Step
          </Button>
        </div>
      </div>
    </div>
  );
}
