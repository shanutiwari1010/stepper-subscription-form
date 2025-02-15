import { createContext, useContext, useState } from "react";

interface PersonalInfo {
  name: string;
  email: string;
  phone: string;
}

interface Plan {
  name: 'Arcade' | 'Advanced' | 'Pro';
  price: number;
  isYearly: boolean;
}

interface Addon {
  name: string;
  description: string;
  price: number;
  selected: boolean;
}

interface SubscriptionContextType {
  currentStep: number;
  setCurrentStep: (step: number) => void;
  personalInfo: PersonalInfo;
  setPersonalInfo: (info: PersonalInfo) => void;
  selectedPlan: Plan | null;
  setSelectedPlan: (plan: Plan) => void;
  addons: Addon[];
  setAddons: (addons: Addon[]) => void;
  isYearly: boolean;
  setIsYearly: (yearly: boolean) => void;
}

const SubscriptionContext = createContext<SubscriptionContextType | undefined>(
  undefined
);

export function SubscriptionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [currentStep, setCurrentStep] = useState(2);
  const [personalInfo, setPersonalInfo] = useState<PersonalInfo>({
    name: "",
    email: "",
    phone: "",
  });
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
  const [isYearly, setIsYearly] = useState(false);
  const [addons, setAddons] = useState<Addon[]>([
    {
      name: "Online service",
      description: "Access to multiplayer games",
      price: 1,
      selected: false,
    },
    {
      name: "Larger storage",
      description: "Extra 1TB of cloud save",
      price: 2,
      selected: false,
    },
    {
      name: "Customizable Profile",
      description: "Custom theme on your profile",
      price: 2,
      selected: false,
    },
  ]);

  return (
    <SubscriptionContext.Provider
      value={{
        currentStep,
        setCurrentStep,
        personalInfo,
        setPersonalInfo,
        selectedPlan,
        setSelectedPlan,
        addons,
        setAddons,
        isYearly,
        setIsYearly,
      }}
    >
      {children}
    </SubscriptionContext.Provider>
  );
}

export function useSubscription() {
  const context = useContext(SubscriptionContext);
  if (!context) {
    throw new Error(
      "useSubscription must be used within a SubscriptionProvider"
    );
  }
  return context;
}
