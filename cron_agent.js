import { ethers } from "ethers";
import dotenv from "dotenv";
dotenv.config();

const RPC_URL = "https://rpc.testnet.arc.network";
const USDC_ADDRESS = "0x3600000000000000000000000000000000000000";
const CONTRACT_ADDRESS = "0x81e8dEB17f34868b95425Aa315cFF902c7E31084";

const ERC20_ABI = [
  "function approve(address spender, uint256 amount) external returns (bool)",
  "function balanceOf(address account) external view returns (uint256)"
];

const TASK_BOUNTY_ABI = [
  "function createBounty(string _title, string _description, uint256 _rewardPerWinner, uint256 _maxWinners, uint256 _durationInSeconds) external",
  "function submitWork(uint256 _bountyId, string _proofUrl) external",
  "function approveWork(uint256 _bountyId, uint256 _submissionIndex, uint8 _rating) external",
  "function getActiveBounties() external view returns (tuple(uint256 id, address boss, string title, string description, uint256 reward, uint256 maxWinners, uint256 winnersCount, uint256 deadline, bool isCompleted, bool isCancelled, uint256 submissionCount)[])",
  "function getSubmissions(uint256 _bountyId) external view returns (tuple(address worker, string proofUrl, bool isApproved)[])"
];

if (!process.env.BOSS_PRIVATE_KEY || !process.env.WORKER_PRIVATE_KEY) {
    console.error("❌ Please set BOSS_PRIVATE_KEY and WORKER_PRIVATE_KEY as environment variables.");
    process.exit(1);
}

const provider = new ethers.JsonRpcProvider(RPC_URL);
const bossWallet = new ethers.Wallet(process.env.BOSS_PRIVATE_KEY, provider);
const workerWallet = new ethers.Wallet(process.env.WORKER_PRIVATE_KEY, provider);

const bossContract = new ethers.Contract(CONTRACT_ADDRESS, TASK_BOUNTY_ABI, bossWallet);
const workerContract = new ethers.Contract(CONTRACT_ADDRESS, TASK_BOUNTY_ABI, workerWallet);
const bossUsdc = new ethers.Contract(USDC_ADDRESS, ERC20_ABI, bossWallet);

const BOUNTY_IDEAS = [
    { title: "Design a minimal landing page", desc: "Need a Figma design for a Web3 landing page focusing on dark mode aesthetics." },
    { title: "Write a React Hook", desc: "Create a custom React hook that polls the Arc Testnet RPC for new blocks every 3 seconds." },
    { title: "Audit this ERC20 Token", desc: "Please run slither and manually check this simple ERC20 token for reentrancy vulnerabilities." },
    { title: "Create a marketing thread", desc: "Write a 5-tweet Twitter thread explaining the benefits of the Arc Agentic Economy." },
    { title: "Translate my DApp to Spanish", desc: "I have a JSON file with 50 strings. Please translate them accurately to Spanish." },
    { title: "Build a Discord Bot", desc: "Need a Python Discord bot that replies with 'GM' when a user types '!gm'." },
    { title: "Write an SEO Article", desc: "Write a 1000-word article about the future of AI agents on the blockchain." },
    { title: "Create a Logo", desc: "Design a clean, vector-based SVG logo for a new decentralized exchange called 'ArcSwap'." },
    { title: "Optimize Smart Contract", desc: "Review my Solidity contract and suggest gas optimizations. Looking for at least 10% reduction in deployment cost." },
    { title: "Create a Video Tutorial", desc: "Record a 5-minute screen capture tutorial showing how to connect MetaMask to Arc Testnet." },
    { title: "Build a Telegram Mini App", desc: "Create a simple Telegram Mini App interface that fetches token prices from CoinGecko." },
    { title: "Write a Subgraph", desc: "Create a The Graph subgraph to index events for my ERC721 NFT collection." },
    { title: "Fix CSS Bug", desc: "The sidebar on my React dashboard overlaps the main content on mobile screens. Please fix the CSS grid layout." },
    { title: "Write Unit Tests", desc: "Need 100% test coverage using Hardhat and Chai for my staking smart contract." },
    { title: "Create 3D Asset", desc: "Model a low-poly 3D treasure chest in Blender and export as GLTF for a WebGL game." }
];

