import MainHeader from "@/components/header";

export default function MainLayout({ children }) {
  return (
    <div>
     <MainHeader />
     <main>{children}</main>
     </div>
  )
}