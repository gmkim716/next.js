import { Fragment, useState } from "react";
import { buildFeedbackPath, extractFeedback } from "../api/feedback";

interface FeedbackData {
  email: string;
  feedback: string;
}

export default function FeedbackPage(props: any) {
  const [feedbackData, setFeedbackData] = useState<FeedbackData>(); 

  function loadFeedbackHandler(id: any) {  
    
    fetch(`/api/feedback/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setFeedbackData(data.feedback)
      });
  }

  return (
    <Fragment>
      {feedbackData && <p>{feedbackData.email}</p>}
      <ul>
        {props.feedbackItems.map((item: any) => (
          <li key={item.id}>
            {item.text} 
            <button 
              onClick={loadFeedbackHandler.bind(null, item.id)}
            >
              Show Details
            </button>
          </li>
        ))}
      </ul>
      </Fragment>
  );
}

// 외부 API로부터 데이터를 받아오는 구조가 아니라면, fetch를 사용하지 않는다.
// getStaticProps 내부에서 데이터를 받아오는 로직을 직접 작성한다
export async function getStaticProps() {
  const filePath = buildFeedbackPath();
  const data = extractFeedback(filePath);

  return {
    props: {
      feedbackItems: data,
    },
  };
}