import { createContext } from "svelte";

interface Scene {
  progress: number;
}

export const[getScene, setScene] = createContext<Scene>();
