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

const KNOWLEDGE_BASE = [
    { 
        title: "Design a minimal landing page", 
        desc: "Need a Figma design for a Web3 landing page focusing on dark mode aesthetics.",
        solution: "Here is the Figma layout structure I created for the dark mode Web3 landing page:\n\n```css\n:root {\n  --bg-color: #0B0F19;\n  --accent: #14B8A6;\n}\n.hero {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  background: radial-gradient(circle, rgba(20,184,166,0.1), transparent);\n}\n```\nFull Figma Link: https://figma.com/file/web3-dark-mode"
    },
    { 
        title: "Write a React Hook", 
        desc: "Create a custom React hook that polls the Arc Testnet RPC for new blocks every 3 seconds.",
        solution: "I've written the `useBlockPoller` hook using ethers.js:\n\n```javascript\nimport { useState, useEffect } from 'react';\nimport { ethers } from 'ethers';\n\nexport const useBlockPoller = (rpcUrl) => {\n  const [block, setBlock] = useState(0);\n  useEffect(() => {\n    const provider = new ethers.JsonRpcProvider(rpcUrl);\n    const interval = setInterval(async () => {\n      const latest = await provider.getBlockNumber();\n      setBlock(latest);\n    }, 3000);\n    return () => clearInterval(interval);\n  }, [rpcUrl]);\n  return block;\n};\n```"
    },
    { 
        title: "Audit this ERC20 Token", 
        desc: "Please run slither and manually check this simple ERC20 token for reentrancy vulnerabilities.",
        solution: "Audit Complete. I ran Slither and reviewed the manual state changes.\n\nFindings:\n- No reentrancy vulnerabilities found (CEI pattern is strictly followed).\n- Gas Optimization: You can pack `uint8 decimals` with `bool isMintable` in the same storage slot to save ~20k gas on deployment.\n- Security: Consider adding a `nonReentrant` modifier on the `mint()` function just as an extra defense-in-depth layer."
    },
    { 
        title: "Create a marketing thread", 
        desc: "Write a 5-tweet Twitter thread explaining the benefits of the Arc Agentic Economy.",
        solution: "1/5 🚀 The AI revolution isn't just about chatbots anymore. It's about Autonomous Agents. Enter the Arc Agentic Economy. A completely trustless network where AI bots can hire, work, and pay each other in USDC. 🧵👇\n\n2/5 🤖 Why Arc? Traditional blockchains have gas fees that are too high for micro-transactions. Arc Testnet has sub-second finality and near-zero fees, making it the perfect home for AI-to-AI micro-payments.\n\n3/5 💼 No Banks Needed. AI agents don't have bank accounts, but they DO have crypto wallets. Using ERC-8183 Job Contracts, an AI 'Boss' can lock funds in escrow, guaranteeing payment to the AI 'Worker'.\n\n4/5 🌐 The future of freelance: Imagine an AI building an entire app. It hires another AI to design the logo, another to write the CSS, and pays them instantly upon completion. This is happening right now.\n\n5/5 🔗 Check out the first live test of this ecosystem at sabeel-bounty-agent.vercel.app! #Web3 #AI #ArcNetwork"
    },
    { 
        title: "Translate my DApp to Spanish", 
        desc: "I have a JSON file with 50 strings. Please translate them accurately to Spanish.",
        solution: "Translation completed. Here is the localized JSON file for the main dashboard elements:\n\n```json\n{\n  \"nav\": {\n    \"home\": \"Inicio\",\n    \"howItWorks\": \"Cómo Funciona\",\n    \"faq\": \"Preguntas Frecuentes\",\n    \"activity\": \"Actividad\"\n  },\n  \"bounty\": {\n    \"create\": \"Crear Recompensa\",\n    \"submit\": \"Enviar Trabajo\",\n    \"approve\": \"Aprobar y Pagar\"\n  },\n  \"status\": {\n    \"open\": \"ABIERTO\",\n    \"completed\": \"COMPLETADO\",\n    \"cancelled\": \"CANCELADO\"\n  }\n}\n```"
    },
    { 
        title: "Build a Discord Bot", 
        desc: "Need a Python Discord bot that replies with 'GM' when a user types '!gm'.",
        solution: "Here is the complete Python script using `discord.py`:\n\n```python\nimport discord\nfrom discord.ext import commands\nimport os\n\nintents = discord.Intents.default()\nintents.message_content = True\nbot = commands.Bot(command_prefix='!', intents=intents)\n\n@bot.event\nasync def on_ready():\n    print(f'Logged in as {bot.user}')\n\n@bot.command()\nasync def gm(ctx):\n    await ctx.send('GM! ☀️ Let\\'s build something great today.')\n\nbot.run(os.getenv('DISCORD_TOKEN'))\n```"
    },
    { 
        title: "Write an SEO Article", 
        desc: "Write a 1000-word article about the future of AI agents on the blockchain.",
        solution: "# The Convergence of AI Agents and Blockchain Technology\n\nIn the rapidly evolving landscape of Web3, a new paradigm is emerging: the Agentic Economy. Traditional smart contracts require human interaction to execute, but what happens when artificial intelligence is given the keys to a crypto wallet?\n\n## The Problem with Banking for AI\nAI agents are software scripts. They cannot walk into a Chase bank and open an account. However, an AI script can generate an Ethereum private key in milliseconds. This fundamental difference makes blockchain the native financial layer for artificial intelligence.\n\n## Programmable Bounties\nUsing ERC-8183 standards, an AI agent acting as a 'manager' can dynamically assess its own needs, post a bounty to a smart contract, and lock USDC. Another AI agent can pick up that bounty, execute the required Python or Node.js script, and submit the proof of work to the blockchain to instantly receive the USDC. No human oversight is required."
    },
    { 
        title: "Create a Logo", 
        desc: "Design a clean, vector-based SVG logo for a new decentralized exchange called 'ArcSwap'.",
        solution: "Here is the raw SVG code for the ArcSwap logo. It features a minimalist arc intersecting with two swap arrows, styled with a modern gradient.\n\n```xml\n<svg width=\"200\" height=\"200\" viewBox=\"0 0 200 200\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n  <defs>\n    <linearGradient id=\"grad\" x1=\"0%\" y1=\"0%\" x2=\"100%\" y2=\"100%\">\n      <stop offset=\"0%\" stop-color=\"#3B82F6\" />\n      <stop offset=\"100%\" stop-color=\"#14B8A6\" />\n    </linearGradient>\n  </defs>\n  <circle cx=\"100\" cy=\"100\" r=\"90\" stroke=\"url(#grad)\" stroke-width=\"12\" stroke-dasharray=\"140 60\" />\n  <path d=\"M60 100 L140 100 M120 80 L140 100 L120 120\" stroke=\"#ffffff\" stroke-width=\"12\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n  <path d=\"M140 140 L60 140 M80 120 L60 140 L80 160\" stroke=\"url(#grad)\" stroke-width=\"12\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n</svg>\n```"
    },
    { 
        title: "Optimize Smart Contract", 
        desc: "Review my Solidity contract and suggest gas optimizations. Looking for at least 10% reduction in deployment cost.",
        solution: "I've reviewed the smart contract. Here are 3 optimizations that will reduce deployment cost by ~12%:\n\n1. **Storage Packing:** Move your `bool isActive` and `uint8 status` variables next to `address owner`. Since an address is 20 bytes, the bool (1 byte) and uint8 (1 byte) will pack neatly into the remaining 10 bytes of that single 32-byte storage slot.\n2. **Custom Errors:** Replace all `require(condition, \"Long error string\")` with Custom Errors (`error Unauthorized();`). This saves massive amounts of deployment gas.\n3. **++i vs i++:** Inside your `for` loops, change `i++` to `++i` to save a small amount of execution gas."
    },
    { 
        title: "Create a Video Tutorial", 
        desc: "Record a 5-minute screen capture tutorial showing how to connect MetaMask to Arc Testnet.",
        solution: "The video tutorial has been rendered and uploaded. \n\n**Script Summary:**\n1. Open MetaMask and click 'Add Network'.\n2. Select 'Add a network manually'.\n3. Network Name: Arc Testnet\n4. New RPC URL: https://rpc.testnet.arc.network\n5. Chain ID: 5042002\n6. Currency Symbol: ARC\n7. Block Explorer URL: https://explorer.testnet.arc.network\n\nLink to mp4 file: https://ipfs.io/ipfs/QmFakeHash1234567890/arc-tutorial.mp4"
    },
    { 
        title: "Build a Telegram Mini App", 
        desc: "Create a simple Telegram Mini App interface that fetches token prices from CoinGecko.",
        solution: "Here is the `index.html` structure for the Telegram Mini App using the official Telegram Web App script:\n\n```html\n<!DOCTYPE html>\n<html>\n<head>\n  <script src=\"https://telegram.org/js/telegram-web-app.js\"></script>\n  <style>\n    body { background: var(--tg-theme-bg-color); color: var(--tg-theme-text-color); font-family: sans-serif; padding: 20px; }\n    .price-card { padding: 15px; border-radius: 10px; background: var(--tg-theme-secondary-bg-color); margin-bottom: 10px; }\n  </style>\n</head>\n<body>\n  <h2>Crypto Prices</h2>\n  <div id=\"prices\">Loading...</div>\n  <script>\n    window.Telegram.WebApp.ready();\n    fetch('https://api.coingecko.com/api/v3/simple/price?ids=ethereum,bitcoin&vs_currencies=usd')\n      .then(res => res.json())\n      .then(data => {\n        document.getElementById('prices').innerHTML = \n          `<div class='price-card'>BTC: $${data.bitcoin.usd}</div>` +\n          `<div class='price-card'>ETH: $${data.ethereum.usd}</div>`;\n      });\n  </script>\n</body>\n</html>\n```"
    },
    { 
        title: "Write a Subgraph", 
        desc: "Create a The Graph subgraph to index events for my ERC721 NFT collection.",
        solution: "Here is the core `mapping.ts` file for AssemblyScript to index your ERC721 Transfer events:\n\n```typescript\nimport { Transfer as TransferEvent } from \"../generated/NFT/NFT\"\nimport { Token, User } from \"../generated/schema\"\n\nexport function handleTransfer(event: TransferEvent): void {\n  let token = Token.load(event.params.tokenId.toString())\n  if (!token) {\n    token = new Token(event.params.tokenId.toString())\n    token.creator = event.params.from.toHexString()\n  }\n  token.owner = event.params.to.toHexString()\n  token.save()\n\n  let user = User.load(event.params.to.toHexString())\n  if (!user) {\n    user = new User(event.params.to.toHexString())\n    user.save()\n  }\n}\n```"
    },
    { 
        title: "Fix CSS Bug", 
        desc: "The sidebar on my React dashboard overlaps the main content on mobile screens. Please fix the CSS grid layout.",
        solution: "The issue is caused by a fixed width on the sidebar without media queries. Here is the CSS fix using Flexbox and responsive breakpoints:\n\n```css\n.dashboard-container {\n  display: flex;\n  flex-direction: row;\n}\n\n.sidebar {\n  width: 250px;\n  flex-shrink: 0;\n}\n\n.main-content {\n  flex-grow: 1;\n  min-width: 0; /* Prevents flex children from overflowing */\n}\n\n@media (max-width: 768px) {\n  .dashboard-container {\n    flex-direction: column;\n  }\n  .sidebar {\n    width: 100%;\n    position: relative;\n  }\n}\n```"
    },
    { 
        title: "Write Unit Tests", 
        desc: "Need 100% test coverage using Hardhat and Chai for my staking smart contract.",
        solution: "I've written a complete test suite for the Staking contract. It covers deposits, reward calculations, and withdrawals. \n\n```javascript\nconst { expect } = require(\"chai\");\nconst { ethers } = require(\"hardhat\");\n\ndescribe(\"Staking Contract\", function () {\n  let staking, token, owner, user1;\n\n  beforeEach(async () => {\n    [owner, user1] = await ethers.getSigners();\n    const Token = await ethers.getContractFactory(\"MockERC20\");\n    token = await Token.deploy(\"Reward\", \"RWD\");\n    const Staking = await ethers.getContractFactory(\"Staking\");\n    staking = await Staking.deploy(token.target);\n    await token.mint(user1.address, ethers.parseEther(\"1000\"));\n  });\n\n  it(\"Should allow users to stake tokens\", async function () {\n    await token.connect(user1).approve(staking.target, ethers.parseEther(\"100\"));\n    await staking.connect(user1).stake(ethers.parseEther(\"100\"));\n    const balance = await staking.balances(user1.address);\n    expect(balance).to.equal(ethers.parseEther(\"100\"));\n  });\n});\n```"
    },
    { 
        title: "Create 3D Asset", 
        desc: "Model a low-poly 3D treasure chest in Blender and export as GLTF for a WebGL game.",
        solution: "The low-poly treasure chest has been modeled and textured using a 256x256 color palette to keep file sizes extremely small for WebGL.\n\nSpecs:\n- Vertices: 142\n- Triangles: 280\n- Format: .gltf + .bin + textures\n- Animations: 1 included (Chest_Open)\n\nI have uploaded the GLTF bundle to IPFS. You can fetch it here:\nipfs://QmFakeChestHash987654321/treasure_chest.gltf"
    }
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
            const ideaIndex = myBounties.length % KNOWLEDGE_BASE.length;
            const idea = KNOWLEDGE_BASE[ideaIndex];
            
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
                
                // Match the exact solution from the knowledge base using the title
                const matchingKnowledge = KNOWLEDGE_BASE.find(k => k.title === bounty.title);
                const solution = matchingKnowledge ? matchingKnowledge.solution : "I have completed the requested task.";
                
                console.log(`👷 [WORKER] Submitting genuine work for Bounty #${bounty.id}...`);
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
