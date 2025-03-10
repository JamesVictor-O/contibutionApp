import router from "./router";
import { RouterProvider } from "react-router-dom";
import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultConfig, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { WagmiProvider } from "wagmi";
import { mainnet, polygon, optimism, arbitrum, base } from "wagmi/chains";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import "./App.css";

function App() {
  const queryClient = new QueryClient();
  const config = getDefaultConfig({
    appName: "My RainbowKit App",
    projectId: "YOUR_PROJECT_ID",
    chains: [mainnet, polygon, optimism, arbitrum, base],
  });
  return (
    <>
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <RainbowKitProvider>
            <RouterProvider router={router} />
          </RainbowKitProvider>
        </QueryClientProvider>
      </WagmiProvider>
    </>
  );
}

export default App;
