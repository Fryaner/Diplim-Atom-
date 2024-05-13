import StartPage from "../pages/startPage";
import Layout from "../components/layout/layout";
import { Theme } from "@radix-ui/themes";
import { useEffect, useState } from "react";


const App = () => {
    let [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const timeoutId = setTimeout(() => {
          setIsLoading(true);
        }, 2000);
      }, []); 


    return (
        <Theme>
           {isLoading ? <Layout/> : <StartPage/>}
        </Theme>
    )
} 
export default App;