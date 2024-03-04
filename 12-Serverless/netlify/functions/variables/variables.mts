import type { Context } from "@netlify/functions"

export default async (req: Request, context: Context) => {

    const myImportantVariable = process.env.MY_IMPORTANT_VARIABLE;

    if (!myImportantVariable) {
        throw 'Missing variable in request';
    }

    return new Response(JSON.stringify({ MY_IMPORTANT_VARIABLE: myImportantVariable }), {
        status: 200,
        headers: {
            'Content-Type': 'application/json'
        }
    })
}