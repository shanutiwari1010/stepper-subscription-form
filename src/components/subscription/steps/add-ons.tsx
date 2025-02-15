import { useSubscription } from "@/context/subscription";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

export default function AddOns() {
  const { setCurrentStep, addons, setAddons, isYearly } = useSubscription();

  const toggleAddon = (index: number) => {
    const newAddons = [...addons];
    newAddons[index] = {
      ...newAddons[index],
      selected: !newAddons[index].selected
    };
    setAddons(newAddons);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-[hsl(213,96%,18%)]">Pick add-ons</h1>
        <p className="text-gray-400">Add-ons help enhance your gaming experience.</p>
      </div>

      <div className="space-y-4">
        {addons.map((addon, index) => (
          <div
            key={addon.name}
            className={`flex items-center justify-between p-4 border-2 rounded-lg hover:border-primary ${
              addon.selected ? 'border-primary bg-gray-50' : ''
            }`}
          >
            <div className="flex items-center gap-4">
              <Checkbox
                checked={addon.selected}
                onCheckedChange={() => toggleAddon(index)}
              />
              <div>
                <h3 className="font-medium text-[hsl(213,96%,18%)]">{addon.name}</h3>
                <p className="text-sm text-gray-400">{addon.description}</p>
              </div>
            </div>
            <p className="text-primary">
              +${isYearly ? `${addon.price * 10}/yr` : `${addon.price}/mo`}
            </p>
          </div>
        ))}
      </div>

      <div className="flex justify-between">
        <Button
          variant="ghost"
          onClick={() => setCurrentStep(2)}
        >
          Go Back
        </Button>
        <Button onClick={() => setCurrentStep(4)}>
          Next Step
        </Button>
      </div>
    </div>
  );
}
