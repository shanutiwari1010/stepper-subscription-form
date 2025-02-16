import { useSubscription } from "@/context/subscription";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

export default function Summary() {
  const { selectedPlan, addons, setCurrentStep, isYearly } = useSubscription();
  const { toast } = useToast();

  const selectedAddons = addons.filter((addon) => addon.selected);

  const totalPrice =
    (selectedPlan?.price || 0) +
    selectedAddons.reduce(
      (sum, addon) => sum + (isYearly ? addon.price * 10 : addon.price),
      0
    );

  const handleConfirm = () => {
    setCurrentStep(5)
    toast({
      title: "Success!",
      description: "Your subscription has been confirmed.",
    });
  };

  return (
    <div className="flex flex-col h-full gap-10 md:min-w-96">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-marine-blue">Finishing up</h1>
        <p className="text-cool-gray text-sm">
          Double-check everything looks OK before confirming.
        </p>
      </div>

      <div className="flex flex-col gap-12 h-full justify-between">
        <div className="space-y-6">
          <Card className="p-6 bg-alabaster shadow-none border-none">
            <div className="flex justify-between items-center border-b pb-5">
              <div>
                <h3 className="font-medium text-marine-blue">
                  {selectedPlan?.name} ({isYearly ? "Yearly" : "Monthly"})
                </h3>
                <Button
                  variant="link"
                  className="p-0 h-auto text-cool-gray hover:text-marine-blue"
                  onClick={() => setCurrentStep(2)}
                >
                  Change
                </Button>
              </div>
              <p className="text-marine-blue font-semibold">
                ${selectedPlan?.price}/{isYearly ? "yr" : "mo"}
              </p>
            </div>

            {selectedAddons.length > 0 && (
              <div className="space-y-4 mt-4">
                {selectedAddons.map((addon) => (
                  <div
                    key={addon.name}
                    className="flex justify-between text-cool-gray"
                  >
                    <p>{addon.name}</p>
                    <p className="text-marine-blue">
                      +${isYearly ? addon.price * 10 : addon.price}/
                      {isYearly ? "yr" : "mo"}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </Card>

          <div className="flex justify-between items-center px-6">
            <p className="text-cool-gray">
              Total (per {isYearly ? "year" : "month"})
            </p>
            <p className="text-2xl font-bold text-purplish-blue">
              ${totalPrice}/{isYearly ? "yr" : "mo"}
            </p>
          </div>
        </div>

        <div className="flex justify-between">
          <Button
            variant="ghost"
            onClick={() => setCurrentStep(3)}
            className="text-cool-gray hover:bg-white hover:text-marine-blue pl-0"
          >
            Go Back
          </Button>
          <Button
            size="lg"
            onClick={handleConfirm}
            className="bg-purplish-blue hover:bg-purplish-blue/50"
          >
            Confirm
          </Button>
        </div>
      </div>
    </div>
  );
}
