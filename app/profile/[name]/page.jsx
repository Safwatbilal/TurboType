import AllProfile from "@/components/Profile/AllProfile";
import { use } from "react";
export async function generateMetadata({ params }) {
  const { name } = params; 
  return {
    title: `${name}'s Profile | TurboType`
  };
}
export default function Name({ params }) {
  const { name } = use ( params); 
  return <AllProfile name={name}/>
  
}
