"use server";

const JUDGE0_BASE_URL = `${process.env.JUDGE0_BASE_URL}/submissions?base64_encoded=false&wait=true&fields=*`;

export async function createSubmission(source_code: string, language_id: number, stdin: string) {
  try {
    const res = await fetch(JUDGE0_BASE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        'x-rapidapi-key': `${process.env.RAPID_API_KEY}`,
        'x-rapidapi-host': `${process.env.JUDGE0_HOST}`
      },
      body: JSON.stringify({
        language_id,
        source_code,
        stdin
      })
    });

    return await res.json();
  } catch (err) {
    console.log("new errro Error occured", err);
    return null
  }
}