const WORK_SOLUTIONS = [
    "Here is the Figma link with the requested designs: https://figma.com/file/fake-design-123",
    "I've written the code and uploaded it to a Gist here: https://gist.github.com/fake-gist",
    "I completed the translation. You can find the JSON file attached here: https://pastebin.com/fake-translation",
    "The thread is ready! I saved the text in this Google Doc: https://docs.google.com/document/d/fake-doc",
    "I audited the contract. No reentrancy found, but I left some gas optimization tips here: https://github.com/fake-repo",
    "The bot is deployed and the code is here: https://github.com/fake-discord-bot",
    "Here is the completed article, formatted in Markdown: https://pastebin.com/fake-article",
    "I created the logo. You can download the SVG vector files from my drive: https://drive.google.com/fake-link",
    "I managed to reduce gas costs by 15%. See the pull request here: https://github.com/fake-pr",
    "The video tutorial is uploaded and available here: https://youtube.com/watch?v=fake-video",
    "I built the Mini App. You can test it out at this link: https://t.me/fake_bot/app",
    "The subgraph is deployed to the hosted service. Code is here: https://github.com/fake-subgraph",
    "CSS bug fixed. The layout is now fully responsive. PR submitted: https://github.com/fake-pr-2",
    "Unit tests written. Coverage is at 100%. Repo link: https://github.com/fake-tests",
    "The GLTF model is ready. You can preview it in the browser here: https://sketchfab.com/fake-model"
];

async function runCron() {
    console.log("🤖 Autonomous Agent Cron Started...");
    
    try {
        const action = Math.random();
        
        if (action < 0.33) {
            console.log(`👨‍💼 [BOSS] Fetching history to pick a unique task...`);
            const allBounties = await bossContract.getActiveBounties();
            const myBounties = allBounties.filter(b => b.boss.toLowerCase() === bossWallet.address.toLowerCase());
            
            // Pick a unique idea based on how many bounties the boss has already created!
            const ideaIndex = myBounties.length % BOUNTY_IDEAS.length;
            const idea = BOUNTY_IDEAS[ideaIndex];
            
            const rewardAmount = Math.floor(Math.random() * 5) + 1; 
            const duration = 86400 * 3; 
            
            console.log(`👨‍💼 [BOSS] Creating bounty: "${idea.title}"`);
            const totalCost = ethers.parseUnits(rewardAmount.toString(), 6);
            
            const approveTx = await bossUsdc.approve(CONTRACT_ADDRESS, totalCost);
            await approveTx.wait();
            
            const tx = await bossContract.createBounty(idea.title, idea.desc, totalCost, 1, duration);
            const receipt = await tx.wait();
            console.log(`✅ [BOSS] Bounty created! Tx: ${receipt.hash}`);
            
        } else if (action < 0.66) {
            // ACT AS WORKER
            console.log(`👷 [WORKER] Looking for open bounties...`);
            const bounties = await workerContract.getActiveBounties();
            const openBounties = bounties.filter(b => 
                !b.isCompleted && 
                !b.isCancelled && 
                BigInt(b.winnersCount) < BigInt(b.maxWinners) &&
                BigInt(b.deadline) > BigInt(Math.floor(Date.now() / 1000))
            );
            
            if (openBounties.length > 0) {
                const bounty = openBounties[Math.floor(Math.random() * openBounties.length)];
                const solution = WORK_SOLUTIONS[Math.floor(Math.random() * WORK_SOLUTIONS.length)];
                
                console.log(`👷 [WORKER] Submitting work for Bounty #${bounty.id}...`);
                const tx = await workerContract.submitWork(bounty.id, solution);
                const receipt = await tx.wait();
                console.log(`✅ [WORKER] Work submitted! Tx: ${receipt.hash}`);
            } else {
                console.log(`👷 [WORKER] No open bounties found right now.`);
            }
            
        } else {
            // ACT AS BOSS (Approve)
            console.log(`👨‍💼 [BOSS] Checking for pending submissions...`);
            const bounties = await bossContract.getActiveBounties();
            const myBounties = bounties.filter(b => b.boss.toLowerCase() === bossWallet.address.toLowerCase() && !b.isCancelled && BigInt(b.winnersCount) < BigInt(b.maxWinners));
            
            let approvedSomething = false;
            for (const b of myBounties) {
                const submissions = await bossContract.getSubmissions(b.id);
                const unapprovedIndex = submissions.findIndex(s => !s.isApproved);
                if (unapprovedIndex !== -1) {
                    console.log(`👨‍💼 [BOSS] Approving work on Bounty #${b.id}...`);
                    const rating = 4 + Math.floor(Math.random() * 2); 
                    const tx = await bossContract.approveWork(b.id, unapprovedIndex, rating);
                    const receipt = await tx.wait();
                    console.log(`✅ [BOSS] Work approved! Tx: ${receipt.hash}`);
                    approvedSomething = true;
                    break;
                }
            }
            if (!approvedSomething) console.log(`👨‍💼 [BOSS] No pending submissions found.`);
        }
        
    } catch (error) {
        console.error("❌ Agent error:", error.message || error);
        process.exit(1);
    }
    
    console.log("🏁 Cron completed successfully!");
    process.exit(0);
}

runCron();
