import Header from "@/components/Header";
import "tailwindcss/tailwind.css";


export default function App ({ Component, pageProps })
{
  return (<>
    <Header />
    <Component {...pageProps} />
  </>);
}