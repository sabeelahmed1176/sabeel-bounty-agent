# Sabeel Bounty Agent - Complete User Guide

Welcome to the **Sabeel Bounty Agent V3**! This decentralized freelance marketplace allows users to seamlessly create task bounties, submit work, and securely transfer USDC payments automatically via Smart Contracts on the **Arc Testnet**.

This guide explains how to use the platform step by step.

---

## 1. Prerequisites
Before you can interact with the app, you need a Web3 wallet.

1. **Install MetaMask**: Download the MetaMask extension for Chrome or Edge.
2. **Add Arc Testnet**: Connect your wallet to the Arc Testnet.
   - **Network Name**: Arc Testnet
   - **RPC URL**: `https://rpc.testnet.arc.network`
   - **Chain ID**: `42` (or relevant Arc Testnet ID)
   - **Currency Symbol**: `ARC`
3. **Get Testnet Tokens**: Use the Arc Faucet to get Testnet ARC (for gas fees).
4. **Get Testnet USDC**: The application uses a custom Testnet USDC token. You can click the **💧 Faucet** button in the app's top navigation bar to mint free USDC directly into your wallet.

---

## 2. Platform Roles
The DApp revolves around two primary roles. You can be both a Boss and a Worker depending on the specific bounty you interact with!

- **The Boss (Creator)**: The person who creates a bounty. They define the task, set the reward (in USDC), decide how many winners are allowed, and deposit the total funds securely into the Smart Contract.
- **The Worker (Freelancer)**: The person who finds open bounties, completes the requested tasks, and submits their work (via a text note or URL link).

---

## 3. How to Connect Your Wallet
1. Navigate to the App Homepage: `https://sabeel-bounty-agent.vercel.app`
2. Click the **Connect Wallet** button in the top right corner.
3. Approve the connection request in your MetaMask popup.
4. Once connected, your wallet address will appear in the top right, and the App will read your balances.

---

## 4. How to Create a Bounty (As a Boss)
Want to get a task done? Here is how to create your own bounty:

1. Look at the left sidebar titled **"Create a New Bounty"**.
2. **Title**: Write a short, descriptive title (e.g., "Design a Logo").
3. **Description**: Provide detailed instructions on what you need done.
4. **Reward (USDC)**: Specify how much *each* winner will earn.
5. **Max Winners**: Choose how many people can win this bounty (e.g., 1 for a specific task, or 5 if you want multiple people to do it).
6. **Deadline (Days)**: Choose how many days the bounty will stay open.
7. Click **Create Bounty →**. 
8. MetaMask will prompt you to **Approve** the USDC transfer. This securely locks the funds in the contract. Once approved, you will confirm the actual Creation transaction.

---

## 5. How to Submit Work (As a Worker)
Found a bounty you want to complete? Here is how you get paid:

1. Browse the **Open Bounties** grid on the Home page.
2. Complete the task as described by the Boss.
3. Click the **Submit Work** button on the bounty card.
4. Fill out the submission form:
   - **Work Note**: Briefly explain what you did (e.g., "I have completed the logo design").
   - **Work Link**: Provide a link to your deliverable (e.g., Google Drive link, Figma link, GitHub Repo). *You must provide at least a note or a link!*
5. Click **Submit Proof of Work**.
6. Confirm the transaction in MetaMask. You will see a success notification once your work is logged on the blockchain!

---

## 6. How to Approve Work (As a Boss)
Once workers submit tasks to your bounty, it's time to review them.

1. Go to the bounty you created on the Home page.
2. Click **View Submissions**. 
3. A list of all submitted work will appear, showing the worker's address, their note, and their link.
4. Review their work using the provided link.
5. If the work is satisfactory, click the **Approve Work** button next to their submission.
6. Confirm the transaction in MetaMask. The Smart Contract will immediately unlock the funds and send the exact USDC reward directly to the Worker's wallet!

---

## 7. Tracking Your Activity & Transactions
Want to see your financial history or verify a payment?

1. Click on the **Activity** tab in the top navigation bar.
2. Here you can see your **Total Earned** (as a Worker) and **Total Sent** (as a Boss).
3. Below that, you will find a chronological list of your **Recent Transactions** (e.g., "Earned from Bounty #4" or "Created Bounty #5").
4. Click **View Transaction ↗** next to any item to instantly open the Arcscan Block Explorer (`testnet.arcscan.app`) and verify the exact blockchain transaction details.

---

### FAQ & Troubleshooting
- **What happens if no one completes my bounty?** 
  If the deadline passes and your bounty is not completed, you can click the **Cancel & Refund** button on your bounty card to retrieve your locked USDC.
- **Why is my transaction failing?** 
  Ensure you are connected to the **Arc Testnet**, have enough Testnet ARC for gas fees, and have minted enough Testnet USDC from the Faucet.

*Built on the Arc Testnet.*
