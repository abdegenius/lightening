import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { liskSepolia } from "wagmi/chains";

export const config = getDefaultConfig({
    appName: "Soundshares",
    projectId: "YOUR_PROJECT_ID",
    chains: [
        liskSepolia,
        ...(process.env.NEXT_PUBLIC_ENABLE_TESTNETS === "true"
            ? [liskSepolia]
            : []),
    ],
    ssr: true,
});
