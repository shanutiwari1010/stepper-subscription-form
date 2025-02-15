import { SubscriptionProvider } from "@/context/subscription";
import FormLayout from "@/components/subscription/form-layout";

export default function SubscriptionForm() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 w-full">
      <SubscriptionProvider>
        <FormLayout />
      </SubscriptionProvider>
    </div>
  );
}
