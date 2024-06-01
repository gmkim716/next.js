import { Fragment } from "react";

export default function Layout(props: { children: React.ReactNode }) {
  return (
    <Fragment>
      <main>
        {props.children}
      </main>
    </Fragment>
  )
}