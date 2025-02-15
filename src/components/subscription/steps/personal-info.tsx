import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useSubscription } from "@/context/subscription";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const personalInfoSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email address"),
  phone: z
    .string()
    .regex(/^\d+$/, "Phone number must contain only numbers")
    .min(10, "Phone number must be at least 10 digits")
    .max(10, "Phone number must be at most 10 digits"),
});

export default function PersonalInfo() {
  const { setCurrentStep, setPersonalInfo } = useSubscription();

  const form = useForm({
    resolver: zodResolver(personalInfoSchema),
    mode: "onChange",
    defaultValues: {
      name: "",
      email: "",
      phone: "",
    },
  });

  const onSubmit = (data: z.infer<typeof personalInfoSchema>) => {
    setPersonalInfo(data);
    setCurrentStep(2);
  };

  return (
    <div className="gap-10 flex flex-col h-full">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-marine-blue">Personal info</h1>
        <p className="text-cool-gray text-sm">
          Please provide your name, email address, and phone number.
        </p>
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col justify-between h-full text-marine-blue"
        >
          <div className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <div className="flex justify-between h-5">
                    <FormLabel>Name</FormLabel>
                    <FormMessage />
                  </div>
                  <FormControl>
                    <Input placeholder="e.g. Stephen King" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <div className="flex justify-between h-5">
                    <FormLabel>Email Address</FormLabel>
                    <FormMessage />
                  </div>
                  <FormControl>
                    <Input
                      placeholder="e.g. stephenking@lorem.com"
                      type="email"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <div className="flex justify-between h-5">
                    <FormLabel>Phone Number</FormLabel>
                    <FormMessage />
                  </div>
                  <FormControl>
                    <Input
                      type="tel"
                      placeholder="e.g. 1234567890"
                      {...field}
                      maxLength={10}
                      onInput={(e) => {
                        e.currentTarget.value = e.currentTarget.value.replace(
                          /\D/g,
                          ""
                        );
                        field.onChange(e);
                      }}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>

          <div className="flex justify-end">
            <Button
              type="submit"
              size="lg"
              className="bg-marine-blue hover:bg-marine-blue/90"
              disabled={!form.formState.isValid}
            >
              Next Step
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
