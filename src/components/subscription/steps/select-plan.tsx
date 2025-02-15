import { useSubscription } from "@/context/subscription";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { GamepadIcon, MonitorIcon, TrophyIcon } from "lucide-react";

const plans = [
  { name: 'Arcade', icon: GamepadIcon, monthlyPrice: 9 },
  { name: 'Advanced', icon: MonitorIcon, monthlyPrice: 12 },
  { name: 'Pro', icon: TrophyIcon, monthlyPrice: 15 },
];

export default function SelectPlan() {
  const { 
    setCurrentStep, 
    selectedPlan, 
    setSelectedPlan,
    isYearly,
    setIsYearly
  } = useSubscription();

  const handlePlanSelect = (plan: typeof plans[0]) => {
    setSelectedPlan({
      name: plan.name as 'Arcade' | 'Advanced' | 'Pro',
      price: isYearly ? plan.monthlyPrice * 10 : plan.monthlyPrice,
      isYearly
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-[hsl(213,96%,18%)]">Select your plan</h1>
        <p className="text-gray-400">You have the option of monthly or yearly billing.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {plans.map((plan) => (
          <Card
            key={plan.name}
            className={`p-4 cursor-pointer border-2 hover:border-primary ${
              selectedPlan?.name === plan.name ? 'border-primary bg-gray-50' : ''
            }`}
            onClick={() => handlePlanSelect(plan)}
          >
            <plan.icon className="h-10 w-10 text-primary mb-10" />
            <h3 className="font-bold text-[hsl(213,96%,18%)]">{plan.name}</h3>
            <p className="text-gray-400">
              ${isYearly ? `${plan.monthlyPrice * 10}/yr` : `${plan.monthlyPrice}/mo`}
            </p>
            {isYearly && (
              <p className="text-sm text-[hsl(213,96%,18%)]">2 months free</p>
            )}
          </Card>
        ))}
      </div>

      <div className="flex items-center justify-center gap-4 bg-gray-50 p-4 rounded-lg">
        <span className={`${!isYearly ? 'text-[hsl(213,96%,18%)]' : 'text-gray-400'}`}>Monthly</span>
        <Switch
          checked={isYearly}
          onCheckedChange={setIsYearly}
        />
        <span className={`${isYearly ? 'text-[hsl(213,96%,18%)]' : 'text-gray-400'}`}>Yearly</span>
      </div>

      <div className="flex justify-between">
        <Button
          variant="ghost"
          onClick={() => setCurrentStep(1)}
        >
          Go Back
        </Button>
        <Button
          onClick={() => setCurrentStep(3)}
          disabled={!selectedPlan}
        >
          Next Step
        </Button>
      </div>
    </div>
  );
}
