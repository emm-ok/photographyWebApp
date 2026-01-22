import { NextResponse } from "next/server"
import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: Request) {
  try {
    const { name, email, message } = await req.json()

    await resend.emails.send({
      from: "Photography <onboarding@resend.dev>",
      to: ["okoosiemmanuel@gmail.com"],
      subject: `New Contact Message from ${name}`,
      replyTo: email,
      html: `
        <h3>New Inquiry</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p>${message}</p>
      `,
    })

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json(
      { error: "Failed to send message" },
      { status: 500 }
    )
  }
}
