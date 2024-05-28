import { buildFeedbackPath, extractFeedback } from '../api/feedback'

export default function FeedbackPage(props: any) {
  return (
    <ul>
      {props.feedbackItems.map((item: any) => (
        <li key={item.id}>{item.text}</li>
      ))}
    </ul>
  )
}

export async function getStaticProps() {
  const filePath = buildFeedbackPath();
  const data = extractFeedback(filePath);
  return {
    props: {
      feedbackItems: data
    },
  }
}
