import Navbar from "@/components/navbar";
import Main from "@/components/Main";

export default function PrimaryLayout ({ children }) {
  return(
    <>
      <Navbar />
      <Main>
        {children}
      </Main>
    </>
  )
}