import { Switch, Route } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import { queryClient } from "@/lib/queryClient";
import SubscriptionForm from "@/pages/subscription-form";

function Router() {
  return (
    <Switch>
      <Route path="/" component={SubscriptionForm}  />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient} >
      <Router />
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
