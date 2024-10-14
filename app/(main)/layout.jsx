import MainHeader from "@/components/main/header";

export default function MainLayout({ children }) {
  return (
    <div>
     <MainHeader />
     {children}
    </div>
  )
}