import { useSubscription } from "@/context/subscription";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

export default function Summary() {
  const { selectedPlan, addons, setCurrentStep, isYearly } = useSubscription();
  const { toast } = useToast();

  const selectedAddons = addons.filter(addon => addon.selected);
  
  const totalPrice = (selectedPlan?.price || 0) + 
    selectedAddons.reduce((sum, addon) => 
      sum + (isYearly ? addon.price * 10 : addon.price), 0
    );

  const handleConfirm = () => {
    toast({
      title: "Success!",
      description: "Your subscription has been confirmed.",
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-[hsl(213,96%,18%)]">Finishing up</h1>
        <p className="text-gray-400">Double-check everything looks OK before confirming.</p>
      </div>

      <Card className="p-6 bg-gray-50">
        <div className="flex justify-between items-center border-b pb-6">
          <div>
            <h3 className="font-medium text-[hsl(213,96%,18%)]">
              {selectedPlan?.name} ({isYearly ? 'Yearly' : 'Monthly'})
            </h3>
            <Button
              variant="link"
              className="p-0 h-auto text-gray-400 hover:text-primary"
              onClick={() => setCurrentStep(2)}
            >
              Change
            </Button>
          </div>
          <p className="font-medium text-[hsl(213,96%,18%)]">
            ${selectedPlan?.price}/{isYearly ? 'yr' : 'mo'}
          </p>
        </div>

        {selectedAddons.length > 0 && (
          <div className="space-y-4 mt-4">
            {selectedAddons.map(addon => (
              <div key={addon.name} className="flex justify-between text-gray-400">
                <p>{addon.name}</p>
                <p className="text-[hsl(213,96%,18%)]">
                  +${isYearly ? addon.price * 10 : addon.price}/{isYearly ? 'yr' : 'mo'}
                </p>
              </div>
            ))}
          </div>
        )}
      </Card>

      <div className="flex justify-between items-center px-6">
        <p className="text-gray-400">
          Total (per {isYearly ? 'year' : 'month'})
        </p>
        <p className="text-2xl font-bold text-primary">
          ${totalPrice}/{isYearly ? 'yr' : 'mo'}
        </p>
      </div>

      <div className="flex justify-between">
        <Button
          variant="ghost"
          onClick={() => setCurrentStep(3)}
        >
          Go Back
        </Button>
        <Button
          onClick={handleConfirm}
          className="bg-[hsl(243,100%,62%)] hover:bg-[hsl(243,100%,72%)]"
        >
          Confirm
        </Button>
      </div>
    </div>
  );
}
