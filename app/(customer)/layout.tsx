import SpecialCustomerHomeHeader from "./component/SpecialCustomerHomeHeader";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      {/* <Header /> */}
      {/* <SpecialCustomerHomeHeader /> */}
      {children}
    </>
  );
}
