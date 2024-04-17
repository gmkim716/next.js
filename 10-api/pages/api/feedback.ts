import fs from 'fs';
import path from 'path';  

export function buildFeedbackPath() {
  return path.join(process.cwd(), 'data', 'feedback.json');
}

export function extractFeedback(filePath: string) {
  const fileData = fs.readFileSync(filePath);
  const data = JSON.parse(fileData.toString()); 
  return data; 
}


function handler(req: any, res:any) {
  if (req.method === 'POST') {
    const email = req.body.email;
    const feedbackText = req.body.text;

    const newFeedback = {
      id: new Date().toISOString(), 
      email: email,
      text: feedbackText,
    };

    // store that in a database or in a file
    const filePath = buildFeedbackPath(); 
    const fileData = fs.readFileSync(filePath);
    
    let data = [];
    if (fileData.length !== 0) {
      data = JSON.parse(fileData.toString());
      data.push(newFeedback); 
    }
    fs.writeFileSync(filePath, JSON.stringify(data));
    res.status(201).json({ message: 'Success!', feedback: newFeedback}); 
  } else {
    const filePath = buildFeedbackPath();
    const data = extractFeedback(filePath);
    res.status(200).json({ feedback: data });
  }
}

export default handler;