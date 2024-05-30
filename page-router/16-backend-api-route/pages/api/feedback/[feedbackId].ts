import { NextApiRequest, NextApiResponse } from "next";
import { buildFeedbackPath, extractFeedback } from ".";

export default function handler(req: NextApiRequest, res: NextApiResponse) {  // Next에서 제공하는 타입 존재

  const feedbackId: string = req.query.feedbackId as string;
  const filePath: string = buildFeedbackPath();
  const feedbackData = extractFeedback(filePath);
  const selectedFeedback = feedbackData.find(
    (feedback: any) => feedback.id === feedbackId);

  res.status(200).json({ feedback: selectedFeedback });

}