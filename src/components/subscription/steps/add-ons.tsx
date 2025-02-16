import { useSubscription } from "@/context/subscription";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

export default function AddOns() {
  const { setCurrentStep, addons, setAddons, isYearly } = useSubscription();

  const toggleAddon = (index: number) => {
    const newAddons = [...addons];
    newAddons[index] = {
      ...newAddons[index],
      selected: !newAddons[index].selected,
    };
    setAddons(newAddons);
  };

  return (
    <div className="flex flex-col h-full gap-10 md:min-w-96">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-marine-blue">Pick add-ons</h1>
        <p className="text-cool-gray text-sm">
          Add-ons help enhance your gaming experience.
        </p>
      </div>

      <div className="flex flex-col gap-12 justify-between h-full">
        <div className="space-y-4">
          {addons.map((addon, index) => (
            <div
              key={addon.name}
              onClick={() => toggleAddon(index)}
              className={`flex items-center justify-between p-4 border rounded-lg hover:border-purplish-blue cursor-pointer ${
                addon.selected ? "border-purplish-blue bg-alabaster" : ""
              }`}
            >
              <div className="flex items-center gap-4">
                <Checkbox
                  checked={addon.selected}
                  onCheckedChange={() => toggleAddon(index)}
                />
                <div>
                  <h3 className="font-medium text-marine-blue ">
                    {addon.name}
                  </h3>
                  <p className="text-sm text-cool-gray">{addon.description}</p>
                </div>
              </div>
              <p className=" text-marine-blue text-sm">
                +${isYearly ? `${addon.price * 10}/yr` : `${addon.price}/mo`}
              </p>
            </div>
          ))}
        </div>

        <div className="flex justify-between">
          <Button
            variant="ghost"
            onClick={() => setCurrentStep(2)}
            className="text-cool-gray hover:bg-white hover:text-marine-blue pl-0"
          >
            Go Back
          </Button>
          <Button
            size="lg"
            className="bg-marine-blue hover:bg-marine-blue"
            onClick={() => setCurrentStep(4)}
          >
            Next Step
          </Button>
        </div>
      </div>
    </div>
  );
}
