"use server";

const JUDGE0_BASE_URL = `https://${process.env.JUDGE0_BASE_URL}/submissions?base64_encoded=false&wait=true&fields=*`;

export async function createSubmission(source_code: string) {
  try {
    const res = await fetch(JUDGE0_BASE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        'x-rapidapi-key': `${process.env.RAPID_API_KEY}`,
        'x-rapidapi-host': `${process.env.JUDGE0_BASE_URL}`
      },
      body: JSON.stringify({
        language_id: 2,
        source_code: source_code,
        stdin: "manish",
      })
    });

    return await res.json();
  } catch (err) {
    console.log("Error occured");
    return null
  }
}