import classes from './error-alert.module.css';

export default function ErrorAlert(props: any) {
  return <div className={classes.alert}>{props.children}</div>;
}
