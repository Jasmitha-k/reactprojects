export default function DashboardLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return (
      <html lang="en">
        <body>
          <header style={{
            backgroundColor:"greenyellow",
            padding:"1rem",
          }}>
            <p>HEADER</p>
          </header>
          <main>{children}</main>
          <footer style={{
            backgroundColor:"ghostwhite",
            //padding:"1rem",
          }}>
            <p>FOOTER</p>
          </footer>
        </body>
      </html>
    )
  }