export default function NewsDetailLayout( {children, modal} : {children: React.ReactNode, modal: React.ReactNode}) {  // modal: @modal
  return (
    <>
      {modal}
      {children}
    </>
  )
}
