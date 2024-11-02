import "web3";
import { ethers } from "ethers";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let contract: any;
let provider;

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ethereum: any;
  }
}


// Function to get contract instance for writing data (requires signer)
export const connectWallet = async () => {
  if (window.ethereum) {
    try {
      provider = new ethers.BrowserProvider(window.ethereum);

      // Request access to the user's wallet (MetaMask)
      await provider.send("eth_requestAccounts", []);

      const signer = await provider.getSigner();
      contract = new ethers.Contract(process.env.contractAddress!, process.env.ABI!, signer);

      return contract;
    } catch (error) {
      console.log("Wallet connection error:", error);
    }
  } else {
    console.error("Ethereum object not found. Please install MetaMask.");
  }
};

export const addTodoOwner = async () => {
  try {
    // Attempt to register the user
    if (!contract) {
    return "Connect your wallet"
    }
    const tx = await contract.addTodoOwner();
    await tx.wait(); // Wait for transaction to complete
    return "Registered";
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    // Check for the specific error message
    if (error.message.includes("Already registered as a Todo owner")) {
      return "Already Registered";
    } else {
      console.error("Error registering user:", error);
      alert("An unexpected error occurred while trying to register.");
      return "Error occured";
    }
  }
};
export const addTodo = async (todo: string) => {
  const tx = await contract.addTodo(todo);
  await tx.wait();
  console.log(tx);
  return tx;
};

export const fetchTodos = async () => {
  if (!contract) {
    return ["First connect wallet"];
  }
  const todos = await contract.getTodos();
  return todos;
};

export const deleteTodo = async (todoId: number) => {
  const tx = await contract.deleteTodo(todoId);
  await tx.wait();
  console.log(tx);
  return tx;
};
export const updateTodo = async (todoId: number, updatedTodo: string) => {
  if (!todoId || updatedTodo) {
    console.log("please give updated todo");

    return;
  }
  const tx = await contract.updateTodo(todoId, updatedTodo);
  await tx.wait();
  console.log(tx);
  return tx;
};
